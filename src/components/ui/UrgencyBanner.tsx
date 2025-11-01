'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * URGENCY BANNER - Banner fixo no topo com urgência
 * Countdown de oferta para aumentar conversão
 */
export default function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Calcula tempo até meia-noite
    const calculateTimeLeft = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const difference = midnight.getTime() - now.getTime()
      
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-christmas-red text-white py-3 px-4 relative z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 text-center flex-wrap">
          <span className="font-bold text-sm md:text-base animate-pulse">
            🔥 OFERTA ESPECIAL: Personalização grátis termina em:
          </span>
          
          {/* Countdown */}
          <div className="flex gap-2">
            <div className="bg-white/20 rounded px-2 py-1 min-w-[40px]">
              <span className="font-bold text-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
            </div>
            <span className="font-bold">:</span>
            <div className="bg-white/20 rounded px-2 py-1 min-w-[40px]">
              <span className="font-bold text-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
            </div>
            <span className="font-bold">:</span>
            <div className="bg-white/20 rounded px-2 py-1 min-w-[40px]">
              <span className="font-bold text-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Botão fechar (mobile) */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 md:relative md:right-auto md:top-auto md:translate-y-0 p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Fechar banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
