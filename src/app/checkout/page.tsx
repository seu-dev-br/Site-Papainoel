'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'

/**
 * CHECKOUT PAGE - Página de redirecionamento
 * Mostra loading enquanto redireciona para Stripe
 */
export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    const orderId = searchParams.get('order')
    const canceled = searchParams.get('canceled')

    if (canceled) {
      setError('Pagamento cancelado. Você pode tentar novamente.')
      setTimeout(() => {
        router.push('/')
      }, 3000)
      return
    }

    if (!orderId) {
      setError('ID do pedido não encontrado')
      setTimeout(() => {
        router.push('/')
      }, 2000)
      return
    }

    // Redireciona automaticamente para o Stripe
    // (já foi feito no formulário, esta página é só fallback)
  }, [searchParams, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500">Redirecionando...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-christmas-red to-red-700 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
      >
        <Loader2 className="w-16 h-16 text-christmas-red mx-auto mb-4 animate-spin" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Preparando seu pagamento...
        </h1>
        <p className="text-gray-600 mb-6">
          Você será redirecionado para a página segura de pagamento do Stripe.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Conexão 100% Segura (SSL)</span>
        </div>
      </motion.div>
    </div>
  )
}
