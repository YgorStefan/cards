# CDP Catálogo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completar o catálogo de produtos com CRUD de produtos e marcas, persistência via localStorage, redesign visual e-commerce moderno com gradiente índigo, drawer lateral animado e responsividade mobile.

**Architecture:** Estado central no App.js com `useLocalStorage` para persistência. Drawer lateral controla formulários de produto e marca. Marcas filtram produtos por nome; produtos e marcas têm `id` gerado pelo cliente.

**Tech Stack:** React 19, CSS modules por componente, localStorage, React Testing Library + Jest (CRA default)

---

## File Map

| Ação | Arquivo |
|---|---|
| Criar | `src/hooks/useLocalStorage.js` |
| Criar | `src/hooks/useLocalStorage.test.js` |
| Modificar | `src/index.css` |
| Modificar | `src/App.js` |
| Modificar | `src/componentes/CampoTexto/index.js` |
| Modificar | `src/componentes/CampoTexto/CampoTexto.css` |
| Modificar | `src/componentes/ListaSuspensa/index.js` |
| Modificar | `src/componentes/ListaSuspensa/ListaSuspensa.css` |
| Modificar | `src/componentes/Botao/index.js` |
| Modificar | `src/componentes/Botao/Botao.css` |
| Modificar | `src/componentes/Marca/index.js` |
| Modificar | `src/componentes/Marca/Marca.css` |
| Criar | `src/componentes/Header/index.js` |
| Criar | `src/componentes/Header/Header.css` |
| Criar | `src/componentes/ProdutoItem/index.js` |
| Criar | `src/componentes/ProdutoItem/ProdutoItem.css` |
| Criar | `src/componentes/ProdutoItem/ProdutoItem.test.js` |
| Criar | `src/componentes/Drawer/index.js` |
| Criar | `src/componentes/Drawer/Drawer.css` |
| Criar | `src/componentes/FormularioProduto/index.js` |
| Criar | `src/componentes/FormularioProduto/FormularioProduto.css` |
| Criar | `src/componentes/FormularioProduto/FormularioProduto.test.js` |
| Criar | `src/componentes/FormularioMarca/index.js` |
| Criar | `src/componentes/FormularioMarca/FormularioMarca.css` |
| Criar | `src/componentes/EstadoVazio/index.js` |
| Criar | `src/componentes/EstadoVazio/EstadoVazio.css` |
| Deletar | `src/componentes/Banner/` (substituído por Header) |
| Deletar | `src/componentes/Formulario/` (substituído por FormularioProduto) |
| Deletar | `src/componentes/Produto/` (substituído por ProdutoItem) |

---

## Task 1: Hook useLocalStorage

**Files:**
- Create: `src/hooks/useLocalStorage.js`
- Create: `src/hooks/useLocalStorage.test.js`

- [ ] **Step 1: Escrever os testes**

```js
// src/hooks/useLocalStorage.test.js
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

beforeEach(() => localStorage.clear())

test('retorna valor inicial quando chave não existe', () => {
  const { result } = renderHook(() => useLocalStorage('chave', 'inicial'))
  expect(result.current[0]).toBe('inicial')
})

test('persiste valor atualizado no localStorage', () => {
  const { result } = renderHook(() => useLocalStorage('chave', 'inicial'))
  act(() => result.current[1]('novo'))
  expect(localStorage.getItem('chave')).toBe('"novo"')
})

test('lê valor existente do localStorage ao montar', () => {
  localStorage.setItem('chave', '"salvo"')
  const { result } = renderHook(() => useLocalStorage('chave', 'inicial'))
  expect(result.current[0]).toBe('salvo')
})

test('suporta arrays como valor', () => {
  const { result } = renderHook(() => useLocalStorage('lista', []))
  act(() => result.current[1]([1, 2, 3]))
  expect(result.current[0]).toEqual([1, 2, 3])
})
```

- [ ] **Step 2: Rodar testes e confirmar falha**

```bash
npm test -- --testPathPattern=useLocalStorage --watchAll=false
```
Esperado: FAIL — `Cannot find module './useLocalStorage'`

- [ ] **Step 3: Implementar o hook**

```js
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const item = localStorage.getItem(chave)
      return item ? JSON.parse(item) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {}
  }, [chave, valor])

  return [valor, setValor]
}

export default useLocalStorage
```

- [ ] **Step 4: Rodar testes e confirmar aprovação**

