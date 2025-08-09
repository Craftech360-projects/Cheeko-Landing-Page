"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { OptimizedImage as Image } from "@/components/OptimizedImage";

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    checkScrollButtons();
    scrollContainer.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      scrollContainer.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('div[data-testimonial]')?.clientWidth || 392;
    const gap = 24; // gap-6 in pixels
    const scrollAmount = cardWidth + gap;
    
    const targetScroll = direction === "left" 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="testimonials"
      className="relative section-padding pb-4 sm:pb-6 md:pb-8 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewStructuredData),
        }}
      />
      <Container>
        {/* Header Section */}
        <div className="text-center mb-6 px-4">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt="Decorative icon - Left header decoration"
              width={40}
              height={42}
              className="absolute -left-8 sm:-left-14 md:-left-16 lg:-left-20 -top-6 sm:-top-10 md:-top-11 lg:-top-12 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora sm:px-0">
              <span className="text-black">Hear from</span>{" "}
              <span className="text-orange-500">Parents</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt="Decorative icon - Right header decoration"
              width={40}
              height={42}
              className="absolute -right-8 sm:-right-14 md:-right-16 lg:-right-20 -top-6 sm:-top-10 md:-top-11 lg:-top-12 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </div>
          <p className="text-sm sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto leading-5 sm:leading-7 mt-2">
            Stories from families who’ve made Cheeko one of their own.
          </p>
        </div>

        {/* Testimonial Cards - Horizontal Scroll */}
        <div className="relative flex items-center">
          {/* Left Chevron - Desktop Only */}
          <button
            onClick={() => scroll("left")}
            className={`hidden md:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 items-center justify-center hover:bg-gray-50 transition-all duration-200 ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
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

          {/* Right Chevron - Desktop Only */}
          <button
            onClick={() => scroll("right")}
            className={`hidden md:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 items-center justify-center hover:bg-gray-50 transition-all duration-200 ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
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

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide w-full"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-4 md:gap-6 pb-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  data-testimonial
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="opacity-0 transition-opacity duration-700 flex-shrink-0 w-[calc(100vw-32px)] sm:w-[calc(50vw-32px)] md:w-[392px]"
                  style={{
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="bg-white rounded-2xl p-6 h-full min-h-[206px] shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill={i < testimonial.rating ? "#FFB800" : "#E5E7EB"}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 text-sm md:text-base flex-grow mb-4 leading-relaxed">
                      {testimonial.review}
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
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
                        <h4 className="font-semibold text-sm text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .animate-fade-in {
            opacity: 1 !important;
          }
        `}</style>
      </Container>
    </section>
  );
}