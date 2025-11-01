'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Clock, Heart, Shield } from 'lucide-react'
import { calculateRemainingSlots } from '@/lib/utils'

/**
 * HERO SECTION - Seção principal com CTA forte
 * Elementos de conversão: título emocional, CTA acima da dobra, urgência, badges de confiança
 */
export default function Hero() {
  const [slotsRemaining, setSlotsRemaining] = useState(42) // Valor inicial simulado
  
  useEffect(() => {
    // Simula busca de slots restantes
    // Em produção: usar getTodayOrdersCount() do Supabase
    const mockOrdersToday = Math.floor(Math.random() * 15) + 5
    setSlotsRemaining(calculateRemainingSlots(mockOrdersToday))
  }, [])

  const scrollToForm = () => {
    const pricingSection = document.getElementById('pricing')
    pricingSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden christmas-gradient py-16 md:py-24">
      {/* Efeitos visuais de neve/estrelas */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-bounce-slow">✨</div>
        <div className="absolute top-20 right-20 animate-bounce-slow animation-delay-300">⭐</div>
        <div className="absolute bottom-20 left-1/4 animate-bounce-slow animation-delay-700">🎄</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          
          {/* Badge de urgência */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <span className="bg-christmas-gold text-christmas-darkred px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg glow-gold">
              🔥 Restam apenas {slotsRemaining} vagas para entrega HOJE!
            </span>
          </motion.div>

          {/* Título principal - foco emocional */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow leading-tight"
          >
            Surpreenda <span className="text-christmas-gold">Quem Você Ama</span> com um Presente Inesquecível!
          </motion.h1>

          {/* Subtítulo com benefício principal */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-christmas-snow leading-relaxed"
          >
            Vídeo <strong>100% personalizado do Papai Noel</strong> com o nome de quem você escolher!<br />
            <span className="text-christmas-gold font-bold">Crianças, adultos, idosos</span> - TODOS merecem essa emoção!<br />
            Entrega em até <strong className="text-christmas-gold">2 horas</strong> direto no WhatsApp!
          </motion.p>

          {/* CTA Principal - DESTAQUE MÁXIMO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="mb-10"
          >
            <button 
              onClick={scrollToForm}
              className="btn-cta text-xl md:text-2xl py-6 px-12 glow-gold"
            >
              <Sparkles className="inline-block mr-2" />
              QUERO MEU VÍDEO MÁGICO!
            </button>
            <p className="text-sm mt-3 text-christmas-snow">
              💳 Por apenas <span className="font-bold text-christmas-gold text-lg">R$ 49,99</span>
            </p>
          </motion.div>

          {/* Badges de confiança */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-christmas-gold" />
              <p className="text-xs font-semibold">Entrega em 2h</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-christmas-gold" />
              <p className="text-xs font-semibold">1.250+ famílias</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-christmas-gold" />
              <p className="text-xs font-semibold">100% Seguro</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-christmas-gold" />
              <p className="text-xs font-semibold">Totalmente único</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Onda decorativa na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
