import { NextResponse } from 'next/server'
import { fetchCategories, initialCategories } from '@/lib/catalog-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const categories = await fetchCategories()
    return NextResponse.json(categories, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch (error) {
    return NextResponse.json(initialCategories, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  }
}
