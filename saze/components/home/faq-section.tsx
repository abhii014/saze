'use client'

import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/reveal'
import { INSTAGRAM_URL } from '@/lib/instagram'

const questions = [
  { question: 'How do I place an order?', answer: 'Choose your favourite design and tap Order on Instagram. You’ll land on @_saze.in_ — tap Message and tell us which set you love. We’ll confirm availability, sizing, payment, and shipping with you directly. Ordering more than one set? Add them to your cart and copy your order details before heading to Instagram.' },
  { question: 'What comes with my set?', answer: 'The current collection includes 24 press-on nails in 12 sizes, nail glue, a prep pad, and a mini nail file. Check each product page for the full list of what’s included in that design.' },
  { question: 'Can I order a custom design?', answer: 'Absolutely. Send your inspiration images, preferred colours, shape, and occasion on Instagram. We’ll discuss the design and share a quote before your custom set is made.' },
  { question: 'Do you ship to my city?', answer: 'We offer Pan-India shipping from Goa. Share your delivery postcode in your message and we’ll confirm shipping costs and the estimated timeline before you order.' },
  { question: 'Not sure about sizing?', answer: 'Send us a message before placing your order. We’ll help you understand the available sizes and discuss measurements for a custom set.' },
]

export default function FaqSection() {
  return (
    <section className="light-section pb-20 md:pb-28">
      <Reveal className="section-shell grid md:grid-cols-[0.8fr_1.2fr] gap-9 md:gap-20 border-t border-border pt-14">
        <div>
          <p className="eyebrow mb-4">A few little answers</p>
          <h2 className="display-heading mb-5">
            Good to <em className="text-gold italic">know.</em>
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground max-w-xs">
            Still curious about something?{' '}
            <motion.a
              href={INSTAGRAM_URL}
              whileHover={{ x: 2 }}
              className="underline underline-offset-4 text-foreground hover:text-gold transition-colors inline-block"
            >
              We&apos;re a DM away.
            </motion.a>
          </p>
        </div>
        <div>
          {questions.map(({ question, answer }) => (
            <details key={question} className="faq-item border-b border-border group py-1" name="saze-faq">
              <summary className="flex items-center justify-between gap-5 py-5 text-sm font-medium hover:text-gold transition-colors cursor-pointer list-none">
                <span>{question}</span>
                <span className="p-1 rounded-full bg-border/40 group-hover:bg-gold/15 group-hover:text-gold transition-colors shrink-0">
                  <Plus size={16} className="faq-plus transition-transform duration-300" aria-hidden="true" />
                </span>
              </summary>
              <p className="text-xs leading-relaxed text-muted-foreground pb-5 pr-7 animate-fadeIn">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
