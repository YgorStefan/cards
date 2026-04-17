import React from 'react'
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