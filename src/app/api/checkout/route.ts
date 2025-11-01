import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe-server'
import { getOrder } from '@/lib/supabase'

/**
 * POST /api/checkout
 * Cria uma sessão de checkout do Stripe
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    // Valida orderId
    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId é obrigatório' },
        { status: 400 }
      )
    }

    // Busca pedido no Supabase
    const order = await getOrder(orderId)

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      )
    }

    // URLs de sucesso e cancelamento
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/success?order=${orderId}&session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/?canceled=true`

    // Cria sessão de checkout no Stripe
    const { sessionId, url } = await createCheckoutSession({
      orderId: order.id,
      customerName: order.child_name,
      customerEmail: order.contact_email,
      amount: order.amount,
      successUrl,
      cancelUrl,
    })

    return NextResponse.json({
      sessionId,
      url,
    })
  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
