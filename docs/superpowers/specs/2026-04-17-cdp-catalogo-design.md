# CDP Catálogo — Design Spec

**Data:** 2026-04-17  
**Status:** Aprovado

---

## Visão Geral

Aplicação React de catálogo de produtos agrupados por marca. O objetivo é completar o projeto existente com CRUD completo de produtos e marcas, persistência via localStorage, redesign visual moderno e responsividade mobile.

---

## Features

### Persistência
- Produtos e marcas persistem via `localStorage` usando o hook `useLocalStorage`
- Marcas iniciais (Jetmax, Kajima, KWS, Kawashima, Nakashi, Outros) carregadas como padrão na primeira visita

### Produtos — CRUD completo
- **Criar:** formulário no drawer lateral com campos: nome, código, imagem (URL), marca, preço, descrição
- **Ler:** listados por seção de marca em formato lista compacta
- **Editar:** botão ✏️ no item abre o drawer preenchido com os dados do produto
- **Excluir:** botão 🗑 no item remove o produto imediatamente, sem diálogo de confirmação

### Marcas — CRUD completo
- **Criar:** formulário no drawer com campos: nome, cor primária, cor secundária
- **Excluir:** botão "Excluir marca" na seção — remove a marca e todos os seus produtos
- As marcas iniciais podem ser excluídas normalmente

### Estado vazio
- Quando nenhum produto foi cadastrado ainda, exibe mensagem amigável com atalho para adicionar o primeiro produto

---

## Arquitetura de Componentes

### Modificados

| Componente | Mudança |
|---|---|
| `App.js` | Estado central (`produtos`, `marcas`, `drawer`), callbacks CRUD, `useLocalStorage` |
| `Banner` → `Header` | Substituído por header HTML/CSS com gradiente roxo, logo e botões de ação |
| `Marca` | Recebe callback `onExcluirMarca`, renderiza `ProdutoItem` para cada produto |
| `Botao` | Redesign visual alinhado ao novo tema |
| `CampoTexto` | Suporte a prop `type`, border-radius, focus state com outline colorido |
| `ListaSuspensa` | `margin: 24px 0` para alinhar com `CampoTexto` |

### Novos

| Componente | Responsabilidade |
|---|---|
| `Drawer` | Painel lateral animado (slide da direita). Renderiza `FormularioProduto` ou `FormularioMarca` conforme `tipo` |
| `FormularioProduto` | Formulário de criação e edição de produto. Recebe `produto` (null = novo) e callback `aoSalvar` |
| `FormularioMarca` | Formulário de criação de marca com inputs de nome e cores |
| `ProdutoItem` | Linha da lista compacta: miniatura colorida, nome, código, descrição, preço, botões ✏️ e 🗑 |
| `EstadoVazio` | Renderizado quando `produtos.length === 0`. Ícone 📦 + texto + link para adicionar |
| `hooks/useLocalStorage` | `const [valor, setValor] = useLocalStorage(chave, valorInicial)` — sincroniza estado com localStorage |

---

## Fluxo de Dados

```
App.js
├── estado: produtos[], marcas[], drawer { aberto, tipo, item }
├── useLocalStorage('cdp_produtos', [])
├── useLocalStorage('cdp_marcas', marcasIniciais)
│
├── Header
│   ├── onAbrirDrawer('marca')
│   └── onAbrirDrawer('produto')
│
├── Drawer (quando aberto)
│   ├── tipo='produto' → FormularioProduto
│   │   ├── item=null → criar novo produto
│   │   └── item=produto → editar produto existente
│   └── tipo='marca' → FormularioMarca
│
├── EstadoVazio (quando produtos.length === 0)
│
└── marcas.map(marca =>
      Marca
      ├── ProdutoItem × n
      │   ├── onEditar(produto) → abre drawer com item preenchido
      │   └── onExcluir(id)
      └── onExcluirMarca(id)
    )
```

### Estrutura dos dados

**Produto:**
```js
{
  id: string,        // Date.now().toString()
  nome: string,
  codigo: string,
  imagem: string,    // URL opcional
  marca: string,     // nome da marca
  preco: string,     // valor livre (ex: "299,90")
  descricao: string  // opcional
}
```

**Marca:**
```js
{
  id: string,
  nome: string,
  corPrimaria: string,   // hex — fundo da seção
  corSecundaria: string  // hex — destaque (dot, badge, miniatura do produto)
}
```

---

## Design Visual

### Paleta
- **Primária:** `#6366f1` (indigo) → `#8b5cf6` (violet) — gradiente do header
- **Sucesso/preço:** `#059669`
- **Perigo/excluir:** `#ef4444` com fundo `#fef2f2`
- **Neutros:** `#111827`, `#374151`, `#6b7280`, `#9ca3af`, `#e5e7eb`, `#f3f4f6`

### Header
- Gradiente `135deg, #6366f1, #8b5cf6`
- Logo à esquerda (ícone + "CDP Catálogo")
- Botões "＋ Marca" (outline branco) e "＋ Produto" (branco sólido, texto indigo) à direita

### Seção de Marca
- Fundo com `corPrimaria` da marca
- Título com dot colorido (`corSecundaria`), badge de contagem e botão "Excluir marca"
- Seção sempre visível (mesmo sem produtos), para permitir exclusão da marca vazia
- Lista de produtos em card branco com `border-radius: 10px` — omitida quando não há produtos

### ProdutoItem
- Miniatura `32×32px` com `border-radius: 8px` e gradiente da `corSecundaria` da marca
- Imagem do produto como `object-fit: cover` se existir URL, senão gradiente sólido
- Preço em verde `#059669`
- Botões de ação aparecem sempre visíveis (não só no hover) para garantir acessibilidade mobile

### Drawer
- Largura: `420px` em desktop, `100%` em mobile (≤ 480px)
- Header com mesmo gradiente do app
- Fundo branco, campos com `background: #f9fafb`, `border: 1px solid #e5e7eb`, `border-radius: 8px`
- Overlay escuro (`rgba(0,0,0,0.4)`) cobre o resto da página; clicar fora fecha o drawer
- Botão submit com gradiente indigo

---

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| ≥ 768px | Layout padrão, drawer 420px, botões do header visíveis |
| < 768px | Drawer ocupa 88% da largura, seções de marca empilham |
| < 480px | Drawer 100% da largura, header simplificado |

---

## Bugs Corrigidos

| Bug | Correção |
|---|---|
| Banner referencia `/imagens/ccm.png` inexistente | Substituído por header HTML/CSS |
| `ListaSuspensa` sem margem | `margin: 24px 0` adicionado |
| `Botao` sem `type="submit"` | Prop `type` com default `"submit"` |
| Produto `.rodape h5` sem alinhamento | `text-align: center` |
| `Formulario` não limpa estado após submit | Corrigido em `FormularioProduto` |

---

## Fora de Escopo

- Backend ou sincronização remota
- Autenticação
- Busca/filtro de produtos
- Ordenação de produtos
- Upload de imagem (apenas URL)
