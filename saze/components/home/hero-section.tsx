import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-nails.png"
          alt="Luxury press-on nails"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 border border-gold/40 text-gold text-xs px-3 py-1.5 rounded-full mb-6"
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.15em' }}
          >
            <Sparkles size={12} />
            Affordable Glam &nbsp;·&nbsp; Pan-India Shipping
          </div>

          {/* Heading */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-light leading-none mb-4"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            <span className="block text-foreground">Because</span>
            <span className="block text-gold italic">Details</span>
            <span className="block text-foreground">Matter.</span>
          </h1>

          {/* Subline */}
          <p
            className="text-base text-muted-foreground leading-relaxed mb-8 max-w-sm"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Luxury press-on nails handcrafted for every occasion — from daily glam
            to bridal perfection. Wear art, DM to order.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground px-7 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
            >
              Shop Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/custom-order"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-full text-sm font-medium hover:border-gold hover:text-gold transition-colors"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
            >
              Custom Order
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-10">
            {[
              { label: 'Sets', value: '24+' },
              { label: 'Sizes', value: '12' },
              { label: 'Orders', value: '500+' },
            ].map((badge) => (
              <div key={badge.label} className="text-center">
                <p
                  className="text-xl font-semibold text-gold"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {badge.value}
                </p>
                <p
                  className="text-xs text-muted-foreground uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative "made with love" badge */}
      <div className="absolute bottom-8 right-6 md:right-16 z-10 rotate-3">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 text-center shadow-xl">
          <p
            className="text-xs text-gold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ✦ Made with
          </p>
          <p
            className="text-sm text-foreground italic mt-0.5"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem' }}
          >
            precision & glam
          </p>
        </div>
      </div>
    </section>
  )
}
