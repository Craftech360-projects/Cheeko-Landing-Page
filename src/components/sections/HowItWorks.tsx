"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container, Button } from "@/components/ui";

interface Step {
  stepNumber: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    stepNumber: "1",
    title: "Sign In",
    description:
      "Click on “Sign in with Google” to sign-in to your account.",
  },
  {
    stepNumber: "2",
    title: "Add Toy",
    description: "Click on “Add Toy” and follow the instructions to get a voice code.",
  },
  {
    stepNumber: "3",
    title: "Verify Code",
    description:
      "Cheeko will say a code. Enter it to complete the setup.",
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
      className="relative section-padding overflow-hidden opacity-0"
    >
      <Container>
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt=""
              width={40}
              height={42}
              className="absolute -left-10 sm:-left-12 md:-left-14 lg:-left-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora">
              <span className="text-black">How It</span>{" "}
              <span className="text-orange-500">Works</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt=""
              width={40}
              height={42}
              className="absolute -right-10 sm:-right-12 md:-right-14 lg:-right-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </div>

          <p className="text-center text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-4xl mx-auto font-switzer leading-relaxed mt-4">
            Setting up Cheeko is as easy as 1-2-3!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center max-w-7xl mx-auto">
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
                src="/images/how-it-works-image.png"
                alt="How It Works"
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
                    <h3 className="text-md sm:text-xl font-bold font-sora text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-switzer font-medium text-sm sm:text-base leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Button */}
            <div 
              ref={(el) => {
                cardsRef.current[4] = el;
              }}
              className="card-animate-initial pt-0"
              style={{
                transitionDelay: `800ms`,
              }}
            >
              <Button
                variant="primary"
                className="w-full lg:w-[172px] h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://tools.cheekoai.in/";
                }}
              >
                Open in Browser
              </Button>
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
