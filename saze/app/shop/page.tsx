import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ShopClient from '@/components/shop/shop-client'

export const metadata = {
  title: 'Shop | SAZÉ',
  description: 'Browse the full SAZÉ press-on nail collection. Everyday, bridal, festive, and custom designs.',
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-jost)' }}>
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <span>/</span>
              <span className="text-foreground">Shop</span>
            </nav>
            <h1
              className="text-5xl md:text-6xl font-light text-foreground"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              the shop
            </h1>
            <p
              className="text-muted-foreground mt-2 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Every set is made to order. Pick your favourite and DM us on Instagram to place your order.
            </p>
          </div>

          <ShopClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
