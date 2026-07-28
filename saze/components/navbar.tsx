'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/custom-order', label: 'Custom Order' },
]

export default function Navbar() {
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/images/saze-logo.png"
                  alt="SAZÉ Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span
                className="text-xl md:text-2xl tracking-[0.2em] text-foreground"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 600 }}
              >
                SAZ<span className="text-gold">É</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.15em' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart + Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className="relative flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Cart, ${totalItems} items`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-2xl tracking-[0.2em] uppercase transition-colors ${
              pathname === link.href ? 'text-gold' : 'text-foreground hover:text-gold'
            }`}
            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500 }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/cart"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mt-4"
        >
          <ShoppingBag size={20} />
          <span className="text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-jost)' }}>
            Cart {totalItems > 0 && `(${totalItems})`}
          </span>
        </Link>
      </div>
    </>
  )
}
