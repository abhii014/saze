import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ShopClient from '@/components/shop/shop-client'
import { Suspense } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Shop | SAZÉ',
  description: 'Browse the full SAZÉ press-on nail collection. Everyday, bridal, festive, and custom designs.',
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-28 light-section pb-20">
        <div className="section-shell py-12 md:py-16">
          {/* Header */}
          <div className="mb-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-jost)' }}>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Shop</span>
            </nav>
            <p className="eyebrow mb-4 mt-8">A set for every version of you</p>
            <h1
              className="display-heading text-foreground"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              The little <em className="text-gold">glam collection.</em>
            </h1>
            <p
              className="text-muted-foreground mt-2 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Every set is made to order. Pick your favourite and DM us on Instagram to place your order.
            </p>
          </div>

          <Suspense fallback={<div role="status" className="py-16 text-sm text-muted-foreground">Finding your next nail crush…</div>}>
            <ShopClient />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
