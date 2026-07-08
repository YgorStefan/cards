import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioMarca from './index'

test('exibe botão "Criar Marca" quando sem prop marca', () => {
  render(<FormularioMarca aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /criar marca/i })).toBeInTheDocument()
})

test('exibe botão "Salvar" quando prop marca fornecida', () => {
  const marca = { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
  render(<FormularioMarca marca={marca} aoSalvar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
})

test('preenche nome e cores ao receber prop marca', () => {
  const marca = { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
  render(<FormularioMarca marca={marca} aoSalvar={jest.fn()} />)
  expect(screen.getByDisplayValue('Jetmax')).toBeInTheDocument()
})

test('chama aoSalvar preservando o id ao editar', async () => {
  const aoSalvar = jest.fn()
  const marca = { id: '99', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
  render(<FormularioMarca marca={marca} aoSalvar={aoSalvar} />)
  await userEvent.click(screen.getByRole('button', { name: /salvar/i }))
  expect(aoSalvar).toHaveBeenCalledWith(expect.objectContaining({ id: '99' }))
})

test('bloqueia nome duplicado e não chama aoSalvar', async () => {
  const aoSalvar = jest.fn()
  const marcas = [{ id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }]
  render(<FormularioMarca marcas={marcas} aoSalvar={aoSalvar} />)
  await userEvent.type(screen.getByLabelText(/nome da marca/i), 'jetmax')
  await userEvent.click(screen.getByRole('button', { name: /criar marca/i }))
  expect(aoSalvar).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toHaveTextContent(/já existe/i)
})

test('permite manter o próprio nome ao editar sem disparar erro de duplicidade', async () => {
  const aoSalvar = jest.fn()
  const marca = { id: '1', nome: 'Jetmax', corPrimaria: '#D9F7E9', corSecundaria: '#57C278' }
  const marcas = [marca]
  render(<FormularioMarca marca={marca} marcas={marcas} aoSalvar={aoSalvar} />)
  await userEvent.click(screen.getByRole('button', { name: /salvar/i }))
  expect(aoSalvar).toHaveBeenCalledWith(expect.objectContaining({ id: '1', nome: 'Jetmax' }))
})
