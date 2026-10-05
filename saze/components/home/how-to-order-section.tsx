import { Heart, MessageCircle, Package } from 'lucide-react'
import InstagramOrderLink from '@/components/instagram-order-link'
import Reveal from '@/components/reveal'

const steps = [
  { number: '01', icon: Heart, title: 'Find your favourite', description: 'Explore the collection. Pick a set that speaks to your mood, or bring us your own inspiration.' },
  { number: '02', icon: MessageCircle, title: 'Say hello on Instagram', description: 'Tap Order on Instagram to visit @_saze.in_. Message us with your chosen design and sizing questions.' },
  { number: '03', icon: Package, title: 'We take it from here', description: 'We’ll confirm availability, fit, payment, and shipping in your DMs. Personal, simple, and made for you.' },
]

export default function HowToOrderSection() {
  return (
    <section className="light-section py-20 md:py-24">
      <Reveal className="section-shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
          <div><p className="eyebrow mb-4">03 / From a crush to your cart</p><h2 className="display-heading">Your next set, <em className="text-gold">in three steps.</em></h2></div>
          <span className="text-xs text-muted-foreground max-w-[230px] leading-relaxed">A real conversation. A set you love. That&apos;s how we do things.</span>
        </div>
        <div className="grid gap-9 md:grid-cols-3 md:gap-12">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="border-t border-border pt-5">
              <div className="flex items-center justify-between mb-6"><span className="font-serif text-4xl text-gold">{number}</span><Icon size={22} strokeWidth={1.25} className="text-gold" /></div>
              <h3 className="font-serif text-3xl mb-3">{title}</h3><p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10"><InstagramOrderLink className="button-primary">Let&apos;s find your set</InstagramOrderLink></div>
      </Reveal>
    </section>
  )
}
