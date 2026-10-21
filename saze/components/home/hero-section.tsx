'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import InstagramOrderLink from '@/components/instagram-order-link'

export default function HeroSection() {
  return (
    <section className="hero-section luxury-gradient-bg relative overflow-hidden">
      <div className="section-shell relative z-10">
        <div className="grid items-center gap-12 md:grid-cols-[1.08fr_1fr] md:gap-14 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="eyebrow flex items-center gap-2.5 mb-7"
            >
              <Sparkles size={13} className="text-gold animate-pulse" /> Handcrafted press-on nails · Goa, India
            </motion.p>
            <h1 className="hero-title mb-7">
              A little glam.<br />
              A lot of <em className="font-normal text-gold italic">you.</em>
            </h1>
            <p className="max-w-sm text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
              For coffee dates, big nights, and everything in between.
              Nail art that feels like you — because the little details matter.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/shop" className="button-primary">
                  Find your set <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <InstagramOrderLink className="button-outline">
                  Order on Instagram
                </InstagramOrderLink>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-9 flex items-center gap-4 border-t border-cream/10 pt-5"
            >
              <div className="flex -space-x-3" aria-hidden="true">
                {[
                  ['/images/products/IMG-20261012-WA0062.jpg', 'Champagne Bow'],
                  ['/images/products/IMG-20261012-WA0070.jpg', 'Onyx Glimmer'],
                  ['/images/products/IMG-20261012-WA0078.jpg', 'Butterfly Cascade'],
                ].map(([src, alt]) => (
                  <motion.div
                    key={src}
                    whileHover={{ scale: 1.25, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={38}
                      height={38}
                      className="h-10 w-10 rounded-full border-2 border-background object-cover ring-1 ring-gold/20"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Your mood. Your moment.<br />
                <span className="text-foreground font-medium">A set for every version of you.</span>
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative mx-2 md:mx-0"
          >
            <div className="hero-photo relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/hero-nails.png"
                alt="Gold and floral press-on nail art styled with delicate gold rings"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 767px) 90vw, (max-width: 1400px) 45vw, 550px"
              />
              <div className="absolute inset-0 border border-gold/30 rounded-[inherit]" aria-hidden="true" />
            </div>

            {/* Rotating / Floating Seal */}
            <motion.div
              animate={{ rotate: [-12, -8, -12], y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="hero-seal shadow-xl cursor-default"
              aria-hidden="true"
            >
              <span className="text-[8px] tracking-[0.18em] uppercase">Made with</span>
              <Sparkles className="mx-auto text-gold" size={23} />
              <span className="font-serif text-lg italic text-gold">a little love</span>
            </motion.div>

            {/* Floating Luxury Caption */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              whileHover={{ scale: 1.05 }}
              className="hero-caption border border-gold/20 shadow-2xl"
            >
              <p className="text-[8px] tracking-[0.18em] uppercase mb-1 text-gold">The finishing touch</p>
              <p className="font-serif text-xl italic text-navy">Because details matter.</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-between items-center border-t border-cream/10 pt-5">
          <motion.a
            href="#collection"
            whileHover={{ y: 2 }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors"
          >
            A little scroll, a little sparkle <ArrowDown size={13} aria-hidden="true" className="animate-bounce" />
          </motion.a>
          <span className="hidden sm:block text-[10px] text-muted-foreground tracking-[0.12em] uppercase">
            Affordable glam. Always.
          </span>
        </div>
      </div>
    </section>
  )
}
