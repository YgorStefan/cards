import React from 'react'
import './Drawer.css'
import useFocusTrap from '../../hooks/useFocusTrap'
import FormularioProduto from '../FormularioProduto'
import FormularioMarca from '../FormularioMarca'

const Drawer = ({ aberto, tipo, item, marcas, onFechar, onSalvarProduto, onSalvarMarca }) => {
  const containerRef = useFocusTrap(aberto, onFechar)

  if (!aberto) return null

  const titulo = tipo === 'produto'
    ? (item ? 'Editar Produto' : 'Novo Produto')
    : (item ? 'Editar Marca' : 'Nova Marca')

  return (
    <div className="drawer-overlay" onClick={onFechar}>
      <div
        className="drawer"
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-titulo"
      >
        <div className="drawer__header">
          <h2 className="drawer__titulo" id="drawer-titulo">{titulo}</h2>
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
            <FormularioMarca marca={item} marcas={marcas} aoSalvar={onSalvarMarca} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Drawer
