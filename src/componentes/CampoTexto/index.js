import React from 'react'
import './CampoTexto.css'

const CampoTexto = (props) => {
  const id = `campo-${props.label?.toLowerCase().replace(/\s+/g, '-')}`
  const aoDigitado = (evento) => {
    props.aoAlterado(evento.target.value)
  }

  return (
    <div className="campo-texto">
      <label htmlFor={id}>{props.label}</label>
      <input
        id={id}
        type={props.type || 'text'}
        value={props.valor}
        onChange={aoDigitado}
        required={props.required}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default CampoTexto
