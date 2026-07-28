import { Sparkles, Package, MapPin, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Luxury Craft',
    desc: 'Each set is hand-designed with premium materials — glossy finishes, crystals, and precision detailing.',
  },
  {
    icon: Package,
    title: 'Pan-India Shipping',
    desc: 'We ship to every corner of India. Carefully packaged so your nails arrive picture-perfect.',
  },
  {
    icon: MapPin,
    title: 'Goa-Made',
    desc: 'Born on the coast of Goa — infused with the spirit of affordable glam and sun-kissed luxury.',
  },
  {
    icon: MessageCircle,
    title: 'DM to Order',
    desc: 'Simple, personal ordering. Add to cart, send your order via Instagram DM, and we handle the rest.',
  },
]

export default function WhySection() {
  return (
    <section className="bg-secondary border-y border-border py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs text-gold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ✦ Why SAZÉ
          </p>
          <h2
            className="text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Details that make the
            <span className="text-gold italic"> difference</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
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
  )
}
