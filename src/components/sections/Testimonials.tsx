"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ashwathy Mehra",
    role: "Mother of Ananya, 7",
    avatar: "/images/user1.png",
    rating: 5,
    review:
      "Honestly didn't think my daughter would love it this much but she's obsessed!! No screens, just talking and laughing all day. Love it!!",
  },
  {
    id: 2,
    name: "Rahul Iyer",
    role: "Father of Aarav, 8",
    avatar: "/images/user2.png",
    rating: 5,
    review:
      "I was so tired of saying 'put down the phone'... Cheeko solved it without me even trying lol. She talks to her toy now to do her homework 😂",
  },
  {
    id: 3,
    name: "Meenakshi Sharma",
    role: "Mother of Vihaan & Vanya, 9",
    avatar: "/images/user3.png",
    rating: 4,
    review:
      "I wanted something safe and fun for my lil one. Cheeko is amazing, plus I control what she hears. no ads, no random junk.",
  },
  {
    id: 4,
    name: "Amit Joshi",
    role: "Dad of Riya, 8",
    avatar: "/images/user4.png",
    rating: 5,
    review:
      "Riya used to be quiet at home — now she's constantly chatting with Cheeko about planets, riddles, and math!",
  },
  {
    id: 5,
    name: "Deepika Reddy",
    role: "Mom of Arjun, 7",
    avatar: "/images/user5.png",
    rating: 5,
    review:
      "Arjun's screen time has dropped, his vocabulary's gone up, and he actually looks forward to talking with Cheeko.",
  },
  {
    id: 6,
    name: "Priya Nair",
    role: "Mom of Ishaan, 6",
    avatar: "/images/user6.png",
    rating: 4,
    review:
      "Ishaan won't stop chatting with Cheeko, it's the first toy that actually talks back and keeps up with his curiosity.",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [hasAutoSlided, setHasAutoSlided] = useState(false);

  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CheekoAI",
    description: "AI Learning Companion for Children",
    brand: {
      "@type": "Brand",
      name: "CheekoAI",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewBody: testimonial.review,
      datePublished: new Date().toISOString().split("T")[0],
    })),
  };

  // Auto-slide once on first visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoSlided && swiperRef.current) {
            setTimeout(() => {
              swiperRef.current?.slideNext();
              setHasAutoSlided(true);
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAutoSlided]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewStructuredData),
        }}
      />
      <Container>
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt="Decorative icon - Left header decoration"
              width={40}
              height={42}
              className="absolute -left-10 sm:-left-12 md:-left-14 lg:-left-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora">
              <span className="text-black">Hear from</span>{" "}
              <span className="text-orange-500">Parents</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt="Decorative icon - Right header decoration"
              width={40}
              height={42}
              className="absolute -right-10 sm:-right-12 md:-right-14 lg:-right-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </div>
          <p className="text-sm sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto leading-5 sm:leading-7 mt-2">
            Stories from families who've made Cheeko one of their own.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative -mx-4 sm:mx-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={4}
            slidesPerView={1.3}
            centeredSlides={true}
            loop={true}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
                centeredSlides: false,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-2xl p-4 sm:p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 min-h-[100px]">
                  {/* Stars */}
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i: number) => (
                      <svg
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        viewBox="0 0 20 20"
                        fill={i < testimonial.rating ? "#FFB800" : "#E5E7EB"}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-xs sm:text-sm lg:text-base mb-4 sm:mb-4 leading-[1.4] sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {testimonial.review}
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/images/default-avatar.jpg";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Desktop Only */}
          <button
            className="swiper-button-prev-custom hidden lg:flex absolute -left-12 xl:-left-16 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom hidden lg:flex absolute -right-12 xl:-right-16 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </Container>

      <style jsx global>{`
        .testimonials-swiper {
          padding: 16px 16px 48px 16px !important;
        }

        @media (min-width: 640px) {
          .testimonials-swiper {
            padding: 0 0 48px 0 !important;
          }
        }

        .testimonials-swiper .swiper-slide {
          height: auto;
        }

        @media (max-width: 639px) {
          .testimonials-swiper .swiper-slide {
            min-height: 180px;
          }
        }

        .testimonials-swiper .swiper-slide > div {
          height: 100%;
        }

        .testimonials-swiper .swiper-pagination {
          position: absolute !important;
          bottom: 12px !important;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #f97316;
          width: 24px;
          border-radius: 4px;
        }

        /* Scale effect for non-active slides on mobile */
        @media (max-width: 767px) {
          .testimonials-swiper .swiper-slide:not(.swiper-slide-active) {
            transform: scale(0.9);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}