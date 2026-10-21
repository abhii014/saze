'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, type Category } from '@/lib/products'
import ProductCard from '@/components/product-card'
import Reveal from '@/components/reveal'

const edits: { value: Category; label: string }[] = [
  { value: 'all', label: 'The signature edit' },
  { value: 'everyday', label: 'Everyday muse' },
  { value: 'bridal', label: 'Bridal glow' },
  { value: 'festive', label: 'After dark' },
  { value: 'necklaces', label: 'Necklaces' },
]

export default function FeaturedSection() {
  const [category, setCategory] = useState<Category>('all')
  const collection =
    category === 'all'
      ? products.filter((product) => product.featured).slice(0, 4)
      : products.filter((product) => product.category === category)

  return (
    <section id="collection" className="light-section py-20 md:py-28 relative overflow-hidden">
      <div className="section-shell relative z-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-9">
            <div>
              <p className="eyebrow mb-4">01 / The collection</p>
              <h2 className="display-heading">
                Find your <em className="text-gold italic">kind of glam.</em>
              </h2>
              <p className="text-sm text-muted-foreground mt-4">Little works of art. Big personality.</p>
            </div>
            <motion.div whileHover={{ x: 3 }}>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 self-start sm:self-auto pb-1 border-b border-gold text-xs gold-underline"
              >
                Explore all sets <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-2 mb-9" role="group" aria-label="Filter the featured collection">
            {edits.map(({ value, label }) => {
              const isSelected = category === value
              return (
                <motion.button
                  type="button"
                  key={value}
                  onClick={() => setCategory(value)}
                  aria-pressed={isSelected}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className={`min-h-11 rounded-full border px-4 py-2 text-xs transition-colors ${
                    isSelected
                      ? 'bg-foreground border-foreground text-background shadow-md font-medium'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </motion.button>
              )
            })}
          </div>
        </Reveal>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {collection.length} sets in {edits.find((edit) => edit.value === category)?.label}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-9 md:gap-x-7"
          >
            {collection.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
        <p className="text-center text-xs text-muted-foreground mt-10">
          Found the one? Tap Order on Instagram and let&apos;s make it yours.
        </p>
      </div>
    </section>
  )
}
