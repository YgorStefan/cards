import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

beforeEach(() => localStorage.clear())

test('retorna valor inicial quando chave não existe', () => {
  const { result } = renderHook(() => useLocalStorage('chave', 'inicial'))
  expect(result.current[0]).toBe('inicial')
})

test('persiste valor atualizado no localStorage', () => {
  const { result } = renderHook(() => useLocalStorage('chave', 'inicial'))
  act(() => result.current[1]('novo'))
  expect(localStorage.getItem('chave')).toBe('"novo"')
})

test('lê valor existente do localStorage ao montar', () => {
  localStorage.setItem('chave', '"salvo"')
  const { result } = renderHook(() => useLocalStorage('chave', 'inicial'))
  expect(result.current[0]).toBe('salvo')
})

test('suporta arrays como valor', () => {
  const { result } = renderHook(() => useLocalStorage('lista', []))
  act(() => result.current[1]([1, 2, 3]))
  expect(result.current[0]).toEqual([1, 2, 3])
})
