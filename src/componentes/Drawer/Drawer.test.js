import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Drawer from './index'

const marcas = [{ id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }]

test('não renderiza nada quando fechado', () => {
  const { container } = render(
    <Drawer aberto={false} tipo="produto" item={null} marcas={marcas} onFechar={jest.fn()} onSalvarProduto={jest.fn()} onSalvarMarca={jest.fn()} />
  )
  expect(container).toBeEmptyDOMElement()
})

test('exibe formulário de produto quando tipo é produto', () => {
  render(
    <Drawer aberto tipo="produto" item={null} marcas={marcas} onFechar={jest.fn()} onSalvarProduto={jest.fn()} onSalvarMarca={jest.fn()} />
  )
  expect(screen.getByRole('heading', { name: /novo produto/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /cadastrar produto/i })).toBeInTheDocument()
})

test('exibe formulário de marca quando tipo é marca', () => {
  render(
    <Drawer aberto tipo="marca" item={null} marcas={marcas} onFechar={jest.fn()} onSalvarProduto={jest.fn()} onSalvarMarca={jest.fn()} />
  )
  expect(screen.getByRole('heading', { name: /nova marca/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /criar marca/i })).toBeInTheDocument()
})

test('chama onFechar ao clicar no botão de fechar', async () => {
  const onFechar = jest.fn()
  render(
    <Drawer aberto tipo="produto" item={null} marcas={marcas} onFechar={onFechar} onSalvarProduto={jest.fn()} onSalvarMarca={jest.fn()} />
  )
  await userEvent.click(screen.getByRole('button', { name: /fechar painel/i }))
  expect(onFechar).toHaveBeenCalledTimes(1)
})

test('chama onFechar ao pressionar Escape', async () => {
  const onFechar = jest.fn()
  render(
    <Drawer aberto tipo="produto" item={null} marcas={marcas} onFechar={onFechar} onSalvarProduto={jest.fn()} onSalvarMarca={jest.fn()} />
  )
  await userEvent.keyboard('{Escape}')
  expect(onFechar).toHaveBeenCalledTimes(1)
})

test('painel tem semântica de diálogo acessível', () => {
  render(
    <Drawer aberto tipo="marca" item={null} marcas={marcas} onFechar={jest.fn()} onSalvarProduto={jest.fn()} onSalvarMarca={jest.fn()} />
  )
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
