"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";

interface Step {
  stepNumber: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    stepNumber: "Step 1",
    title: "Easy Setup Your Way",
    description:
      "Download the app from Play Store/App Store or visit the webpage to setup. Register with basic info to get started.",
    image: "/images/how-it-works-step1.png",
  },
  {
    stepNumber: "Step 2",
    title: "Add Your Toy",
    description: "Tap “Add Toy,” then hold the right button on Cheeko to hear the verification code and connect securely.",
    image: "/images/how-it-works-step2.png",
  },
  {
    stepNumber: "Step 3",
    title: "Personalize Cheeko",
    description:
      "Enter your child’s name so Cheeko knows who it’s talking to. That’s it! Your child can jump right into conversation and exploration!",
    image: "/images/how-it-works-step3.png",
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
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden opacity-0"
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

          <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-switzer leading-relaxed mt-4">
            Setting up Cheeko is as easy as 1-2-3!
          </p>
        </div>

        {/* Steps Container with Decorative Elements */}
        <div className="relative">
          {/* Top left decorative element */}
          <Image
            src="/icons/how-it-works-bottomright.svg"
            alt=""
            width={96}
            height={94}
            className="absolute -left-4 sm:-left-6 md:-left-8 -top-8 sm:-top-10 md:-top-12 lg:-top-14 z-0 decorative-topleft w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="card-animate-initial h-full"
                style={{
                  transitionDelay: `${index * 350}ms`,
                }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full flex flex-col">
                  {/* Image */}
                  <div className="p-6 pb-0">
                    <div className="relative h-[248px] overflow-hidden rounded-xl">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={720}
                        height={496}
                        quality={100}
                        priority={index === 0}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3 flex-grow flex flex-col">
                    {/* Step Chip */}
                    <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold self-start">
                      {step.stepNumber}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold font-sora text-gray-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 font-switzer text-base leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom right decorative element */}
          <Image
            src="/icons/how-it-works-topleft.svg"
            alt=""
            width={122}
            height={123}
            className="absolute -right-4 sm:-right-6 md:-right-8 lg:-right-10 -bottom-4 sm:-bottom-6 md:-bottom-8 lg:-bottom-10 z-0 decorative-bottomright w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />
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
