import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import MeetCheeko from '@/components/sections/MeetCheeko'
import { Features } from '@/components/sections/KeyFeatures'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Safety } from '@/components/sections/Safety'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { StructuredData } from '@/components/StructuredData'

export default function Home() {
  return (
    <div className="max-w-full mx-auto">
      <StructuredData />
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Meet Cheeko Section */}
        <MeetCheeko />

        {/* Key Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Safety & Privacy Section */}
        <Safety />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
