import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import InstagramOrderLink from '@/components/instagram-order-link'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="section-shell">
        <div className="grid items-center gap-12 md:grid-cols-[1.08fr_1fr] md:gap-14 lg:gap-24">
          <div className="hero-enter">
            <p className="eyebrow flex items-center gap-2.5 mb-7"><Sparkles size={13} /> Handcrafted press-on nails · Goa, India</p>
            <h1 className="hero-title mb-7">
              A little glam.<br />
              A lot of <em className="font-normal text-gold">you.</em>
            </h1>
            <p className="max-w-sm text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
              For coffee dates, big nights, and everything in between.
              Nail art that feels like you — because the little details matter.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="button-primary">Find your set <ArrowRight size={16} aria-hidden="true" /></Link>
              <InstagramOrderLink className="button-outline">Order on Instagram</InstagramOrderLink>
            </div>
            <div className="mt-9 flex items-center gap-4 border-t border-cream/10 pt-5">
              <div className="flex -space-x-3" aria-hidden="true">
                {['blush-french', 'golden-hour', 'midnight-rose'].map((name) => (
                  <Image key={name} src={`/images/products/${name}.png`} alt="" width={38} height={38} className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">Your mood. Your moment.<br /><span className="text-foreground">A set for every version of you.</span></p>
            </div>
          </div>
          <div className="relative mx-2 md:mx-0">
            <div className="hero-photo">
              <Image src="/images/hero-nails.png" alt="Gold and floral press-on nail art styled with delicate gold rings" fill priority
                className="object-cover" sizes="(max-width: 767px) 90vw, (max-width: 1400px) 45vw, 550px" />
              <div className="absolute inset-0 border border-gold/20 rounded-[inherit]" aria-hidden="true" />
            </div>
            <div className="hero-seal" aria-hidden="true">
              <span className="text-[8px] tracking-[0.18em] uppercase">Made with</span>
              <Sparkles className="mx-auto" size={23} />
              <span className="font-serif text-lg italic">a little love</span>
            </div>
            <div className="hero-caption">
              <p className="text-[8px] tracking-[0.18em] uppercase mb-1">The finishing touch</p>
              <p className="font-serif text-xl italic">Because details matter.</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-between items-center border-t border-cream/10 pt-5">
          <a href="#collection" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors">
            A little scroll, a little sparkle <ArrowDown size={13} aria-hidden="true" />
          </a>
          <span className="hidden sm:block text-[10px] text-muted-foreground tracking-[0.12em] uppercase">Affordable glam. Always.</span>
        </div>
      </div>
    </section>
  )
}
