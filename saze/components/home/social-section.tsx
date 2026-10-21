'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import InstagramIcon from '@/components/icons/instagram-icon'
import Reveal from '@/components/reveal'
import { INSTAGRAM_URL, INSTAGRAM_USERNAME } from '@/lib/instagram'

const moods = [
  { image: '/images/products/IMG-20261012-WA0069.jpg', title: 'Soft girl season', href: '/shop/butterfly-gold' },
  { image: '/images/products/IMG-20261012-WA0070.jpg', title: 'After-dark energy', href: '/shop/onyx-glimmer' },
  { image: '/images/products/IMG-20261012-WA0078.jpg', title: 'A little butterfly moment', href: '/shop/butterfly-cascade' },
  { image: '/images/products/IMG-20261012-WA0050.jpg', title: 'Golden details, always', href: '/shop/aurora-gem-pendant' },
]

export default function SocialSection() {
  return (
    <section className="light-section pt-20 md:pt-24 pb-16">
      <Reveal className="section-shell">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-8">
          <div>
            <p className="eyebrow mb-4">The SAZÉ moodboard</p>
            <h2 className="display-heading">
              A little <em className="text-gold italic">eye candy.</em>
            </h2>
          </div>
          <motion.a
            href={INSTAGRAM_URL}
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-2 text-xs border-b border-gold pb-1 self-start sm:self-auto gold-underline"
          >
            <InstagramIcon size={16} /> @{INSTAGRAM_USERNAME} <ArrowUpRight size={14} />
          </motion.a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {moods.map(({ image, title, href }, index) => (
            <motion.div
              key={title}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className={`group block ${index % 2 === 1 ? 'md:mt-8' : ''}`}
            >
              <Link href={href}>
                <div className="relative aspect-square overflow-hidden rounded-[3px] border border-border/50 group-hover:border-gold/50 shadow-sm transition-colors">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-108"
                    sizes="(max-width: 767px) 45vw, 25vw"
                  />
                  <motion.span
                    whileHover={{ scale: 1.15 }}
                    className="absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-full bg-background/90 backdrop-blur-sm text-foreground group-hover:bg-gold group-hover:text-primary-foreground transition-colors shadow-md"
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </div>
                <p className="font-serif italic text-xl mt-3 group-hover:text-gold transition-colors">{title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-10">
          For new drops, behind-the-scenes, and more sparkle — find us on Instagram.
        </p>
      </Reveal>
    </section>
  )
}
