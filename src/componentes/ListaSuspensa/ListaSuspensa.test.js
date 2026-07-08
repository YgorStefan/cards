import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ListaSuspensa from './index'

test('associa label ao select e lista as opções', () => {
  render(<ListaSuspensa label="Marca" itens={['Jetmax', 'Kajima']} valor="" aoAlterado={jest.fn()} />)
  const select = screen.getByLabelText('Marca')
  expect(select).toBeInTheDocument()
  expect(screen.getByRole('option', { name: 'Jetmax' })).toBeInTheDocument()
  expect(screen.getByRole('option', { name: 'Kajima' })).toBeInTheDocument()
})

test('chama aoAlterado com o valor selecionado', async () => {
  const aoAlterado = jest.fn()
  render(<ListaSuspensa label="Marca" itens={['Jetmax', 'Kajima']} valor="" aoAlterado={aoAlterado} />)
  await userEvent.selectOptions(screen.getByLabelText('Marca'), 'Kajima')
  expect(aoAlterado).toHaveBeenCalledWith('Kajima')
})

test('exibe o valor selecionado', () => {
  render(<ListaSuspensa label="Marca" itens={['Jetmax', 'Kajima']} valor="Kajima" aoAlterado={jest.fn()} />)
  expect(screen.getByLabelText('Marca')).toHaveValue('Kajima')
})
