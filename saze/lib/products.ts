// ============================================================
// PRODUCTS DATA — Edit this file to add/update products
// ============================================================

export type Category = 'all' | 'everyday' | 'bridal' | 'festive' | 'custom'

export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  originalPrice?: number
  category: Exclude<Category, 'all'>
  image: string
  images?: string[]
  badge?: 'bestseller' | 'new' | 'limited'
  description: string
  includes: string[]
  available: boolean
  featured?: boolean
}

// ============================================================
// ADD YOUR PRODUCTS HERE
// ============================================================
export const products: Product[] = [
  {
    id: 'midnight-rose',
    name: 'Midnight Rose',
    tagline: 'Deep burgundy with gold rose accents',
    price: 499,
    category: 'festive',
    image: '/images/products/midnight-rose.png',
    badge: 'bestseller',
    description:
      'Dramatic and romantic, the Midnight Rose set features a deep burgundy base adorned with delicate gold rose accents and micro-crystal gems. Perfect for festive nights out.',
    includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file'],
    available: true,
    featured: true,
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    tagline: 'Champagne chrome with subtle shimmer',
    price: 549,
    category: 'bridal',
    image: '/images/products/golden-hour.png',
    badge: 'bestseller',
    description:
      'Inspired by the warm glow of dusk, Golden Hour wraps your nails in champagne gold with a chrome shimmer that catches every light. Bridal favourite.',
    includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file'],
    available: true,
    featured: true,
  },
  {
    id: 'stargazer',
    name: 'Stargazer',
    tagline: 'Navy celestial with holographic tips',
    price: 449,
    category: 'festive',
    image: '/images/products/stargazer.png',
    badge: 'new',
    description:
      'Reach for the stars with this celestial-inspired set. Deep navy base with hand-painted moon and star motifs, finished with a holographic glitter tip.',
    includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file'],
    available: true,
    featured: true,
  },
  {
    id: 'coral-bloom',
    name: 'Coral Bloom',
    tagline: 'Soft coral with floral hand-painted art',
    price: 449,
    category: 'everyday',
    image: '/images/products/coral-bloom.png',
    description:
      'Light and fresh, Coral Bloom brings a touch of garden florals to your everyday look. Soft coral base with intricate hand-painted white and peach florals.',
    includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file'],
    available: true,
    featured: false,
  },
  {
    id: 'velvet-noir',
    name: 'Velvet Noir',
    tagline: 'Matte black with gold geometric accents',
    price: 599,
    originalPrice: 699,
    category: 'festive',
    image: '/images/products/velvet-noir.png',
    badge: 'limited',
    description:
      'The ultimate power statement. Matte black long stilettos with precise gold geometric line art and rhinestone accents at the base — for those who demand presence.',
    includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file', 'Rhinestone applicator'],
    available: true,
    featured: true,
  },
  {
    id: 'blush-french',
    name: 'Blush French',
    tagline: 'Classic French with a blush twist',
    price: 399,
    category: 'everyday',
    image: '/images/products/blush-french.png',
    description:
      'The refined everyday essential. Soft blush base with a crisp white French tip, some nails adorned with a single pearl accent. Timeless and wearable.',
    includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file'],
    available: true,
    featured: false,
  },
]

// ============================================================
// CATEGORIES — Add new categories here
// ============================================================
export const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'everyday', label: 'Everyday' },
  { value: 'bridal', label: 'Bridal' },
  { value: 'festive', label: 'Festive' },
  { value: 'custom', label: 'Custom' },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: Category): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}
