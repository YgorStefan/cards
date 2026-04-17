import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioProduto from './index'

const marcas = [
  { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
]

test('exibe botão "Cadastrar Produto" para produto novo', () => {
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /cadastrar produto/i })).toBeInTheDocument()
})

test('exibe botão "Salvar Alterações" ao editar', () => {
  const produto = { id: '1', nome: 'Alpha', codigo: '#JX-001', imagem: '', marca: 'Jetmax', preco: '299', descricao: '' }
  render(<FormularioProduto produto={produto} marcas={marcas} aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument()
})

test('preenche campos com dados do produto ao editar', () => {
  const produto = { id: '1', nome: 'Alpha', codigo: '#JX-001', imagem: '', marca: 'Jetmax', preco: '299', descricao: 'Top' }
  render(<FormularioProduto produto={produto} marcas={marcas} aoSalvar={jest.fn()} />)
  expect(screen.getByDisplayValue('Alpha')).toBeInTheDocument()
  expect(screen.getByDisplayValue('#JX-001')).toBeInTheDocument()
  expect(screen.getByDisplayValue('299')).toBeInTheDocument()
})

test('chama aoSalvar com dados corretos ao submeter', async () => {
  const aoSalvar = jest.fn()
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={aoSalvar} />)

  await userEvent.type(screen.getByLabelText(/nome/i), 'Novo Produto')
  await userEvent.type(screen.getByLabelText(/código/i), '#JX-001')
  await userEvent.selectOptions(screen.getByLabelText(/marca/i), 'Jetmax')
  await userEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }))

  expect(aoSalvar).toHaveBeenCalledWith(expect.objectContaining({
    nome: 'Novo Produto',
    codigo: '#JX-001',
    marca: 'Jetmax'
  }))
})

test('aplica máscara ao digitar preço', async () => {
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={jest.fn()} />)
  const campoPreco = screen.getByLabelText(/preço/i)
  await userEvent.type(campoPreco, '1000')
  expect(campoPreco).toHaveValue('10,00')
})

test('limpa campos após cadastro de novo produto', async () => {
  render(<FormularioProduto produto={null} marcas={marcas} aoSalvar={jest.fn()} />)
  const nomeInput = screen.getByLabelText(/nome/i)
  await userEvent.type(nomeInput, 'Produto X')
  await userEvent.type(screen.getByLabelText(/código/i), '#001')
  await userEvent.selectOptions(screen.getByLabelText(/marca/i), 'Jetmax')
  await userEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }))
  expect(nomeInput).toHaveValue('')
})
