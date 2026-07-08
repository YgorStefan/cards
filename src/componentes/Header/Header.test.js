import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './index'

test('exibe o logo do catálogo', () => {
  render(<Header busca="" onBuscaChange={jest.fn()} onAbrirDrawerProduto={jest.fn()} onAbrirDrawerMarca={jest.fn()} />)
  expect(screen.getByText('Catálogo')).toBeInTheDocument()
})

test('chama onAbrirDrawerProduto ao clicar em "+ Produto"', async () => {
  const onAbrirDrawerProduto = jest.fn()
  render(<Header busca="" onBuscaChange={jest.fn()} onAbrirDrawerProduto={onAbrirDrawerProduto} onAbrirDrawerMarca={jest.fn()} />)
  await userEvent.click(screen.getByRole('button', { name: /produto/i }))
  expect(onAbrirDrawerProduto).toHaveBeenCalledTimes(1)
})

test('chama onAbrirDrawerMarca ao clicar em "+ Marca"', async () => {
  const onAbrirDrawerMarca = jest.fn()
  render(<Header busca="" onBuscaChange={jest.fn()} onAbrirDrawerProduto={jest.fn()} onAbrirDrawerMarca={onAbrirDrawerMarca} />)
  await userEvent.click(screen.getByRole('button', { name: /marca/i }))
  expect(onAbrirDrawerMarca).toHaveBeenCalledTimes(1)
})

test('chama onBuscaChange ao digitar na busca', async () => {
  const onBuscaChange = jest.fn()
  render(<Header busca="" onBuscaChange={onBuscaChange} onAbrirDrawerProduto={jest.fn()} onAbrirDrawerMarca={jest.fn()} />)
  await userEvent.type(screen.getByLabelText(/buscar produto/i), 'Alpha')
  expect(onBuscaChange).toHaveBeenCalledWith('A')
})
