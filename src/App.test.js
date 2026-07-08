import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => localStorage.clear())

const cadastrarProduto = async ({ nome, codigo, preco, marca }) => {
  await userEvent.click(screen.getByRole('button', { name: /\+ produto/i }))
  await userEvent.type(screen.getByLabelText(/^nome$/i), nome)
  await userEvent.type(screen.getByLabelText(/código/i), codigo)
  await userEvent.type(screen.getByLabelText(/preço/i), preco)
  await userEvent.selectOptions(screen.getByLabelText('Marca'), marca)
  await userEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }))
}

const cardDaMarca = (nome) => screen.getByRole('heading', { name: nome }).closest('.marca')

test('exibe as marcas padrão e o estado vazio quando não há produtos', () => {
  render(<App />)
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
  expect(screen.getByText('Nenhum produto cadastrado ainda')).toBeInTheDocument()
})

test('cadastra um produto e exibe dentro da marca correta', async () => {
  render(<App />)
  await cadastrarProduto({ nome: 'Tênis Alpha', codigo: '#JX-001', preco: '19990', marca: 'Jetmax' })

  expect(screen.queryByText('Nenhum produto cadastrado ainda')).not.toBeInTheDocument()
  expect(within(cardDaMarca('Jetmax')).getByText('Tênis Alpha')).toBeInTheDocument()
})

test('renomear uma marca mantém os produtos vinculados a ela', async () => {
  render(<App />)
  await cadastrarProduto({ nome: 'Tênis Alpha', codigo: '#JX-001', preco: '19990', marca: 'Jetmax' })

  await userEvent.click(within(cardDaMarca('Jetmax')).getByRole('button', { name: /editar marca/i }))
  const campoNome = screen.getByLabelText(/nome da marca/i)
  await userEvent.clear(campoNome)
  await userEvent.type(campoNome, 'Jet Max Renovada')
  await userEvent.click(screen.getByRole('button', { name: /salvar/i }))

  expect(screen.queryByRole('heading', { name: 'Jetmax' })).not.toBeInTheDocument()
  expect(within(cardDaMarca('Jet Max Renovada')).getByText('Tênis Alpha')).toBeInTheDocument()
})

test('bloqueia criação de marca com nome já existente', async () => {
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: /\+ marca/i }))
  await userEvent.type(screen.getByLabelText(/nome da marca/i), 'jetmax')
  await userEvent.click(screen.getByRole('button', { name: /criar marca/i }))

  expect(screen.getByRole('alert')).toHaveTextContent(/já existe/i)
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
})

test('exclui um produto após confirmação no modal', async () => {
  render(<App />)
  await cadastrarProduto({ nome: 'Tênis Alpha', codigo: '#JX-001', preco: '19990', marca: 'Jetmax' })

  await userEvent.click(within(cardDaMarca('Jetmax')).getByRole('button', { name: /excluir produto/i }))
  await userEvent.click(screen.getByRole('button', { name: /^excluir$/i }))

  expect(screen.queryByText('Tênis Alpha')).not.toBeInTheDocument()
  expect(screen.getByText('Nenhum produto cadastrado ainda')).toBeInTheDocument()
})

test('excluir uma marca remove também os produtos vinculados a ela', async () => {
  render(<App />)
  await cadastrarProduto({ nome: 'Tênis Alpha', codigo: '#JX-001', preco: '19990', marca: 'Jetmax' })

  await userEvent.click(within(cardDaMarca('Jetmax')).getByRole('button', { name: /excluir marca/i }))
  expect(screen.getByText(/removerá todos os produtos vinculados/i)).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: /^excluir$/i }))

  expect(screen.queryByRole('heading', { name: 'Jetmax' })).not.toBeInTheDocument()
  expect(screen.queryByText('Tênis Alpha')).not.toBeInTheDocument()
})

test('filtra produtos pela busca e exibe estado de nenhum resultado', async () => {
  render(<App />)
  await cadastrarProduto({ nome: 'Tênis Alpha', codigo: '#JX-001', preco: '19990', marca: 'Jetmax' })
  await cadastrarProduto({ nome: 'Boné Beta', codigo: '#KJ-001', preco: '4990', marca: 'Kajima' })

  await userEvent.type(screen.getByLabelText(/buscar produto/i), 'Alpha')
  expect(screen.getByText('Tênis Alpha')).toBeInTheDocument()
  expect(screen.queryByText('Boné Beta')).not.toBeInTheDocument()

  await userEvent.clear(screen.getByLabelText(/buscar produto/i))
  await userEvent.type(screen.getByLabelText(/buscar produto/i), 'Inexistente')
  expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument()
})

test('migra produtos antigos vinculados por nome de marca para marcaId', () => {
  localStorage.setItem('cdp_produtos', JSON.stringify([
    { id: '1', nome: 'Produto Legado', codigo: '#L1', imagem: '', marca: 'Jetmax', preco: '10,00', descricao: '' }
  ]))
  render(<App />)
  expect(within(cardDaMarca('Jetmax')).getByText('Produto Legado')).toBeInTheDocument()
})
