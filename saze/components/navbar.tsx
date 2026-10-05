'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react'
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

export default function Navbar() {
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

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
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mobileOpen ? 'border-border bg-background/95 backdrop-blur-xl' : 'border-cream/10 bg-background/90'
      }`}>
        <div className="border-b border-cream/10 py-2 text-center text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-gold">
          A little luxury, delivered. <span className="mx-2" aria-hidden="true">✦</span> Pan-India shipping
        </div>
        <div className="section-shell flex h-16 md:h-[72px] items-center justify-between">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5" aria-label="SAZÉ home">
            <Image src="/images/saze-logo.png" alt="" width={38} height={38} className="rounded-full" />
            <span className="font-serif text-3xl tracking-[0.16em]">SAZ<span className="text-gold">É</span></span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-9">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} aria-current={pathname === href || (href === '/shop' && pathname.startsWith('/shop/')) ? 'page' : undefined}
                className={`text-[11px] tracking-[0.07em] transition-colors hover:text-gold ${pathname === href ? 'text-gold' : 'text-foreground/75'}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 lg:gap-5">
            <a href={INSTAGRAM_URL} className="hidden lg:inline-flex items-center gap-1 text-[11px] text-gold">
              Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <Link href="/cart" onClick={() => setMobileOpen(false)} className="relative p-2 text-foreground hover:text-gold transition-colors" aria-label={`Cart, ${totalItems} items`}>
              <ShoppingBag size={19} />
              {totalItems > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] text-primary-foreground">{totalItems > 9 ? '9+' : totalItems}</span>}
            </Link>
            <button ref={toggleRef} type="button" className="md:hidden p-2" onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      <div ref={menuRef} id="mobile-menu" hidden={!mobileOpen} className="fixed inset-0 z-40 bg-background px-8 pt-36 pb-16 md:hidden overflow-y-auto">
        <nav aria-label="Mobile navigation" className="flex flex-col gap-7">
          <p className="eyebrow">A world of little details</p>
          {navLinks.map(({ href, label }, index) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} aria-current={pathname === href ? 'page' : undefined}
              className={`flex items-center justify-between border-b border-border pb-5 font-serif text-4xl ${pathname === href ? 'text-gold' : 'text-foreground'}`}>
              {label}<span className="font-body text-xs text-muted-foreground">0{index + 1}</span>
            </Link>
          ))}
          <a href={INSTAGRAM_URL} className="button-primary mt-4">Order on Instagram <ArrowUpRight size={16} /></a>
        </nav>
      </div>
    </>
  )
}
