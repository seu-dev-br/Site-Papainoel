import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vídeo Personalizado do Papai Noel | Presente Mágico para Crianças',
  description: 'Receba um vídeo exclusivo e personalizado do Papai Noel com o nome da criança em até 2 horas! Magia do Natal garantida por apenas R$ 49,99. Mais de 1.250 famílias felizes!',
  keywords: ['papai noel', 'vídeo personalizado', 'natal', 'presente natal', 'vídeo papai noel'],
  authors: [{ name: 'Natal Mágico' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Vídeo Personalizado do Papai Noel',
    description: 'Surpreenda com um vídeo mágico do Papai Noel personalizado!',
    siteName: 'Vídeo Papai Noel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vídeo Personalizado do Papai Noel',
    description: 'Magia do Natal personalizada em até 2 horas!',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0F7B3D',
              color: '#fff',
              fontWeight: 'bold',
            },
            success: {
              iconTheme: {
                primary: '#FFD700',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
