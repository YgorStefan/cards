import { useState, useEffect } from 'react'

function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const item = localStorage.getItem(chave)
      return item ? JSON.parse(item) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {}
  }, [chave, valor])

  return [valor, setValor]
}

export default useLocalStorage
