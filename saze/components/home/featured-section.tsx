import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/products'
import ProductCard from '@/components/product-card'

export default function FeaturedSection() {
  const featured = getFeaturedProducts()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p
            className="text-xs text-gold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ✦ Featured
          </p>
          <h2
            className="text-4xl md:text-5xl font-light leading-none"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            the collection
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {featured.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
