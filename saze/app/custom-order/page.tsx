'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight, Palette, Clock, MessageCircle } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const steps = [
  {
    step: '01',
    icon: MessageCircle,
    title: 'DM Your Vision',
    desc: 'Slide into our Instagram DMs at @_saze.in_ and describe your dream nail look — colour palette, shape, finish, occasion.',
  },
  {
    step: '02',
    icon: Palette,
    title: 'We Design',
    desc: 'Our nail artist sketches out a custom design concept based on your vision. We share a preview for your approval before we begin.',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Handcrafted for You',
    desc: 'Once confirmed, your set is handcrafted from scratch using premium materials — sized to your measurements.',
  },
  {
    step: '04',
    icon: ArrowRight,
    title: 'Shipped with Care',
    desc: 'Your custom set is carefully packaged and shipped Pan-India. Expect a wearable piece of art at your doorstep.',
  },
]

const inspirations = [
  { label: 'Bridal Sets', desc: 'Subtle, romantic, unforgettable', color: 'border-gold/40 text-gold' },
  { label: 'Festive Glam', desc: 'Bold, rich, celebration-ready', color: 'border-foreground/20 text-foreground' },
  { label: 'Aesthetic Minimalism', desc: 'Clean lines, tonal beauty', color: 'border-foreground/20 text-foreground' },
  { label: 'Birthday Luxe', desc: 'Personalised, statement-making', color: 'border-foreground/20 text-foreground' },
  { label: '3D Nail Art', desc: 'Textured, sculptural, unique', color: 'border-foreground/20 text-foreground' },
  { label: 'Coordinated Sets', desc: 'Matching nails for events', color: 'border-foreground/20 text-foreground' },
]

export default function CustomOrderPage() {
  const dmUrl = 'https://www.instagram.com/_saze.in_/'

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Custom Order</span>
          </nav>

          <div className="max-w-3xl">
            <p
              className="text-xs text-gold uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              ✦ Bespoke Nail Art
            </p>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-light leading-none mb-6 text-balance"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Your nails,<br />
              <span className="text-gold italic">your rules.</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Have a specific design in mind? We create fully custom press-on nail sets —
              designed around your vision, handcrafted to your measurements, and shipped anywhere in India.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-secondary border-y border-border py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p
                className="text-xs text-gold uppercase tracking-[0.2em] mb-3"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                ✦ The Process
              </p>
              <h2
                className="text-4xl md:text-5xl font-light leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                How it
                <span className="text-gold italic"> works</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="relative">
                  <div className="flex flex-col items-center text-center">
                    {/* Step number */}
                    <div className="relative mb-5">
                      <div className="w-14 h-14 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
                        <Icon size={22} className="text-gold" />
                      </div>
                      <span
                        className="absolute -top-1 -right-2 text-xs font-semibold text-gold/60"
                        style={{ fontFamily: 'var(--font-jost)' }}
                      >
                        {step}
                      </span>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspiration tags */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-10">
            <p
              className="text-xs text-gold uppercase tracking-[0.2em] mb-3"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              ✦ Popular Custom Styles
            </p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              What can we
              <span className="text-gold italic"> create?</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {inspirations.map(({ label, desc, color }) => (
              <div
                key={label}
                className={`border rounded-2xl px-6 py-4 text-center min-w-[160px] flex-1 max-w-[220px] ${color}`}
              >
                <p
                  className="text-sm font-medium mb-1"
                  style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem' }}
                >
                  {label}
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing note */}
        <section className="bg-secondary border-y border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={18} className="text-gold flex-shrink-0" />
                  <h3
                    className="text-lg font-medium text-foreground"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    Turnaround &amp; Pricing
                  </h3>
                </div>
                <p
                  className="text-sm text-muted-foreground leading-relaxed max-w-md"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  Custom orders typically take 5–7 business days from approval to dispatch.
                  Pricing starts at <span className="text-foreground font-medium">₹699</span> and
                  varies based on complexity, embellishments, and length. Final quote shared in DMs.
                </p>
              </div>
              <a
                href={dmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.06em' }}
              >
                <InstagramIcon size={16} />
                DM to Start
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p
            className="text-xs text-gold uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ✦ Ready to Create?
          </p>
          <h2
            className="text-4xl md:text-5xl font-light leading-tight mb-6 text-balance"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Let&apos;s build your
            <span className="text-gold italic"> dream set</span>
          </h2>
          <p
            className="text-sm text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Send us a DM on Instagram with your inspo images, preferred shape, and occasion.
            We&apos;ll get back to you with a concept and quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={dmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
            >
              <InstagramIcon size={18} />
              DM Us on Instagram
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-medium hover:border-gold hover:text-gold transition-colors"
              style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
            >
              Browse Ready Sets
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Instagram handle pill */}
          <div className="mt-10">
            <a
              href={dmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              <InstagramIcon size={15} />
              @_saze.in_
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
