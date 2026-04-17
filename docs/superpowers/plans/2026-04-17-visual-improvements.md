# Melhorias Visuais — CDP Catálogo — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar melhorias visuais e de UX no app CDP Catálogo: header animado com carrinho, grid de marcas em cards 2 colunas, estado vazio renovado, botões de editar/excluir por ícone, edição de marca, fix de alinhamento no Drawer e máscara de preço.

**Architecture:** Mudanças isoladas em componentes existentes. Nenhuma alteração na lógica de negócio ou estrutura de dados do localStorage. As marcas passam a ser renderizadas em grid responsivo dentro de `App.js`. A edição de marca usa o mesmo Drawer/FormularioMarca já existentes, com suporte a prop `marca` opcional.

**Tech Stack:** React 17+, CSS puro (sem biblioteca de estilo), Jest + React Testing Library, localStorage.

---

## Arquivos criados ou modificados

| Arquivo | O que muda |
|---|---|
| `src/App.js` | Grid wrapper, ordem alfabética, mover EstadoVazio, atualizar salvarMarca |
| `src/App.css` | **Criar** — estilos do `.marcas-grid` |
| `src/componentes/Header/index.js` | SVG carrinho, texto "Catálogo" |
| `src/componentes/Header/Header.css` | Animação de cores |
| `src/componentes/Marca/index.js` | Botões lixeira/lápis com SVG, prop onEditarMarca |
| `src/componentes/Marca/Marca.css` | Estilo card, alinhamento |
| `src/componentes/EstadoVazio/index.js` | Novo visual, texto do botão |
| `src/componentes/EstadoVazio/EstadoVazio.css` | Estilo card dentro do grid |
| `src/componentes/Drawer/index.js` | Título "Editar Marca", SVG no fechar |
| `src/componentes/Drawer/Drawer.css` | Centralização do botão fechar |
| `src/componentes/FormularioMarca/index.js` | Suporte à prop `marca` para edição |
| `src/componentes/FormularioMarca/FormularioMarca.test.js` | **Criar** — testes do modo edição |
| `src/componentes/FormularioProduto/index.js` | Máscara de preço |
| `src/componentes/FormularioProduto/FormularioProduto.test.js` | Atualizar — ajustar teste de preço |
| `src/utils/preco.js` | **Criar** — função `formatarPreco` |
| `src/utils/preco.test.js` | **Criar** — testes de `formatarPreco` |

---

## Task 1: Header — carrinho SVG, texto e animação de cores

**Files:**
- Modify: `src/componentes/Header/index.js`
- Modify: `src/componentes/Header/Header.css`

- [ ] **Step 1.1: Atualizar Header/index.js com SVG e novo texto**

Substituir o conteúdo completo de `src/componentes/Header/index.js`:

