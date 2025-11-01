'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

/**
 * FLOATING CTA - Botão flutuante que aparece ao scroll
 * Sempre visível para facilitar conversão
 */
export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Mostra após 300px de scroll
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const pricingSection = document.getElementById('pricing')
    pricingSection?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <>
      {/* Desktop - Botão fixo no canto */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <button
          onClick={scrollToForm}
          className="bg-christmas-red hover:bg-christmas-darkred text-white font-bold py-4 px-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2 animate-bounce-slow glow-gold"
        >
          <Sparkles className="w-5 h-5" />
          <span>Criar Meu Vídeo!</span>
        </button>
      </div>

      {/* Mobile - Barra fixa inferior */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-4 border-christmas-red shadow-2xl p-4">
        <button
          onClick={scrollToForm}
          className="btn-cta w-full py-4 text-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Quero Meu Vídeo Agora!</span>
        </button>
        <p className="text-center text-sm text-gray-600 mt-2">
          💳 Apenas <strong className="text-christmas-red">R$ 49,99</strong>
        </p>
      </div>
    </>
  )
}
