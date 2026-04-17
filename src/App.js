import React, { useState } from 'react'
import './App.css'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './componentes/Header'
import Marca from './componentes/Marca'
import Drawer from './componentes/Drawer'
import EstadoVazio from './componentes/EstadoVazio'

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

  const excluirProduto = (id) => {
    setProdutos(prev => prev.filter(p => p.id !== id))
  }

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
    setMarcas(prev => prev.filter(m => m.id !== id))
    if (marca) {
      setProdutos(prev => prev.filter(p => p.marca !== marca.nome))
    }
  }

  return (
    <div className="App">
      <Header
        onAbrirDrawerProduto={() => abrirDrawer('produto')}
        onAbrirDrawerMarca={() => abrirDrawer('marca')}
      />
      <div className="marcas-grid">
        {produtos.length === 0 && (
          <EstadoVazio onAdicionar={() => abrirDrawer('produto')} />
        )}
        {marcas
          .slice()
          .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
          .map(marca => (
            <Marca
              key={marca.id}
              marca={marca}
              produtos={produtos.filter(p => p.marca === marca.nome)}
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
    </div>
  )
}

export default App
