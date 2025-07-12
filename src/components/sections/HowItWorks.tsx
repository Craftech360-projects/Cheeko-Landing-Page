"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Step {
  stepNumber: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    stepNumber: "Step 1",
    title: "Download & Setup",
    description:
      "Get the CheekoAI app and connect your device in just 2 minutes.",
    image: "/images/how-it-works-step1.png",
  },
  {
    stepNumber: "Step 2",
    title: "Power On & Connect",
    description: "Turn on CheekoAI and watch as it greets your child by name.",
    image: "/images/how-it-works-step2.png",
  },
  {
    stepNumber: "Step 3",
    title: "Learn & Grow Together",
    description:
      "Enjoy personalized learning adventures that grow with your child.",
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
      className="relative py-20 px-2 sm:px-6 md:px-[2px] lg:px-[80px] xl:px-[60px] 2xl:px-[160px] overflow-hidden opacity-0"
    >
      <div className="max-w-full-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt=""
              width={69}
              height={72}
              className="absolute -left-15 -top-12"
            />
            <h2 className="text-5xl md:text-6xl font-bold font-sora">
              <span className="text-black">How It</span>{" "}
              <span className="text-orange-500">Works</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt=""
              width={69}
              height={72}
              className="absolute -right-15 -top-12"
            />
          </div>

          <p className="text-center text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-switzer leading-relaxed mt-4">
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
            className="absolute -left-8 -top-14 z-0 decorative-topleft"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="card-animate-initial"
                style={{
                  transitionDelay: `${index * 350}ms`,
                }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  {/* Image */}
                  <div className="p-6 pb-0">
                    <div className="relative h-[248px] overflow-hidden rounded-xl">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={360}
                        height={248}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    {/* Step Chip */}
                    <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                      {step.stepNumber}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold font-sora text-gray-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 font-switzer text-base leading-relaxed">
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
            className="absolute -right-10 -bottom-10 z-0 decorative-bottomright"
          />
        </div>
      </div>

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
