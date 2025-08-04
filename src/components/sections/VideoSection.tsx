"use client";

import { useEffect, useRef, useState } from "react";
import { VideoModal } from "@/components/VideoModal";
// import { Button, Container } from "@/components/ui";
// import { useShopify } from "@/hooks/useShopify";

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
            // Start playing video when in view
            if (videoRef.current) {
              videoRef.current.load(); // Reload video source when mobile state changes
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
  }, [isMobile]); // Add isMobile as dependency

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden opacity-0"
    >
      {/* Fullscreen Video Container */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        >
          <source
            src={
              isMobile
                ? "/videos/mobile_video.mp4"
                : "/videos/desktop_video.mp4"
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Curved Black Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black/80 via-black/40 to-transparent curved-overlay"></div>

      {/* Text and CTA Overlay */}
      <div className="absolute bottom-12 md:bottom-16 left-8 md:left-16 lg:left-24 xl:left-32 z-20 max-w-sm md:max-w-2xl lg:max-w-3xl">
        {/* Text */}
        <h1
          className="text-white font-sora font-semibold mb-4 md:mb-6 leading-tight text-[22px] md:text-[52px] md:whitespace-nowrap"
          style={{ letterSpacing: "0.5%" }}
        >
          Smart AI Companion
          <br />
          Made for Kids - <br className="md:hidden" />Meet Cheeko!
        </h1>

        {/* CTA Button */}
        <button
          className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-[#D52328] text-white font-medium rounded-md hover:bg-[#B91C21] transition-colors duration-200 text-sm md:text-base"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Play Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            
            className="md:w-6 md:h-6"
          >
            <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
          </svg>
          <span className="font-switzer">Watch Cheeko in Action</span>
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
  );
}
