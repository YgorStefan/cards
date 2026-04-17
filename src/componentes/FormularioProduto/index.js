import React, { useState, useEffect } from 'react'
import './FormularioProduto.css'
import { formatarPreco } from '../../utils/preco'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import Botao from '../Botao'

const FormularioProduto = ({ produto, marcas, aoSalvar }) => {
  const [nome, setNome] = useState('')
  const [codigo, setCodigo] = useState('')
  const [imagem, setImagem] = useState('')
  const [marca, setMarca] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (produto) {
      setNome(produto.nome)
      setCodigo(produto.codigo)
      setImagem(produto.imagem)
      setMarca(produto.marca)
      setPreco(produto.preco)
      setDescricao(produto.descricao)
    }
  }, [produto])

  const aoAlterarPreco = (valor) => {
    setPreco(formatarPreco(valor))
  }

  const aoSubmeter = (e) => {
    e.preventDefault()
    aoSalvar({
      id: produto?.id || Date.now().toString(),
      nome,
      codigo,
      imagem,
      marca,
      preco,
      descricao
    })
    if (!produto) {
      setNome('')
      setCodigo('')
      setImagem('')
      setMarca('')
      setPreco('')
      setDescricao('')
    }
  }

  return (
    <form className="formulario-produto" onSubmit={aoSubmeter}>
      <CampoTexto
        label="Nome"
        placeholder="Nome do produto"
        required
        valor={nome}
        aoAlterado={setNome}
      />
      <CampoTexto
        label="Código"
        placeholder="#JX-001"
        required
        valor={codigo}
        aoAlterado={setCodigo}
      />
      <div className="formulario-produto__linha">
        <CampoTexto
          label="Preço"
          placeholder="299,90"
          valor={preco}
          aoAlterado={aoAlterarPreco}
        />
        <ListaSuspensa
          label="Marca"
          required
          itens={marcas.map(m => m.nome)}
          valor={marca}
          aoAlterado={setMarca}
        />
      </div>
      <CampoTexto
        label="Imagem (URL)"
        placeholder="https://..."
        valor={imagem}
        aoAlterado={setImagem}
      />
      <CampoTexto
        label="Descrição"
        placeholder="Descrição breve do produto"
        valor={descricao}
        aoAlterado={setDescricao}
      />
      <Botao texto={produto ? 'Salvar Alterações' : 'Cadastrar Produto'} />
    </form>
  )
}

export default FormularioProduto
