'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * FAQ - Perguntas frequentes
 * Remove objeções de compra
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Como funciona o vídeo personalizado?",
      answer: "Você preenche o nome da criança e uma mensagem especial. Nosso Papai Noel profissional grava um vídeo exclusivo falando diretamente com ela! O vídeo é enviado em até 2 horas direto no seu WhatsApp ou email."
    },
    {
      question: "Quanto tempo demora para receber o vídeo?",
      answer: "Em até 2 horas após a confirmação do pagamento! Muitos clientes recebem em menos de 1 hora. Trabalhamos 24/7 durante a temporada natalina para garantir entrega rápida."
    },
    {
      question: "Posso escolher o que o Papai Noel vai falar?",
      answer: "Sim! Você escolhe uma mensagem personalizada de até 100 palavras. O Papai Noel falará o nome da criança e transmitirá sua mensagem especial de forma natural e mágica."
    },
    {
      question: "O vídeo tem boa qualidade?",
      answer: "Sim! Todos os vídeos são gravados em HD (1080p) com áudio profissional e cenário natalino autêntico. Qualidade de cinema para criar uma experiência verdadeiramente mágica!"
    },
    {
      question: "Funciona para adultos e idosos também?",
      answer: "SIM! Mais de 40% dos nossos clientes compram para ADULTOS e IDOSOS! Funciona para namorados, esposas, pais, avós, tios, amigos... A magia do Natal não tem idade! Muitos idosos choram de emoção. É LINDO! 🎅❤️👵👴"
    },
    {
      question: "E se eu não gostar do vídeo?",
      answer: "Oferecemos garantia de satisfação 100%. Se não ficar satisfeito, fazemos uma nova versão gratuitamente ou devolvemos seu dinheiro, sem perguntas. Sua felicidade é nossa prioridade!"
    },
    {
      question: "Como vou receber o vídeo?",
      answer: "Você receberá um link para download via WhatsApp e/ou email. O vídeo fica disponível para download ilimitado e você pode guardar para sempre, compartilhar com a família e assistir quantas vezes quiser!"
    },
    {
      question: "É seguro fazer o pagamento?",
      answer: "100% seguro! Usamos criptografia de ponta a ponta e processadores de pagamento certificados. Seus dados estão protegidos conforme a LGPD. Nunca armazenamos informações de cartão."
    },
    {
      question: "Posso pedir vários vídeos?",
      answer: "Sim! Muitas famílias pedem um vídeo para cada filho. Cada vídeo é único e personalizado. Entre em contato para descontos em pedidos múltiplos!"
    },
    {
      question: "Funciona mesmo para idosos?",
      answer: "SIM! É INCRÍVEL ver a reação deles! Muitos idosos voltam a ser crianças ao ver o Papai Noel falando o nome deles. Já tivemos casos emocionantes de pessoas com Alzheimer que voltaram a sorrir. É um presente ÚNICO! 🌟👵👴💖"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Perguntas <span className="text-christmas-red">Frequentes</span>
          </h2>
          <p className="text-lg text-gray-600">
            Tire suas dúvidas sobre o vídeo personalizado do Papai Noel
          </p>
        </motion.div>

        {/* Lista de FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-left"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-lg text-gray-900 flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-6 h-6 text-christmas-red flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
          <a 
            href="https://wa.me/5511999999999?text=Olá!%20Tenho%20dúvidas%20sobre%20o%20vídeo%20do%20Papai%20Noel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            <span>💬</span>
            Fale Conosco no WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  )
}
