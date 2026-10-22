'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Check, Package, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'
import { formatPrice, getCategoryLabel } from '@/lib/products'
import { useState, useEffect } from 'react'
import InstagramCheckoutModal from '@/components/instagram-checkout-modal'
import { INSTAGRAM_USERNAME, buildSingleProductMessage } from '@/lib/instagram'

const badgeStyles: Record<string, string> = {
  bestseller: 'bg-gold text-primary-foreground border-gold/40',
  new: 'bg-emerald-600/90 text-white border-emerald-500/40',
  limited: 'bg-red-900/80 text-red-100 border-red-700/40',
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product>(product)

  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Product[]) => {
        if (Array.isArray(data)) {
          const found = data.find((p) => p.id === product.id)
          if (found) setCurrentProduct(found)
        }
      })
      .catch(() => {})
  }, [product.id])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const orderMessage = buildSingleProductMessage(currentProduct.name, currentProduct.price)

  function handleAdd() {
    addItem(currentProduct)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2.5 text-sm sm:text-base text-muted-foreground mb-8"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{currentProduct.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border/60 shadow-2xl group"
        >
          <Image
            src={product.image}
            alt={currentProduct.name}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.badge && (
            <span
              className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider border backdrop-blur-md shadow-md ${badgeStyles[product.badge]}`}
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              ✦ {product.badge}
            </span>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col justify-center"
        >
          <p
            className="text-sm text-gold uppercase tracking-[0.16em] mb-2 font-medium"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ✦ {getCategoryLabel(product.category)}
          </p>
          <h1
            className="text-3xl md:text-4xl font-light text-foreground mb-2 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            {currentProduct.name}
          </h1>
          <p
            className="text-muted-foreground text-sm italic mb-6"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem' }}
          >
            {currentProduct.tagline}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-3xl font-semibold text-gold"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {formatPrice(currentProduct.price)}
            </span>
            {currentProduct.originalPrice && (
              <span
                className="text-lg text-muted-foreground line-through"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                {formatPrice(currentProduct.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className="text-base text-muted-foreground leading-relaxed mb-8 border-b border-border pb-8"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {currentProduct.description}
          </p>

          {/* Includes */}
          <div className="mb-8">
            <p
              className="text-sm text-gold uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              What&apos;s Included
            </p>
            <ul className="space-y-2">
              {currentProduct.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  <Check size={14} className="text-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {currentProduct.available && (
            <motion.button
              type="button"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="button-primary w-full mb-3 min-h-[50px] rounded-full shadow-lg text-sm font-medium tracking-wide"
            >
              Order on Instagram
            </motion.button>
          )}

          {/* Save multiple sets together before ordering. */}
          <motion.button
            onClick={handleAdd}
            disabled={!currentProduct.available}
            whileHover={currentProduct.available ? { scale: 1.01 } : {}}
            whileTap={currentProduct.available ? { scale: 0.98 } : {}}
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-900/30'
                : currentProduct.available
                ? 'border border-border text-foreground hover:border-gold hover:text-gold bg-card/60 backdrop-blur-sm'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.1em' }}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check size={18} />
                  Added to Cart
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag size={18} />
                  {currentProduct.available ? 'Add to Cart' : 'Out of Stock'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <p className="text-center text-sm leading-relaxed text-muted-foreground mt-4">
            Ordering opens Instagram DMs with @{INSTAGRAM_USERNAME} to confirm sizing and availability.
          </p>

          {added && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <Link
                href="/cart"
                className="text-sm text-gold hover:underline font-medium inline-block"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                View Cart &rarr;
              </Link>
            </motion.div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Package, text: 'Pan-India Shipping' },
              { icon: Sparkles, text: 'Handcrafted Quality' },
            ].map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 border border-border/80 bg-card/30 rounded-xl p-3.5 transition-colors hover:border-gold/30"
              >
                <Icon size={16} className="text-gold flex-shrink-0" />
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Checkout Modal for this product */}
      <InstagramCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={orderMessage}
      />
    </div>
  )
}
