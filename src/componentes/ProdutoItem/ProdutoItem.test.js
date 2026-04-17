import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProdutoItem from './index'

const produto = {
  id: '1',
  nome: 'Produto Alpha',
  codigo: '#JX-001',
  imagem: '',
  marca: 'Jetmax',
  preco: '299,90',
  descricao: 'Ótimo produto'
}

test('exibe nome do produto', () => {
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={jest.fn()} />)
  expect(screen.getByText('Produto Alpha')).toBeInTheDocument()
})

test('exibe preço formatado', () => {
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={jest.fn()} />)
  expect(screen.getByText('R$ 299,90')).toBeInTheDocument()
})

test('chama onEditar com o produto ao clicar em editar', async () => {
  const onEditar = jest.fn()
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={onEditar} onExcluir={jest.fn()} />)
  await userEvent.click(screen.getByRole('button', { name: /editar/i }))
  expect(onEditar).toHaveBeenCalledWith(produto)
})

test('chama onExcluir com o id ao clicar em excluir', async () => {
  const onExcluir = jest.fn()
  render(<ProdutoItem produto={produto} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={onExcluir} />)
  await userEvent.click(screen.getByRole('button', { name: /excluir produto/i }))
  expect(onExcluir).toHaveBeenCalledWith('1')
})

test('exibe imagem quando URL fornecida', () => {
  const produtoComImagem = { ...produto, imagem: 'https://example.com/img.png' }
  render(<ProdutoItem produto={produtoComImagem} corSecundaria="#57C278" onEditar={jest.fn()} onExcluir={jest.fn()} />)
  expect(screen.getByRole('img', { name: 'Produto Alpha' })).toBeInTheDocument()
})
