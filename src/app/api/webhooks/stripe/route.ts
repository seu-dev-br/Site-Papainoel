import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { constructWebhookEvent } from '@/lib/stripe-server'
import { updateOrderStatus } from '@/lib/supabase'
import Stripe from 'stripe'

/**
 * POST /api/webhooks/stripe
 * Webhook para receber eventos do Stripe
 * IMPORTANTE: Este endpoint deve ser configurado no Dashboard do Stripe
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Stripe signature ausente' },
        { status: 400 }
      )
    }

    // Verifica e constrói o evento do webhook
    const event = await constructWebhookEvent(body, signature)

    // Processa diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (orderId) {
          // Atualiza status do pedido para aprovado
          await updateOrderStatus(orderId, 'processing')
          
          console.log(`✅ Pagamento aprovado para pedido: ${orderId}`)
          
          // TODO: Aqui você pode:
          // 1. Enviar email de confirmação
          // 2. Iniciar geração do vídeo
          // 3. Notificar equipe de produção
        }
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (orderId) {
          await updateOrderStatus(orderId, 'failed')
          console.log(`❌ Sessão expirada para pedido: ${orderId}`)
        }
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata?.orderId

        if (orderId) {
          console.log(`💰 Pagamento confirmado para pedido: ${orderId}`)
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata?.orderId

        if (orderId) {
          await updateOrderStatus(orderId, 'failed')
          console.log(`❌ Pagamento falhou para pedido: ${orderId}`)
        }
        break
      }

      default:
        console.log(`⚠️ Evento não tratado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro no webhook Stripe:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 400 }
    )
  }
}

// Configura para aceitar raw body (necessário para Stripe)
export const runtime = 'nodejs'
