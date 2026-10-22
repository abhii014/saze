'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="group flex flex-col min-w-0 product-card-premium rounded-sm p-2 -m-2 transition-all"
    >
      <div className="relative">
        <Link
          href={`/shop/${product.id}`}
          className="product-photo relative block overflow-hidden aspect-[4/5] bg-card rounded-[3px] border border-border/40 group-hover:border-gold/40 transition-colors"
          aria-label={`View ${product.name}`}
        >
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 45vw, (max-width: 1024px) 45vw, 300px"
            />
          </motion.div>
        </Link>
        {product.badge && (
          <span className="pointer-events-none absolute top-3 left-3 bg-background/90 backdrop-blur-md border border-gold/30 px-2.5 py-1 text-[10px] sm:text-xs tracking-[0.12em] uppercase text-gold font-medium rounded-sm shadow-sm">
            ✦ {product.badge}
          </span>
        )}
        <motion.button
          type="button"
          onClick={handleAdd}
          disabled={!product.available}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-background/95 backdrop-blur-sm text-foreground hover:bg-gold hover:text-primary-foreground border border-border/50 hover:border-gold transition-colors disabled:opacity-40 shadow-md"
          aria-label={added ? `${product.name} added to cart. Add another` : `Add ${product.name} to cart`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="check"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check size={17} />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
        <Link href={`/shop/${product.id}`} className="hover:text-gold transition-colors">
          <motion.h3
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
            className="font-serif text-xl sm:text-2xl leading-tight font-normal"
          >
            {product.name}
          </motion.h3>
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-sm sm:text-base font-medium text-gold font-serif">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs line-through text-muted-foreground">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
      <p className="mt-1.5 mb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>
      {product.available ? (
        <InstagramOrderLink
          className="mt-auto inline-flex min-h-11 items-center justify-center gap-1.5 sm:gap-2 border-t border-border/80 pt-3 text-xs sm:text-sm text-foreground/80 hover:text-gold transition-colors gold-underline"
          label={`Order ${product.name} on Instagram`}
        />
      ) : (
        <span className="mt-auto border-t border-border/80 pt-3 text-xs text-muted-foreground">Currently unavailable</span>
      )}
      <span role="status" className="sr-only">{added ? `${product.name} added to cart` : ''}</span>
    </motion.article>
  )
}
