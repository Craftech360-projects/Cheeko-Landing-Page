'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  review: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Mother of 2',
    avatar: '/images/user1.png',
    rating: 5,
    review: 'CheekoAI has transformed how Emma learns. She went from struggling with basic concepts to confidently solving problems on her own.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Tech Executive',
    avatar: '/images/user2.png',
    rating: 5,
    review: "As a tech professional, I was skeptical about AI toys. But CheekoAI impressed me with its sophisticated yet child-friendly approach."
  },
  {
    id: 3,
    name: 'Dr. Amanda Rodriguez',
    role: 'Pediatric Psychologist',
    avatar: '/images/user3.png',
    rating: 5,
    review: 'I recommend CheekoAI to my patients\' families. It excellently balances screen time with meaningful learning.'
  }
]

export function Testimonials() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
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
  }, [])

  return (
    <section className="relative py-20 px-2 sm:px-6 md:px-[2px] lg:px-[80px] xl:px-[60px] 2xl:px-[160px] overflow-hidden">
      <div className="max-w-full-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-4">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt=""
              width={69}
              height={72}
              className="absolute -left-20 -top-12"
            />
            <h2 className="text-5xl md:text-6xl font-bold font-sora">
              <span className="text-black">What parents are</span>{" "}
              <span className="text-orange-500">saying</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt=""
              width={69}
              height={72}
              className="absolute -right-20 -top-12"
            />
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how Cheeko has transformed learning experiences for families around the world.
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
                width: '100%',
                maxWidth: '392px',
                height: '206px',
                margin: '0 auto'
              }}
            >
              <div className="bg-white rounded-2xl p-6 h-full shadow-lg border border-gray-100 flex flex-col justify-between">
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
                <p className="text-gray-700 text-sm flex-grow mb-4 line-clamp-3">
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
                        e.currentTarget.src = '/images/default-avatar.jpg';
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
    </section>
  );
}