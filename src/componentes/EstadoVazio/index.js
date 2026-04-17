import React from 'react'
import './EstadoVazio.css'

const EstadoVazio = ({ onAdicionar }) => {
  return (
    <div className="estado-vazio">
      <span className="estado-vazio__icone" role="img" aria-label="caixa">📦</span>
      <p className="estado-vazio__texto">Nenhum produto cadastrado ainda.</p>
      <button
        className="estado-vazio__link"
        type="button"
        onClick={onAdicionar}
      >
        Adicionar primeiro produto →
      </button>
    </div>
  )
}

export default EstadoVazio
