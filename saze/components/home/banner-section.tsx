'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import InstagramOrderLink from '@/components/instagram-order-link'
import Reveal from '@/components/reveal'

export default function BannerSection() {
  return (
    <section className="border-y border-border bg-[#1a2032] relative overflow-hidden">
      <div className="section-shell grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal className="py-16 md:py-24">
          <p className="eyebrow mb-5">04 / The bespoke edit</p>
          <h2 className="display-heading mb-6">
            Your imagination.<br />
            <em className="text-gold italic">Our little canvas.</em>
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-sm mb-8">
            Your wedding palette. Your birthday outfit. That saved Pinterest board. Let&apos;s turn your inspiration into a set that&apos;s only yours.
          </p>
          <div className="flex flex-wrap gap-3">
            <InstagramOrderLink>Order a custom set</InstagramOrderLink>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link href="/custom-order" className="button-outline">
                The process <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </Reveal>
        <div className="relative min-w-0 w-full aspect-square md:aspect-auto md:h-full md:min-h-[340px] mb-10 md:mb-0 overflow-hidden rounded-[2px] group">
          <Image
            src="/images/products/IMG-20261012-WA0081.jpg"
            alt="Rose pink press-on nails with ruby and gold floral details"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 767px) 90vw, 50vw"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute bottom-5 left-5 bg-background/90 backdrop-blur-md px-5 py-3 border border-gold/30 shadow-xl"
          >
            <p className="font-serif text-2xl italic text-gold">One of a kind. Just like you.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
