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
