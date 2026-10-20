import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sparkles, Package, Heart } from 'lucide-react'
import Reveal from '@/components/reveal'

const features = [
  { icon: Sparkles, title: 'Art in every detail', desc: 'Delicate florals, a touch of chrome, a little extra sparkle. Every set has its own story.' },
  { icon: Heart, title: 'Luxury, made personal', desc: 'A ready-to-love design or something completely your own. There is no one way to wear SAZÉ.' },
  { icon: Package, title: 'From Goa, with love', desc: 'Thoughtfully packed and shipped across India. A little happiness, right to your door.' },
]

export default function WhySection() {
  return (
    <section className="py-20 md:py-28">
      <Reveal className="section-shell grid gap-14 md:grid-cols-2 md:gap-20 items-center">
        <div className="relative pb-8 pr-8 md:pr-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[160px]">
             <Image src="/images/products/IMG-20261012-WA0068.jpg" alt="Nude press-on nails with radiant gold sunburst details" fill className="object-cover"
              sizes="(max-width: 767px) 85vw, 45vw" />
          </div>
          <div className="absolute bottom-0 right-0 w-[46%] bg-background p-2 border border-gold/30 rotate-[5deg]">
             <div className="relative aspect-square"><Image src="/images/products/IMG-20261012-WA0077.jpg" alt="Black clover necklace set with gold details" fill className="object-cover" sizes="(max-width: 767px) 40vw, 240px" /></div>
            <p className="py-2 text-center font-serif italic text-lg text-gold">It&apos;s all in the details.</p>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">02 / A little about us</p>
          <h2 className="display-heading mb-6">More than nails.<br /><em className="text-gold">A feeling.</em></h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">That fresh-set confidence. That &ldquo;where did you get those?&rdquo; moment. We&apos;re here for the tiny things that make your day feel a little more you.</p>
          <div className="space-y-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <Icon size={19} className="text-gold mt-1 shrink-0" />
                <div><h3 className="font-serif text-2xl mb-1">{title}</h3><p className="text-xs leading-relaxed text-muted-foreground max-w-sm">{desc}</p></div>
              </div>
            ))}
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 mt-9 border-b border-gold pb-1 text-xs text-gold">Meet SAZÉ <ArrowUpRight size={16} /></Link>
        </div>
      </Reveal>
    </section>
  )
}
