'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { products, categories, type Category } from '@/lib/products'
import ProductCard from '@/components/product-card'

const sortOptions = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'name-az', label: 'Name: A–Z' },
]

export default function ShopClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const selectedCategory: Category = categories.find((category) => category.value === categoryParam)?.value ?? 'all'
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')

  function selectCategory(category: Category) {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') params.delete('category')
    else params.set('category', category)
    router.replace(`/shop${params.size ? `?${params.toString()}` : ''}`, { scroll: false })
  }

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    const list = products.filter((product) =>
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      `${product.name} ${product.tagline} ${product.category}`.toLowerCase().includes(search)
    )
    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'name-az': return list.sort((a, b) => a.name.localeCompare(b.name))
      default: return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    }
  }, [selectedCategory, sort, query])

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Product categories">
        {categories.map(({ value, label }) => {
          const isSelected = selectedCategory === value
          return (
            <motion.button
              type="button"
              key={value}
              onClick={() => selectCategory(value)}
              aria-pressed={isSelected}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className={`px-5 min-h-11 rounded-full border text-xs transition-colors ${
                isSelected
                  ? 'bg-foreground text-background border-foreground shadow-md font-medium'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {label}
            </motion.button>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between border-b border-border pb-6 mb-6">
        <div className="relative sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="collection-search" className="sr-only">Search the collection</label>
          <input
            id="collection-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find your next crush…"
            className="w-full bg-card/50 border border-border rounded-sm pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-xs text-muted-foreground">Sort by</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="border border-border bg-card/50 rounded-sm px-3 py-3 text-xs focus:outline-none focus:border-gold transition-colors cursor-pointer"
          >
            {sortOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <p role="status" className="text-xs text-muted-foreground mb-7">
        {filtered.length} {filtered.length === 1 ? 'set' : 'sets'} to fall for
      </p>

      {filtered.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${sort}-${query}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="collection-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-7"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <h2 className="font-serif text-4xl mb-4">
            {selectedCategory === 'custom' ? 'Something only you could dream up.' : 'Your perfect match is still out there.'}
          </h2>
          <p className="text-sm text-muted-foreground mb-7">
            {selectedCategory === 'custom'
              ? 'Your palette, your occasion, your inspiration. Let’s create your one-of-a-kind set.'
              : 'Try another search or explore the full collection.'}
          </p>
          {selectedCategory === 'custom' ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link href="/custom-order" className="button-primary">
                Explore custom designs <ArrowRight size={16} />
              </Link>
            </motion.div>
          ) : (
            <motion.button
              type="button"
              onClick={() => { setQuery(''); selectCategory('all') }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="button-outline"
            >
              Show all sets
            </motion.button>
          )}
        </motion.div>
      )}
    </>
  )
}
