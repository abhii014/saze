import Footer from '@/components/footer'
import HeroSection from '@/components/home/hero-section'
import FeaturedSection from '@/components/home/featured-section'
import WhySection from '@/components/home/why-section'
import BannerSection from '@/components/home/banner-section'
import MarqueeSection from '@/components/home/marquee-section'
import HowToOrderSection from '@/components/home/how-to-order-section'
import SocialSection from '@/components/home/social-section'
import FaqSection from '@/components/home/faq-section'

export default function HomePage() {
  return (
    <>
            <main id="main-content">
        <HeroSection />
        <MarqueeSection />
        <FeaturedSection />
        <WhySection />
        <HowToOrderSection />
        <BannerSection />
        <SocialSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
