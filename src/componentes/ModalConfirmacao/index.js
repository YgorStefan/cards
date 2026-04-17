import React, { useEffect } from 'react'
import './ModalConfirmacao.css'

const ModalConfirmacao = ({ mensagem, onConfirmar, onCancelar }) => {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onCancelar() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancelar])

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <p className="modal-mensagem">{mensagem}</p>
        <div className="modal-acoes">
          <button className="modal-btn modal-btn--cancelar" onClick={onCancelar}>Cancelar</button>
          <button className="modal-btn modal-btn--confirmar" onClick={onConfirmar}>Excluir</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacao
