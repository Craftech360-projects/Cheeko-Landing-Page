import { Header } from "@/components/sections/Header";
// import { Hero } from "@/components/sections/Hero";
import MeetCheeko from "@/components/sections/MeetCheeko";
import { Features } from "@/components/sections/KeyFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Safety } from "@/components/sections/Safety";
import { VideoSection } from "@/components/sections/VideoSection";
// import { PreOrderBanner } from "@/components/sections/PreOrderBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ParentalDashboard } from "@/components/sections/ParentalDashboard";
import { HashRouter } from "@/components/HashRouter";

export default function Home() {
  return (
    <HashRouter>
      <div className="max-w-full mx-auto">
        <StructuredData />
        <Header />

        <main>
          {/* Video Section */}
          <VideoSection />

          {/* Pre Order Banner */}
          {/* <PreOrderBanner /> */}

          {/* Hero Section */}
          {/* <Hero /> */}

          {/* Meet Cheeko Section */}
          <MeetCheeko />

          {/* Key Features Section */}
          <Features />

          {/* Access Options */}
          {/* <AccessOptions /> */}

          {/* How It Works Section */}
          <HowItWorks />

          {/* Safety & Privacy Section */}
          <Safety />

          {/* Parental Dashboard */}
          <ParentalDashboard />

          {/* Testimonials Section */}
          <Testimonials />

          {/* FAQ Section */}
          <FAQ />

          {/* Newsletter Section */}
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </HashRouter>
  );
}
