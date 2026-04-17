import React from 'react'
import './Botao.css'

const Botao = ({ texto, type = 'submit', onClick }) => {
  return (
    <button className="botao" type={type} onClick={onClick}>
      {texto}
    </button>
  )
}

export default Botao
