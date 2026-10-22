import Footer from '@/components/footer'
import ShopClient from '@/components/shop/shop-client'
import { Suspense } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Shop | SAZÉ',
  description: 'Browse the full SAZÉ collection of press-on nails and new gold-tone necklaces. Everyday, bridal, festive, and custom designs.',
}

export default function ShopPage() {
  return (
    <>
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
              Every detail is made to order. Explore press-on nails and new necklaces, then DM us on Instagram to place your order.
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
