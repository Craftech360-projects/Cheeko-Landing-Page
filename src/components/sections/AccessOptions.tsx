"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";

export function AccessOptions() {
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (leftCardRef.current) observer.observe(leftCardRef.current);
    if (rightCardRef.current) observer.observe(rightCardRef.current);

    return () => {
      if (leftCardRef.current) observer.unobserve(leftCardRef.current);
      if (rightCardRef.current) observer.unobserve(rightCardRef.current);
    };
  }, []);

  return (
    <section id="access-options" className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Download Mobile App */}
          <div ref={leftCardRef} className="opacity-0 slide-left">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-8 h-full flex flex-col relative overflow-hidden">
              {/* Content */}
              <div className="flex-1 space-y-3 sm:space-y-4 z-10 relative max-w-[60%] sm:max-w-[70%] lg:max-w-[55%]">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-sora text-gray-900">
                  Download Mobile App
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-switzer">
                  Install the app to register, connect to Cheeko,
                  and manage everything in one place.
                </p>

                {/* App Store Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"> 
                  <a
                    href="#"
                    className="inline-block transition-transform hover:scale-105"
                    aria-label="Download on Google Play"
                  >
                    <Image
                      src="/icons/google-play.png"
                      alt="Get it on Google Play"
                      width={120}
                      height={32}
                      className="h-8 sm:h-10 w-auto"
                    />
                  </a>
                  <a
                    href="#"
                    className="inline-block transition-transform hover:scale-105"
                    aria-label="Download on App Store"
                  >
                    <Image
                      src="/icons/app-store.png"
                      alt="Download on the App Store"
                      width={120}
                      height={32}
                      className="h-8 sm:h-10 w-auto"
                    />
                  </a>
                </div>
              </div>

              {/* Orange Background Circle with Gradient */}
              <div 
                className="absolute bottom-0 right-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-82 lg:h-82 rounded-full translate-x-16 translate-y-16 sm:translate-x-20 sm:translate-y-20" 
                style={{
                  background: 'linear-gradient(to right, #F36E24, #CA252A)'
                }}
              />

              {/* Man with Phone Image */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-10 sm:-right-0 lg:-right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-80 z-10">
                <Image
                  src="/images/access-options-men.png"
                  alt="Man showing Cheeko mobile app"
                  fill
                  className="object-contain object-bottom"
                /> 
              </div>
            </div>
          </div>

          {/* Access via Web */}
          <div ref={rightCardRef} className="opacity-0 slide-right">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-8 h-full flex flex-col relative overflow-hidden">
              {/* Content */}
              <div className="flex-1 space-y-3 sm:space-y-4 z-10 relative max-w-[60%] sm:max-w-[70%] lg:max-w-[55%]">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-sora text-gray-900">
                  Access via Web
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-switzer">
                  No downloads are needed; use the Cheeko webpage to complete
                  the setup in just a few easy steps.
                </p>

                {/* CTA Button */}
                <div className="pt-2 sm:pt-4">
                  <button className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Open in Browser
                  </button>
                </div>
              </div>

              {/* Orange Background Circle with Gradient */}
              <div 
                className="absolute bottom-0 right-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-82 lg:h-82 rounded-full translate-x-16 translate-y-16 sm:translate-x-20 sm:translate-y-20" 
                style={{
                  background: 'linear-gradient(to right, #F36E24, #CA252A)'
                }}
              />

              {/* Woman with Laptop Image */}
              <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-70 lg:h-80 z-10">
                <Image
                  src="/images/access-options-women.png"
                  alt="Woman using Cheeko web app"
                  fill
                  className="object-contain object-bottom object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .slide-left {
          transform: translateX(-50px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .slide-right {
          transform: translateX(50px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.animate-slide-in) {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        @media (max-width: 1024px) {
          .slide-left,
          .slide-right {
            transform: translateY(30px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .slide-left,
          .slide-right {
            transform: none;
            transition: none;
          }
          :global(.animate-slide-in) {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
