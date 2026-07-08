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
  const [marcaId, setMarcaId] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (produto) {
      setNome(produto.nome)
      setCodigo(produto.codigo)
      setImagem(produto.imagem)
      setMarcaId(produto.marcaId || '')
      setPreco(produto.preco)
      setDescricao(produto.descricao)
    }
  }, [produto])

  const aoAlterarNome = (valor) => {
    setNome(valor)
    if (erro) setErro('')
  }

  const aoAlterarCodigo = (valor) => {
    setCodigo(valor)
    if (erro) setErro('')
  }

  const nomeMarcaSelecionada = marcas.find(m => m.id === marcaId)?.nome || ''

  const aoAlterarMarca = (nomeSelecionado) => {
    setMarcaId(marcas.find(m => m.nome === nomeSelecionado)?.id || '')
  }

  const aoAlterarPreco = (valor) => {
    setPreco(formatarPreco(valor))
  }

  const aoSubmeter = (e) => {
    e.preventDefault()
    const nomeTratado = nome.trim()
    const codigoTratado = codigo.trim()
    if (!nomeTratado || !codigoTratado) {
      setErro('Preencha nome e código com um valor válido.')
      return
    }
    aoSalvar({
      id: produto?.id || Date.now().toString(),
      nome: nomeTratado,
      codigo: codigoTratado,
      imagem,
      marcaId,
      preco,
      descricao
    })
    if (!produto) {
      setNome('')
      setCodigo('')
      setImagem('')
      setMarcaId('')
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
        aoAlterado={aoAlterarNome}
      />
      <CampoTexto
        label="Código"
        placeholder="#JX-001"
        required
        valor={codigo}
        aoAlterado={aoAlterarCodigo}
      />
      {erro && <p className="formulario-produto__erro" role="alert">{erro}</p>}
      <div className="formulario-produto__linha">
        <CampoTexto
          label="Preço"
          placeholder="299,90"
          required
          valor={preco}
          aoAlterado={aoAlterarPreco}
        />
        <ListaSuspensa
          label="Marca"
          required
          itens={marcas.map(m => m.nome)}
          valor={nomeMarcaSelecionada}
          aoAlterado={aoAlterarMarca}
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
