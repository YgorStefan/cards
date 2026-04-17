export const formatarPreco = (valor) => {
  const soDigitos = valor.replace(/\D/g, '')
  if (!soDigitos) return ''
  const numero = parseInt(soDigitos, 10) / 100
  const [inteiro, decimal] = numero.toFixed(2).split('.')
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${inteiroFormatado},${decimal}`
}
