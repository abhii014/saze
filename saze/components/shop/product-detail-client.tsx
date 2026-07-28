'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Check, Package, Sparkles } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useState } from 'react'

const badgeStyles: Record<string, string> = {
  bestseller: 'bg-gold text-primary-foreground',
  new: 'bg-emerald-600 text-white',
  limited: 'bg-red-900/80 text-red-100',
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-muted-foreground mb-8"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.badge && (
            <span
              className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider ${badgeStyles[product.badge]}`}
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p
            className="text-xs text-gold uppercase tracking-[0.2em] mb-2"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ✦ {product.category}
          </p>
          <h1
            className="text-4xl md:text-5xl font-light text-foreground mb-2 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            {product.name}
          </h1>
          <p
            className="text-muted-foreground text-sm italic mb-6"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem' }}
          >
            {product.tagline}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-3xl font-semibold text-gold"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className="text-lg text-muted-foreground line-through"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className="text-sm text-muted-foreground leading-relaxed mb-8 border-b border-border pb-8"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {product.description}
          </p>

          {/* Includes */}
          <div className="mb-8">
            <p
              className="text-xs text-gold uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              What&apos;s Included
            </p>
            <ul className="space-y-2">
              {product.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  <Check size={14} className="text-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            disabled={!product.available}
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-full text-sm font-medium transition-all duration-200 ${
              added
                ? 'bg-emerald-600 text-white'
                : product.available
                ? 'bg-gold text-primary-foreground hover:opacity-90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.1em' }}
          >
            {added ? (
              <>
                <Check size={18} />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                {product.available ? 'Add to Cart' : 'Out of Stock'}
              </>
            )}
          </button>

          {added && (
            <div className="mt-4 text-center">
              <Link
                href="/cart"
                className="text-sm text-gold hover:underline"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                View Cart &rarr;
              </Link>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Package, text: 'Pan-India Shipping' },
              { icon: Sparkles, text: 'Handcrafted Quality' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 border border-border rounded-xl p-3"
              >
                <Icon size={16} className="text-gold flex-shrink-0" />
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
