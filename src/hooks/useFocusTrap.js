import { useEffect, useRef } from 'react'

const SELETOR_FOCAVEL = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function useFocusTrap(ativo, onFechar) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!ativo) return

    const elementoAnterior = document.activeElement
    const container = containerRef.current
    const focaveis = container
      ? Array.from(container.querySelectorAll(SELETOR_FOCAVEL))
      : []
    if (focaveis.length > 0) focaveis[0].focus()

    const aoTeclar = (e) => {
      if (e.key === 'Escape') {
        onFechar?.()
        return
      }
      if (e.key !== 'Tab' || focaveis.length === 0) return
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      if (elementoAnterior && typeof elementoAnterior.focus === 'function') {
        elementoAnterior.focus()
      }
    }
  }, [ativo, onFechar])

  return containerRef
}

export default useFocusTrap
