import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EstadoVazio from './index'

test('exibe título e subtítulo padrão', () => {
  render(<EstadoVazio onAdicionar={jest.fn()} />)
  expect(screen.getByText('Nenhum produto cadastrado ainda')).toBeInTheDocument()
})

test('aceita título e subtítulo customizados', () => {
  render(<EstadoVazio titulo="Nenhum produto encontrado" subtitulo="Tente outra busca" />)
  expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument()
  expect(screen.getByText('Tente outra busca')).toBeInTheDocument()
})

test('chama onAdicionar ao clicar no botão', async () => {
  const onAdicionar = jest.fn()
  render(<EstadoVazio onAdicionar={onAdicionar} />)
  await userEvent.click(screen.getByRole('button'))
  expect(onAdicionar).toHaveBeenCalledTimes(1)
})

test('não exibe botão quando onAdicionar não é fornecido', () => {
  render(<EstadoVazio titulo="Nenhum produto encontrado" subtitulo="Tente outra busca" />)
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})
