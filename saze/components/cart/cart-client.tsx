'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, Copy, Check, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'
import { useRef, useState } from 'react'
import InstagramOrderLink from '@/components/instagram-order-link'
import { buildOrderMessage, INSTAGRAM_USERNAME } from '@/lib/instagram'

export default function CartClient() {
  const { items, removeItem, updateQty, clearCart, subtotal, totalItems, isHydrated } = useCart()
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'manual'>('idle')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const message = buildOrderMessage(items, subtotal)

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(message)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('manual')
      requestAnimationFrame(() => textareaRef.current?.select())
    }
  }

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
        <p className="text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
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
      <nav aria-label="Breadcrumb" className="flex gap-2 text-xs text-muted-foreground mb-7">
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
                    <span className="text-sm font-medium text-gold">{formatPrice(product.price * quantity)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{product.tagline}</p>
                  <div className="flex items-center justify-between gap-2 mt-4">
                    <div className="inline-flex items-center border border-border rounded-sm bg-card/40">
                      <button
                        type="button"
                        onClick={() => { updateQty(product.id, quantity - 1); setCopyStatus('idle') }}
                        className="h-10 w-10 grid place-items-center hover:text-gold transition-colors"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-7 text-center text-xs font-medium" aria-label={`Quantity ${quantity}`}>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => { updateQty(product.id, quantity + 1); setCopyStatus('idle') }}
                        className="h-10 w-10 grid place-items-center hover:text-gold transition-colors"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => { removeItem(product.id); setCopyStatus('idle') }}
                      className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-red-400 transition-colors min-h-10"
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

          <Link href="/shop" className="inline-flex gap-2 items-center mt-4 text-xs border-b border-gold pb-1 gold-underline">
            A little more browsing <ArrowRight size={14} />
          </Link>
        </div>

        <aside className="bg-card/70 backdrop-blur-md p-6 sm:p-8 self-start lg:sticky lg:top-32 border border-border/80 rounded-sm shadow-xl">
          <h2 className="font-serif text-3xl mb-6">The lovely little details</h2>
          <div className="space-y-3 text-xs mb-5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sets</span>
              <span className="font-medium">{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-gold">Confirmed in DMs</span>
            </div>
          </div>
          <div className="border-t border-border pt-4 flex justify-between items-baseline mb-6">
            <span className="text-sm font-medium">Subtotal</span>
            <span className="text-2xl font-semibold text-gold font-serif">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-5">
            Copy the ready-to-send order message, then open Instagram. On @{INSTAGRAM_USERNAME}, tap Message and paste it into your conversation.
          </p>
          <motion.button
            type="button"
            onClick={copyOrder}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="button-outline w-full mb-3"
          >
            {copyStatus === 'copied' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            {copyStatus === 'copied' ? 'Message copied' : 'Copy order message'}
          </motion.button>
          <InstagramOrderLink
            className="button-primary w-full shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
            label="Open Instagram to send your order message"
          >
            Open Instagram to order
          </InstagramOrderLink>
          <p role="status" className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
            {copyStatus === 'copied'
              ? 'Copied! Your cart stays here while you paste the message in Instagram.'
              : copyStatus === 'manual'
              ? 'Automatic copying is unavailable. The order message is selected below — copy it, then open Instagram.'
              : 'Availability, fit, payment, and delivery are confirmed personally in DMs.'}
          </p>
          <details className="mt-5 text-xs" open={copyStatus === 'manual' ? true : undefined}>
            <summary className="text-muted-foreground hover:text-foreground cursor-pointer">View your order message</summary>
            <textarea
              ref={textareaRef}
              readOnly
              value={message}
              onFocus={(event) => event.currentTarget.select()}
              aria-label="Your order message — select to copy"
              className="mt-3 w-full h-48 resize-y border border-border bg-background/80 p-3 text-xs leading-relaxed rounded-sm focus:outline-none focus:border-gold"
            />
          </details>
          <button
            type="button"
            onClick={clearCart}
            className="w-full mt-5 text-[11px] min-h-10 text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  )
}
