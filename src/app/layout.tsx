import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'TalentHub — Encuentra tu próximo trabajo', template: '%s | TalentHub' },
  description: 'El portal de empleo más moderno. Miles de oportunidades laborales en un solo lugar.',
  keywords: ['empleo', 'trabajo', 'jobs', 'ofertas de trabajo', 'bolsa de trabajo'],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'TalentHub',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-surface min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
