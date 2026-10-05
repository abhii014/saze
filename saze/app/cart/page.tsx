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
      <main id="main-content" className="pt-28 light-section pb-12">
        <CartClient />
      </main>
      <Footer />
    </>
  )
}
