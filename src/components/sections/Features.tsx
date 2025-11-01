'use client'

import { motion } from 'framer-motion'
import { Sparkles, Clock, Video, Heart, Shield, Zap } from 'lucide-react'

/**
 * FEATURES - Diferenciais do produto
 * Mostra por que nosso vídeo é único e vale a compra
 */
export default function Features() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "100% Personalizado",
      description: "O Papai Noel fala o nome de QUALQUER pessoa e sua mensagem especial. Funciona para todas as idades!",
      color: "text-christmas-gold"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Entrega Ultra-Rápida",
      description: "Receba em até 2 horas direto no seu WhatsApp ou email. Perfeito para última hora!",
      color: "text-blue-600"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Qualidade Profissional",
      description: "Vídeos em HD com áudio cristalino e cenário natalino autêntico. Magia garantida!",
      color: "text-purple-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Emoção REAL Para Todas as Idades",
      description: "Mais de 1.250 pessoas (crianças, adultos e idosos) emocionadas! Do bebê ao bisavô!",
      color: "text-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Seguro",
      description: "Seus dados protegidos com criptografia. Pagamento processado em ambiente seguro.",
      color: "text-green-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Processo Simples",
      description: "3 minutos para personalizar, pagamento fácil, entrega automática. Sem complicações!",
      color: "text-yellow-600"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Por Que <span className="text-christmas-red">TODO MUNDO</span> Está Comprando?
          </h2>
          <p className="text-lg text-gray-600">
            Não é apenas um vídeo. É o presente mais emocionante que você pode dar para QUALQUER pessoa que você ama!
          </p>
        </motion.div>

        {/* Grid de features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-christmas-red"
            >
              <div className={`${feature.color} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#pricing" className="btn-cta inline-flex items-center">
            <Sparkles className="mr-2" />
            Criar Meu Vídeo Agora!
          </a>
        </motion.div>

      </div>
    </section>
  )
}
