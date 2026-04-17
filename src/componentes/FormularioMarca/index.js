import React, { useState } from 'react'
import './FormularioMarca.css'
import CampoTexto from '../CampoTexto'
import Botao from '../Botao'

const FormularioMarca = ({ aoSalvar }) => {
  const [nome, setNome] = useState('')
  const [corPrimaria, setCorPrimaria] = useState('#D9F7E9')
  const [corSecundaria, setCorSecundaria] = useState('#57C278')

  const aoSubmeter = (e) => {
    e.preventDefault()
    aoSalvar({
      id: Date.now().toString(),
      nome,
      corPrimaria,
      corSecundaria
    })
    setNome('')
    setCorPrimaria('#D9F7E9')
    setCorSecundaria('#57C278')
  }

  return (
    <form className="formulario-marca" onSubmit={aoSubmeter}>
      <CampoTexto
        label="Nome da marca"
        placeholder="Ex: Jetmax"
        required
        valor={nome}
        aoAlterado={setNome}
      />
      <div className="formulario-marca__cores">
        <div className="formulario-marca__cor">
          <label htmlFor="cor-primaria">Cor de fundo</label>
          <input
            id="cor-primaria"
            type="color"
            value={corPrimaria}
            onChange={e => setCorPrimaria(e.target.value)}
          />
          <span>{corPrimaria}</span>
        </div>
        <div className="formulario-marca__cor">
          <label htmlFor="cor-secundaria">Cor de destaque</label>
          <input
            id="cor-secundaria"
            type="color"
            value={corSecundaria}
            onChange={e => setCorSecundaria(e.target.value)}
          />
          <span>{corSecundaria}</span>
        </div>
      </div>
      <div
        className="formulario-marca__preview"
        style={{ background: corPrimaria }}
      >
        <div
          className="formulario-marca__preview-dot"
          style={{ background: corSecundaria }}
        />
        <span style={{ color: corSecundaria }}>
          {nome || 'Preview da Marca'}
        </span>
      </div>
      <Botao texto="Criar Marca" />
    </form>
  )
}

export default FormularioMarca
