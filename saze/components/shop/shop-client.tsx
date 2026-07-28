'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { products, categories, type Category } from '@/lib/products'
import ProductCard from '@/components/product-card'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-az', label: 'Name A–Z' },
]

export default function ShopClient() {
  const searchParams = useSearchParams()
  const initialCat = (searchParams.get('category') as Category) ?? 'all'
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.some((c) => c.value === initialCat) ? initialCat : 'all'
  )
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    let list = selectedCategory === 'all' ? [...products] : products.filter((p) => p.category === selectedCategory)
    switch (sort) {
      case 'price-asc':
        list = list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = list.sort((a, b) => b.price - a.price)
        break
      case 'name-az':
        list = list.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list = list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [selectedCategory, sort])

  return (
    <>
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                selectedCategory === cat.value
                  ? 'bg-gold text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-gold hover:text-foreground'
              }`}
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="text-xs text-muted-foreground"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Sort by
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-secondary border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-gold transition-colors"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <p
        className="text-xs text-muted-foreground mb-6"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p
            className="text-lg text-muted-foreground"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            No products in this category yet.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 text-sm text-gold hover:underline"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            View all products
          </button>
        </div>
      )}
    </>
  )
}
