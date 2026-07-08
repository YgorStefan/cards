import React from 'react'
import './ModalConfirmacao.css'
import useFocusTrap from '../../hooks/useFocusTrap'

const ModalConfirmacao = ({ mensagem, onConfirmar, onCancelar }) => {
  const containerRef = useFocusTrap(true, onCancelar)

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div
        className="modal-card"
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-mensagem"
      >
        <p className="modal-mensagem" id="modal-mensagem">{mensagem}</p>
        <div className="modal-acoes">
          <button className="modal-btn modal-btn--cancelar" type="button" onClick={onCancelar}>Cancelar</button>
          <button className="modal-btn modal-btn--confirmar" type="button" onClick={onConfirmar}>Excluir</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacao
