"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Card {
  title: string;
  subtitle: string;
  image: string;
}

const cards: Card[] = [
  {
    title: "Talk",
    subtitle:
      "Natural conversations tailored to your child’s questions, moods, and daily curiosity.",
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
      "Cheeko listens, remembers, and grows with your child’s learning every day.",
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

  useEffect(() => {
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
    <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 relative">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt=""
              width={69}
              height={72}
              className="absolute -left-15 -top-12"
            />
            <h2 className="text-5xl md:text-6xl font-bold font-sora">
              <span className="text-black">Meet</span>{" "}
              <span className="text-orange-500">Cheeko</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt=""
              width={69}
              height={72}
              className="absolute -right-15 -top-12"
            />
          </div>
        </div>

        {/* Subheading */}
        <p className="text-center text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-switzer">
          Your child's AI companion for learning, playing, and growing
        </p>

        {/* Cards container with decorative elements */}
        <div className="relative">
          {/* Top left decorative element */}
          <Image
            src="/icons/meet-cheeko-topleft.svg"
            alt=""
            width={96}
            height={94}
            className="absolute -left-8 -top-14 z-0 decorative-topleft"
          />

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
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
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-orange-500 transition-all duration-1000 ease-out h-[496px] w-full max-w-[288px] mx-auto flex flex-col card-inner group overflow-hidden relative">
                  <h3 className="text-xl font-bold font-sora text-gray-900 group-hover:text-white transition-colors duration-500 mb-1 px-6 pt-6">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 font-switzer px-6 tracking-wide group-hover:text-white/90 transition-colors duration-500">
                    {card.subtitle}
                  </p>
                  <div className="flex-1 relative mt-auto -mx-6 -mb-6">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain object-bottom transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-[-10px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom right decorative element */}
          <Image
            src="/icons/meet-cheeko-bottomright.svg"
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

        @media (prefers-reduced-motion: reduce) {
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
