import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'
import UrgencyBanner from '@/components/ui/UrgencyBanner'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Banner de urgência no topo */}
      <UrgencyBanner />
      
      {/* Seção principal - Hero com CTA */}
      <Hero />
      
      {/* Prova social imediata */}
      <SocialProof />
      
      {/* Diferenciais do produto */}
      <Features />
      
      {/* Como funciona (processo simples) */}
      <HowItWorks />
      
      {/* Depoimentos e cases reais */}
      <Testimonials />
      
      {/* Preço e oferta */}
      <Pricing />
      
      {/* Perguntas frequentes */}
      <FAQ />
      
      {/* Rodapé com informações legais */}
      <Footer />
      
      {/* CTA flutuante sempre visível */}
      <FloatingCTA />
    </main>
  )
}
