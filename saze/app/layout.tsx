import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import Providers from '@/components/providers'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://saze-nails.vercel.app'),
  title: 'SAZÉ | Luxury Press-On Nails',
  description:
    'SAZÉ — Because Details Matter. Affordable luxury press-on nails, handcrafted with precision. Pan-India shipping. DM to order.',
  keywords: ['press on nails', 'luxury nails', 'nail art', 'SAZÉ', 'saze.in', 'Goa'],
  openGraph: {
    title: 'SAZÉ | Luxury Press-On Nails',
    description: 'Affordable Glam. Luxury Press-On Nails. Pan-India Shipping.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SAZÉ',
    images: [{ url: '/images/hero-nails.png', width: 1024, height: 1024, alt: 'SAZÉ handcrafted gold and floral nail art' }],
  },
  twitter: { card: 'summary_large_image', title: 'SAZÉ | Luxury Press-On Nails', description: 'A little glam. A lot of you. Handcrafted in Goa, shipped across India.', images: ['/images/hero-nails.png'] },
  icons: { icon: '/images/saze-logo.png', apple: '/images/saze-logo.png' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101526',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-background`}>
      <body className="antialiased" style={{ fontFamily: 'var(--font-jost), sans-serif' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
