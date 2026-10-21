'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sparkles, Package, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/reveal'

const features = [
  { icon: Sparkles, title: 'Art in every detail', desc: 'Delicate florals, a touch of chrome, a little extra sparkle. Every set has its own story.' },
  { icon: Heart, title: 'Luxury, made personal', desc: 'A ready-to-love design or something completely your own. There is no one way to wear SAZÉ.' },
  { icon: Package, title: 'From Goa, with love', desc: 'Thoughtfully packed and shipped across India. A little happiness, right to your door.' },
]

export default function WhySection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Reveal className="section-shell grid gap-14 md:grid-cols-2 md:gap-20 items-center">
        <div className="relative pb-8 pr-8 md:pr-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[160px] border border-border/60 shadow-2xl">
            <Image
              src="/images/products/IMG-20261012-WA0068.jpg"
              alt="Nude press-on nails with radiant gold sunburst details"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 767px) 85vw, 45vw"
            />
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="absolute bottom-0 right-0 w-[48%] bg-background p-2.5 border border-gold/40 rotate-[5deg] shadow-2xl cursor-default rounded-sm"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2px]">
              <Image
                src="/images/products/IMG-20261012-WA0077.jpg"
                alt="Black clover necklace set with gold details"
                fill
                className="object-cover"
                sizes="(max-width: 767px) 40vw, 240px"
              />
            </div>
            <p className="py-2 text-center font-serif italic text-lg text-gold">It&apos;s all in the details.</p>
          </motion.div>
        </div>
        <div>
          <p className="eyebrow mb-4">02 / A little about us</p>
          <h2 className="display-heading mb-6">
            More than nails.<br />
            <em className="text-gold italic">A feeling.</em>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
            That fresh-set confidence. That &ldquo;where did you get those?&rdquo; moment. We&apos;re here for the tiny things that make your day feel a little more you.
          </p>
          <div className="space-y-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 group p-2 rounded-md hover:bg-card/40 transition-colors"
              >
                <div className="p-2 rounded-full bg-gold/10 border border-gold/20 text-gold mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-1 text-foreground group-hover:text-gold transition-colors">{title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div whileHover={{ x: 3 }} className="inline-block mt-9">
            <Link href="/about" className="inline-flex items-center gap-2 border-b border-gold pb-1 text-xs text-gold gold-underline">
              Meet SAZÉ <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </Reveal>
    </section>
  )
}
