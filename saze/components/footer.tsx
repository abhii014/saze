import Link from 'next/link'
import Image from 'next/image'
import InstagramIcon from '@/components/icons/instagram-icon'

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/images/saze-logo.png" alt="SAZÉ" fill className="object-contain rounded-full" />
              </div>
              <span
                className="text-xl tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 600 }}
              >
                SAZ<span className="text-gold">É</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Luxury press-on nails crafted with precision. Because every detail matters.
              Pan-India shipping — DM to order.
            </p>
            <a
              href="https://www.instagram.com/_saze.in_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-gold transition-colors px-4 py-2 rounded-full"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              <InstagramIcon size={16} />
              @_saze.in_
            </a>
          </div>

          {/* Shop links */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase text-gold mb-5"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/shop', label: 'All Products' },
                { href: '/shop?category=everyday', label: 'Everyday' },
                { href: '/shop?category=bridal', label: 'Bridal' },
                { href: '/shop?category=festive', label: 'Festive' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase text-gold mb-5"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Info
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About SAZÉ' },
                { href: '/custom-order', label: 'Custom Order' },
                { href: '/cart', label: 'Your Cart' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p
                className="text-xs text-muted-foreground/70 mb-1"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                Goa, India
              </p>
              <a
                href="https://www.instagram.com/_saze.in_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gold hover:text-foreground transition-colors"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                DM to Order
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-muted-foreground/60"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            &copy; {new Date().getFullYear()} SAZÉ. All rights reserved.
          </p>
          <p
            className="text-xs text-muted-foreground/60"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Made with care &amp; glitter
          </p>
        </div>
      </div>
    </footer>
  )
}
