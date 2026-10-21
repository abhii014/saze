import { NextResponse } from 'next/server'
import { fetchCatalog, persistToCloud } from '@/lib/catalog-store'
import type { Product } from '@/lib/products'

export const dynamic = 'force-dynamic'

async function checkAuth(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const hasAuthCookie = cookie.includes('saze_admin_auth=authenticated')
  const authHeader = request.headers.get('authorization')
  const correctPassword = process.env.ADMIN_PASSWORD || 'saze2026'
  const hasValidBearer = authHeader === `Bearer ${correctPassword}`

  return hasAuthCookie || hasValidBearer
}

export async function GET(request: Request) {
  const isAuth = await checkAuth(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const catalog = await fetchCatalog()
  return NextResponse.json(catalog)
}

export async function POST(request: Request) {
  const isAuth = await checkAuth(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { action, payload } = await request.json()
    let currentCatalog = await fetchCatalog()
    currentCatalog = [...currentCatalog]

    switch (action) {
      case 'toggle_stock': {
        const { id, available } = payload
        currentCatalog = currentCatalog.map((p) => (p.id === id ? { ...p, available } : p))
        break
      }
      case 'update_product': {
        const { product } = payload
        currentCatalog = currentCatalog.map((p) => (p.id === product.id ? product : p))
        break
      }
      case 'add_product': {
        const { product } = payload
        const exists = currentCatalog.some((p) => p.id === product.id)
        const finalId = exists ? `${product.id}-${Date.now().toString().slice(-4)}` : product.id
        currentCatalog = [{ ...product, id: finalId }, ...currentCatalog]
        break
      }
      case 'delete_product': {
        const { id } = payload
        currentCatalog = currentCatalog.filter((p) => p.id !== id)
        break
      }
      case 'set_all': {
        if (Array.isArray(payload) && payload.length > 0) {
          currentCatalog = payload
        }
        break
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }

    // Persist to runtime cache & cloud
    await persistToCloud(currentCatalog)

    return NextResponse.json({ success: true, catalog: currentCatalog })
  } catch (error) {
    console.error('Admin products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
