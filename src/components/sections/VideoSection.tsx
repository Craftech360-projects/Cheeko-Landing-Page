"use client";

import { useEffect, useRef } from "react";
import { Button, Container } from "@/components/ui";
import { useShopify } from "@/hooks/useShopify";

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { price, currencySymbol } = useShopify();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            // Start playing video when in view
            if (videoRef.current) {
              videoRef.current.play().catch(() => {
                // Handle autoplay restrictions
              });
            }
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
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-visible opacity-0"
    >
      <Container>
        <div className="relative">
          {/* Video Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              >
                <source src="/videos/whatsapp-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Pre Order Button - Positioned to overlap */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6">
            <Button
              variant="primary"
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://cheekoai.myshopify.com/products/cheeko-ai-toy', '_blank');
              }}
            >
              Pre Order Now At {currencySymbol}{price}
            </Button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        :global(.animate-fade-in) {
          opacity: 1 !important;
          transition: opacity 1.5s ease-out;
        }

        :global(.opacity-0) {
          opacity: 0;
          transition: opacity 1.5s ease-out;
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
  );
}