"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { trackEvent } from "@/components/GoogleTagManager";

interface Step {
  stepNumber: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    stepNumber: "1",
    title: "Download Parent App",
    description: "Download the App and Sign In to your account",
  },
  {
    stepNumber: "2",
    title: "Add Toy",
    description:
      "Click on “Add Toy” and follow the instructions to get a voice code from Cheeko",
  },
  {
    stepNumber: "3",
    title: "Verify Code",
    description: "Cheeko will say a code. Enter it to complete the setup.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden opacity-0"
    >
      <Container>
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 relative">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt="Decorative icon - Left header decoration"
              width={40}
              height={42}
              className="absolute -left-10 sm:-left-12 md:-left-14 lg:-left-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora">
              <span className="text-black">How It</span>{" "}
              <span className="text-orange-500">Works</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt="Decorative icon - Right header decoration"
              width={40}
              height={42}
              className="absolute -right-10 sm:-right-12 md:-right-14 lg:-right-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </div>

          <p className="text-center text-sm sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-4xl mx-auto font-switzer leading-5 sm:leading-7 mt-2">
            Setting up Cheeko is as easy as 1-2-3! Download our parent app to
            get started.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start justify-center max-w-7xl mx-auto">
          {/* Left Column - Image */}
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="card-animate-initial flex-shrink-0"
            style={{
              transitionDelay: `0ms`,
            }}
          >
            <div className="relative w-full lg:w-[600px] rounded-xl overflow-hidden">
              <Image
                src="/images/how-it-works-image.jpg"
                alt="Cheeko device setup instructions - Step by step guide"
                width={600}
                height={416}
                className="w-full h-auto object-cover"
                quality={100}
                priority
              />
            </div>
          </div>

          {/* Right Column - Cards and Button */}
          <div className="space-y-4 w-full flex-1">
            {/* Cards */}
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index + 1] = el;
                }}
                className="card-animate-initial"
                style={{
                  transitionDelay: `${(index + 1) * 200}ms`,
                }}
              >
                <div className="flex items-center gap-4 min-h-[104px] w-full bg-white rounded-lg p-3">
                  {/* Number Square */}
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500/5 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-500">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-md sm:text-xl font-bold font-sora text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-switzer font-medium text-sm sm:text-base leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* App Store Badges */}
            <div
              ref={(el) => {
                cardsRef.current[4] = el;
              }}
              className="card-animate-initial"
              style={{
                transitionDelay: `800ms`,
              }}
            >
              <div className="flex flex-row gap-2 sm:gap-4 items-center justify-center lg:justify-start w-full">
                {/* Google Play Store */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    trackEvent("app_store_click", {
                      location: "how_it_works",
                      store: "google_play",
                    });
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.cheekoai.in",
                      "_blank"
                    );
                  }}
                  className="flex-1 sm:flex-initial transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-lg"
                  aria-label="Download on Google Play Store"
                >
                  <Image
                    src="/icons/playstore_logo.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={45}
                    className="w-full max-w-[140px] sm:w-[150px] h-auto mx-auto"
                  />
                </button>

                {/* Apple App Store */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    trackEvent("app_store_click", {
                      location: "how_it_works",
                      store: "app_store",
                    });
                    window.open(
                      "https://apps.apple.com/us/app/cheekoai/id6748904798",
                      "_blank"
                    );
                  }}
                  className="flex-1 sm:flex-initial transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-lg"
                  aria-label="Download on App Store"
                >
                  <Image
                    src="/icons/appstore_logo.png"
                    alt="Download on the App Store"
                    width={150}
                    height={45}
                    className="w-full max-w-[140px] sm:w-[150px] h-auto mx-auto"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .card-animate-initial {
          opacity: 0;
          transform: translateY(100px) scale(0.9);
          transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slide-up {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Decorative elements animations - matching MeetCheeko */
        :global(.decorative-topleft) {
          animation: spin-slow 10s linear infinite;
          transform-origin: center;
        }

        :global(.decorative-bottomright) {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        :global(.animate-fade-in) {
          opacity: 1 !important;
          transition: opacity 1.5s ease-out;
        }

        :global(.animate-fade-in) .card-animate-initial {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        :global(.opacity-0) {
          opacity: 0;
          transition: opacity 1.5s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .card-animate-initial {
            opacity: 1;
            transform: none;
            transition: none;
          }
          :global(.decorative-topleft),
          :global(.decorative-bottomright) {
            animation: none;
          }
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
