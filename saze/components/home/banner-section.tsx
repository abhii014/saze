import Link from 'next/link'
import InstagramIcon from '@/components/icons/instagram-icon'

export default function BannerSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="relative rounded-3xl border border-gold/20 bg-secondary overflow-hidden p-10 md:p-16 text-center">
        {/* Background glow effect */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'oklch(0.75 0.12 85)' }}
          aria-hidden
        />

        <p
          className="text-xs text-gold tracking-[0.2em] uppercase mb-4 relative"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          ✦ Custom Orders
        </p>
        <h2
          className="text-4xl md:text-6xl font-light text-foreground leading-tight mb-4 relative text-balance"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Want something{' '}
          <span className="text-gold italic">uniquely yours?</span>
        </h2>
        <p
          className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-8 relative"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          From bridal sets to birthday designs — we craft completely custom press-on
          nails tailored to your vision. Slide into our DMs to start the conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <Link
            href="/custom-order"
            className="inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
          >
            Request Custom Order
          </Link>
          <a
            href="https://www.instagram.com/_saze.in_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:border-gold hover:text-gold transition-colors"
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em' }}
          >
            <InstagramIcon size={16} />
            DM @_saze.in_
          </a>
        </div>
      </div>
    </section>
  )
}
