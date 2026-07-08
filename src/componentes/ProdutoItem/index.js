import React, { useState } from 'react'
import './ProdutoItem.css'

const ProdutoItem = ({ produto, corSecundaria, onEditar, onExcluir }) => {
  const [imagemComErro, setImagemComErro] = useState(false)

  return (
    <div className="produto-item">
      <div
        className="produto-item__miniatura"
        style={{ background: `linear-gradient(135deg, ${corSecundaria}88, ${corSecundaria})` }}
      >
        {produto.imagem && !imagemComErro && (
          <img src={produto.imagem} alt={produto.nome} onError={() => setImagemComErro(true)} />
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
