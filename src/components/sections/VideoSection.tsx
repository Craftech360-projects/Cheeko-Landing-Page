"use client";

import { useEffect, useRef } from "react";
import { Button, Container } from "@/components/ui";
import { useShopify } from "@/hooks/useShopify";

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { price, currencySymbol, loading } = useShopify();

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
      className="relative pt-6 pb-12 sm:py-4 md:py-6 lg:py-8 overflow-visible opacity-0"
    >
      <Container>
        <div className="relative">
          {/* Video Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
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
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 px-10 sm:px-12 lg:px-20 xl:px-24 py-4 text-base sm:text-lg whitespace-nowrap min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] xl:min-w-[350px]"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "https://cheekoai.myshopify.com/products/cheeko-ai-toy";
              }}
            >
              Buy Now
              {!loading && price > 0 && (
                <>
                  {" "}At
                  <span className="line-through text-white font-semibold text-base sm:text-lg mx-0">
                  {currencySymbol}7999
                  </span>
                  <span className="font-bold text-base sm:text-lg">{currencySymbol}{price.toFixed(0)}</span>
                </>
              )}
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
