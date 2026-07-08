import React from 'react'
import './EstadoVazio.css'

const EstadoVazio = ({
  titulo = 'Nenhum produto cadastrado ainda',
  subtitulo = 'Adicione produtos para começar a montar seu catálogo',
  onAdicionar
}) => {
  return (
    <div className="estado-vazio">
      <span className="estado-vazio__icone" role="img" aria-label="caixa">📦</span>
      <p className="estado-vazio__titulo">{titulo}</p>
      <p className="estado-vazio__subtitulo">{subtitulo}</p>
      {onAdicionar && (
        <button
          className="estado-vazio__btn"
          type="button"
          onClick={onAdicionar}
        >
          + Adicionar primeiro produto
        </button>
      )}
    </div>
  )
}

export default EstadoVazio
