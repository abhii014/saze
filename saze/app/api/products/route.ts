import { NextResponse } from 'next/server'
import { fetchCatalog } from '@/lib/catalog-store'
import initialProducts from '@/lib/products.json'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const catalog = await fetchCatalog()
    return NextResponse.json(catalog, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch (error) {
    return NextResponse.json(initialProducts, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  }
}
