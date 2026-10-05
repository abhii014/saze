'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { type Product, formatPrice } from '@/lib/products'
import { useEffect, useRef, useState } from 'react'
import InstagramOrderLink from '@/components/instagram-order-link'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  function handleAdd() {
    addItem(product)
    setAdded(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1800)
  }

  return (
    <article className="group flex flex-col min-w-0">
      <div className="relative">
        <Link href={`/shop/${product.id}`} className="product-photo relative block overflow-hidden aspect-[4/5] bg-card" aria-label={`View ${product.name}`}>
          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 767px) 45vw, (max-width: 1024px) 45vw, 300px" />
        </Link>
        {product.badge && <span className="pointer-events-none absolute top-3 left-3 bg-background/95 px-2.5 py-1.5 text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-foreground">{product.badge}</span>}
        <button type="button" onClick={handleAdd} disabled={!product.available}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-background/95 text-foreground hover:bg-gold hover:text-primary-foreground transition-colors disabled:opacity-40"
          aria-label={added ? `${product.name} added to cart. Add another` : `Add ${product.name} to cart`}>
          {added ? <Check size={17} /> : <Plus size={18} />}
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
        <Link href={`/shop/${product.id}`} className="hover:text-gold transition-colors"><h3 className="font-serif text-xl sm:text-2xl leading-tight">{product.name}</h3></Link>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="text-[10px] line-through text-muted-foreground">{formatPrice(product.originalPrice)}</span>}
        </div>
      </div>
      <p className="mt-1.5 mb-4 text-[11px] leading-relaxed text-muted-foreground">{product.tagline}</p>
      {product.available ? (
        <InstagramOrderLink className="mt-auto inline-flex min-h-11 items-center justify-center gap-1.5 sm:gap-2 border-t border-border pt-3 text-[10px] sm:text-xs text-foreground hover:text-gold transition-colors"
          label={`Order ${product.name} on Instagram`} />
      ) : <span className="mt-auto border-t border-border pt-3 text-xs text-muted-foreground">Currently unavailable</span>}
      <span role="status" className="sr-only">{added ? `${product.name} added to cart` : ''}</span>
    </article>
  )
}
