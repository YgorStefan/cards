import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Marca from './index'

const marca = { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
const produtos = [
  { id: '1', nome: 'Produto A', codigo: '#A', imagem: '', marcaId: '1', preco: '10,00', descricao: '' },
  { id: '2', nome: 'Produto B', codigo: '#B', imagem: '', marcaId: '1', preco: '20,00', descricao: '' }
]

test('exibe o nome da marca e a contagem de produtos', () => {
  render(
    <Marca
      marca={marca}
      produtos={produtos}
      onExcluirMarca={jest.fn()}
      onEditarMarca={jest.fn()}
      onEditarProduto={jest.fn()}
      onExcluirProduto={jest.fn()}
    />
  )
  expect(screen.getByText('Jetmax')).toBeInTheDocument()
  expect(screen.getByText('2 produtos')).toBeInTheDocument()
})

test('não exibe a lista de produtos quando marca não tem produtos', () => {
  render(
    <Marca
      marca={marca}
      produtos={[]}
      onExcluirMarca={jest.fn()}
      onEditarMarca={jest.fn()}
      onEditarProduto={jest.fn()}
      onExcluirProduto={jest.fn()}
    />
  )
  expect(screen.getByText('0 produtos')).toBeInTheDocument()
  expect(screen.queryByText('Produto A')).not.toBeInTheDocument()
})

test('chama onEditarMarca com a marca ao clicar em editar', async () => {
  const onEditarMarca = jest.fn()
  render(
    <Marca
      marca={marca}
      produtos={produtos}
      onExcluirMarca={jest.fn()}
      onEditarMarca={onEditarMarca}
      onEditarProduto={jest.fn()}
      onExcluirProduto={jest.fn()}
    />
  )
  await userEvent.click(screen.getByRole('button', { name: /editar marca/i }))
  expect(onEditarMarca).toHaveBeenCalledWith(marca)
})

test('chama onExcluirMarca com o id ao clicar em excluir', async () => {
  const onExcluirMarca = jest.fn()
  render(
    <Marca
      marca={marca}
      produtos={produtos}
      onExcluirMarca={onExcluirMarca}
      onEditarMarca={jest.fn()}
      onEditarProduto={jest.fn()}
      onExcluirProduto={jest.fn()}
    />
  )
  await userEvent.click(screen.getByRole('button', { name: /excluir marca/i }))
  expect(onExcluirMarca).toHaveBeenCalledWith('1')
})
