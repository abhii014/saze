'use client'

import { useState } from 'react'
import { X, Copy, Check, ExternalLink } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import type { CartItem } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'

const IG_USERNAME = '_saze.in_'

interface Props {
  open: boolean
  onClose: () => void
  items: CartItem[]
  subtotal: number
}

function buildMessage(items: CartItem[], subtotal: number): string {
  const lines = items.map(
    (i) => `• ${i.product.name} × ${i.quantity}: ${formatPrice(i.product.price * i.quantity)}`
  )
  return [
    `Hi SAZÉ! 💅 I'd love to order:`,
    '',
    ...lines,
    '',
    `Total: ${formatPrice(subtotal)}`,
    '',
    `Could you let me know availability and how to proceed? Thank you! ✨`,
  ].join('\n')
}

export default function InstagramOrderModal({ open, onClose, items, subtotal }: Props) {
  const [copied, setCopied] = useState(false)
  const message = buildMessage(items, subtotal)

  function handleCopyAndOpen() {
    navigator.clipboard.writeText(message).catch(() => {
      // fallback: user can manually copy
    })
    setCopied(true)
    setTimeout(() => {
      window.open(`https://ig.me/m/${IG_USERNAME}`, '_blank', 'noopener,noreferrer')
    }, 300)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Order on Instagram"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                <InstagramIcon size={16} className="text-white" />
              </div>
              <h2
                className="text-xl font-semibold text-foreground"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Almost there!
              </h2>
            </div>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-jost)' }}>
              Two quick steps to order.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Steps */}
        <div className="px-6 pb-4 space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-primary-foreground text-xs font-bold flex items-center justify-center">
              1
            </div>
            <div>
              <p className="text-sm font-medium text-foreground" style={{ fontFamily: 'var(--font-jost)' }}>
                Open SAZÉ&apos;s Instagram DMs
              </p>
              <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: 'var(--font-jost)' }}>
                Tap below: your order is copied automatically and the chat opens.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-primary-foreground text-xs font-bold flex items-center justify-center">
              2
            </div>
            <div>
              <p className="text-sm font-medium text-foreground" style={{ fontFamily: 'var(--font-jost)' }}>
                Paste &amp; send
              </p>
              <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: 'var(--font-jost)' }}>
                Drop it into the message box, hit send, and SAZÉ takes it from there ✨
              </p>
            </div>
          </div>
        </div>

        {/* Message preview */}
        <div className="mx-6 mb-4">
          <p
            className="text-xs text-muted-foreground uppercase tracking-widest mb-2"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Your Message
          </p>
          <div className="bg-secondary border border-border rounded-xl p-4">
            <pre
              className="text-sm text-foreground whitespace-pre-wrap leading-relaxed"
              style={{ fontFamily: 'var(--font-jost)', fontSize: '0.8rem' }}
            >
              {message}
            </pre>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <button
            onClick={handleCopyAndOpen}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.05em' }}
          >
            {copied ? (
              <>
                <Check size={18} />
                Copied! Opening Instagram...
              </>
            ) : (
              <>
                <InstagramIcon size={18} />
                Open Instagram &amp; paste
                <ExternalLink size={14} className="ml-1 opacity-70" />
              </>
            )}
          </button>
          <p
            className="text-center text-xs text-muted-foreground mt-3"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            No online payment — you&apos;ll settle up with SAZÉ in the DMs.
          </p>
        </div>
      </div>
    </div>
  )
}
