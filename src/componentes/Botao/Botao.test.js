import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Botao from './index'

test('exibe o texto recebido', () => {
  render(<Botao texto="Cadastrar Produto" />)
  expect(screen.getByRole('button', { name: 'Cadastrar Produto' })).toBeInTheDocument()
})

test('usa type="submit" por padrão', () => {
  render(<Botao texto="Salvar" />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
})

test('aceita type customizado', () => {
  render(<Botao texto="Cancelar" type="button" onClick={jest.fn()} />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('chama onClick ao ser clicado', async () => {
  const onClick = jest.fn()
  render(<Botao texto="Cancelar" type="button" onClick={onClick} />)
  await userEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
})
