'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
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
        {categories.map(({ value, label }) => <button type="button" key={value} onClick={() => selectCategory(value)} aria-pressed={selectedCategory === value}
          className={`px-5 min-h-11 rounded-full border text-xs transition-colors ${selectedCategory === value ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}>{label}</button>)}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between border-b border-border pb-6 mb-6">
        <div className="relative sm:w-80">
          <Search size={16} className="absolute left-3 top-3.5 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="collection-search" className="sr-only">Search the collection</label>
          <input id="collection-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your nail crush…" className="w-full bg-transparent border border-border rounded-sm pl-10 pr-4 py-3 text-xs" />
        </div>
        <div className="flex items-center gap-3"><label htmlFor="sort-select" className="text-xs text-muted-foreground">Sort by</label><select id="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} className="border border-border bg-background rounded-sm px-3 py-3 text-xs">
          {sortOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select></div>
      </div>
      <p role="status" className="text-xs text-muted-foreground mb-7">{filtered.length} {filtered.length === 1 ? 'set' : 'sets'} to fall for</p>
      {filtered.length ? (
        <div key={`${selectedCategory}-${sort}`} className="collection-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-7">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="font-serif text-4xl mb-4">{selectedCategory === 'custom' ? 'Something only you could dream up.' : 'Your perfect match is still out there.'}</h2>
          <p className="text-sm text-muted-foreground mb-7">{selectedCategory === 'custom' ? 'Your palette, your occasion, your inspiration. Let’s create your one-of-a-kind set.' : 'Try another search or explore the full collection.'}</p>
          {selectedCategory === 'custom' ? <Link href="/custom-order" className="button-primary">Explore custom designs <ArrowRight size={16} /></Link>
            : <button type="button" onClick={() => { setQuery(''); selectCategory('all') }} className="button-outline">Show all sets</button>}
        </div>
      )}
    </>
  )
}
