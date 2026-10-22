import initialProducts from '@/lib/products.json'
import type { Product } from '@/lib/products'

export interface CategoryItem {
  value: string
  label: string
}

export const initialCategories: CategoryItem[] = [
  { value: 'all', label: 'All' },
  { value: 'everyday', label: 'Everyday' },
  { value: 'bridal', label: 'Bridal' },
  { value: 'festive', label: 'Festive' },
  { value: 'necklaces', label: 'Necklaces' },
]

// In-memory runtime cache for serverless instance lifetime
let runtimeCatalog: Product[] | null = null
let runtimeCategories: CategoryItem[] | null = null

export function getRuntimeCatalog(): Product[] {
  if (runtimeCatalog && runtimeCatalog.length > 0) {
    return runtimeCatalog
  }
  return initialProducts as Product[]
}

export function setRuntimeCatalog(products: Product[]) {
  runtimeCatalog = products
}

export function getRuntimeCategories(): CategoryItem[] {
  if (runtimeCategories && runtimeCategories.length > 0) {
    return runtimeCategories
  }
  return initialCategories
}

export function setRuntimeCategories(categories: CategoryItem[]) {
  runtimeCategories = categories
}

export async function fetchCatalog(): Promise<Product[]> {
  // 1. Check if Upstash Redis / Vercel KV is configured
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/saze_products`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        if (data && data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRuntimeCatalog(parsed)
            return parsed
          }
        }
      }
    } catch (e) {
      console.error('KV fetch error, falling back:', e)
    }
  }

  // 2. Return current runtime cache or initial products
  return getRuntimeCatalog()
}

export async function fetchCategories(): Promise<CategoryItem[]> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/saze_categories`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        if (data && data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRuntimeCategories(parsed)
            return parsed
          }
        }
      }
    } catch (e) {
      console.error('KV categories fetch error, falling back:', e)
    }
  }

  return getRuntimeCategories()
}

export async function persistCategories(categories: CategoryItem[]): Promise<void> {
  setRuntimeCategories(categories)

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (kvUrl && kvToken) {
    try {
      await fetch(`${kvUrl}/set/saze_categories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categories),
      })
    } catch (e) {
      console.error('Error saving categories to KV:', e)
    }
  }
}

export async function persistToCloud(products: Product[]): Promise<void> {
  // Update runtime memory cache
  setRuntimeCatalog(products)

  // 1. Upstash Redis / Vercel KV
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (kvUrl && kvToken) {
    try {
      await fetch(`${kvUrl}/set/saze_products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(products),
      })
    } catch (e) {
      console.error('Error saving to KV:', e)
    }
  }

  // 2. GitHub commit persistence if GITHUB_TOKEN is configured
  const githubToken = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO || 'abhii014/saze'
  const filePath = 'saze/lib/products.json'

  if (githubToken) {
    try {
      // Get current file sha
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })
      let sha = ''
      if (getRes.ok) {
        const fileData = await getRes.json()
        sha = fileData.sha
      }

      const content = Buffer.from(JSON.stringify(products, null, 2)).toString('base64')
      await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'chore: update products catalog via admin portal',
          content,
          sha: sha || undefined,
          branch: 'main',
        }),
      })
    } catch (e) {
      console.error('Error committing to GitHub:', e)
    }
  }
}
