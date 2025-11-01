'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Clock, Shield } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import OrderForm from '@/components/forms/OrderForm'

/**
 * PRICING - Seção de preço e formulário de pedido
 * Elemento crítico de conversão
 */
export default function Pricing() {
  const [showForm, setShowForm] = useState(false)
  const price = parseFloat(process.env.NEXT_PUBLIC_VIDEO_PRICE || '49.99')

  const benefits = [
    "✅ Vídeo 100% personalizado com QUALQUER nome",
    "✅ Funciona para TODAS AS IDADES (crianças, adultos, idosos)",
    "✅ Mensagem especial escolhida por você",
    "✅ Entrega em até 2 horas no WhatsApp/Email",
    "✅ Qualidade HD profissional",
    "✅ Sem limite de visualizações",
    "✅ Arquivo para guardar para sempre",
    "✅ Suporte via WhatsApp",
    "✅ Garantia de satisfação 100%"
  ]

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            O Presente Que <span className="text-christmas-red">TODOS</span> Vão Lembrar Para Sempre
          </h2>
          <p className="text-lg text-gray-600">
            Por menos que um jantar, você cria um momento INESQUECÍVEL para quem você ama!<br />
            <strong className="text-christmas-red">Funciona para qualquer idade!</strong> Do bebê ao bisavô! 🎅❤️
          </p>
        </motion.div>

        {/* Card de preço */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-christmas-red relative">
            
            {/* Badge de oferta */}
            <div className="absolute top-6 right-6 z-10">
              <div className="bg-christmas-gold text-christmas-darkred px-4 py-2 rounded-full font-bold text-sm animate-pulse-slow shadow-lg">
                🔥 OFERTA LIMITADA!
              </div>
            </div>

            {/* Header do card */}
            <div className="christmas-gradient text-white text-center py-8 px-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <span className="text-sm font-semibold">VÍDEO PERSONALIZADO</span>
              </div>
              <h3 className="font-display text-5xl md:text-6xl font-bold mb-2">
                {formatPrice(price)}
              </h3>
              <p className="text-christmas-snow text-lg">
                Pagamento único • Sem taxas extras
              </p>
            </div>

            {/* Conteúdo do card */}
            <div className="p-8">
              
              {/* Lista de benefícios */}
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="text-green-600 text-xl flex-shrink-0">✓</div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>

              {/* Badges de confiança */}
              <div className="grid grid-cols-3 gap-4 mb-8 text-center text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <Clock className="w-6 h-6 mx-auto mb-1 text-christmas-red" />
                  <p className="font-semibold text-gray-700">2h</p>
                  <p className="text-xs text-gray-500">Entrega</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <Shield className="w-6 h-6 mx-auto mb-1 text-christmas-red" />
                  <p className="font-semibold text-gray-700">100%</p>
                  <p className="text-xs text-gray-500">Seguro</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <Sparkles className="w-6 h-6 mx-auto mb-1 text-christmas-red" />
                  <p className="font-semibold text-gray-700">Único</p>
                  <p className="text-xs text-gray-500">Exclusivo</p>
                </div>
              </div>

              {/* CTA principal ou formulário */}
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-cta w-full text-xl py-6 mb-4"
                >
                  <Sparkles className="inline-block mr-2" />
                  QUERO MEU VÍDEO AGORA!
                </button>
              ) : (
                <OrderForm price={price} />
              )}

              {/* Garantias */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 pt-4">
                <span>🔒 Pagamento Seguro</span>
                <span>✅ Satisfação Garantida</span>
              </div>
            </div>

          </div>

          {/* Aviso de urgência */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              ⚡ <strong>Atenção:</strong> Vagas limitadas por dia para garantir qualidade e entrega rápida!
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
