'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Video, Download, Share2 } from 'lucide-react'
import { getOrder } from '@/lib/supabase'
import type { Order } from '@/lib/supabase'
import { shareOnWhatsApp } from '@/lib/utils'

/**
 * SUCCESS PAGE - Página de confirmação pós-pedido
 * Mostra status, permite download e compartilhamento
 */
export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!orderId) {
      setError('ID do pedido não encontrado')
      setLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const orderData = await getOrder(orderId)
        setOrder(orderData)
      } catch (err) {
        console.error('Erro ao buscar pedido:', err)
        setError('Erro ao carregar pedido. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
    
    // Atualiza a cada 10 segundos para pegar status do vídeo
    const interval = setInterval(fetchOrder, 10000)
    return () => clearInterval(interval)
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-christmas-red mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu pedido...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/" className="btn-cta inline-block">
            Voltar ao Início
          </a>
        </div>
      </div>
    )
  }

  const handleShare = () => {
    const text = '🎅 Acabei de fazer um vídeo personalizado do Papai Noel! Olha que incrível:'
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    shareOnWhatsApp(text, url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-christmas-red to-red-700 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        
        {/* Card principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          
          {/* Header com sucesso */}
          <div className="bg-green-500 text-white text-center py-8 px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <CheckCircle className="w-20 h-20 mx-auto mb-4" />
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Pedido Confirmado! 🎉
            </h1>
            <p className="text-lg opacity-90">
              Seu vídeo mágico está sendo preparado!
            </p>
          </div>

          {/* Conteúdo */}
          <div className="p-8">
            
            {/* Informações do pedido */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="font-bold text-xl mb-4 text-gray-900">
                Detalhes do Pedido
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Pedido #:</span>
                  <span className="font-mono text-sm">{order.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Criança:</span>
                  <span className="font-semibold">{order.child_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor:</span>
                  <span className="font-semibold">R$ {order.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-semibold ${
                    order.status === 'completed' ? 'text-green-600' :
                    order.status === 'processing' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {order.status === 'completed' ? '✅ Concluído' :
                     order.status === 'processing' ? '⏳ Em produção' :
                     '📋 Aguardando'}
                  </span>
                </div>
              </div>
            </div>

            {/* Status do vídeo */}
            {order.video_url ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="w-8 h-8 text-green-600" />
                  <h3 className="font-bold text-xl text-gray-900">
                    Vídeo Pronto! 🎉
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Seu vídeo personalizado está pronto! Assista agora e compartilhe a magia:
                </p>
                <div className="flex gap-3">
                  <a
                    href={order.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta flex-1 text-center"
                  >
                    <Video className="inline-block mr-2" />
                    Assistir Vídeo
                  </a>
                  <a
                    href={order.video_url}
                    download
                    className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-full transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-blue-600 animate-spin" />
                  <h3 className="font-bold text-xl text-gray-900">
                    Estamos Criando Sua Magia!
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Nosso Papai Noel está gravando seu vídeo personalizado.  
                  Você receberá em <strong>até 2 horas</strong> no email/WhatsApp informado.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    📧 Email: {order.contact_email || 'Não informado'}<br />
                    📱 WhatsApp: {order.contact_phone || 'Não informado'}
                  </p>
                </div>
              </div>
            )}

            {/* Mensagem personalizada */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 text-gray-900">
                Mensagem Personalizada:
              </h3>
              <p className="text-gray-700 italic leading-relaxed">
                "{order.custom_message}"
              </p>
            </div>

            {/* Compartilhar */}
            <div className="text-center">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar no WhatsApp
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Ajude outras famílias a viverem essa magia! ✨
              </p>
            </div>

            {/* Próximos passos */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold text-lg mb-3 text-gray-900">
                O Que Fazer Agora?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Aguarde o email/WhatsApp com seu vídeo</li>
                <li>🎥 Assista junto com a criança</li>
                <li>📸 Grave a reação e compartilhe nas redes!</li>
                <li>⭐ Avalie nossa experiência (em breve)</li>
              </ul>
            </div>

            {/* Voltar ao início */}
            <div className="mt-8 text-center">
              <a
                href="/"
                className="text-christmas-red hover:text-christmas-darkred font-semibold transition-colors"
              >
                ← Voltar ao Início
              </a>
            </div>

          </div>
        </motion.div>

        {/* Depoimento motivacional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-white"
        >
          <p className="text-lg mb-2">
            "Obrigado por escolher criar momentos mágicos! 🎅✨"
          </p>
          <p className="text-sm opacity-80">
            Você acabou de fazer parte de uma tradição inesquecível!
          </p>
        </motion.div>

      </div>
    </div>
  )
}
