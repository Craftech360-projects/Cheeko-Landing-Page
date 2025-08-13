"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

interface Card {
  title: string;
  subtitle: string;
  image: string;
}

const cards: Card[] = [
  {
    title: "Talk",
    subtitle:
      "Natural conversations tailored to your child's questions, moods, and daily curiosity.",
    image: "/images/meet-cheeko-img1.png",
  },
  {
    title: "Learn",
    subtitle:
      "Cheeko turns everyday questions into playful, screen-free learning and laughter.",
    image: "/images/meet-cheeko-img2.png",
  },
  {
    title: "Grow",
    subtitle:
      "Cheeko listens, remembers, and grows with your child's learning every day.",
    image: "/images/meet-cheeko-img3.png",
  },
  {
    title: "Explore",
    subtitle:
      "Cheeko transforms everyday moments into exciting adventures filled with learning surprises.",
    image: "/images/meet-cheeko-img4.png",
  },
];

export default function MeetCheeko() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Section visibility observer for initial animations
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      sectionObserver.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        sectionObserver.unobserve(currentSection);
      }
    };
  }, []);

  // Desktop animation observer
  useEffect(() => {
    if (!isMobile && isVisible) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-slide-up");
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
      );

      const currentCards = cardsRef.current;
      currentCards.forEach((card) => {
        if (card) observer.observe(card);
      });

      return () => {
        currentCards.forEach((card) => {
          if (card) observer.unobserve(card);
        });
      };
    }

    return () => {
      // Empty cleanup for when condition is not met
    };
  }, [isMobile, isVisible]);

  return (
    <section
      ref={sectionRef}
      id="meet-cheeko"
      className="relative py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden"
    >
      <Container>
        <div className="text-center relative">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt="Decorative icon - Left header decoration"
              width={40}
              height={42}
              className="absolute -left-10 sm:-left-12 md:-left-14 lg:-left-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              quality={75}
            />
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora">
              <span className="text-black">Meet</span>{" "}
              <span className="text-orange-500">Cheeko</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt="Decorative icon - Right header decoration"
              width={40}
              height={42}
              className="absolute -right-10 sm:-right-12 md:-right-14 lg:-right-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              quality={75}
            />
          </div>
        </div>

        {/* Subheading */}
        <p className="text-center text-sm sm:text-lg md:text-xl lg:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto font-switzer leading-5 sm:leading-7 mt-2">
          The most advanced AI toy for kids — adapting to your child's pace,
          interests, and learning style. It listens, responds, and evolves,
          turning everyday moments into powerful learning experiences.
        </p>

        {/* Cards container with decorative elements */}
        <div className="relative">
          {/* Top left decorative element */}
          <Image
            src="/icons/meet-cheeko-topleft.svg"
            alt="Decorative element - Top left corner"
            width={96}
            height={94}
            className="absolute -left-6 sm:-left-8 md:-left-10 lg:-left-12 top-2 sm:-top-8 md:-top-10 lg:-top-12 z-0 decorative-topleft w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            quality={75}
          />

          {/* Mobile Slider */}
          {isMobile ? (
            <div
              className={`relative z-10 -mx-4 ${
                isVisible ? "mobile-slider-visible" : "mobile-slider-hidden"
              }`}
            >
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                loopFillGroupWithBlank={true}
                loopedSlides={cards.length}
                loopPreventsSlide={false}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="meet-cheeko-swiper !py-4 !pb-12"
              >
                {[...cards, ...cards].map((card, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-2xl shadow-lg h-[420px] flex flex-col overflow-hidden relative transform transition-all duration-300 hover:shadow-2xl">
                      <h3 className="text-xl font-bold font-sora text-gray-900 mb-1 sm:mb-2 px-6 pt-6">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base mb-4 font-switzer px-6 leading-5 sm:leading-relaxed">
                        {card.subtitle}
                      </p>
                      <div className="flex-1 relative mt-auto -mx-6 -mb-6">
                        <Image
                          src={card.image}
                          alt={`CheekoAI ${
                            card.title
                          } - AI toy feature showing how kids can ${card.title.toLowerCase()} with this smart educational toy`}
                          fill
                          className="object-contain object-bottom transition-transform duration-500 pointer-events-none"
                          quality={75}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            /* Desktop Cards grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 2xl:gap-16 relative z-10 w-full">
              {cards.map((card, index) => (
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
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-orange-500 transition-all duration-1000 ease-out h-[496px] w-full flex flex-col card-inner group overflow-hidden relative">
                    <h3 className="text-xl font-bold font-sora text-gray-900 group-hover:text-white transition-colors duration-500 mb-1 sm:mb-2 px-6 pt-6">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4 font-switzer px-6 leading-5 sm:leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                      {card.subtitle}
                    </p>
                    <div className="flex-1 relative mt-auto -mx-6 -mb-6">
                      <Image
                        src={card.image}
                        alt={`CheekoAI ${
                          card.title
                        } - AI toy feature showing how kids can ${card.title.toLowerCase()} with this smart educational toy`}
                        fill
                        className="object-contain object-bottom transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-[-10px]"
                        quality={75}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom right decorative element */}
          <Image
            src="/icons/meet-cheeko-bottomright.svg"
            alt="Decorative element - Bottom right corner"
            width={122}
            height={123}
            className="absolute -right-6 sm:-right-8 md:-right-10 lg:-right-12 bottom-8 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 z-0 decorative-bottomright w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            quality={75}
          />
        </div>
      </Container>

      <style jsx>{`
        /* Mobile slider animations */
        .mobile-slider-hidden {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-slider-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Desktop card animations */
        .card-animate-initial {
          opacity: 0;
          transform: translateY(100px) scale(0.9);
          transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slide-up {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .card-animate-initial .card-inner {
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
          transition: all 0.7s ease-out;
          transform-style: preserve-3d;
        }

        .card-inner:hover {
          transform: perspective(1000px) rotateX(-5deg) rotateY(5deg)
            translateZ(20px);
        }

        .animate-slide-up .card-inner {
          animation: bounce-in 1.2s ease-out;
        }

        @keyframes bounce-in {
          0% {
            transform: translateY(30px) scale(0.95);
          }
          40% {
            transform: translateY(-15px) scale(1.02);
          }
          80% {
            transform: translateY(5px) scale(0.99);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        /* Decorative elements animations */
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

        /* Swiper custom styles - scoped to meet-cheeko-swiper only */
        :global(.meet-cheeko-swiper .swiper-slide) {
          height: 420px !important;
        }

        :global(.meet-cheeko-swiper .swiper-slide > div) {
          height: 100% !important;
        }

        :global(.meet-cheeko-swiper .swiper-slide-active) {
          z-index: 10;
        }

        :global(.meet-cheeko-swiper .swiper-slide:not(.swiper-slide-active)) {
          transform: scale(0.95);
          opacity: 0.9;
        }

        :global(.meet-cheeko-swiper) {
          padding: 0 16px;
          height: auto !important;
        }

        :global(.meet-cheeko-swiper .swiper-wrapper) {
          align-items: center;
          padding: 4px 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-slider-hidden,
          .mobile-slider-visible,
          .card-animate-initial {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .animate-slide-up .card-inner {
            animation: none;
          }
          :global(.decorative-topleft),
          :global(.decorative-bottomright) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}