```jsx
import './Header.css'

const Header = ({ onAbrirDrawerProduto, onAbrirDrawerMarca }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <span className="header__logo-text">Catálogo</span>
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

- [ ] **Step 1.2: Adicionar animação de cores em Header/Header.css**

Substituir o conteúdo completo de `src/componentes/Header/Header.css`:

```css
@keyframes headerCores {
  0%   { background: linear-gradient(135deg, #1e3a5f, #3b1f6b); }
  25%  { background: linear-gradient(135deg, #1a1a4e, #2d1b69); }
  50%  { background: linear-gradient(135deg, #0f2b3d, #1f1152); }
  75%  { background: linear-gradient(135deg, #1b2a4a, #2e1264); }
  100% { background: linear-gradient(135deg, #1e3a5f, #3b1f6b); }
}

.header {
  animation: headerCores 14s ease-in-out infinite;
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
  color: white;
  flex-shrink: 0;
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
  font-family: inherit;
  transition: background 0.2s;
}

.header__btn-marca:hover {
  background: rgba(255, 255, 255, 0.25);
}

.header__btn-produto {
  background: white;
  border: none;
  border-radius: 20px;
  color: #1e3a5f;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  cursor: pointer;
  font-family: inherit;
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

- [ ] **Step 1.3: Verificar visualmente no navegador**

Rodar `npm start` (se não estiver rodando) e confirmar:
- Header exibe ícone de carrinho branco
- Texto "Catálogo" visível
- Gradiente alterna suavemente entre tons escuros

- [ ] **Step 1.4: Commit**

```bash
git add src/componentes/Header/index.js src/componentes/Header/Header.css
git commit -m "feat: header com carrinho svg e animação de cores"
```

---

## Task 2: Grid de marcas em 2 colunas + ordem alfabética

**Files:**
- Create: `src/App.css`
- Modify: `src/App.js`
- Modify: `src/componentes/Marca/Marca.css`

- [ ] **Step 2.1: Criar src/App.css com o grid**

```css
.marcas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 24px;
}

@media (max-width: 768px) {
  .marcas-grid {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}
```

- [ ] **Step 2.2: Atualizar App.js — importar CSS, ordenar marcas, envolver no grid**

Adicionar `import './App.css'` logo após os outros imports.

Alterar o bloco de renderização: ordenar marcas antes do map e envolver tudo em `.marcas-grid`:

```jsx
// Substituir o trecho dentro do return que contém EstadoVazio e marcas.map por:
<div className="marcas-grid">
  {produtos.length === 0 && (
    <EstadoVazio onAdicionar={() => abrirDrawer('produto')} />
  )}
  {marcas
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    .map(marca => (
      <Marca
        key={marca.id}
        marca={marca}
        produtos={produtos.filter(p => p.marca === marca.nome)}
        onExcluirMarca={excluirMarca}
        onEditarMarca={(marca) => abrirDrawer('marca', marca)}
        onEditarProduto={(produto) => abrirDrawer('produto', produto)}
        onExcluirProduto={excluirProduto}
      />
    ))
  }
</div>
```

O arquivo `src/App.js` completo após as mudanças:

```jsx
import React, { useState } from 'react'
import './App.css'
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
    setMarcas(prev =>
      prev.some(m => m.id === marca.id)
        ? prev.map(m => m.id === marca.id ? marca : m)
        : [...prev, marca]
    )
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
      <div className="marcas-grid">
        {produtos.length === 0 && (
          <EstadoVazio onAdicionar={() => abrirDrawer('produto')} />
        )}
        {marcas
          .slice()
          .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
          .map(marca => (
            <Marca
              key={marca.id}
              marca={marca}
              produtos={produtos.filter(p => p.marca === marca.nome)}
              onExcluirMarca={excluirMarca}
              onEditarMarca={(m) => abrirDrawer('marca', m)}
              onEditarProduto={(produto) => abrirDrawer('produto', produto)}
              onExcluirProduto={excluirProduto}
            />
          ))
        }
      </div>
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

- [ ] **Step 2.3: Atualizar Marca/Marca.css — virar card**

Substituir o conteúdo completo de `src/componentes/Marca/Marca.css`:

```css
.marca {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  overflow: hidden;
}

.marca__cabecalho {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 8px;
}

.marca__titulo {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.marca__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.marca__titulo h3 {
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.marca__badge {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 12px;
  flex-shrink: 0;
}

.marca__acoes {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.marca__btn-icone {
  background: transparent;
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  color: inherit;
  padding: 0;
}

.marca__btn-editar {
  color: #6366f1;
}

.marca__btn-editar:hover {
  background: rgba(99, 102, 241, 0.1);
}

.marca__btn-excluir {
  color: #ef4444;
}

.marca__btn-excluir:hover {
  background: rgba(239, 68, 68, 0.1);
}

.marca__lista {
  background: white;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  overflow: hidden;
}

@media (max-width: 768px) {
  .marca {
    padding: 16px;
  }
}
```

- [ ] **Step 2.4: Verificar no navegador**

Confirmar:
- Marcas aparecem em 2 colunas no desktop
- Cards com bordas arredondadas, cores de fundo da marca
- Ordem alfabética: Jetmax, Kajima, Kawashima, KWS, Nakashi, Outros
- Em tela ≤768px: 1 coluna

- [ ] **Step 2.5: Commit**

```bash
git add src/App.css src/App.js src/componentes/Marca/Marca.css
git commit -m "feat: grid de marcas em 2 colunas com ordem alfabética"
```

---

## Task 3: Estado vazio renovado dentro do grid

**Files:**
- Modify: `src/componentes/EstadoVazio/index.js`
- Modify: `src/componentes/EstadoVazio/EstadoVazio.css`

- [ ] **Step 3.1: Atualizar EstadoVazio/index.js**

```jsx
import React from 'react'
import './EstadoVazio.css'

const EstadoVazio = ({ onAdicionar }) => {
  return (
    <div className="estado-vazio">
      <span className="estado-vazio__icone" role="img" aria-label="caixa">📦</span>
      <p className="estado-vazio__titulo">Nenhum produto cadastrado ainda</p>
      <p className="estado-vazio__subtitulo">Adicione produtos para começar a montar seu catálogo</p>
      <button
        className="estado-vazio__btn"
        type="button"
        onClick={onAdicionar}
      >
        + Adicionar primeiro produto
      </button>
    </div>
  )
}

export default EstadoVazio
```

- [ ] **Step 3.2: Atualizar EstadoVazio/EstadoVazio.css**

```css
.estado-vazio {
  grid-column: 1 / -1;
  background: white;
  border: 1.5px dashed #e5e7eb;
  border-radius: 16px;
  padding: 48px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.estado-vazio__icone {
  font-size: 40px;
  margin-bottom: 4px;
}

.estado-vazio__titulo {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.estado-vazio__subtitulo {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px;
}

.estado-vazio__btn {
  background: #6366f1;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 20px;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s;
}

.estado-vazio__btn:hover {
  opacity: 0.9;
}

@media (max-width: 480px) {
  .estado-vazio {
    padding: 36px 16px;
  }
}
```

- [ ] **Step 3.3: Verificar no navegador**

Remover todos os produtos do localStorage (abrir DevTools → Application → Local Storage → deletar `cdp_produtos`) e confirmar:
- Estado vazio aparece ocupando as 2 colunas do grid
- Visual amigável com ícone, título, subtítulo e botão roxo
- Botão exibe "+ Adicionar primeiro produto"

- [ ] **Step 3.4: Commit**

```bash
git add src/componentes/EstadoVazio/index.js src/componentes/EstadoVazio/EstadoVazio.css
git commit -m "feat: estado vazio renovado dentro do grid"
```

---

## Task 4: Botões lixeira e lápis na marca

**Files:**
- Modify: `src/componentes/Marca/index.js`

- [ ] **Step 4.1: Atualizar Marca/index.js com SVGs e prop onEditarMarca**

```jsx
import React from 'react'
import ProdutoItem from '../ProdutoItem'
import './Marca.css'

const IcLapis = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const IcLixeira = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)

const Marca = ({ marca, produtos, onExcluirMarca, onEditarMarca, onEditarProduto, onExcluirProduto }) => {
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
        <div className="marca__acoes">
          <button
            className="marca__btn-icone marca__btn-editar"
            type="button"
            aria-label="Editar marca"
            onClick={() => onEditarMarca(marca)}
          >
            <IcLapis />
          </button>
          <button
            className="marca__btn-icone marca__btn-excluir"
            type="button"
            aria-label="Excluir marca"
            onClick={() => onExcluirMarca(marca.id)}
          >
            <IcLixeira />
          </button>
        </div>
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

- [ ] **Step 4.2: Verificar no navegador**

Confirmar:
- Cada card de marca exibe ícone de lápis (roxo) e lixeira (vermelho) no canto superior direito
- Sem texto "Excluir marca"
- Hover nos botões mostra fundo colorido sutil
- Alinhamento vertical dos ícones correto

- [ ] **Step 4.3: Commit**

```bash
git add src/componentes/Marca/index.js
git commit -m "feat: botões lápis e lixeira nos cards de marca"
```

---

## Task 5: Editar marca — FormularioMarca + Drawer + App.js

**Files:**
- Create: `src/componentes/FormularioMarca/FormularioMarca.test.js`
- Modify: `src/componentes/FormularioMarca/index.js`
- Modify: `src/componentes/Drawer/index.js`

> `App.js` já foi atualizado na Task 2 com `salvarMarca` suportando edição e `onEditarMarca`.

- [ ] **Step 5.1: Criar FormularioMarca.test.js com testes do modo edição**

```jsx
// src/componentes/FormularioMarca/FormularioMarca.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioMarca from './index'

test('exibe botão "Criar Marca" quando sem prop marca', () => {
  render(<FormularioMarca aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /criar marca/i })).toBeInTheDocument()
})

test('exibe botão "Salvar" quando prop marca fornecida', () => {
  const marca = { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
  render(<FormularioMarca marca={marca} aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
})

test('preenche nome e cores ao receber prop marca', () => {
  const marca = { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
  render(<FormularioMarca marca={marca} aoSalvar={jest.fn()} />)
  expect(screen.getByDisplayValue('Jetmax')).toBeInTheDocument()
})

test('chama aoSalvar preservando o id ao editar', async () => {
  const aoSalvar = jest.fn()
  const marca = { id: '99', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
  render(<FormularioMarca marca={marca} aoSalvar={aoSalvar} />)
  await userEvent.click(screen.getByRole('button', { name: /salvar/i }))
  expect(aoSalvar).toHaveBeenCalledWith(expect.objectContaining({ id: '99' }))
})
```

- [ ] **Step 5.2: Rodar testes para confirmar que falham**

```bash
npm test -- --watchAll=false --testPathPattern=FormularioMarca
```

Esperado: todos os 4 testes falham (componente ainda não suporta prop `marca`).

- [ ] **Step 5.3: Atualizar FormularioMarca/index.js com suporte a edição**

```jsx
import React, { useState, useEffect } from 'react'
import './FormularioMarca.css'
import CampoTexto from '../CampoTexto'
import Botao from '../Botao'

const FormularioMarca = ({ marca, aoSalvar }) => {
  const [nome, setNome] = useState('')
  const [corPrimaria, setCorPrimaria] = useState('#D9F7E9')
  const [corSecundaria, setCorSecundaria] = useState('#57C278')

  useEffect(() => {
    if (marca) {
      setNome(marca.nome)
      setCorPrimaria(marca.corPrimaria)
      setCorSecundaria(marca.corSecundaria)
    }
  }, [marca])

  const aoSubmeter = (e) => {
    e.preventDefault()
    aoSalvar({
      id: marca ? marca.id : Date.now().toString(),
      nome,
      corPrimaria,
      corSecundaria
    })
    if (!marca) {
      setNome('')
      setCorPrimaria('#D9F7E9')
      setCorSecundaria('#57C278')
    }
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
      <Botao texto={marca ? 'Salvar' : 'Criar Marca'} />
    </form>
  )
}

export default FormularioMarca
```

- [ ] **Step 5.4: Rodar testes para confirmar que passam**

```bash
npm test -- --watchAll=false --testPathPattern=FormularioMarca
```

Esperado: 4 testes passam.

- [ ] **Step 5.5: Atualizar Drawer/index.js com título de edição e prop marca**

```jsx
import './Drawer.css'
import FormularioProduto from '../FormularioProduto'
import FormularioMarca from '../FormularioMarca'

const Drawer = ({ aberto, tipo, item, marcas, onFechar, onSalvarProduto, onSalvarMarca }) => {
  if (!aberto) return null

  const titulo = tipo === 'produto'
    ? (item ? 'Editar Produto' : 'Novo Produto')
    : (item ? 'Editar Marca' : 'Nova Marca')

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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13"/>
              <line x1="13" y1="1" x2="1" y2="13"/>
            </svg>
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
            <FormularioMarca marca={item} aoSalvar={onSalvarMarca} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Drawer
```

- [ ] **Step 5.6: Verificar no navegador**

Confirmar:
- Clicar no lápis de uma marca abre o Drawer com título "Editar Marca"
- Campos pré-preenchidos com nome e cores da marca
- Salvar atualiza a marca sem criar duplicata
- Botão fechar usa SVG sem problema de alinhamento

- [ ] **Step 5.7: Rodar todos os testes**

```bash
npm test -- --watchAll=false
```

Esperado: todos passam.

- [ ] **Step 5.8: Commit**

```bash
git add src/componentes/FormularioMarca/FormularioMarca.test.js src/componentes/FormularioMarca/index.js src/componentes/Drawer/index.js
git commit -m "feat: edição de marca com drawer e formulário pré-preenchido"
```

---

## Task 6: Fix de alinhamento — botão fechar do Drawer

**Files:**
- Modify: `src/componentes/Drawer/Drawer.css`

> O SVG já foi adicionado ao `Drawer/index.js` na Task 5. Esta task garante o CSS correto.

- [ ] **Step 6.1: Atualizar .drawer__fechar em Drawer/Drawer.css**

Localizar e substituir o bloco `.drawer__fechar`:

```css
.drawer__fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;
  flex-shrink: 0;
}

.drawer__fechar:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

- [ ] **Step 6.2: Verificar no navegador**

Abrir qualquer Drawer e confirmar que o "×" (agora SVG) está perfeitamente centralizado no botão circular.

- [ ] **Step 6.3: Commit**

```bash
git add src/componentes/Drawer/Drawer.css
git commit -m "fix: centralização do botão fechar do drawer"
```

---

## Task 7: Máscara de preço

**Files:**
- Create: `src/utils/preco.js`
- Create: `src/utils/preco.test.js`
- Modify: `src/componentes/FormularioProduto/index.js`
- Modify: `src/componentes/FormularioProduto/FormularioProduto.test.js`

- [ ] **Step 7.1: Criar src/utils/preco.test.js com casos de uso**

```js
import { formatarPreco } from './preco'

test('retorna vazio para entrada vazia', () => {
  expect(formatarPreco('')).toBe('')
})

test('formata centavos sem separador de milhar', () => {
  expect(formatarPreco('299')).toBe('2,99')
})

test('formata com separador de milhar', () => {
  expect(formatarPreco('129990')).toBe('1.299,90')
})

test('ignora caracteres não numéricos na entrada', () => {
  expect(formatarPreco('R$ 1.299,90')).toBe('1.299,90')
})

test('formata corretamente ao digitar dígito a dígito', () => {
  expect(formatarPreco('1')).toBe('0,01')
  expect(formatarPreco('10')).toBe('0,10')
  expect(formatarPreco('100')).toBe('1,00')
  expect(formatarPreco('1000')).toBe('10,00')
})
```

- [ ] **Step 7.2: Rodar para confirmar que falha**

```bash
npm test -- --watchAll=false --testPathPattern=utils/preco
```

Esperado: erro — módulo não encontrado.

- [ ] **Step 7.3: Criar src/utils/preco.js**

```js
export const formatarPreco = (valor) => {
  const soDigitos = valor.replace(/\D/g, '')
  if (!soDigitos) return ''
  const numero = parseInt(soDigitos, 10) / 100
  const [inteiro, decimal] = numero.toFixed(2).split('.')
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${inteiroFormatado},${decimal}`
}
```

- [ ] **Step 7.4: Rodar testes para confirmar que passam**

```bash
npm test -- --watchAll=false --testPathPattern=utils/preco
```

Esperado: 7 testes passam.

- [ ] **Step 7.5: Atualizar FormularioProduto/index.js com máscara**

Adicionar o import no topo:

```js
import { formatarPreco } from '../../utils/preco'
```

Substituir o handler do preço — trocar `setPreco` diretamente por:

```js
const aoAlterarPreco = (valor) => {
  setPreco(formatarPreco(valor))
}
```

No JSX, trocar `aoAlterado={setPreco}` por `aoAlterado={aoAlterarPreco}` no campo Preço:

```jsx
<CampoTexto
  label="Preço"
  placeholder="0,00"
  valor={preco}
  aoAlterado={aoAlterarPreco}
/>
```

O arquivo completo após as mudanças:

```jsx
import React, { useState, useEffect } from 'react'
import './FormularioProduto.css'
import { formatarPreco } from '../../utils/preco'
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

  const aoAlterarPreco = (valor) => {
    setPreco(formatarPreco(valor))
  }

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
          placeholder="0,00"
          valor={preco}
          aoAlterado={aoAlterarPreco}
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

- [ ] **Step 7.6: Atualizar FormularioProduto.test.js — ajustar teste de preço**

O teste `'preenche campos com dados do produto ao editar'` usa `preco: '299'` e espera `getByDisplayValue('299')`. Com a máscara aplicada **somente no onChange** (não no load), esse teste continua passando. Porém, adicionar um teste do comportamento da máscara:

Adicionar ao final de `src/componentes/FormularioProduto/FormularioProduto.test.js`:

```js
test('aplica máscara ao digitar preço', async () => {
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={jest.fn()} />)
  const campoPreco = screen.getByLabelText(/preço/i)
  await userEvent.type(campoPreco, '1000')
  expect(campoPreco).toHaveValue('10,00')
})
```

- [ ] **Step 7.7: Rodar todos os testes**

```bash
npm test -- --watchAll=false
```

Esperado: todos passam.

- [ ] **Step 7.8: Verificar no navegador**

Abrir Drawer de produto e digitar no campo Preço:
- `1` → `0,01`
- `100` → `1,00`
- `129990` → `1.299,90`

- [ ] **Step 7.9: Commit**

```bash
git add src/utils/preco.js src/utils/preco.test.js src/componentes/FormularioProduto/index.js src/componentes/FormularioProduto/FormularioProduto.test.js
git commit -m "feat: máscara de preço no formulário de produto"
```

---

## Self-Review

**Cobertura do spec:**
- [x] Header: carrinho SVG + "Catálogo" + animação (Task 1)
- [x] Grid 2 colunas + ordem alfabética (Task 2)
- [x] Estado vazio dentro do grid, visual renovado, botão "+ Adicionar primeiro produto" (Task 3)
- [x] Botões lixeira/lápis por ícone (Task 4)
- [x] Editar marca: FormularioMarca edit mode, Drawer título, App.js salvarMarca (Tasks 2+5)
- [x] Fix alinhamento Drawer fechar — SVG (Task 5) + CSS (Task 6)
- [x] Máscara de preço (Task 7)
- [x] Responsividade: grid 1 col em ≤768px, header e estado vazio em ≤480px

**Nenhum placeholder ou TBD detectado.**

**Consistência de tipos:**
- `onEditarMarca` definido em App.js (Task 2) e consumido em Marca/index.js (Task 4) — ok
- `salvarMarca` atualizado em App.js (Task 2) — aceita criar e editar — ok
- `FormularioMarca` recebe `marca` opcional (Task 5) — preserva `id` ao salvar — ok
- `formatarPreco` exportada de `src/utils/preco.js` e importada em FormularioProduto — ok
