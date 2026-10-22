'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { INSTAGRAM_URL } from '@/lib/instagram'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'The collection' },
  { href: '/about', label: 'Our story' },
  { href: '/custom-order', label: 'Made for you' },
]

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.07, delayChildren: 0.15 },
  },
}

const menuItemVariants: Variants = {
  closed: { opacity: 0, x: -30, filter: 'blur(6px)' },
  open: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Navbar() {
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    function closeMenu() {
      setMobileOpen(false)
      toggleRef.current?.focus()
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMenu()
      if (event.key === 'Tab') {
        const links = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a')
        if (!links?.length) return
        const first = links[0]
        const last = links[links.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          toggleRef.current?.focus()
        } else if (event.shiftKey && document.activeElement === toggleRef.current) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          toggleRef.current?.focus()
        } else if (!event.shiftKey && document.activeElement === toggleRef.current) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => { if (desktop.matches) closeMenu() }
    desktop.addEventListener('change', onResize)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      desktop.removeEventListener('change', onResize)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only fixed left-4 top-4 z-[100] bg-cream text-navy px-4 py-3">
        Skip to content
      </a>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-[#101526]/85 backdrop-blur-xl nav-blur shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
      >
        <div className="border-b border-cream/10 py-2 text-center text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-gold">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            A little luxury, delivered. <span className="mx-2" aria-hidden="true">✦</span> Pan-India shipping
          </motion.span>
        </div>
        <div className="section-shell flex h-16 md:h-[72px] items-center justify-between">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 group" aria-label="SAZÉ home">
            <motion.div whileHover={{ rotate: 12, scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
              <Image src="/images/saze-logo.png" alt="" width={38} height={38} className="rounded-full ring-1 ring-gold/30 group-hover:ring-gold/60 transition-all" />
            </motion.div>
            <span className="font-serif text-3xl tracking-[0.16em]">SAZ<span className="text-gold">É</span></span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-9">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href === '/shop' && pathname.startsWith('/shop/'))
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative text-[11px] tracking-[0.08em] uppercase transition-colors hover:text-gold gold-underline py-1 ${
                    isActive ? 'text-gold font-medium' : 'text-foreground/75'
                  }`}
                >
                  <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    {label}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-gold/40 via-gold to-gold/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="flex items-center gap-3 lg:gap-5">
            <motion.a
              href={INSTAGRAM_URL}
              className="hidden lg:inline-flex items-center gap-1 text-[11px] text-gold tracking-[0.06em] uppercase hover:text-cream transition-colors"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" />
            </motion.a>
            <Link href="/cart" onClick={() => setMobileOpen(false)} className="relative p-2 text-foreground hover:text-gold transition-colors" aria-label={`Cart, ${totalItems} items`}>
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <ShoppingBag size={19} />
              </motion.div>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-semibold text-primary-foreground shadow-[0_0_12px_rgba(212,183,121,0.5)]"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button ref={toggleRef} type="button" className="md:hidden p-2 text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-menu">
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-background/95 nav-blur px-8 pt-36 pb-16 md:hidden overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-7">
              <motion.p variants={menuItemVariants} className="eyebrow">A world of little details</motion.p>
              {navLinks.map(({ href, label }, index) => (
                <motion.div key={href} variants={menuItemVariants}>
                  <Link href={href} onClick={() => setMobileOpen(false)} aria-current={pathname === href ? 'page' : undefined}
                    className={`flex items-center justify-between border-b border-border pb-5 font-serif text-4xl transition-colors hover:text-gold ${pathname === href ? 'text-gold' : 'text-foreground'}`}>
                    {label}<span className="font-body text-xs text-muted-foreground">0{index + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants}>
                <a href={INSTAGRAM_URL} className="button-primary mt-4 w-full">Order on Instagram <ArrowUpRight size={16} /></a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
