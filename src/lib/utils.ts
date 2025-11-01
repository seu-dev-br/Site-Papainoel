import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina classes do Tailwind CSS de forma inteligente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata preço para real brasileiro
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida telefone brasileiro
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+55|55)?(\d{2})?9?\d{8}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

/**
 * Sanitiza string removendo caracteres perigosos
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 500) // Limite de caracteres
}

/**
 * Calcula slots restantes do dia
 */
export function calculateRemainingSlots(ordersToday: number): number {
  const maxSlots = parseInt(process.env.NEXT_PUBLIC_DAILY_SLOTS || '50')
  const remaining = maxSlots - ordersToday
  return Math.max(0, remaining)
}

/**
 * Gera mensagem de urgência baseada em slots
 */
export function getUrgencyMessage(slotsRemaining: number): string {
  if (slotsRemaining <= 5) {
    return `🔥 ÚLTIMAS ${slotsRemaining} VAGAS HOJE!`
  }
  if (slotsRemaining <= 15) {
    return `⚡ Restam apenas ${slotsRemaining} vagas para entrega hoje!`
  }
  return `✨ ${slotsRemaining} vagas disponíveis hoje!`
}

/**
 * Compartilhar no WhatsApp
 */
export function shareOnWhatsApp(text: string, url: string): void {
  const message = encodeURIComponent(`${text}\n\n${url}`)
  window.open(`https://wa.me/?text=${message}`, '_blank')
}

/**
 * Analytics helper
 */
export function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, data)
  }
}
