import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import HeroSection from '@/components/home/hero-section'
import FeaturedSection from '@/components/home/featured-section'
import WhySection from '@/components/home/why-section'
import BannerSection from '@/components/home/banner-section'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedSection />
        <WhySection />
        <BannerSection />
      </main>
      <Footer />
    </>
  )
}
