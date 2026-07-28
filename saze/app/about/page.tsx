import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Sparkles, Heart, Package } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | SAZÉ',
  description:
    'The story behind SAZÉ — luxury press-on nails born in Goa. Because every detail matters.',
}

const values = [
  {
    icon: Sparkles,
    title: 'Crafted with Intention',
    desc: 'Every design starts with a mood, a moment, a story. We translate that into wearable nail art that turns heads.',
  },
  {
    icon: Heart,
    title: 'Made for Real People',
    desc: 'Luxury should be accessible. Our sets are priced for everyday glam, not just special occasions.',
  },
  {
    icon: Package,
    title: 'Pan-India, with Love',
    desc: 'Wherever you are in India, we ship your order packed with care — so your nails arrive as beautiful as they left.',
  },
  {
    icon: MapPin,
    title: 'Goa-Born',
    desc: 'Born on the coastline, infused with colour, warmth, and a spirit that refuses to be dull.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about-banner.png"
              alt="SAZÉ nail tools and sets"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-background/85" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">About</span>
            </nav>

            <p
              className="text-xs text-gold uppercase tracking-[0.2em] mb-3"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              ✦ Our Story
            </p>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-light leading-none mb-6 text-balance"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Because Details<br />
              <span className="text-gold italic">Matter.</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-lg"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              SAZÉ is a small-batch luxury nail brand from Goa, India. We make press-on nails
              that feel expensive, look extraordinary, and last for weeks — without the salon price tag.
            </p>
          </div>
        </section>

        {/* Story section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs text-gold uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                ✦ The Beginning
              </p>
              <h2
                className="text-4xl md:text-5xl font-light leading-tight mb-6"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Started with a love for
                <span className="text-gold italic"> nail art</span>
              </h2>
              <div
                className="space-y-4 text-muted-foreground text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                <p>
                  SAZÉ was founded by Saffa — a nail enthusiast from Goa who believed that beautiful
                  nails shouldn&apos;t be reserved for salon visits. What started as a passion project
                  became a brand built around one simple truth: the details are everything.
                </p>
                <p>
                  Each set is designed and assembled with care, using premium-grade materials that
                  offer a salon-quality look and feel. We offer 12 sizes per set so every hand finds
                  its perfect fit.
                </p>
                <p>
                  Orders are placed through Instagram DMs — keeping things personal, direct, and simple.
                  No complicated checkouts, just real conversations about beautiful nails.
                </p>
              </div>

              <a
                href="https://www.instagram.com/_saze.in_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-gold transition-colors px-5 py-2.5 rounded-full"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                <InstagramIcon size={16} />
                Follow @_saze.in_
              </a>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-card">
                <Image
                  src="/images/hero-nails.png"
                  alt="SAZÉ luxury press-on nails"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl px-5 py-4 shadow-2xl">
                <p
                  className="text-3xl font-semibold text-gold"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  500+
                </p>
                <p
                  className="text-xs text-muted-foreground uppercase tracking-widest mt-1"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  Happy customers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary border-y border-border py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p
                className="text-xs text-gold uppercase tracking-[0.2em] mb-3"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                ✦ What We Stand For
              </p>
              <h2
                className="text-4xl md:text-5xl font-light leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                The SAZÉ
                <span className="text-gold italic"> promise</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 bg-gold/10 mb-5">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3
                    className="text-lg font-medium text-foreground mb-2"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p
            className="text-xs text-gold uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ✦ Ready to Wear Art?
          </p>
          <h2
            className="text-4xl md:text-5xl font-light leading-tight mb-6 text-balance"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Explore the full
            <span className="text-gold italic"> collection</span>
          </h2>
          <p
            className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Every set is crafted to order. Browse our styles, add to cart, and DM us on Instagram
            to complete your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
            >
              Shop Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/custom-order"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:border-gold hover:text-gold transition-colors"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
            >
              Custom Order
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
