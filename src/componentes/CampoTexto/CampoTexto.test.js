import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CampoTexto from './index'

test('associa label ao input', () => {
  render(<CampoTexto label="Nome" valor="" aoAlterado={jest.fn()} />)
  expect(screen.getByLabelText('Nome')).toBeInTheDocument()
})

test('exibe o valor recebido', () => {
  render(<CampoTexto label="Nome" valor="Produto X" aoAlterado={jest.fn()} />)
  expect(screen.getByLabelText('Nome')).toHaveValue('Produto X')
})

test('chama aoAlterado com o novo valor ao digitar', async () => {
  const aoAlterado = jest.fn()
  render(<CampoTexto label="Nome" valor="" aoAlterado={aoAlterado} />)
  await userEvent.type(screen.getByLabelText('Nome'), 'A')
  expect(aoAlterado).toHaveBeenCalledWith('A')
})

test('usa type text por padrão e aceita type customizado', () => {
  render(<CampoTexto label="Preço" type="number" valor="" aoAlterado={jest.fn()} />)
  expect(screen.getByLabelText('Preço')).toHaveAttribute('type', 'number')
})
