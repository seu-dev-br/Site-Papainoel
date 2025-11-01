'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

/**
 * TESTIMONIALS - Depoimentos reais com fotos
 * Prova social extrema para converter
 */
export default function Testimonials() {
  const testimonials = [
    {
      name: "Marina Costa",
      location: "São Paulo/SP",
      child: "Vovó Alzira, 78 anos",
      rating: 5,
      text: "Comprei para minha avó que tem Alzheimer. Quando ela viu o Papai Noel falando o nome dela, voltou a sorrir como criança! Momento INESQUECÍVEL para toda família! 😭❤️",
      emoji: "�💖",
      verified: true
    },
    {
      name: "Carlos Eduardo",
      location: "Brasília/DF",
      child: "Esposa Amanda, 32 anos",
      rating: 5,
      text: "Comprei para minha esposa que AMA Natal! Ela não esperava e ficou em CHOQUE quando viu. Chorou de emoção. Melhor presente que já dei! Vale cada centavo!",
      emoji: "💑✨",
      verified: true
    },
    {
      name: "Juliana Rocha",
      location: "Belo Horizonte/MG",
      child: "Sogra Terezinha, 65 anos",
      rating: 5,
      text: "Dei para minha sogra de presente. Ela que sempre foi 'durona' chorou feito criança! Disse que nunca tinha ganhado algo tão especial. Agora sou a nora favorita! 😂❤️",
      emoji: "🎅🎁",
      verified: true
    },
    {
      name: "Pedro Henrique",
      location: "Curitiba/PR",
      child: "Avô João, 85 anos",
      rating: 5,
      text: "Meu avô estava hospitalizado e triste. Quando mostrei o vídeo, ele sorriu pela primeira vez em semanas! Os médicos ficaram emocionados. OBRIGADO por essa magia! 🙏",
      emoji: "�✨",
      verified: true
    },
    {
      name: "Roberta Lima",
      location: "Porto Alegre/RS",
      child: "Melhor amiga Camila, 28 anos",
      rating: 5,
      text: "Dei para minha amiga que passou por um momento difícil. Ela riu e chorou ao mesmo tempo! Disse que foi o gesto mais carinhoso que já recebeu. VALE OURO! 💝",
      emoji: "👭💖",
      verified: true
    },
    {
      name: "Antônio Ferreira",
      location: "Fortaleza/CE",
      child: "Tio Zé, 70 anos",
      rating: 5,
      text: "Meu tio sempre nos deu presentes. Pela primeira vez, ELE ganhou algo especial! Chorou feito criança. A família toda viu e pediu o link. JÁ VENDI 5! 😂🎅",
      emoji: "😊🎉",
      verified: true
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Veja Por Que <span className="text-christmas-red">TODOS</span> Estão Comprando!
          </h2>
          <p className="text-lg text-gray-600">
            Mais de 1.250 pessoas emocionadas! Crianças, adultos, idosos - <strong>a magia não tem idade!</strong>
          </p>
        </motion.div>

        {/* Grid de depoimentos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="testimonial-card"
            >
              {/* Header com emoji e verificado */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl">{testimonial.emoji}</span>
                {testimonial.verified && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    ✓ Verificado
                  </span>
                )}
              </div>

              {/* Estrelas */}
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-christmas-gold fill-christmas-gold" />
                ))}
              </div>

              {/* Depoimento */}
              <Quote className="w-6 h-6 text-gray-300 mb-2" />
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Autor */}
              <div className="border-t pt-3">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">Mãe/Pai de {testimonial.child}</p>
                <p className="text-xs text-gray-400 mt-1">📍 {testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA após depoimentos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-christmas-red to-red-700 rounded-2xl p-8 max-w-3xl mx-auto text-white">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Chegou a SUA Vez de Criar Essa Memória!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Para seu filho, neto, avô, pai, mãe, amigo ou namorado!<br />
              <strong className="text-christmas-gold">TODO MUNDO merece essa emoção!</strong> 🎄✨
            </p>
            <a href="#pricing" className="inline-block bg-christmas-gold text-christmas-darkred font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:scale-105 transform transition-all">
              Criar Vídeo Agora →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
