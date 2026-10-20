import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import InstagramOrderLink from '@/components/instagram-order-link'
import Reveal from '@/components/reveal'

export default function BannerSection() {
  return (
    <section className="border-y border-border bg-[#1a2032]">
      <div className="section-shell grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal className="py-16 md:py-24">
          <p className="eyebrow mb-5">04 / The bespoke edit</p>
          <h2 className="display-heading mb-6">Your imagination.<br /><em className="text-gold">Our little canvas.</em></h2>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-sm mb-8">Your wedding palette. Your birthday outfit. That saved Pinterest board. Let&apos;s turn your inspiration into a set that&apos;s only yours.</p>
          <div className="flex flex-wrap gap-3">
            <InstagramOrderLink>Order a custom set</InstagramOrderLink>
            <Link href="/custom-order" className="button-outline">The process <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
        <div className="relative min-w-0 w-full aspect-square md:aspect-auto md:h-full md:min-h-[320px] mb-10 md:mb-0 overflow-hidden">
           <Image src="/images/products/IMG-20261012-WA0081.jpg" alt="Rose pink press-on nails with ruby and gold floral details" fill className="object-cover"
            sizes="(max-width: 767px) 90vw, 50vw" />
          <div className="absolute bottom-5 left-5 bg-background/90 backdrop-blur-sm px-5 py-3 border border-gold/30"><p className="font-serif text-2xl italic text-gold">One of a kind. Just like you.</p></div>
        </div>
      </div>
    </section>
  )
}
