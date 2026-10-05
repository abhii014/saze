'use client'

import { CartProvider } from '@/lib/cart-context'
import InstagramContact from '@/components/instagram-contact'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}<InstagramContact /></CartProvider>
}
