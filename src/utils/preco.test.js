import { formatarPreco } from './preco'

test('retorna vazio para entrada vazia', () => {
  expect(formatarPreco('')).toBe('')
})

test('formata centavos sem separador de milhar', () => {
  expect(formatarPreco('299')).toBe('2,99')
})

test('formata com separador de milhar', () => {
  expect(formatarPreco('129990')).toBe('1.299,90')
})

test('ignora caracteres não numéricos na entrada', () => {
  expect(formatarPreco('R$ 1.299,90')).toBe('1.299,90')
})

test('formata corretamente ao digitar dígito a dígito', () => {
  expect(formatarPreco('1')).toBe('0,01')
  expect(formatarPreco('10')).toBe('0,10')
  expect(formatarPreco('100')).toBe('1,00')
  expect(formatarPreco('1000')).toBe('10,00')
})
