import { createClient } from '@supabase/supabase-js'

// Validação das variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas!')
}

/**
 * Cliente Supabase para uso no cliente (browser)
 * Usado para operações públicas e autenticadas
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Tipos de dados do banco
 */
export interface Order {
  id: string
  created_at: string
  child_name: string
  custom_message: string
  contact_email?: string
  contact_phone?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  video_url?: string
  payment_status: 'pending' | 'approved' | 'failed'
  amount: number
}

/**
 * Funções auxiliares para interagir com o Supabase
 */

// Criar novo pedido
export async function createOrder(orderData: Omit<Order, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single()
  
  if (error) {
    console.error('Erro ao criar pedido:', error)
    throw error
  }
  
  return data
}

// Buscar pedido por ID
export async function getOrder(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()
  
  if (error) {
    console.error('Erro ao buscar pedido:', error)
    throw error
  }
  
  return data
}

// Atualizar status do pedido
export async function updateOrderStatus(
  orderId: string, 
  status: Order['status'],
  videoUrl?: string
) {
  const updateData: any = { status }
  if (videoUrl) updateData.video_url = videoUrl
  
  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', orderId)
    .select()
    .single()
  
  if (error) {
    console.error('Erro ao atualizar pedido:', error)
    throw error
  }
  
  return data
}

// Contar pedidos do dia (para slots limitados)
export async function getTodayOrdersCount() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())
  
  if (error) {
    console.error('Erro ao contar pedidos:', error)
    return 0
  }
  
  return count || 0
}
