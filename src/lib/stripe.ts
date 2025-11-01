import { loadStripe, Stripe } from '@stripe/stripe-js'

/**
 * Cliente Stripe (Frontend)
 * Carrega o Stripe.js de forma lazy
 */
let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    
    if (!key) {
      console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não configurada!')
      throw new Error('Stripe não configurado. Configure as variáveis de ambiente.')
    }
    
    stripePromise = loadStripe(key)
  }
  
  return stripePromise
}

/**
 * Formata preço para exibição
 */
export const formatStripeAmount = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount / 100) // Stripe usa centavos
}

/**
 * Converte Real para centavos (formato Stripe)
 */
export const convertToCents = (amount: number): number => {
  return Math.round(amount * 100)
}
