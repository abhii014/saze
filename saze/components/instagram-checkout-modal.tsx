'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Sparkles } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_DM_URL } from '@/lib/instagram'

interface Props {
  isOpen: boolean
  onClose: () => void
  message: string
}

export default function InstagramCheckoutModal({ isOpen, onClose, message }: Props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setCopied(false)
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  async function handleOpenInstagram() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      // fallback
    }

    // Open Instagram DMs in a new tab/app window
    window.open(INSTAGRAM_DM_URL, '_blank', 'noopener,noreferrer')

    setTimeout(() => {
      setCopied(false)
    }, 3500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative w-full max-w-lg bg-[#f7f3ec] text-[#202739] dark:bg-[#151a2d] dark:text-[#f7f3ec] rounded-3xl p-6 sm:p-8 shadow-2xl border border-gold/20 z-10 my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close checkout modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <Sparkles size={22} className="text-gold" />
              </div>
              <div>
                <h2
                  id="checkout-modal-title"
                  className="font-serif text-3xl sm:text-4xl leading-tight font-normal text-foreground"
                >
                  Almost there!
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: 'var(--font-jost)' }}>
                  Two quick steps to order.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-6" style={{ fontFamily: 'var(--font-jost)' }}>
              {/* Step 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-gold/20 text-gold border border-gold/30 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Open SAZÉ&apos;s Instagram DMs
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Tap below: your order is copied automatically and the chat opens.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-gold/20 text-gold border border-gold/30 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Paste &amp; send
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Drop it into the message box, hit send, and SAZÉ takes it from there 💛
                  </p>
                </div>
              </div>
            </div>

            {/* Your Message Box */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gold mb-2" style={{ fontFamily: 'var(--font-jost)' }}>
                Your message
              </p>
              <div className="bg-white/80 dark:bg-card/70 border border-border/70 rounded-2xl p-4 text-xs leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-foreground/90 shadow-inner">
                {message}
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              type="button"
              onClick={handleOpenInstagram}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[52px] rounded-full bg-gold hover:bg-gold/90 text-primary-foreground font-medium text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-gold/20 transition-colors"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.04em' }}
            >
              {copied ? (
                <>
                  <Check size={18} className="text-primary-foreground" />
                  <span>Copied! Opening Instagram…</span>
                </>
              ) : (
                <>
                  <InstagramIcon size={19} />
                  <span>Open Instagram &amp; paste</span>
                </>
              )}
            </motion.button>

            {/* Note under button */}
            <p className="text-center text-[11px] text-muted-foreground mt-3 leading-relaxed" style={{ fontFamily: 'var(--font-jost)' }}>
              No online payment, you&apos;ll settle up with SAZÉ in the chat.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
