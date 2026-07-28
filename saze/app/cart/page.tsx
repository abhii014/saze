import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CartClient from '@/components/cart/cart-client'

export const metadata = {
  title: 'Your Cart | SAZÉ',
}

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CartClient />
      </main>
      <Footer />
    </>
  )
}
