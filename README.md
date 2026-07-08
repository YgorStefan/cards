# CDP — Catálogo de Produtos

Aplicação React para gerenciamento de produtos organizados por marcas, com persistência local no navegador.

## Funcionalidades

- Cadastro, edição e exclusão de produtos
- Cadastro, edição e exclusão de marcas com cores personalizadas
- Produtos agrupados por marca com contagem dinâmica, ordenados alfabeticamente
- Busca de produtos por nome, com estado dedicado para "nenhum resultado encontrado"
- Persistência via `localStorage` (dados mantidos ao recarregar a página)
- Estado vazio com chamada para ação quando não há produtos cadastrados
- Drawer lateral para formulários de produto e marca, com suporte a teclado (foco automático, `Tab` contido no painel e fechamento via `Esc`)
- Validações de dados: nomes de marca duplicados são bloqueados e vínculo produto↔marca é feito por id (renomear uma marca não desassocia seus produtos)

## Tecnologias

- [React 19](https://react.dev/)
- [Create React App](https://create-react-app.dev/)
- [Testing Library](https://testing-library.com/) + Jest

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor de desenvolvimento em `localhost:3000` |
| `npm test` | Executa os testes com Jest |
| `npm run build` | Gera o build de produção na pasta `build/` |

## Estrutura do projeto

```
src/
├── App.js                    # Componente raiz — estado global e lógica CRUD
├── hooks/
│   ├── useLocalStorage.js    # Hook para persistência no localStorage
│   └── useFocusTrap.js       # Hook de acessibilidade para Drawer e ModalConfirmacao
└── componentes/
    ├── Header/               # Cabeçalho com busca e botões de ação
    ├── Marca/                # Seção de marca com lista de produtos
    ├── ProdutoItem/          # Card individual de produto
    ├── Drawer/               # Painel lateral para formulários (com focus trap)
    ├── FormularioProduto/    # Formulário de criação/edição de produto
    ├── FormularioMarca/      # Formulário de criação/edição de marca com preview de cores
    ├── EstadoVazio/          # Tela exibida quando não há produtos ou nenhum resultado de busca
    ├── ModalConfirmacao/     # Modal de confirmação para ações destrutivas
    ├── Botao/                # Componente de botão reutilizável
    ├── CampoTexto/           # Input de texto reutilizável
    └── ListaSuspensa/        # Select reutilizável
```

## Marcas padrão

O sistema inicia com 6 marcas pré-cadastradas: Jetmax, Kajima, KWS, Kawashima, Nakashi e Outros. Novas marcas podem ser adicionadas com cores primária e secundária personalizadas.
