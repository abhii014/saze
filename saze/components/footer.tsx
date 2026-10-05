import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_URL, INSTAGRAM_USERNAME } from '@/lib/instagram'

export default function Footer() {
  return (
    <footer className="border-t border-border pt-14 pb-24 sm:pb-8">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] pb-12">
          <div>
            <Link href="/" className="font-serif text-5xl tracking-[0.15em]">SAZ<span className="text-gold">É</span></Link>
            <p className="mt-3 font-serif text-2xl italic text-gold">Because details matter.</p>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed mt-4 mb-6">Handcrafted press-on nails for your everyday and your unforgettable. From Goa, with a little extra glam.</p>
            <a href={INSTAGRAM_URL} className="inline-flex items-center gap-2 text-xs text-foreground hover:text-gold transition-colors"><InstagramIcon size={17} /> @{INSTAGRAM_USERNAME} <ArrowUpRight size={14} /></a>
          </div>
          <div><h2 className="eyebrow mb-5">Find your glam</h2><ul className="space-y-3">
            {[{ href: '/shop', label: 'The full collection' }, { href: '/shop?category=everyday', label: 'Everyday muse' }, { href: '/shop?category=bridal', label: 'Bridal glow' }, { href: '/shop?category=festive', label: 'After dark' }].map(({ href, label }) =>
              <li key={href}><Link href={href} className="text-xs text-muted-foreground hover:text-gold transition-colors">{label}</Link></li>)}
          </ul></div>
          <div><h2 className="eyebrow mb-5">A little more</h2><ul className="space-y-3">
            {[{ href: '/about', label: 'Our story' }, { href: '/custom-order', label: 'Made for you' }, { href: '/cart', label: 'Your cart' }].map(({ href, label }) =>
              <li key={href}><Link href={href} className="text-xs text-muted-foreground hover:text-gold transition-colors">{label}</Link></li>)}
            <li><a href={INSTAGRAM_URL} className="text-xs text-gold inline-flex gap-1 items-center">Order on Instagram <ArrowUpRight size={13} /></a></li>
          </ul><p className="text-[10px] text-muted-foreground mt-6 uppercase tracking-widest">Goa, India · Shipping nationwide</p></div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3 justify-between text-[10px] text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SAZÉ. All the little details reserved.</p>
          <p>Small-batch nails. Big main-character energy.</p>
        </div>
      </div>
    </footer>
  )
}
