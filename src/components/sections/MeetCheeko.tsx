"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { OptimizedImage as Image } from "@/components/OptimizedImage";

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
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Touch/drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (isMobile && isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = prev + 1;
          if (nextSlide === cards.length) {
            // When reaching the cloned slide, reset to slide 0 after transition
            setTimeout(() => {
              setIsResetting(true);
              setCurrentSlide(0);
              // Use requestAnimationFrame to ensure smooth transition
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setIsResetting(false);
                });
              });
            }, 700);
            return nextSlide;
          }
          return nextSlide;
        });
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobile, isAutoPlaying]);

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

  // Swipe/drag handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    setIsAutoPlaying(false);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = currentX - startX;
    const threshold = 100; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped right - go to previous slide
        setCurrentSlide((prev) => {
          const newSlide = prev - 1;
          if (newSlide < 0) {
            // Jump to the last real slide (cards.length - 1) without showing clone
            setTimeout(() => {
              setCurrentSlide(cards.length - 1);
            }, 700);
            return cards.length; // Show clone briefly during transition
          }
          return newSlide;
        });
      } else {
        // Swiped left - go to next slide  
        setCurrentSlide((prev) => {
          const nextSlide = prev + 1;
          if (nextSlide === cards.length) {
            // When reaching the cloned slide, reset to slide 0 after transition
            setTimeout(() => {
              setIsResetting(true);
              setCurrentSlide(0);
              // Use requestAnimationFrame to ensure smooth transition
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setIsResetting(false);
                });
              });
            }, 700);
            return nextSlide;
          }
          return nextSlide;
        });
      }
    }
    
    setDragOffset(0);
    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  return (
    <section ref={sectionRef} id="meet-cheeko" className="relative section-padding overflow-hidden">
      <Container>
        <div className="text-center mb-4 relative">
          <div className="relative inline-block">
            <Image
              src="/icons/Header-Icon-Left.svg"
              alt=""
              width={40}
              height={42}
              className="absolute -left-10 sm:-left-12 md:-left-14 lg:-left-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora">
              <span className="text-black">Meet</span>{" "}
              <span className="text-orange-500">Cheeko</span>
            </h2>
            <Image
              src="/icons/Header-Icon-Right.svg"
              alt=""
              width={40}
              height={42}
              className="absolute -right-10 sm:-right-12 md:-right-14 lg:-right-15 -top-8 sm:-top-10 md:-top-11 lg:-top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </div>
        </div>

        {/* Subheading */}
        <p className="text-center text-sm sm:text-lg md:text-xl lg:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto font-switzer leading-tight sm:leading-relaxed">
          Cheeko adapts to your child's pace, interests, and learning style. It listens, responds, and evolves, turning everyday moments into hands-on learning.
        </p>

        {/* Cards container with decorative elements */}
        <div className="relative">
          {/* Top left decorative element */}
          <Image
            src="/icons/meet-cheeko-topleft.svg"
            alt=""
            width={96}
            height={94}
            className="absolute -left-6 sm:-left-8 md:-left-10 lg:-left-12 -top-6 sm:-top-8 md:-top-10 lg:-top-12 z-0 decorative-topleft w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />

          {/* Mobile Slider */}
          {isMobile ? (
            <div className={`relative z-10 ${isVisible ? 'mobile-slider-visible' : 'mobile-slider-hidden'}`}>
              {/* Slider container */}
              <div 
                ref={sliderRef}
                className="overflow-hidden rounded-2xl relative cursor-grab active:cursor-grabbing select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={isDragging ? handleMouseMove : undefined}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className={`flex ${isDragging || isResetting ? 'transition-none' : 'transition-transform duration-700 ease-out'}`}
                  style={{ 
                    transform: `translateX(${-currentSlide * 100 + (dragOffset / (sliderRef.current?.offsetWidth || 1)) * 100}%)`,
                  }}
                >
                  {/* Render cards with clones for infinite effect */}
                  {[...cards, cards[0]].map((card, index) => {
                    // For the cloned slide (last index), treat it as slide 0 for animation purposes
                    const isClonedSlide = index === cards.length;
                    const effectiveIndex = isClonedSlide ? 0 : index;
                    const effectiveCurrentSlide = currentSlide === cards.length ? 0 : currentSlide;
                    
                    return (
                    <div 
                      key={`${index}-${isClonedSlide ? 'clone' : 'original'}`} 
                      className={`w-full flex-shrink-0 ${isResetting ? 'transition-none' : 'transition-all duration-700'} ${
                        index === currentSlide 
                          ? 'scale-100 opacity-100' 
                          : Math.abs(index - currentSlide) === 1 || 
                            (currentSlide === 0 && index === cards.length) ||
                            (currentSlide === cards.length && index === 0)
                          ? 'scale-95 opacity-80'
                          : 'scale-90 opacity-60'
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-lg h-[496px] w-full max-w-[328px] mx-auto flex flex-col overflow-hidden relative transform transition-all duration-700 hover:shadow-2xl">
                        <h3 className="text-xl font-bold font-sora text-gray-900 mb-1 px-6 pt-6">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 font-switzer px-6 tracking-wide">
                          {card.subtitle}
                        </p>
                        <div className="flex-1 relative mt-auto -mx-6 -mb-6">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-contain object-bottom transition-transform duration-500 pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Cards grid */
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
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-orange-500 transition-all duration-1000 ease-out h-[496px] w-full max-w-[328px] mx-auto flex flex-col card-inner group overflow-hidden relative">
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
          )}

          {/* Bottom right decorative element */}
          <Image
            src="/icons/meet-cheeko-bottomright.svg"
            alt=""
            width={122}
            height={123}
            className="absolute -right-6 sm:-right-8 md:-right-10 lg:-right-12 -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 z-0 decorative-bottomright w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
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
