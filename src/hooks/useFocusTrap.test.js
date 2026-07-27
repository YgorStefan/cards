import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFocusTrap from './useFocusTrap'

function Modal({ ativo, onFechar }) {
  const containerRef = useFocusTrap(ativo, onFechar)
  if (!ativo) return null
  return (
    <div ref={containerRef}>
      <button>Primeiro</button>
      <button>Último</button>
    </div>
  )
}

test('foca automaticamente o primeiro elemento focável ao ativar', () => {
  render(<Modal ativo onFechar={jest.fn()} />)
  expect(screen.getByRole('button', { name: 'Primeiro' })).toHaveFocus()
})

test('chama onFechar ao pressionar Escape', async () => {
  const onFechar = jest.fn()
  render(<Modal ativo onFechar={onFechar} />)
  await userEvent.keyboard('{Escape}')
  expect(onFechar).toHaveBeenCalledTimes(1)
})

test('Tab a partir do último elemento volta o foco para o primeiro', async () => {
  render(<Modal ativo onFechar={jest.fn()} />)
  screen.getByRole('button', { name: 'Último' }).focus()
  await userEvent.tab()
  expect(screen.getByRole('button', { name: 'Primeiro' })).toHaveFocus()
})

test('devolve o foco ao elemento anterior quando desativado', () => {
  document.body.innerHTML = '<button id="gatilho">Abrir</button>'
  const gatilho = document.getElementById('gatilho')
  gatilho.focus()

  const { rerender } = render(<Modal ativo onFechar={jest.fn()} />)
  rerender(<Modal ativo={false} onFechar={jest.fn()} />)

  expect(gatilho).toHaveFocus()
})
