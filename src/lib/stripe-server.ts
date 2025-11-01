import Stripe from 'stripe'

// Valida chave secreta
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY não configurada nas variáveis de ambiente!')
}

/**
 * Cliente Stripe (Backend/Server-side)
 * Usado nas API Routes do Next.js
 */
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
})

/**
 * Cria uma sessão de checkout do Stripe
 */
export async function createCheckoutSession({
  orderId,
  customerName,
  customerEmail,
  amount,
  successUrl,
  cancelUrl,
}: {
  orderId: string
  customerName: string
  customerEmail?: string
  amount: number
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Vídeo Personalizado do Papai Noel',
              description: `Vídeo exclusivo para ${customerName}`,
              images: ['https://your-domain.com/papai-noel-thumbnail.jpg'], // Adicione sua imagem
            },
            unit_amount: Math.round(amount * 100), // Converte para centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        orderId,
        customerName,
      },
      payment_intent_data: {
        metadata: {
          orderId,
        },
      },
      locale: 'pt-BR',
      billing_address_collection: 'auto',
    })

    return { sessionId: session.id, url: session.url }
  } catch (error) {
    console.error('Erro ao criar sessão Stripe:', error)
    throw error
  }
}

/**
 * Verifica status de um pagamento
 */
export async function getPaymentStatus(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      status: session.payment_status,
      amountTotal: session.amount_total,
      customerEmail: session.customer_email,
      metadata: session.metadata,
    }
  } catch (error) {
    console.error('Erro ao buscar status do pagamento:', error)
    throw error
  }
}

/**
 * Processa webhook do Stripe
 */
export async function constructWebhookEvent(
  body: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET não configurada!')
  }

  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Erro ao verificar webhook:', error)
    throw error
  }
}
