import { NextResponse } from 'next/server'
import { fetchCategories, persistCategories, type CategoryItem } from '@/lib/catalog-store'

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
  const categories = await fetchCategories()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const isAuth = await checkAuth(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { action, payload } = await request.json()
    let currentCategories = await fetchCategories()
    currentCategories = [...currentCategories]

    switch (action) {
      case 'add': {
        const { label } = payload
        if (!label || typeof label !== 'string' || !label.trim()) {
          return NextResponse.json({ error: 'Category label is required' }, { status: 400 })
        }
        const cleanLabel = label.trim()
        const value = cleanLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        
        // Prevent duplicate value
        if (currentCategories.some((c) => c.value === value)) {
          return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
        }

        currentCategories.push({ value, label: cleanLabel })
        break
      }
      case 'delete': {
        const { value } = payload
        if (value === 'all') {
          return NextResponse.json({ error: 'Cannot delete the "All" category' }, { status: 400 })
        }
        currentCategories = currentCategories.filter((c) => c.value !== value)
        break
      }
      case 'rename': {
        const { value, label } = payload
        currentCategories = currentCategories.map((c) =>
          c.value === value ? { ...c, label: label.trim() } : c
        )
        break
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }

    await persistCategories(currentCategories)

    return NextResponse.json({ success: true, categories: currentCategories })
  } catch (error) {
    console.error('Admin categories API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
