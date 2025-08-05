"use client";

import { useState, useEffect, useRef } from "react";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/ui";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What age is CheekoAI suitable for?",
    answer:
      "CheekoAI is designed for children above the age of 4, with adaptive learning that adjusts to your child's developmental stage. Our AI automatically calibrates content difficulty, interaction complexity, and learning pace based on your child's age and demonstrated abilities.",
  },
  {
    id: 2,
    question: "Can I use Cheeko in areas with unstable Wi-Fi?",
    answer:
      "Cheeko requires a stable connection for full functionality. For best results, ensure you're connected to a consistent home network during use.",
  },
  {
    id: 3,
    question: "Can Cheeko move around the house or go outside?",
    answer:
      "Yes! As long as it stays connected to Wi-Fi, Cheeko can move from room to room. Outdoor use may require hotspot support.",
  },
  {
    id: 4,
    question: "What if Cheeko says the code, but I miss it?",
    answer:
      "Just hold the right button again, Cheeko will repeat the code so you can try again.",
  },
  {
    id: 5,
    question: "Can I pair Cheeko to a new phone later?",
    answer:
      "Yes! You can unpair from the original device and reconnect it to a new one through the app. Your child’s data will remain safe in the cloud.",
  },
  {
    id: 6,
    question: "What subjects and skills does CheekoAI cover?",
    answer:
      "CheekoAI covers math, reading, science, creative arts, emotional intelligence, problem-solving, and social skills. Content is aligned with educational standards and includes STEM activities, storytelling, music, art creation, and collaborative games.",
  },
];

export function FAQ() {
  const [activeItem, setActiveItem] = useState<number | null>(1); // First question open by default
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleItem = (id: number) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative -mt-8 -mb-3 section-padding opacity-0 transition-opacity duration-700"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-12">
          {/* Left Column - Title and Image */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora mb-4 sm:mb-16">
              <span className="text-black">FAQ and</span>{" "}
              <span className="text-orange-500">Help</span>
            </h2>
            <div className="hidden sm:flex justify-center lg:justify-start">
              <Image
                src="/images/faq-image.png"
                alt="FAQ illustration"
                width={402}
                height={375}
                className="max-w-full h-auto"
                onError={(e) => {
                  e.currentTarget.src = "/images/default-faq.jpg";
                }}
              />
            </div>
          </div>

          {/* Right Column - FAQ List */}
          <div className="flex flex-col">
            <div className="space-y-4">
              {faqData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => toggleItem(item.id)}
                  >
                    <h4 className="font-sora text-sm font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h4>
                    <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center flex-shrink-0">
                      {activeItem === item.id ? (
                        <ChevronUp className="w-4 h-4 text-orange-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  </button>
                  {activeItem === item.id && (
                    <div className="px-4 pb-4">
                      <p className="font-switzer text-sm ext-gray-700 leading-relaxed pt-3">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
