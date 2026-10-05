import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import Reveal from '@/components/reveal'
import { INSTAGRAM_URL, INSTAGRAM_USERNAME } from '@/lib/instagram'

const moods = [
  { image: '/images/hero-nails.png', title: 'All that glitters', href: '/custom-order' },
  { image: '/images/products/coral-bloom.png', title: 'Soft girl season', href: '/shop/coral-bloom' },
  { image: '/images/products/velvet-noir.png', title: 'After-dark energy', href: '/shop/velvet-noir' },
  { image: '/images/products/blush-french.png', title: 'Your everyday muse', href: '/shop/blush-french' },
]

export default function SocialSection() {
  return (
    <section className="light-section pt-20 md:pt-24 pb-16">
      <Reveal className="section-shell">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-8">
          <div><p className="eyebrow mb-4">The SAZÉ moodboard</p><h2 className="display-heading">A little <em className="text-gold">eye candy.</em></h2></div>
          <a href={INSTAGRAM_URL} className="inline-flex items-center gap-2 text-xs border-b border-gold pb-1 self-start sm:self-auto"><InstagramIcon size={16} /> @{INSTAGRAM_USERNAME} <ArrowUpRight size={14} /></a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {moods.map(({ image, title, href }, index) => (
            <Link key={title} href={href} className={`group block ${index % 2 === 1 ? 'md:mt-8' : ''}`}>
              <div className="relative aspect-square overflow-hidden"><Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 767px) 45vw, 25vw" />
                <span className="absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-full bg-background/90"><ArrowUpRight size={16} /></span>
              </div>
              <p className="font-serif italic text-xl mt-3">{title}</p>
            </Link>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-10">For new drops, behind-the-scenes, and more sparkle — find us on Instagram.</p>
      </Reveal>
    </section>
  )
}
