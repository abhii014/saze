'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'
import { useState } from 'react'
import InstagramOrderModal from '@/components/instagram-order-modal'

export default function CartClient() {
  const { items, removeItem, updateQty, clearCart, subtotal, totalItems } = useCart()
  const [modalOpen, setModalOpen] = useState(false)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6">
          <ShoppingBag size={28} className="text-muted-foreground" />
        </div>
        <h1
          className="text-4xl font-light text-foreground mb-3"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          your cart is empty
        </h1>
        <p
          className="text-sm text-muted-foreground mb-8"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Looks like you haven&apos;t added anything yet. Time to explore the collection!
        </p>
        <Link
          href="/shop"
          className="bg-gold text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
        >
          Shop Collection
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-muted-foreground mb-4"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Cart</span>
        </nav>
        <h1
          className="text-5xl md:text-6xl font-light text-foreground mb-10"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          your cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-card border border-border rounded-2xl p-4 sm:p-5"
              >
                {/* Image */}
                <Link
                  href={`/shop/${item.product.id}`}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/shop/${item.product.id}`}>
                        <h3
                          className="text-lg font-medium text-foreground hover:text-gold transition-colors leading-tight"
                          style={{ fontFamily: 'var(--font-cormorant), serif' }}
                        >
                          {item.product.name}
                        </h3>
                      </Link>
                      <p
                        className="text-xs text-muted-foreground mt-0.5"
                        style={{ fontFamily: 'var(--font-jost)' }}
                      >
                        {item.product.tagline}
                      </p>
                    </div>
                    <span
                      className="text-base font-semibold text-gold flex-shrink-0"
                      style={{ fontFamily: 'var(--font-jost)' }}
                    >
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  {/* Qty + remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 border border-border rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        className="w-8 text-center text-sm text-foreground"
                        style={{ fontFamily: 'var(--font-jost)' }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400 transition-colors"
                      style={{ fontFamily: 'var(--font-jost)' }}
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2
                className="text-2xl font-light text-foreground mb-6"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Order summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-jost)' }}>
                  <span className="text-muted-foreground">Items ({totalItems})</span>
                  <span className="text-foreground">{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-jost)' }}>
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-jost)' }}>
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated in DMs</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between" style={{ fontFamily: 'var(--font-jost)' }}>
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-gold font-semibold text-lg">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Order on Instagram CTA */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.05em' }}
              >
                <InstagramIcon size={18} />
                Order on Instagram
              </button>

              <p
                className="text-center text-xs text-muted-foreground mt-3"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                We&apos;ll walk you through sending your order to{' '}
                <a
                  href="https://www.instagram.com/_saze.in_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  @_saze.in_
                </a>
                .
              </p>

              <button
                onClick={clearCart}
                className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <InstagramOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        items={items}
        subtotal={subtotal}
      />
    </>
  )
}
