# Design: Melhorias Visuais — CDP Catálogo

**Data:** 2026-04-17  
**Status:** Aprovado

---

## Visão Geral

Refatoração visual e de UX do app CDP Catálogo (React + localStorage). Nenhuma mudança na lógica de negócio — apenas melhorias de aparência, usabilidade e responsividade.

---

## 1. Header

### O que muda
- Substituir o "C" no ícone por um SVG de carrinho de compras (branco, inline)
- Texto: de "CDP Catálogo" para apenas "Catálogo"
- Adicionar animação CSS de alternância de cores no gradiente de fundo

### Animação de cores
- Ciclo entre tons escuros: azul-marinho (`#1e3a5f`) → violeta-noite (`#1a1a4e`) → azul-profundo (`#0f2b3d`)
- Duração: 12–15s, `ease-in-out`, loop infinito
- Técnica: `@keyframes` com `background` interpolado — sem saltos abruptos
- Apenas tons escuros, nenhuma cor clara ou chamativa

### Arquivos afetados
- `src/componentes/Header/index.js`
- `src/componentes/Header/Header.css`

---

## 2. Layout de Marcas — Grid 2 Colunas

### O que muda
- Marcas deixam de ser seções full-width empilhadas
- Passam a ser cards em grid de 2 colunas no desktop
- Cada card cresce verticalmente conforme produtos são adicionados
- Marcas ordenadas alfabeticamente por `nome` antes de renderizar

### Implementação
- `App.js`: ordenar `marcas` com `.slice().sort((a, b) => a.nome.localeCompare(b.nome))` antes do `.map()`
- `App.js`: envolver o `.map()` de marcas e o `EstadoVazio` em `<div className="marcas-grid">`
- `App.css` (ou novo arquivo): `.marcas-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 24px; }`
- `Marca.css`: card com `border-radius: 16px`, `border: 1px solid rgba(0,0,0,0.07)`, `overflow: hidden`, remover `border-bottom`

### Responsividade
- `@media (max-width: 768px)`: `.marcas-grid { grid-template-columns: 1fr; padding: 16px; }`

### Arquivos afetados
- `src/App.js`
- `src/App.css` (adicionar `.marcas-grid`)
- `src/componentes/Marca/Marca.css`

---

## 3. Estado Vazio

### O que muda
- Removido do fluxo principal (`App.js` antes do grid)
- Entra **dentro** do `.marcas-grid` quando `produtos.length === 0`
- Ocupa as 2 colunas com `grid-column: 1 / -1`

### Visual
- Card branco com borda suave (`border: 1.5px dashed #e5e7eb`)
- Ícone 📦, título "Nenhum produto cadastrado ainda", subtítulo amigável
- Botão roxo arredondado: "+ Adicionar primeiro produto"
- Sem borda tracejada visualmente pesada — apenas leve

### Responsividade
- Padding reduzido em ≤480px

### Arquivos afetados
- `src/componentes/EstadoVazio/index.js`
- `src/componentes/EstadoVazio/EstadoVazio.css`
- `src/App.js` (mover `EstadoVazio` para dentro do grid)

---

## 4. Botões da Marca — Lixeira e Lápis

### O que muda
- Remover texto "Excluir marca" — virar botão só com SVG de lixeira
- Adicionar novo botão com SVG de lápis para editar a marca
- Ambos pequenos, discretos, com hover sutil
- Centralização vertical garantida no `.marca__titulo` via `align-items: center`

### Arquivos afetados
- `src/componentes/Marca/index.js`
- `src/componentes/Marca/Marca.css`

---

## 5. Editar Marca

### O que muda
- Novo fluxo: botão lápis abre `abrirDrawer('marca', marca)` passando a marca existente
- `FormularioMarca` aceita prop `marca` (opcional) e pré-preenche nome e cores
- Texto do botão: "Salvar" quando editando, "Criar Marca" quando criando
- `salvarMarca` em `App.js` distingue criar vs. editar pelo `id`:
  - Se `id` já existe em `marcas`: substitui com `.map()`
  - Se não: adiciona com `[...prev, marca]`
- Drawer: título muda para "Editar Marca" quando `tipo === 'marca' && item !== null`

### Arquivos afetados
- `src/componentes/FormularioMarca/index.js`
- `src/componentes/Drawer/index.js`
- `src/App.js`

---

## 6. Fix de Alinhamento — Drawer Fechar

### O que muda
- Trocar o caractere `×` por SVG `<svg>` com `✕` para alinhamento perfeito
- Garantir `display: flex; align-items: center; justify-content: center` no `.drawer__fechar`

### Arquivos afetados
- `src/componentes/Drawer/index.js`
- `src/componentes/Drawer/Drawer.css`

---

## 7. Máscara de Preço

### O que muda
- Campo Preço em `FormularioProduto` formata em tempo real como `R$ 1.299,90`
- Função `formatarPreco(valor)`: recebe string digitada, retorna string formatada brasileira
- Função `limparPreco(valor)`: remove formatação para salvar como número string (`"1299.90"`)
- `ProdutoItem` exibe o preço já formatado (ou formata na hora se vier sem máscara)
- Não quebra produtos já cadastrados sem formatação

### Lógica da máscara
1. Remove tudo que não for dígito
2. Divide por 100 para obter centavos
3. Formata com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`

### Arquivos afetados
- `src/componentes/FormularioProduto/index.js`
- `src/componentes/ProdutoItem/index.js`

---

## 8. Responsividade Geral

Todos os componentes devem funcionar bem em telas ≥320px.

| Breakpoint | Comportamento |
|---|---|
| ≤768px | Grid de marcas: 1 coluna |
| ≤480px | Header: padding reduzido, botões menores |
| ≤480px | Estado vazio: padding reduzido |
| ≤480px | Drawer: largura 100% (já existe) |

---

## Componentes e Arquivos Afetados (Resumo)

| Arquivo | Tipo de mudança |
|---|---|
| `src/App.js` | Grid wrapper, ordem alfabética, mover EstadoVazio, salvarMarca edit |
| `src/App.css` | Adicionar `.marcas-grid` |
| `src/componentes/Header/index.js` | SVG carrinho, texto "Catálogo" |
| `src/componentes/Header/Header.css` | Animação de cores |
| `src/componentes/Marca/index.js` | Botões lixeira/lápis, onEditarMarca |
| `src/componentes/Marca/Marca.css` | Estilo card, centralização |
| `src/componentes/EstadoVazio/index.js` | Novo visual, texto botão |
| `src/componentes/EstadoVazio/EstadoVazio.css` | Novo estilo card |
| `src/componentes/Drawer/index.js` | Título editar marca, SVG fechar |
| `src/componentes/Drawer/Drawer.css` | Fix alinhamento fechar |
| `src/componentes/FormularioMarca/index.js` | Suporte a prop `marca` para edição |
| `src/componentes/FormularioProduto/index.js` | Máscara de preço |
| `src/componentes/ProdutoItem/index.js` | Exibir preço formatado |

---

## O que NÃO muda

- Lógica de CRUD de produtos
- Estrutura do localStorage
- Testes existentes (não serão quebrados)
- Componentes `CampoTexto`, `ListaSuspensa`, `Botao` (sem alterações)
