'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Sparkles, ExternalLink } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_USERNAME, INSTAGRAM_URL, INSTAGRAM_APP_URL } from '@/lib/instagram'

interface Props {
  isOpen: boolean
  onClose: () => void
  message: string
}

export default function InstagramCheckoutModal({ isOpen, onClose, message }: Props) {
  const [copied, setCopied] = useState(false)
  const [copiedAction, setCopiedAction] = useState<'app' | 'web' | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setCopied(false)
      setCopiedAction(null)
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    const prevTouchAction = document.body.style.touchAction
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      document.body.style.touchAction = prevTouchAction
    }
  }, [isOpen, onClose])

  async function handleOpenApp() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setCopiedAction('app')
    } catch {
      // fallback
    }

    // Launch native Instagram App on laptop or mobile phone
    window.location.href = INSTAGRAM_APP_URL

    setTimeout(() => {
      setCopied(false)
      setCopiedAction(null)
    }, 4000)
  }

  async function handleOpenWeb() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setCopiedAction('web')
    } catch {
      // fallback
    }

    // Open Instagram Web in a new tab
    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer')

    setTimeout(() => {
      setCopied(false)
      setCopiedAction(null)
    }, 4000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card - Fixed Center on Mobile & Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative w-full max-w-[440px] sm:max-w-lg bg-[#f7f3ec] text-[#202739] dark:bg-[#151a2d] dark:text-[#f7f3ec] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-gold/25 z-10 max-h-[92dvh] overflow-y-auto overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close checkout modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-4 sm:mb-5 pr-8">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <Sparkles size={19} className="text-gold" />
              </div>
              <div>
                <h2
                  id="checkout-modal-title"
                  className="font-serif text-2xl sm:text-3xl leading-tight font-normal text-foreground"
                >
                  Almost there!
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: 'var(--font-jost)' }}>
                  Two quick steps to order.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3 mb-4 sm:mb-5" style={{ fontFamily: 'var(--font-jost)' }}>
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gold/20 text-gold border border-gold/30 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-foreground">
                    Launch Instagram &amp; copy order
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Tap below: your order is auto-copied and opens your logged-in Instagram application.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gold/20 text-gold border border-gold/30 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-foreground">
                    Paste &amp; send in DM
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Tap Message, paste your order (Ctrl+V), and SAZÉ will confirm sizing and shipping 💛
                  </p>
                </div>
              </div>
            </div>

            {/* Your Message Box */}
            <div className="mb-4 sm:mb-5">
              <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-gold mb-1.5" style={{ fontFamily: 'var(--font-jost)' }}>
                Your order message
              </p>
              <div className="bg-white/90 dark:bg-card/80 border border-border/70 rounded-xl p-3 sm:p-3.5 text-xs leading-relaxed max-h-28 sm:max-h-36 overflow-y-auto whitespace-pre-wrap font-sans text-foreground/90 shadow-inner select-text">
                {message}
              </div>
            </div>

            {/* Primary Action Button: Opens native Instagram App */}
            <motion.button
              type="button"
              onClick={handleOpenApp}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[48px] sm:min-h-[50px] rounded-full bg-gold hover:bg-gold/90 text-primary-foreground font-medium text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-gold/20 transition-colors"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.04em' }}
            >
              {copied && copiedAction === 'app' ? (
                <>
                  <Check size={18} className="text-primary-foreground" />
                  <span>Copied! Opening Instagram App…</span>
                </>
              ) : (
                <>
                  <InstagramIcon size={19} />
                  <span>Open in Instagram App &amp; paste</span>
                </>
              )}
            </motion.button>

            {/* Secondary Action Option: Web Browser */}
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={handleOpenWeb}
                className="text-xs text-muted-foreground hover:text-gold transition-colors inline-flex items-center gap-1.5 py-1 underline-offset-4 hover:underline"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                <span>Or open in web browser (instagram.com)</span>
                <ExternalLink size={13} />
              </button>
            </div>

            {/* Note under button */}
            <p className="text-center text-[11px] text-muted-foreground/80 mt-2 leading-relaxed" style={{ fontFamily: 'var(--font-jost)' }}>
              No online payment here — you&apos;ll confirm and pay SAZÉ directly in DM.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
