'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Loader2, Send, Sparkles } from 'lucide-react'
import { sanitizeString, isValidEmail, isValidPhone } from '@/lib/utils'
import { createOrder } from '@/lib/supabase'

/**
 * Mensagens pré-definidas para inspiração
 */
const PRE_DEFINED_MESSAGES = [
  "Você foi incrível este ano! Continue sendo essa pessoa especial que ilumina a vida de todos ao seu redor. O Papai Noel está muito orgulhoso de você! Ho ho ho! 🎅",
  
  "Que orgulho ver como você cresceu e se tornou essa pessoa maravilhosa! Continue espalhando amor e alegria por onde passar. Você merece toda a magia do Natal! ❤️🎄",
  
  "Sua bondade e carinho fazem o mundo um lugar melhor! Continue sendo essa luz na vida das pessoas. O Papai Noel tem uma surpresa muito especial preparada para você! ✨",
  
  "Você é muito especial e ilumina a vida de todos que te conhecem! Continue sendo essa pessoa incrível. O Natal é ainda mais mágico com você! 🌟🎁",
  
  "Que alegria ver seu sorriso e sua energia positiva! Continue fazendo o bem e espalhando felicidade. Você merece todo o amor e magia deste Natal! 💖🎅",
  
  "Você torna cada dia mais especial com sua presença! Continue sendo essa pessoa maravilhosa que tanto amamos. O Papai Noel preparou algo muito especial para você! 🎄✨"
]

/**
 * Mensagem padrão caso o usuário não preencha
 */
const DEFAULT_MESSAGE = "Você é muito especial e querido! Continue sendo essa pessoa incrível que ilumina a vida de todos ao seu redor. O Papai Noel está muito feliz com você e preparou uma surpresa especial! Tenha um Natal mágico e cheio de amor! Ho ho ho! 🎅🎄✨"

/**
 * Schema de validação com Zod
 */
const orderSchema = z.object({
  childName: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo'),
  customMessage: z.string()
    .max(300, 'Mensagem muito longa (máximo 300 caracteres)')
    .optional()
    .or(z.literal('')),
  contactEmail: z.string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  contactPhone: z.string()
    .min(10, 'Telefone inválido')
    .optional()
    .or(z.literal(''))
}).refine((data: any) => data.contactEmail || data.contactPhone, {
  message: 'Informe pelo menos um contato (email ou telefone)',
  path: ['contactEmail']
})

type OrderFormData = z.infer<typeof orderSchema>

interface OrderFormProps {
  price: number
}

/**
 * ORDER FORM - Formulário de pedido
 * Validação, sanitização e envio para o backend
 */
export default function OrderForm({ price }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema)
  })

  // Monitora contador de caracteres
  const messageValue = watch('customMessage', '')

  // Função para gerar mensagem aleatória
  const generateRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * PRE_DEFINED_MESSAGES.length)
    const selectedMessage = PRE_DEFINED_MESSAGES[randomIndex]
    setValue('customMessage', selectedMessage)
    setCharCount(selectedMessage.length)
    toast.success('✨ Mensagem gerada! Você pode editá-la se quiser.')
  }
  
  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)
    
    try {
      // Sanitiza inputs
      // Se mensagem estiver vazia, usa a mensagem padrão
      const finalMessage = data.customMessage?.trim() || DEFAULT_MESSAGE
      
      const sanitizedData = {
        child_name: sanitizeString(data.childName),
        custom_message: sanitizeString(finalMessage),
        contact_email: data.contactEmail ? sanitizeString(data.contactEmail) : undefined,
        contact_phone: data.contactPhone ? sanitizeString(data.contactPhone) : undefined,
        status: 'pending' as const,
        payment_status: 'pending' as const,
        amount: price
      }

      // Cria pedido no Supabase
      const order = await createOrder(sanitizedData)
      
      toast.success('Pedido criado! Redirecionando para pagamento...')
      
      // Cria sessão de checkout no Stripe
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: order.id }),
      })

      if (!checkoutResponse.ok) {
        throw new Error('Erro ao criar sessão de pagamento')
      }

      const { url } = await checkoutResponse.json()
      
      // Redireciona para checkout do Stripe
      if (url) {
        window.location.href = url
      } else {
        throw new Error('URL de checkout não retornada')
      }
      
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      toast.error('Erro ao processar pedido. Tente novamente!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Nome da pessoa */}
      <div>
        <label htmlFor="childName" className="block font-semibold text-gray-700 mb-2">
          Nome da Pessoa (qualquer idade!) *
        </label>
        <input
          {...register('childName')}
          type="text"
          id="childName"
          placeholder="Ex: Maria, João, Vovó Rosa, Tio Carlos..."
          className="input-christmas"
          disabled={isSubmitting}
        />
        {errors.childName && (
          <p className="text-red-600 text-sm mt-1">{errors.childName.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          ✨ Funciona para crianças, adultos, idosos - TODOS!
        </p>
      </div>

      {/* Mensagem personalizada */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="customMessage" className="block font-semibold text-gray-700">
            Mensagem Especial (opcional) ({messageValue?.length || 0}/300)
          </label>
          <button
            type="button"
            onClick={generateRandomMessage}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-christmas-green hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-full transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            Gerar Mensagem
          </button>
        </div>
        <textarea
          {...register('customMessage', {
            onChange: (e: any) => setCharCount(e.target.value.length)
          })}
          id="customMessage"
          rows={4}
          placeholder="Deixe em branco para usar nossa mensagem padrão ou clique em 'Gerar Mensagem' para ter inspiração..."
          className="input-christmas resize-none"
          disabled={isSubmitting}
          maxLength={300}
        />
        {errors.customMessage && (
          <p className="text-red-600 text-sm mt-1">{errors.customMessage.message}</p>
        )}
        <div className="flex items-start gap-2 mt-2">
          <div className="text-lg">💡</div>
          <div className="flex-1 text-xs text-gray-500">
            <p className="font-semibold mb-1">Dicas para uma mensagem especial:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Mencione algo específico da pessoa</li>
              <li>Use palavras de carinho e afeto</li>
              <li>Clique em "Gerar Mensagem" para ter inspiração!</li>
              <li><strong>Deixe em branco</strong> e usaremos uma mensagem linda padrão 😊</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contactEmail" className="block font-semibold text-gray-700 mb-2">
          Email para Receber o Vídeo
        </label>
        <input
          {...register('contactEmail')}
          type="email"
          id="contactEmail"
          placeholder="seu@email.com"
          className="input-christmas"
          disabled={isSubmitting}
        />
        {errors.contactEmail && (
          <p className="text-red-600 text-sm mt-1">{errors.contactEmail.message}</p>
        )}
      </div>

      {/* Telefone/WhatsApp */}
      <div>
        <label htmlFor="contactPhone" className="block font-semibold text-gray-700 mb-2">
          WhatsApp/Telefone
        </label>
        <input
          {...register('contactPhone')}
          type="tel"
          id="contactPhone"
          placeholder="(11) 99999-9999"
          className="input-christmas"
          disabled={isSubmitting}
        />
        {errors.contactPhone && (
          <p className="text-red-600 text-sm mt-1">{errors.contactPhone.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          📱 Enviaremos o vídeo por aqui também!
        </p>
      </div>

      {/* Botão submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-cta w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processando...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Continuar para Pagamento</span>
          </>
        )}
      </button>

      {/* Avisos de segurança */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p>🔒 Seus dados estão seguros e protegidos pela LGPD</p>
        <p>✅ Não compartilhamos suas informações com terceiros</p>
      </div>

    </form>
  )
}
