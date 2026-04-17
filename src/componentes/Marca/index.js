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
