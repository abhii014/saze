'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'
import { useState } from 'react'
import InstagramCheckoutModal from '@/components/instagram-checkout-modal'
import { buildOrderMessage, INSTAGRAM_USERNAME } from '@/lib/instagram'

export default function CartClient() {
  const { items, removeItem, updateQty, clearCart, subtotal, totalItems, isHydrated } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const message = buildOrderMessage(items, subtotal)

  if (!isHydrated) {
    return (
      <div className="section-shell min-h-[60vh] py-24 text-center text-sm text-muted-foreground flex items-center justify-center gap-3" role="status">
        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
        Loading your cart…
      </div>
    )
  }

  if (!items.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-shell py-20 min-h-[65vh] flex flex-col items-center justify-center text-center"
      >
        <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={{ duration: 0.3 }}>
          <ShoppingBag size={40} strokeWidth={1} className="text-gold mb-6" />
        </motion.div>
        <p className="eyebrow mb-4">A little room for something lovely</p>
        <h1 className="display-heading mb-5">
          Your next nail <em className="text-gold italic">crush awaits.</em>
        </h1>
        <p className="text-base text-muted-foreground mb-8 max-w-sm leading-relaxed">
          Your cart is empty. Find a set you love and tap + to keep all your favourites together.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link href="/shop" className="button-primary">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="section-shell py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-sm sm:text-base text-muted-foreground mb-7">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Cart</span>
      </nav>
      <p className="eyebrow mb-4">Excellent taste, by the way</p>
      <h1 className="display-heading mb-10">
        Your little <em className="text-gold italic">collection.</em>
      </h1>

      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-16">
        <div>
          <AnimatePresence>
            {items.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex gap-4 sm:gap-6 border-t border-border py-6"
              >
                <Link
                  href={`/shop/${product.id}`}
                  className="relative h-24 w-20 sm:h-32 sm:w-28 shrink-0 overflow-hidden rounded-[3px] border border-border/60 hover:border-gold/50 transition-colors"
                >
                  <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 hover:scale-108" sizes="112px" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap justify-between gap-2">
                    <Link href={`/shop/${product.id}`}>
                      <h2 className="font-serif text-2xl hover:text-gold transition-colors">{product.name}</h2>
                    </Link>
                    <span className="text-base sm:text-lg font-medium text-gold font-serif">{formatPrice(product.price * quantity)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{product.tagline}</p>
                  <div className="flex items-center justify-between gap-2 mt-4">
                    <div className="inline-flex items-center border border-border rounded-sm bg-card/40">
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="h-10 w-10 grid place-items-center hover:text-gold transition-colors"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-medium" aria-label={`Quantity ${quantity}`}>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="h-10 w-10 grid place-items-center hover:text-gold transition-colors"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-red-400 transition-colors min-h-10"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={13} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link href="/shop" className="inline-flex gap-2 items-center mt-4 text-sm border-b border-gold pb-1 gold-underline">
            A little more browsing <ArrowRight size={14} />
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="bg-card/70 backdrop-blur-md p-6 sm:p-8 self-start lg:sticky lg:top-32 border border-border/80 rounded-2xl shadow-xl">
          <h2 className="font-serif text-3xl mb-6">Order summary</h2>
          <div className="space-y-3.5 text-sm mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Items</span>
              <span className="font-medium text-foreground">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-base sm:text-lg font-medium text-gold font-serif">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-xs sm:text-sm text-muted-foreground">Calculated at checkout</span>
            </div>
          </div>

          <div className="border-t border-border/80 pt-5 mb-5">
            <motion.button
              type="button"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="button-primary w-full min-h-[50px] rounded-full shadow-lg text-base font-medium tracking-wide"
            >
              Order on Instagram
            </motion.button>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
              We&apos;ll walk you through sending your order to{' '}
              <span className="text-gold font-medium">@{INSTAGRAM_USERNAME}</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-2 text-center"
          >
            Clear cart
          </button>
        </aside>
      </div>

      {/* Checkout Modal */}
      <InstagramCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={message}
      />
    </div>
  )
}
