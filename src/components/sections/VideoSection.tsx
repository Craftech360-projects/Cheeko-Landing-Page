"use client";

import { useEffect, useRef, useState } from "react";
import { VideoModal } from "@/components/VideoModal";
import { OptimizedVideo } from "@/components/OptimizedVideo";
import Head from "next/head";
// import { Button, Container } from "@/components/ui";
// import { useShopify } from "@/hooks/useShopify";

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // const { price, currencySymbol, loading } = useShopify();
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Video Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "CheekoAI Demo - Smart AI Companion for Kids",
            "description": "Watch CheekoAI in action! See how our AI toy helps children learn through interactive play. Perfect for kids aged 3-12 years.",
            "thumbnailUrl": "https://cheekoai.in/images/meet-cheeko-img1.png",
            "uploadDate": "2025-01-01T00:00:00Z",
            "duration": "PT2M30S",
            "contentUrl": "https://www.youtube.com/watch?v=Q5gfuEwSQMQ",
            "embedUrl": "https://www.youtube.com/embed/Q5gfuEwSQMQ",
            "publisher": {
              "@type": "Organization",
              "name": "Altio AI Pvt. Ltd.",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cheekoai.in/images/logo.svg"
              }
            },
            "potentialAction": {
              "@type": "WatchAction",
              "target": "https://cheekoai.in/#video"
            },
            "about": {
              "@type": "Product",
              "name": "CheekoAI",
              "description": "AI-powered educational toy for children aged 3-12 years",
              "brand": {
                "@type": "Brand",
                "name": "CheekoAI"
              }
            }
          })
        }}
      />
      
      <section
        id="video"
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden opacity-0"
      >
      {/* Fullscreen Video Container */}
      <div className="absolute inset-0 w-full h-full">
        <OptimizedVideo
          src={
            isMobile ? "/videos/mobile_video.mp4" : "/videos/desktop_video.mp4"
          }
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          quality={75}
        />
      </div>

      {/* Curved Black Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-180 bg-gradient-to-t from-black/100 via-black/40 to-transparent curved-overlay"></div>

      {/* Text and CTA Overlay */}
      <div className="absolute bottom-12 md:bottom-16 left-4 sm:left-6 md:left-8 lg:left-16 xl:left-20 2xl:left-32 z-20 max-w-sm md:max-w-2xl lg:max-w-3xl">
        {/* Text */}
        <div className="mb-4 md:mb-6">
          <h1
            className="text-white font-sora font-bold mb-2 leading-tight text-[28px] md:text-[52px]"
            style={{ letterSpacing: "0.5%" }}
          >
            Meet Cheeko
          </h1>
          <h2
            className="text-white font-sora font-semibold leading-tight text-[20px] md:text-[32px]"
            style={{ letterSpacing: "0.5%" }}
          >
            Smart AI Companion for Kids
          </h2>
        </div>

        {/* CTA Button */}
        <button
          className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 min-h-[48px] bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors duration-200 text-base"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Play Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
          </svg>
          <span className="font-switzer">Watch More</span>
        </button>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMobile={isMobile}
      />

      <style jsx>{`
        :global(.animate-fade-in) {
          opacity: 1 !important;
          transition: opacity 1.5s ease-out;
        }

        :global(.opacity-0) {
          opacity: 0;
          transition: opacity 1.5s ease-out;
        }

        .curved-overlay {
          clip-path: ellipse(200% 120% at 50% 100%);
        }

        @media (max-width: 768px) {
          .curved-overlay {
            clip-path: ellipse(180% 110% at 50% 100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.animate-fade-in),
          :global(.opacity-0) {
            transition: none;
            opacity: 1 !important;
          }
        }
      `}</style>
      </section>
    </>
  );
}
