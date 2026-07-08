import React, { useState, useEffect } from 'react'
import './App.css'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './componentes/Header'
import Marca from './componentes/Marca'
import Drawer from './componentes/Drawer'
import EstadoVazio from './componentes/EstadoVazio'
import ModalConfirmacao from './componentes/ModalConfirmacao'

const marcasIniciais = [
  { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' },
  { id: '2', nome: 'Kajima', corPrimaria: '#E8F8FF', corSecundaria: '#82CFFA' },
  { id: '3', nome: 'KWS', corPrimaria: '#F0F8E2', corSecundaria: '#A6D157' },
  { id: '4', nome: 'Kawashima', corPrimaria: '#FDE7E8', corSecundaria: '#E06B69' },
  { id: '5', nome: 'Nakashi', corPrimaria: '#FFF5D9', corSecundaria: '#FFBA05' },
  { id: '6', nome: 'Outros', corPrimaria: '#FFEEDF', corSecundaria: '#FF8A29' },
]

function App() {
  const [produtos, setProdutos] = useLocalStorage('cdp_produtos', [])
  const [marcas, setMarcas] = useLocalStorage('cdp_marcas', marcasIniciais)
  const [drawer, setDrawer] = useState({ aberto: false, tipo: null, item: null })
  const [modal, setModal] = useState({ aberto: false, mensagem: '', onConfirmar: null })
  const [busca, setBusca] = useState('')

  useEffect(() => {
    const precisaMigrar = produtos.some(p => !p.marcaId)
    if (!precisaMigrar) return
    setProdutos(prev =>
      prev.map(p => {
        if (p.marcaId) return p
        const marcaCorrespondente = marcas.find(m => m.nome === p.marca)
        return marcaCorrespondente ? { ...p, marcaId: marcaCorrespondente.id } : p
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const abrirDrawer = (tipo, item = null) =>
    setDrawer({ aberto: true, tipo, item })

  const fecharDrawer = () =>
    setDrawer({ aberto: false, tipo: null, item: null })

  const salvarProduto = (produto) => {
    setProdutos(prev =>
      prev.some(p => p.id === produto.id)
        ? prev.map(p => p.id === produto.id ? produto : p)
        : [...prev, produto]
    )
    fecharDrawer()
  }

  const fecharModal = () =>
    setModal({ aberto: false, mensagem: '', onConfirmar: null })

  const confirmarExclusao = (mensagem, acao) =>
    setModal({ aberto: true, mensagem, onConfirmar: () => { acao(); fecharModal() } })

  const excluirProduto = (id) =>
    confirmarExclusao('Tem certeza que deseja excluir este produto?', () =>
      setProdutos(prev => prev.filter(p => p.id !== id))
    )

  const salvarMarca = (marca) => {
    setMarcas(prev =>
      prev.some(m => m.id === marca.id)
        ? prev.map(m => m.id === marca.id ? marca : m)
        : [...prev, marca]
    )
    fecharDrawer()
  }

  const excluirMarca = (id) => {
    const marca = marcas.find(m => m.id === id)
    if (!marca) return
    const temProdutos = produtos.some(p => p.marcaId === id)
    const mensagem = temProdutos
      ? `Excluir a marca "${marca.nome}" também removerá todos os produtos vinculados. Deseja continuar?`
      : `Tem certeza que deseja excluir a marca "${marca.nome}"?`
    confirmarExclusao(mensagem, () => {
      setMarcas(prev => prev.filter(m => m.id !== id))
      setProdutos(prev => prev.filter(p => p.marcaId !== id))
    })
  }

  const buscaTratada = busca.trim().toLowerCase()
  const produtosFiltrados = buscaTratada
    ? produtos.filter(p => p.nome.toLowerCase().includes(buscaTratada))
    : produtos

  return (
    <div className="App">
      <Header
        busca={busca}
        onBuscaChange={setBusca}
        onAbrirDrawerProduto={() => abrirDrawer('produto')}
        onAbrirDrawerMarca={() => abrirDrawer('marca')}
      />
      <div className="marcas-grid">
        {produtos.length === 0 && (
          <EstadoVazio onAdicionar={() => abrirDrawer('produto')} />
        )}
        {produtos.length > 0 && buscaTratada && produtosFiltrados.length === 0 && (
          <EstadoVazio
            titulo="Nenhum produto encontrado"
            subtitulo={`Não encontramos produtos para "${busca.trim()}"`}
          />
        )}
        {marcas
          .slice()
          .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
          .map(marca => (
            <Marca
              key={marca.id}
              marca={marca}
              produtos={produtosFiltrados
                .filter(p => p.marcaId === marca.id)
                .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))}
              onExcluirMarca={excluirMarca}
              onEditarMarca={(m) => abrirDrawer('marca', m)}
              onEditarProduto={(produto) => abrirDrawer('produto', produto)}
              onExcluirProduto={excluirProduto}
            />
          ))
        }
      </div>
      <Drawer
        aberto={drawer.aberto}
        tipo={drawer.tipo}
        item={drawer.item}
        marcas={marcas}
        onFechar={fecharDrawer}
        onSalvarProduto={salvarProduto}
        onSalvarMarca={salvarMarca}
      />
      {modal.aberto && (
        <ModalConfirmacao
          mensagem={modal.mensagem}
          onConfirmar={modal.onConfirmar}
          onCancelar={fecharModal}
        />
      )}
    </div>
  )
}

export default App
