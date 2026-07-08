import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalConfirmacao from './index'

test('exibe a mensagem recebida', () => {
  render(<ModalConfirmacao mensagem="Tem certeza?" onConfirmar={jest.fn()} onCancelar={jest.fn()} />)
  expect(screen.getByText('Tem certeza?')).toBeInTheDocument()
})

test('foca automaticamente no botão Cancelar ao abrir', () => {
  render(<ModalConfirmacao mensagem="Tem certeza?" onConfirmar={jest.fn()} onCancelar={jest.fn()} />)
  expect(screen.getByRole('button', { name: /cancelar/i })).toHaveFocus()
})

test('chama onConfirmar ao clicar em Excluir', async () => {
  const onConfirmar = jest.fn()
  render(<ModalConfirmacao mensagem="Tem certeza?" onConfirmar={onConfirmar} onCancelar={jest.fn()} />)
  await userEvent.click(screen.getByRole('button', { name: /excluir/i }))
  expect(onConfirmar).toHaveBeenCalledTimes(1)
})

test('chama onCancelar ao clicar em Cancelar', async () => {
  const onCancelar = jest.fn()
  render(<ModalConfirmacao mensagem="Tem certeza?" onConfirmar={jest.fn()} onCancelar={onCancelar} />)
  await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))
  expect(onCancelar).toHaveBeenCalledTimes(1)
})

test('chama onCancelar ao pressionar Escape', async () => {
  const onCancelar = jest.fn()
  render(<ModalConfirmacao mensagem="Tem certeza?" onConfirmar={jest.fn()} onCancelar={onCancelar} />)
  await userEvent.keyboard('{Escape}')
  expect(onCancelar).toHaveBeenCalledTimes(1)
})

test('chama onCancelar ao clicar no overlay', async () => {
  const onCancelar = jest.fn()
  const { container } = render(<ModalConfirmacao mensagem="Tem certeza?" onConfirmar={jest.fn()} onCancelar={onCancelar} />)
  await userEvent.click(container.querySelector('.modal-overlay'))
  expect(onCancelar).toHaveBeenCalledTimes(1)
})
