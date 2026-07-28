import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductDetailClient from '@/components/shop/product-detail-client'
import { products, getProductById, formatPrice } from '@/lib/products'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductById(slug)
  if (!product) return {}
  return {
    title: `${product.name} | SAZÉ`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductById(slug)
  if (!product) notFound()

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  )
}
