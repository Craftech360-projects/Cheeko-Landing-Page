"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";

interface SafetyFeature {
  icon: string;
  title: string;
  description: string;
}

const safetyFeatures: SafetyFeature[] = [
  {
    icon: "/icons/safety-privacy-1.svg",
    title: "Data Protection",
    description:
      "All conversations are encrypted and we never share your child's data with third parties. Your information stays private.",
  },
  {
    icon: "/icons/safety-privacy-2.svg",
    title: "Safe Words Only",
    description:
      "Cheeko filters out unsafe or inappropriate words to keep conversations age-appropriate and child-friendly.",
  },
  {
    icon: "/icons/safety-privacy-3.svg",
    title: "Data Stores In Cloud",
    description:
      "Built from the ground up with privacy as the core principle. We never sell data and only collect what's necessary for learning.",
  },
];

export function Safety() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="safety"
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
              <span className="text-black">Safety &</span>{" "}
              <span className="text-orange-500">Privacy</span>
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
            Every interaction is private. Every moment is secure. Privacy is always on.
          </p>
        </div>

        {/* Safety Features Container with Decorative Elements */}
        <div className="relative">
          {/* Top right decorative element */}
          <Image
            src="/icons/features-star-red.svg"
            alt=""
            width={96}
            height={94}
            className="absolute -right-4 sm:-right-6 md:-right-8 -top-8 sm:-top-10 md:-top-12 lg:-top-14 z-0 decorative-topright w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />

          {/* White Container with Three Sections */}
          <div
            ref={containerRef}
            className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 relative z-10 opacity-0 container-animate"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 relative">
              {safetyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="relative px-8 lg:px-12 py-8 lg:py-0"
                >
                  {/* Vertical Divider Line */}
                  {index < safetyFeatures.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px">
                      <div className="h-full w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400 to-transparent"></div>
                      </div>
                    </div>
                  )}

                  {/* Horizontal Divider for Mobile */}
                  {index < safetyFeatures.length - 1 && (
                    <div className="lg:hidden absolute left-8 right-8 bottom-0 h-px">
                      <div className="w-full h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                      </div>
                    </div>
                  )}

                  {/* Feature Content */}
                  <div className="flex flex-col items-start space-y-4">
                    {/* Icon */}
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 lg:w-12 lg:h-12 feature-icon"
                    />

                    {/* Title */}
                    <h3 className="text-2xl font-bold font-sora text-gray-900">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 font-switzer text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom left decorative element */}
          <Image
            src="/icons/safety-bottomleft.svg"
            alt=""
            width={122}
            height={123}
            className="absolute -left-4 sm:-left-6 md:-left-8 lg:-left-10 -bottom-4 sm:-bottom-6 md:-bottom-8 lg:-bottom-10 z-0 decorative-bottomleft w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />
        </div>
      </Container>

      <style jsx>{`
        .container-animate {
          transform: translateY(50px) scale(0.95);
          transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.animate-fade-in) .container-animate {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .feature-icon {
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.animate-fade-in) .feature-icon {
          opacity: 1;
          transform: translateY(0);
        }

        :global(.animate-fade-in) .feature-icon:nth-child(1) {
          transition-delay: 0.2s;
        }

        /* Decorative elements animations */
        :global(.decorative-topright) {
          animation: float-rotate 12s ease-in-out infinite;
          transform-origin: center;
        }

        :global(.decorative-bottomleft) {
          animation: pulse-scale 8s ease-in-out infinite;
        }

        @keyframes float-rotate {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        :global(.animate-fade-in) {
          opacity: 1 !important;
          transition: opacity 1.5s ease-out;
        }

        :global(.opacity-0) {
          opacity: 0;
          transition: opacity 1.5s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .container-animate {
            transform: none;
            transition: none;
          }
          .feature-icon {
            transform: none;
            transition: none;
            opacity: 1;
          }
          :global(.decorative-topright),
          :global(.decorative-bottomleft) {
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
