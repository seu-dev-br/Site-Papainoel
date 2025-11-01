'use client'

import { motion } from 'framer-motion'

/**
 * HOW IT WORKS - Como funciona (processo simples em 3 passos)
 * Remove fricção mostrando simplicidade
 */
export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      emoji: "✍️",
      title: "Personalize",
      description: "Digite o nome de QUEM VOCÊ QUISER (qualquer idade!) e uma mensagem especial. Leva menos de 2 minutos!",
      time: "2 min"
    },
    {
      number: "2",
      emoji: "💳",
      title: "Pague com Segurança",
      description: "Pagamento 100% seguro via Pix, cartão ou boleto. Seus dados protegidos!",
      time: "1 min"
    },
    {
      number: "3",
      emoji: "🎥",
      title: "Receba e Emocione!",
      description: "Vídeo exclusivo entregue no WhatsApp ou email em até 2 horas. Magia pura!",
      time: "até 2h"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Como <span className="text-christmas-red">Funciona?</span>
          </h2>
          <p className="text-lg text-gray-600">
            Em apenas 3 passos simples você cria uma memória inesquecível!
          </p>
        </motion.div>

        {/* Timeline dos passos */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Linha conectora (desktop) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-christmas-red/20" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Card do passo */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-gray-100 hover:border-christmas-red transition-colors relative z-10">
                  
                  {/* Número do passo */}
                  <div className="w-16 h-16 bg-christmas-red rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
                    {step.number}
                  </div>

                  {/* Emoji */}
                  <div className="text-5xl mb-4">
                    {step.emoji}
                  </div>

                  {/* Título */}
                  <h3 className="font-bold text-xl mb-3 text-gray-900">
                    {step.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Badge de tempo */}
                  <span className="inline-block bg-christmas-gold/20 text-christmas-darkred px-3 py-1 rounded-full text-sm font-semibold">
                    ⏱️ {step.time}
                  </span>
                </div>

                {/* Seta conectora (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-4 text-christmas-red text-4xl z-20">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Garantia adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-green-50 border-2 border-green-500 rounded-xl p-6 max-w-2xl">
            <div className="text-4xl mb-3">🛡️</div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">
              Garantia de Satisfação 100%
            </h4>
            <p className="text-gray-600">
              Se você não ficar completamente satisfeito com seu vídeo, devolvemos seu dinheiro. 
              <strong className="text-christmas-red"> Sem perguntas, sem burocracia!</strong>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
