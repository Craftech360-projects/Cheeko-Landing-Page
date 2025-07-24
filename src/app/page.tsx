"use client";

import * as React from "react";
import { Header } from "@/components/sections/Header";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { BottomBar } from "@/components/sections/BottomBar";
import { useScrollBehavior } from "@/hooks/useScrollBehavior";
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
import { SplashScreen } from "@/components/SplashScreen";

export default function Home() {
  const { isHeaderVisible, isBottomBarVisible } = useScrollBehavior();
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      <HashRouter>
        <div className={`max-w-full mx-auto ${isBottomBarVisible ? 'pb-[100px]' : ''}`}>
          <StructuredData />
          {!showSplash && <PromoBanner />}
          <Header isVisible={isHeaderVisible} />

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
        
        {/* Bottom Bar */}
        <BottomBar isVisible={isBottomBarVisible} />
      </div>
    </HashRouter>
    </>
  );
}
