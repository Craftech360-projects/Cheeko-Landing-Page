"use client";

import { useEffect, useRef, useState } from "react";
import { VideoModal } from "@/components/VideoModal";
import { OptimizedVideo } from "@/components/OptimizedVideo";
// import { Button, Container } from "@/components/ui";
// import { useShopify } from "@/hooks/useShopify";

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const { price, currencySymbol, loading } = useShopify();
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        setIsVideoLoaded(false); // Reset loading state when switching videos
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  // Preload videos when component mounts
  useEffect(() => {
    const preloadVideo = (src: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      document.head.appendChild(link);
    };

    // Preload both video versions
    preloadVideo("/videos/mobile_video.mp4");
    preloadVideo("/videos/desktop_video.mp4");
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
        {/* Loading Placeholder */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        <OptimizedVideo
          videoRef={videoRef}
          src={
            isMobile ? "/videos/mobile_video.mp4" : "/videos/desktop_video.mp4"
          }
          width={1920}
          height={1080}
          className={`w-full h-full object-cover ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          autoPlay
          loop
          muted
          controls={false}
          onLoadedData={() => setIsVideoLoaded(true)}
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
            Meet Cheeko!
          </h1>
          <h3
            className="text-white font-sora font-semibold leading-tight text-[20px] md:text-[32px]"
            style={{ letterSpacing: "0.5%" }}
          >
            Smart AI Companion for Kids
          </h3>
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
  );
}
