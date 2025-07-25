"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";

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
    name: "Ananya Mehra",
    role: "Mother of Ananya, 7",
    avatar: "/images/user1.png",
    rating: 5,
    review:
      "Honestly didn’t think my daughter would love it this much but she’s obsessed!! No screens, just talking and laughing all day. Love it!!",
  },
  {
    id: 2,
    name: "Rahul Iyer",
    role: "Father of Aarav, 8",
    avatar: "/images/user2.png",
    rating: 5,
    review:
      "I was so tired of saying ‘put down the phone’... Cheeko solved it without me even trying lol. She talks to her toy now to do her homework 😂",
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
];

export function Testimonials() {
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

  return (
    <section
      id="testimonials"
      className="relative section-padding overflow-hidden"
    >
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          <div className="relative inline-block mb-4">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt=""
              width={40}
              height={42}
              className="absolute -left-8 sm:-left-14 md:-left-16 lg:-left-20 -top-6 sm:-top-10 md:-top-11 lg:-top-12 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora px-4 sm:px-0">
              <span className="text-black">What parents are</span>{" "}
              <span className="text-orange-500">saying</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt=""
              width={40}
              height={42}
              className="absolute -right-8 sm:-right-14 md:-right-16 lg:-right-20 -top-6 sm:-top-10 md:-top-11 lg:-top-12 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from families who have welcomed Cheeko into their homes.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="opacity-0 transition-opacity duration-700"
              style={{
                width: "100%",
                maxWidth: "392px",
                margin: "0 auto",
              }}
            >
              <div className="bg-white rounded-2xl p-6 min-h-[206px] shadow-lg border border-gray-100 flex flex-col justify-between">
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
                <p className="text-gray-700 text-sm flex-grow mb-4">
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
      </Container>
    </section>
  );
}
