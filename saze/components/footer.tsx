'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_URL, INSTAGRAM_USERNAME } from '@/lib/instagram'

export default function Footer() {
  return (
    <footer className="border-t border-border pt-14 pb-24 sm:pb-8 relative overflow-hidden">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] pb-12">
          <div>
            <Link href="/" className="font-serif text-5xl tracking-[0.15em] inline-block hover:opacity-90 transition-opacity">
              SAZ<span className="text-gold">É</span>
            </Link>
            <p className="mt-3 font-serif text-2xl italic text-gold">Because details matter.</p>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mt-4 mb-6">
              Handcrafted press-on nails and little finishing pieces for your everyday and your unforgettable. From Goa, with a little extra glam.
            </p>
            <motion.a
              href={INSTAGRAM_URL}
              whileHover={{ x: 3 }}
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-gold transition-colors gold-underline"
            >
              <InstagramIcon size={17} /> @{INSTAGRAM_USERNAME} <ArrowUpRight size={14} />
            </motion.a>
          </div>
          <div>
            <h2 className="eyebrow mb-5">Find your glam</h2>
            <ul className="space-y-3">
              {[
                { href: '/shop', label: 'The full collection' },
                { href: '/shop?category=everyday', label: 'Everyday muse' },
                { href: '/shop?category=bridal', label: 'Bridal glow' },
                { href: '/shop?category=festive', label: 'After dark' },
                { href: '/shop?category=necklaces', label: 'Necklaces' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-gold transition-colors gold-underline inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5">A little more</h2>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'Our story' },
                { href: '/custom-order', label: 'Made for you' },
                { href: '/cart', label: 'Your cart' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-gold transition-colors gold-underline inline-block">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <motion.a
                  href={INSTAGRAM_URL}
                  whileHover={{ x: 2 }}
                  className="text-sm text-gold inline-flex gap-1 items-center hover:text-cream transition-colors"
                >
                  Order on Instagram <ArrowUpRight size={13} />
                </motion.a>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-6 uppercase tracking-widest">
              Goa, India · Shipping nationwide
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SAZÉ. All the little details reserved.</p>
          <p className="text-gold/80">Small-batch nails. Big main-character energy.</p>
        </div>
      </div>
    </footer>
  )
}
