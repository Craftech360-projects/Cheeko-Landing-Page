"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui";
import { OptimizedImage as Image } from "@/components/OptimizedImage";

interface DashboardFeature {
  icon: string;
  title: string;
  description: string;
}

const dashboardFeatures: DashboardFeature[] = [
  {
    icon: "/icons/parental-dashboard1.svg",
    title: "Progress Tracking System",
    description:
      "Track your child’s learning progress with daily, weekly, and monthly insights across subjects and skills.",
  },
  {
    icon: "/icons/parental-dashboard2.svg",
    title: "Content Preferences",
    description:
      "Choose what Cheeko talks about by selecting age-appropriate topics that match your child’s interests and learning goals.",
  },
  {
    icon: "/icons/parental-dashboard3.svg",
    title: "Mood & Topic Insights",
    description:
      "Monitor your child’s mood patterns and topic preferences to gain insights into their emotional well-being and learning interests.",
  },
  {
    icon: "/icons/parental-dashboard4.svg",
    title: "Milestone Alerts",
    description:
      "Get notified when your child achieves key learning goals, completes challenges, or unlocks new skills with Cheeko.",
  },
];

export function ParentalDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

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

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    featuresRef.current.forEach((feature) => {
      if (feature) observer.observe(feature);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
      featuresRef.current.forEach((feature) => {
        if (feature) observer.unobserve(feature);
      });
    };
  }, []);

  return (
    <section
      id="parental-dashboard"
      ref={sectionRef}
      className="relative section-padding overflow-hidden opacity-0"
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
              <span className="text-black">Parental</span>{" "}
              <span className="text-orange-500">Dashboard</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt="Decorative icon - Right header decoration"
              width={40}
              height={42}
              className="absolute -right-10 sm:-right-12 md:-right-14 lg:-right-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </div>

          <p className="text-center text-sm sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-4xl mx-auto font-switzer leading-tight sm:leading-relaxed mt-4">
            Real-time insights. Meaningful milestones. All in one place.
          </p>
        </div>

        {/* Features Container with Decorative Elements */}
        <div className="relative">
          {/* Top right decorative element */}
          <Image
            src="/icons/features-star-red.svg"
            alt="Decorative star - Top right corner"
            width={96}
            height={94}
            className="absolute -right-6 sm:-right-8 md:-right-10 lg:-right-12 -top-6 sm:-top-8 md:-top-10 lg:-top-12 z-0 decorative-topright w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />

          {/* Features Grid with Image - 3 columns layout (reversed) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            {/* First column - First 2 features */}
            <div className="grid grid-rows-2 gap-4 sm:gap-6 lg:h-[410px] order-2 lg:order-1">
              {dashboardFeatures.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    featuresRef.current[index] = el;
                  }}
                  className="card-animate-initial"
                  style={{
                    transitionDelay: `${index * 350}ms`,
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-full flex flex-col justify-start hover:shadow-2xl hover:bg-orange-500 transition-all duration-1000 ease-out group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 lg:w-12 lg:h-12 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-sora text-gray-900 mb-2 group-hover:text-white transition-colors duration-500">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 font-switzer text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second column - Last 2 features */}
            <div className="grid grid-rows-2 gap-4 sm:gap-6 lg:h-[410px] order-3 lg:order-2">
              {dashboardFeatures.slice(2).map((feature, index) => (
                <div
                  key={index + 2}
                  ref={(el) => {
                    featuresRef.current[index + 2] = el;
                  }}
                  className="card-animate-initial"
                  style={{
                    transitionDelay: `${(index + 2) * 350}ms`,
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-full flex flex-col justify-start hover:shadow-2xl hover:bg-orange-500 transition-all duration-1000 ease-out group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 lg:w-12 lg:h-12 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-sora text-gray-900 mb-2 group-hover:text-white transition-colors duration-500">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 font-switzer text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Third column - Dashboard image */}
            <div
              ref={imageRef}
              className="opacity-0 lg:h-[410px] flex items-center justify-center order-1 lg:order-3"
            >
              <Image
                src="/images/parental-dashboard-parent.jpg"
                alt="Parent using dashboard"
                width={392}
                height={410}
                className="w-full h-auto max-w-[392px] rounded-2xl"
              />
            </div>
          </div>

          {/* Bottom left decorative element */}
          <Image
            src="/icons/features-star-teal.svg"
            alt="Decorative star - Bottom left corner"
            width={122}
            height={123}
            className="absolute -left-6 sm:-left-8 md:-left-10 lg:-left-12 -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 z-0 decorative-bottomleft w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
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

        /* Decorative elements animations */
        :global(.decorative-topright) {
          animation: bounce-float 8s ease-in-out infinite;
        }

        :global(.decorative-bottomleft) {
          animation: rotate-scale 10s linear infinite;
        }

        @keyframes bounce-float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-15px) scale(1.05);
          }
          50% {
            transform: translateY(0px) scale(1);
          }
          75% {
            transform: translateY(15px) scale(0.95);
          }
        }

        @keyframes rotate-scale {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.15);
          }
          100% {
            transform: rotate(360deg) scale(1);
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
