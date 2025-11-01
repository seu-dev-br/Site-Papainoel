'use client'

import { motion } from 'framer-motion'
import { Star, Users } from 'lucide-react'

/**
 * SOCIAL PROOF - Prova social imediata
 * Elementos: número de clientes, avaliação, testimunho rápido
 */
export default function SocialProof() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          
          {/* Estatísticas principais */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            
            {/* Clientes felizes */}
            <div className="text-center">
              <div className="flex justify-center items-center mb-3">
                <Users className="w-10 h-10 text-christmas-red" />
              </div>
              <h3 className="text-4xl font-bold text-christmas-red mb-2">1.250+</h3>
              <p className="text-gray-600 font-medium">Famílias Felizes</p>
            </div>

            {/* Avaliação */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-christmas-gold fill-christmas-gold" />
                ))}
              </div>
              <h3 className="text-4xl font-bold text-christmas-red mb-2">4.9/5</h3>
              <p className="text-gray-600 font-medium">Avaliação Média</p>
            </div>

            {/* Tempo de entrega */}
            <div className="text-center">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="text-4xl font-bold text-christmas-red mb-2">2h</h3>
              <p className="text-gray-600 font-medium">Tempo de Entrega</p>
            </div>

          </div>

          {/* Testimunho em destaque */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-christmas-red">
            <div className="flex items-start gap-4">
              <div className="text-5xl">�</div>
              <div className="flex-1">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-christmas-gold fill-christmas-gold" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-3">
                  "Comprei para minha avó de 82 anos que adora Natal. Ela chorou de emoção ao ver o Papai Noel 
                  falando o nome dela! Disse que foi o presente mais especial que já ganhou. IMPAGÁVEL! ❤️"
                </p>
                <p className="text-gray-600 font-semibold">
                  — Roberto Silva, neto da Dona Maria • Rio de Janeiro/RJ
                </p>
              </div>
            </div>
          </div>

          {/* Selo de confiança */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Site 100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>Dados Protegidos (LGPD)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💳</span>
              <span>Pagamento Criptografado</span>
            </div>
          </div>

          {/* Chamada de atenção adicional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center bg-christmas-red text-white rounded-xl p-6"
          >
            <p className="text-xl font-bold mb-2">
              🔥 ATENÇÃO: Não importa a idade!
            </p>
            <p className="text-lg">
              Já fizemos vídeos para pessoas de <strong>6 meses a 95 anos</strong>!<br />
              <span className="text-christmas-gold">TODOS choraram de emoção!</span>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