```bash
npm test -- --testPathPattern=useLocalStorage --watchAll=false
```
Esperado: PASS (4 testes)

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useLocalStorage.js src/hooks/useLocalStorage.test.js
git commit -m "feat: add useLocalStorage hook with persistence"
```

---

## Task 2: CSS global e componentes base (CampoTexto, ListaSuspensa, Botao)

**Files:**
- Modify: `src/index.css`
- Modify: `src/componentes/CampoTexto/index.js`
- Modify: `src/componentes/CampoTexto/CampoTexto.css`
- Modify: `src/componentes/ListaSuspensa/ListaSuspensa.css`
- Modify: `src/componentes/Botao/index.js`
- Modify: `src/componentes/Botao/Botao.css`

- [ ] **Step 1: Atualizar index.css**

```css
/* src/index.css */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f8fafc;
  color: #111827;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

button {
  font-family: inherit;
}
```

- [ ] **Step 2: Atualizar CampoTexto para suportar prop `type`**

```jsx
// src/componentes/CampoTexto/index.js
import './CampoTexto.css'

const CampoTexto = (props) => {
  const aoDigitado = (evento) => {
    props.aoAlterado(evento.target.value)
  }

  return (
    <div className="campo-texto">
      <label>{props.label}</label>
      <input
        type={props.type || 'text'}
        value={props.valor}
        onChange={aoDigitado}
        required={props.required}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default CampoTexto
```

- [ ] **Step 3: Atualizar CampoTexto.css**

```css
/* src/componentes/CampoTexto/CampoTexto.css */
.campo-texto {
  margin: 16px 0;
}

.campo-texto label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.campo-texto input {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  width: 100%;
  font-size: 15px;
  padding: 10px 14px;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.campo-texto input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

- [ ] **Step 4: Atualizar ListaSuspensa.css**

```css
/* src/componentes/ListaSuspensa/ListaSuspensa.css */
.lista-suspensa {
  margin: 16px 0;
}

.lista-suspensa label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.lista-suspensa select {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  width: 100%;
  font-size: 15px;
  padding: 10px 14px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: inherit;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.lista-suspensa select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

- [ ] **Step 5: Atualizar Botao com `type` prop e novo visual**

```jsx
// src/componentes/Botao/index.js
import './Botao.css'

const Botao = ({ texto, type = 'submit', onClick }) => {
  return (
    <button className="botao" type={type} onClick={onClick}>
      {texto}
    </button>
  )
}

export default Botao
```

```css
/* src/componentes/Botao/Botao.css */
.botao {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  padding: 13px 24px;
  border: none;
  cursor: pointer;
  color: white;
  width: 100%;
  margin-top: 8px;
  font-family: inherit;
  transition: opacity 0.2s;
}

.botao:hover {
  opacity: 0.92;
}

.botao:active {
  opacity: 0.85;
}
```

- [ ] **Step 6: Verificar que o app compila sem erros**

```bash
npm start
```
Esperado: app abre no browser sem erros no console. O visual ainda usa componentes antigos — está correto por enquanto.

- [ ] **Step 7: Commit**

```bash
git add src/index.css src/componentes/CampoTexto/ src/componentes/ListaSuspensa/ src/componentes/Botao/
git commit -m "style: update base components and global CSS to new design system"
```

---

## Task 3: Componente Header

**Files:**
- Create: `src/componentes/Header/index.js`
- Create: `src/componentes/Header/Header.css`

- [ ] **Step 1: Criar Header/index.js**

```jsx
// src/componentes/Header/index.js
import './Header.css'

const Header = ({ onAbrirDrawerProduto, onAbrirDrawerMarca }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon">C</div>
        <span className="header__logo-text">CDP Catálogo</span>
      </div>
      <div className="header__acoes">
        <button
          className="header__btn-marca"
          type="button"
          onClick={onAbrirDrawerMarca}
        >
          + Marca
        </button>
        <button
          className="header__btn-produto"
          type="button"
          onClick={onAbrirDrawerProduto}
        >
          + Produto
        </button>
      </div>
    </header>
  )
}

export default Header
```

- [ ] **Step 2: Criar Header.css**

```css
/* src/componentes/Header/Header.css */
.header {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__logo-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  color: white;
}

.header__logo-text {
  color: white;
  font-weight: 700;
  font-size: 18px;
}

.header__acoes {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.header__btn-marca {
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.header__btn-marca:hover {
  background: rgba(255, 255, 255, 0.25);
}

.header__btn-produto {
  background: white;
  border: none;
  border-radius: 20px;
  color: #6366f1;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.header__btn-produto:hover {
  opacity: 0.9;
}

@media (max-width: 480px) {
  .header {
    padding: 12px 16px;
  }

  .header__logo-text {
    font-size: 15px;
  }

  .header__btn-marca,
  .header__btn-produto {
    font-size: 12px;
    padding: 7px 12px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/componentes/Header/
git commit -m "feat: add Header component with gradient and action buttons"
```

---

## Task 4: Componente ProdutoItem

**Files:**
- Create: `src/componentes/ProdutoItem/index.js`
- Create: `src/componentes/ProdutoItem/ProdutoItem.css`
- Create: `src/componentes/ProdutoItem/ProdutoItem.test.js`

- [ ] **Step 1: Escrever os testes**

```jsx
// src/componentes/ProdutoItem/ProdutoItem.test.js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProdutoItem from './index'

const produto = {
  id: '1',
  nome: 'Produto Alpha',
  codigo: '#JX-001',
  imagem: '',
  marca: 'Jetmax',
  preco: '299,90',
  descricao: 'Ótimo produto'
}

test('exibe nome do produto', () => {
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={jest.fn()} />)
  expect(screen.getByText('Produto Alpha')).toBeInTheDocument()
})

test('exibe preço formatado', () => {
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={jest.fn()} />)
  expect(screen.getByText('R$ 299,90')).toBeInTheDocument()
})

test('chama onEditar com o produto ao clicar em editar', async () => {
  const onEditar = jest.fn()
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={onEditar} onExcluir={jest.fn()} />)
  await userEvent.click(screen.getByRole('button', { name: /editar/i }))
  expect(onEditar).toHaveBeenCalledWith(produto)
})

test('chama onExcluir com o id ao clicar em excluir', async () => {
  const onExcluir = jest.fn()
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={onExcluir} />)
  await userEvent.click(screen.getByRole('button', { name: /excluir produto/i }))
  expect(onExcluir).toHaveBeenCalledWith('1')
})

test('exibe imagem quando URL fornecida', () => {
  const produtoComImagem = { ...produto, imagem: 'https://example.com/img.png' }
  render(<ProdutoItem produto={produtoComImagem} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={jest.fn()} />)
  expect(screen.getByRole('img', { name: 'Produto Alpha' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Rodar testes e confirmar falha**

```bash
npm test -- --testPathPattern=ProdutoItem --watchAll=false
```
Esperado: FAIL — `Cannot find module './index'`

- [ ] **Step 3: Implementar ProdutoItem/index.js**

```jsx
// src/componentes/ProdutoItem/index.js
import './ProdutoItem.css'

const ProdutoItem = ({ produto, corSecundaria, onEditar, onExcluir }) => {
  return (
    <div className="produto-item">
      <div
        className="produto-item__miniatura"
        style={{ background: `linear-gradient(135deg, ${corSecundaria}88, ${corSecundaria})` }}
      >
        {produto.imagem && (
          <img src={produto.imagem} alt={produto.nome} />
        )}
      </div>
      <div className="produto-item__info">
        <span className="produto-item__nome">{produto.nome}</span>
        <span className="produto-item__detalhe">
          {produto.codigo}{produto.descricao ? ` · ${produto.descricao}` : ''}
        </span>
      </div>
      {produto.preco && (
        <span className="produto-item__preco">R$ {produto.preco}</span>
      )}
      <div className="produto-item__acoes">
        <button
          className="produto-item__btn-editar"
          type="button"
          aria-label="Editar produto"
          onClick={() => onEditar(produto)}
        >
          ✏️
        </button>
        <button
          className="produto-item__btn-excluir"
          type="button"
          aria-label="Excluir produto"
          onClick={() => onExcluir(produto.id)}
        >
          🗑
        </button>
      </div>
    </div>
  )
}

export default ProdutoItem
```

- [ ] **Step 4: Criar ProdutoItem.css**

```css
/* src/componentes/ProdutoItem/ProdutoItem.css */
.produto-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.15s;
}

.produto-item:last-child {
  border-bottom: none;
}

.produto-item:hover {
  background: #fafafa;
}

.produto-item__miniatura {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.produto-item__miniatura img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.produto-item__info {
  flex: 1;
  min-width: 0;
}

.produto-item__nome {
  display: block;
  font-weight: 700;
  color: #111827;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.produto-item__detalhe {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.produto-item__preco {
  font-weight: 700;
  color: #059669;
  font-size: 14px;
  white-space: nowrap;
  flex-shrink: 0;
}

.produto-item__acoes {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.produto-item__btn-editar,
.produto-item__btn-excluir {
  border: none;
  border-radius: 6px;
  padding: 5px 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}

.produto-item__btn-editar {
  background: #f3f4f6;
  color: #374151;
}

.produto-item__btn-editar:hover {
  background: #e5e7eb;
}

.produto-item__btn-excluir {
  background: #fef2f2;
  color: #ef4444;
}

.produto-item__btn-excluir:hover {
  background: #fee2e2;
}

@media (max-width: 480px) {
  .produto-item {
    padding: 10px 12px;
    gap: 8px;
  }
}
```

- [ ] **Step 5: Rodar testes e confirmar aprovação**

```bash
npm test -- --testPathPattern=ProdutoItem --watchAll=false
```
Esperado: PASS (5 testes)

- [ ] **Step 6: Commit**

```bash
git add src/componentes/ProdutoItem/
git commit -m "feat: add ProdutoItem compact list component"
```

---

## Task 5: Componente Drawer

**Files:**
- Create: `src/componentes/Drawer/index.js`
- Create: `src/componentes/Drawer/Drawer.css`

> Nota: O Drawer importa `FormularioProduto` e `FormularioMarca` que ainda não existem. Para compilar, crie-os temporariamente com `export default () => null` — os passos das Tasks 6 e 7 substituirão essas implementações provisórias.

- [ ] **Step 1: Criar stubs temporários para compilação**

```jsx
// src/componentes/FormularioProduto/index.js  (stub — será substituído na Task 6)
const FormularioProduto = () => null
export default FormularioProduto
```

```jsx
// src/componentes/FormularioMarca/index.js  (stub — será substituído na Task 7)
const FormularioMarca = () => null
export default FormularioMarca
```

- [ ] **Step 2: Criar Drawer/index.js**

```jsx
// src/componentes/Drawer/index.js
import './Drawer.css'
import FormularioProduto from '../FormularioProduto'
import FormularioMarca from '../FormularioMarca'

const Drawer = ({ aberto, tipo, item, marcas, onFechar, onSalvarProduto, onSalvarMarca }) => {
  if (!aberto) return null

  const titulo = tipo === 'produto'
    ? (item ? 'Editar Produto' : 'Novo Produto')
    : 'Nova Marca'

  return (
    <div className="drawer-overlay" onClick={onFechar}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer__header">
          <h2 className="drawer__titulo">{titulo}</h2>
          <button
            className="drawer__fechar"
            type="button"
            aria-label="Fechar painel"
            onClick={onFechar}
          >
            ×
          </button>
        </div>
        <div className="drawer__corpo">
          {tipo === 'produto' ? (
            <FormularioProduto
              produto={item}
              marcas={marcas}
              aoSalvar={onSalvarProduto}
            />
          ) : (
            <FormularioMarca aoSalvar={onSalvarMarca} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Drawer
```

- [ ] **Step 3: Criar Drawer.css**

```css
/* src/componentes/Drawer/Drawer.css */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 420px;
  max-width: 100%;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  animation: drawerSlideIn 0.25s ease;
}

@keyframes drawerSlideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.drawer__header {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.drawer__titulo {
  color: white;
  font-size: 18px;
  font-weight: 700;
}

.drawer__fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 0.2s;
}

.drawer__fechar:hover {
  background: rgba(255, 255, 255, 0.3);
}

.drawer__corpo {
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 480px) {
  .drawer {
    width: 100%;
  }
}
```

- [ ] **Step 4: Verificar compilação**

```bash
npm start
```
Esperado: app compila sem erros. Nada funciona ainda, pois App.js ainda usa componentes antigos.

- [ ] **Step 5: Commit**

```bash
git add src/componentes/Drawer/ src/componentes/FormularioProduto/index.js src/componentes/FormularioMarca/index.js
git commit -m "feat: add Drawer component with animated slide panel"
```

---

## Task 6: FormularioProduto

**Files:**
- Modify: `src/componentes/FormularioProduto/index.js` (substituir stub)
- Create: `src/componentes/FormularioProduto/FormularioProduto.css`
- Create: `src/componentes/FormularioProduto/FormularioProduto.test.js`

- [ ] **Step 1: Escrever os testes**

```jsx
// src/componentes/FormularioProduto/FormularioProduto.test.js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioProduto from './index'

const marcas = [
  { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
]

test('exibe botão "Cadastrar Produto" para produto novo', () => {
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /cadastrar produto/i })).toBeInTheDocument()
})

test('exibe botão "Salvar Alterações" ao editar', () => {
  const produto = { id: '1', nome: 'Alpha', codigo: '#JX-001', imagem: '', marca: 'Jetmax', preco: '299', descricao: '' }
  render(<FormularioProduto produto={produto} marcas={marcas} aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument()
})

test('preenche campos com dados do produto ao editar', () => {
  const produto = { id: '1', nome: 'Alpha', codigo: '#JX-001', imagem: '', marca: 'Jetmax', preco: '299', descricao: 'Top' }
  render(<FormularioProduto produto={produto} marcas={marcas} aoSalvar={jest.fn()} />)
  expect(screen.getByDisplayValue('Alpha')).toBeInTheDocument()
  expect(screen.getByDisplayValue('#JX-001')).toBeInTheDocument()
  expect(screen.getByDisplayValue('299')).toBeInTheDocument()
})

test('chama aoSalvar com dados corretos ao submeter', async () => {
  const aoSalvar = jest.fn()
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={aoSalvar} />)

  await userEvent.type(screen.getByLabelText(/nome/i), 'Novo Produto')
  await userEvent.type(screen.getByLabelText(/código/i), '#JX-001')
  await userEvent.selectOptions(screen.getByLabelText(/marca/i), 'Jetmax')
  await userEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }))

  expect(aoSalvar).toHaveBeenCalledWith(expect.objectContaining({
    nome: 'Novo Produto',
    codigo: '#JX-001',
    marca: 'Jetmax'
  }))
})

test('limpa campos após cadastro de novo produto', async () => {
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={jest.fn()} />)
  const nomeInput = screen.getByLabelText(/nome/i)
  await userEvent.type(nomeInput, 'Produto X')
  await userEvent.type(screen.getByLabelText(/código/i), '#001')
  await userEvent.selectOptions(screen.getByLabelText(/marca/i), 'Jetmax')
  await userEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }))
  expect(nomeInput).toHaveValue('')
})
```

- [ ] **Step 2: Rodar testes e confirmar falha**

```bash
npm test -- --testPathPattern=FormularioProduto --watchAll=false
```
Esperado: FAIL — campos não encontrados (stub retorna null)

- [ ] **Step 3: Implementar FormularioProduto/index.js**

```jsx
// src/componentes/FormularioProduto/index.js
import { useState, useEffect } from 'react'
import './FormularioProduto.css'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import Botao from '../Botao'

const FormularioProduto = ({ produto, marcas, aoSalvar }) => {
  const [nome, setNome] = useState('')
  const [codigo, setCodigo] = useState('')
  const [imagem, setImagem] = useState('')
  const [marca, setMarca] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (produto) {
      setNome(produto.nome)
      setCodigo(produto.codigo)
      setImagem(produto.imagem)
      setMarca(produto.marca)
      setPreco(produto.preco)
      setDescricao(produto.descricao)
    }
  }, [produto])

  const aoSubmeter = (e) => {
    e.preventDefault()
    aoSalvar({
      id: produto?.id || Date.now().toString(),
      nome,
      codigo,
      imagem,
      marca,
      preco,
      descricao
    })
    if (!produto) {
      setNome('')
      setCodigo('')
      setImagem('')
      setMarca('')
      setPreco('')
      setDescricao('')
    }
  }

  return (
    <form className="formulario-produto" onSubmit={aoSubmeter}>
      <CampoTexto
        label="Nome"
        placeholder="Nome do produto"
        required
        valor={nome}
        aoAlterado={setNome}
      />
      <CampoTexto
        label="Código"
        placeholder="#JX-001"
        required
        valor={codigo}
        aoAlterado={setCodigo}
      />
      <div className="formulario-produto__linha">
        <CampoTexto
          label="Preço"
          placeholder="299,90"
          valor={preco}
          aoAlterado={setPreco}
        />
        <ListaSuspensa
          label="Marca"
          required
          itens={marcas.map(m => m.nome)}
          valor={marca}
          aoAlterado={setMarca}
        />
      </div>
      <CampoTexto
        label="Imagem (URL)"
        placeholder="https://..."
        valor={imagem}
        aoAlterado={setImagem}
      />
      <CampoTexto
        label="Descrição"
        placeholder="Descrição breve do produto"
        valor={descricao}
        aoAlterado={setDescricao}
      />
      <Botao texto={produto ? 'Salvar Alterações' : 'Cadastrar Produto'} />
    </form>
  )
}

export default FormularioProduto
```

- [ ] **Step 4: Criar FormularioProduto.css**

```css
/* src/componentes/FormularioProduto/FormularioProduto.css */
.formulario-produto {
  padding: 20px 20px 28px;
}

.formulario-produto__linha {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 480px) {
  .formulario-produto__linha {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Rodar testes e confirmar aprovação**

```bash
npm test -- --testPathPattern=FormularioProduto --watchAll=false
```
Esperado: PASS (5 testes)

- [ ] **Step 6: Commit**

```bash
git add src/componentes/FormularioProduto/
git commit -m "feat: implement FormularioProduto with create and edit modes"
```

---

## Task 7: FormularioMarca e EstadoVazio

**Files:**
- Modify: `src/componentes/FormularioMarca/index.js` (substituir stub)
- Create: `src/componentes/FormularioMarca/FormularioMarca.css`
- Create: `src/componentes/EstadoVazio/index.js`
- Create: `src/componentes/EstadoVazio/EstadoVazio.css`

- [ ] **Step 1: Implementar FormularioMarca/index.js**

```jsx
// src/componentes/FormularioMarca/index.js
import { useState } from 'react'
import './FormularioMarca.css'
import CampoTexto from '../CampoTexto'
import Botao from '../Botao'

const FormularioMarca = ({ aoSalvar }) => {
  const [nome, setNome] = useState('')
  const [corPrimaria, setCorPrimaria] = useState('#D9F7E9')
  const [corSecundaria, setCorSecundaria] = useState('#57C278')

  const aoSubmeter = (e) => {
    e.preventDefault()
    aoSalvar({
      id: Date.now().toString(),
      nome,
      corPrimaria,
      corSecundaria
    })
    setNome('')
    setCorPrimaria('#D9F7E9')
    setCorSecundaria('#57C278')
  }

  return (
    <form className="formulario-marca" onSubmit={aoSubmeter}>
      <CampoTexto
        label="Nome da marca"
        placeholder="Ex: Jetmax"
        required
        valor={nome}
        aoAlterado={setNome}
      />
      <div className="formulario-marca__cores">
        <div className="formulario-marca__cor">
          <label htmlFor="cor-primaria">Cor de fundo</label>
          <input
            id="cor-primaria"
            type="color"
            value={corPrimaria}
            onChange={e => setCorPrimaria(e.target.value)}
          />
          <span>{corPrimaria}</span>
        </div>
        <div className="formulario-marca__cor">
          <label htmlFor="cor-secundaria">Cor de destaque</label>
          <input
            id="cor-secundaria"
            type="color"
            value={corSecundaria}
            onChange={e => setCorSecundaria(e.target.value)}
          />
          <span>{corSecundaria}</span>
        </div>
      </div>
      <div
        className="formulario-marca__preview"
        style={{ background: corPrimaria }}
      >
        <div
          className="formulario-marca__preview-dot"
          style={{ background: corSecundaria }}
        />
        <span style={{ color: corSecundaria }}>
          {nome || 'Preview da Marca'}
        </span>
      </div>
      <Botao texto="Criar Marca" />
    </form>
  )
}

export default FormularioMarca
```

- [ ] **Step 2: Criar FormularioMarca.css**

```css
/* src/componentes/FormularioMarca/FormularioMarca.css */
.formulario-marca {
  padding: 20px 20px 28px;
}

.formulario-marca__cores {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 8px 0 16px;
}

.formulario-marca__cor {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.formulario-marca__cor label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.formulario-marca__cor input[type="color"] {
  width: 100%;
  height: 44px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  padding: 2px;
  background: #f9fafb;
}

.formulario-marca__cor span {
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}

.formulario-marca__preview {
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  transition: background 0.2s;
}

.formulario-marca__preview-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.2s;
}

.formulario-marca__preview span {
  font-weight: 700;
  font-size: 16px;
  transition: color 0.2s;
}
```

- [ ] **Step 3: Criar EstadoVazio/index.js**

```jsx
// src/componentes/EstadoVazio/index.js
import './EstadoVazio.css'

const EstadoVazio = ({ onAdicionar }) => {
  return (
    <div className="estado-vazio">
      <span className="estado-vazio__icone" role="img" aria-label="caixa">📦</span>
      <p className="estado-vazio__texto">Nenhum produto cadastrado ainda.</p>
      <button
        className="estado-vazio__link"
        type="button"
        onClick={onAdicionar}
      >
        Adicionar primeiro produto →
      </button>
    </div>
  )
}

export default EstadoVazio
```

- [ ] **Step 4: Criar EstadoVazio.css**

```css
/* src/componentes/EstadoVazio/EstadoVazio.css */
.estado-vazio {
  text-align: center;
  padding: 80px 24px;
}

.estado-vazio__icone {
  font-size: 52px;
  display: block;
  margin-bottom: 12px;
}

.estado-vazio__texto {
  color: #9ca3af;
  font-size: 16px;
  margin: 0 0 8px;
}

.estado-vazio__link {
  background: none;
  border: none;
  color: #6366f1;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.estado-vazio__link:hover {
  text-decoration: underline;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/componentes/FormularioMarca/ src/componentes/EstadoVazio/
git commit -m "feat: add FormularioMarca with color preview and EstadoVazio"
```

---

## Task 8: Atualizar componente Marca

**Files:**
- Modify: `src/componentes/Marca/index.js`
- Modify: `src/componentes/Marca/Marca.css`

- [ ] **Step 1: Reescrever Marca/index.js**

```jsx
// src/componentes/Marca/index.js
import ProdutoItem from '../ProdutoItem'
import './Marca.css'

const Marca = ({ marca, produtos, onExcluirMarca, onEditarProduto, onExcluirProduto }) => {
  return (
    <section className="marca" style={{ backgroundColor: marca.corPrimaria }}>
      <div className="marca__cabecalho">
        <div className="marca__titulo">
          <div className="marca__dot" style={{ backgroundColor: marca.corSecundaria }} />
          <h3 style={{ color: marca.corSecundaria }}>{marca.nome}</h3>
          <span
            className="marca__badge"
            style={{
              color: marca.corSecundaria,
              background: `${marca.corSecundaria}22`
            }}
          >
            {produtos.length} {produtos.length === 1 ? 'produto' : 'produtos'}
          </span>
        </div>
        <button
          className="marca__excluir"
          type="button"
          onClick={() => onExcluirMarca(marca.id)}
        >
          Excluir marca
        </button>
      </div>
      {produtos.length > 0 && (
        <div className="marca__lista">
          {produtos.map(produto => (
            <ProdutoItem
              key={produto.id}
              produto={produto}
              corSecundaria={marca.corSecundaria}
              onEditar={onEditarProduto}
              onExcluir={onExcluirProduto}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Marca
```

- [ ] **Step 2: Reescrever Marca.css**

```css
/* src/componentes/Marca/Marca.css */
.marca {
  padding: 24px 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.marca__cabecalho {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 8px;
}

.marca__titulo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.marca__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.marca__titulo h3 {
  font-size: 20px;
  font-weight: 700;
}

.marca__badge {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 12px;
}

.marca__excluir {
  background: #fef2f2;
  border: none;
  border-radius: 8px;
  color: #ef4444;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}

.marca__excluir:hover {
  background: #fee2e2;
}

.marca__lista {
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  overflow: hidden;
}

@media (max-width: 768px) {
  .marca {
    padding: 18px 16px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/componentes/Marca/
git commit -m "feat: update Marca with ProdutoItem list and delete button"
```

---

## Task 9: Atualizar App.js e remover componentes obsoletos

**Files:**
- Modify: `src/App.js`
- Delete: `src/componentes/Banner/` (diretório inteiro)
- Delete: `src/componentes/Formulario/` (diretório inteiro)
- Delete: `src/componentes/Produto/` (diretório inteiro)

- [ ] **Step 1: Reescrever App.js**

```jsx
// src/App.js
import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './componentes/Header'
import Marca from './componentes/Marca'
import Drawer from './componentes/Drawer'
import EstadoVazio from './componentes/EstadoVazio'

const marcasIniciais = [
  { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' },
  { id: '2', nome: 'Kajima', corPrimaria: '#E8F8FF', corSecundaria: '#82CFFA' },
  { id: '3', nome: 'KWS', corPrimaria: '#F0F8E2', corSecundaria: '#A6D157' },
  { id: '4', nome: 'Kawashima', corPrimaria: '#FDE7E8', corSecundaria: '#E06B69' },
  { id: '5', nome: 'Nakashi', corPrimaria: '#FFF5D9', corSecundaria: '#FFBA05' },
  { id: '6', nome: 'Outros', corPrimaria: '#FFEEDF', corSecundaria: '#FF8A29' },
]

function App() {
  const [produtos, setProdutos] = useLocalStorage('cdp_produtos', [])
  const [marcas, setMarcas] = useLocalStorage('cdp_marcas', marcasIniciais)
  const [drawer, setDrawer] = useState({ aberto: false, tipo: null, item: null })

  const abrirDrawer = (tipo, item = null) =>
    setDrawer({ aberto: true, tipo, item })

  const fecharDrawer = () =>
    setDrawer({ aberto: false, tipo: null, item: null })

  const salvarProduto = (produto) => {
    setProdutos(prev =>
      prev.some(p => p.id === produto.id)
        ? prev.map(p => p.id === produto.id ? produto : p)
        : [...prev, produto]
    )
    fecharDrawer()
  }

  const excluirProduto = (id) => {
    setProdutos(prev => prev.filter(p => p.id !== id))
  }

  const salvarMarca = (marca) => {
    setMarcas(prev => [...prev, marca])
    fecharDrawer()
  }

  const excluirMarca = (id) => {
    const marca = marcas.find(m => m.id === id)
    setMarcas(prev => prev.filter(m => m.id !== id))
    if (marca) {
      setProdutos(prev => prev.filter(p => p.marca !== marca.nome))
    }
  }

  return (
    <div className="App">
      <Header
        onAbrirDrawerProduto={() => abrirDrawer('produto')}
        onAbrirDrawerMarca={() => abrirDrawer('marca')}
      />
      {produtos.length === 0 && (
        <EstadoVazio onAdicionar={() => abrirDrawer('produto')} />
      )}
      {marcas.map(marca => (
        <Marca
          key={marca.id}
          marca={marca}
          produtos={produtos.filter(p => p.marca === marca.nome)}
          onExcluirMarca={excluirMarca}
          onEditarProduto={(produto) => abrirDrawer('produto', produto)}
          onExcluirProduto={excluirProduto}
        />
      ))}
      <Drawer
        aberto={drawer.aberto}
        tipo={drawer.tipo}
        item={drawer.item}
        marcas={marcas}
        onFechar={fecharDrawer}
        onSalvarProduto={salvarProduto}
        onSalvarMarca={salvarMarca}
      />
    </div>
  )
}

export default App
```

- [ ] **Step 2: Remover componentes obsoletos**

```bash
rm -rf src/componentes/Banner
rm -rf src/componentes/Formulario
rm -rf src/componentes/Produto
```

- [ ] **Step 3: Verificar app completo no browser**

```bash
npm start
```
Verificar manualmente:
- Header aparece com gradiente roxo e botões
- Clicar "+ Produto" abre drawer lateral com animação
- Clicar "+ Marca" abre drawer de nova marca
- Cadastrar produto: aparece na seção da marca correta
- Editar produto: drawer abre preenchido, salvar atualiza o item
- Excluir produto: item desaparece da lista
- Cadastrar marca: nova seção aparece na página
- Excluir marca: seção e seus produtos desaparecem
- Recarregar a página: dados persistem
- Estado vazio aparece quando não há produtos
- Preview de cores no FormularioMarca atualiza em tempo real

- [ ] **Step 4: Commit**

```bash
git add src/App.js
git commit -m "feat: wire up App.js with full CRUD, localStorage and Drawer"
```

- [ ] **Step 5: Commitar remoção de componentes obsoletos**

```bash
git add -A
git commit -m "chore: remove obsolete Banner, Formulario and Produto components"
```

---

## Task 10: Adicionar .superpowers ao .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Adicionar entrada ao .gitignore**

Abrir `.gitignore` e adicionar ao final:

```
# Brainstorming session files
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm directory"
```

---

## Checklist de Cobertura da Spec

| Requisito | Task |
|---|---|
| localStorage persistência | Task 1 |
| Marcas iniciais na primeira visita | Task 9 |
| Criar produto | Task 6 + 9 |
| Editar produto | Task 6 + 9 |
| Excluir produto (sem confirmação) | Task 4 + 9 |
| Criar marca | Task 7 + 9 |
| Excluir marca + produtos dela | Task 9 |
| Estado vazio com atalho | Task 7 + 9 |
| Header gradiente com botões | Task 3 |
| Drawer lateral animado | Task 5 |
| Drawer 420px desktop / 100% mobile | Task 5 |
| ProdutoItem lista compacta | Task 4 |
| Miniatura colorida por marca | Task 4 |
| Preço em verde | Task 4 |
| Seção de marca sempre visível | Task 8 |
| Botões ✏️ e 🗑 sempre visíveis | Task 4 |
| Preview de cores no FormularioMarca | Task 7 |
| CampoTexto com focus indigo | Task 2 |
| ListaSuspensa com margem consistente | Task 2 |
| Responsividade mobile | Tasks 2–8 (media queries) |
| Remover Banner/Formulario/Produto antigos | Task 9 |
| .gitignore para .superpowers | Task 10 |
