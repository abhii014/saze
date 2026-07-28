'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useState } from 'react'

const badgeStyles: Record<string, string> = {
  bestseller: 'bg-gold text-primary-foreground',
  new: 'bg-emerald-600 text-white',
  limited: 'bg-red-900/80 text-red-100',
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="group relative flex flex-col">
      {/* Image */}
      <Link href={`/shop/${product.id}`} className="relative block overflow-hidden rounded-xl aspect-[4/5] bg-card">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeStyles[product.badge]}`}
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
          >
            {product.badge}
          </span>
        )}

        {/* Quick add button */}
        <button
          onClick={handleAdd}
          disabled={!product.available}
          className={`absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full transition-all duration-200 ${
            added
              ? 'bg-emerald-600 text-white translate-y-0 opacity-100'
              : 'bg-foreground text-background opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
          }`}
          style={{ fontFamily: 'var(--font-jost)' }}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? (
            <>Added</>
          ) : (
            <>
              <Plus size={12} />
              Add
            </>
          )}
        </button>
      </Link>

      {/* Info */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <Link href={`/shop/${product.id}`}>
            <h3
              className="text-base font-medium text-foreground hover:text-gold transition-colors leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {product.name}
            </h3>
          </Link>
          <p
            className="text-xs text-muted-foreground mt-0.5 leading-relaxed"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {product.tagline}
          </p>
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          <span
            className="text-sm font-semibold text-gold"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              className="text-xs text-muted-foreground/60 line-through"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart button (always visible) */}
      <button
        onClick={handleAdd}
        disabled={!product.available}
        className={`mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
          added
            ? 'bg-emerald-600 border-emerald-600 text-white'
            : 'bg-transparent border-border text-muted-foreground hover:border-gold hover:text-foreground'
        } ${!product.available ? 'opacity-40 cursor-not-allowed' : ''}`}
        style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
      >
        <ShoppingBag size={14} />
        {!product.available ? 'Out of Stock' : added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </article>
  )
}
