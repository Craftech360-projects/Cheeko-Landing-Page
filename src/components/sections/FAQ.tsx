'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'What age is CheekoAI suitable for?',
    answer: 'CheekoAI is designed for children ages 3-12, with adaptive learning that adjusts to your child\'s developmental stage. Our AI automatically calibrates content difficulty, interaction complexity, and learning pace based on your child\'s age and demonstrated abilities.'
  },
  {
    id: 2,
    question: 'How do I set up CheekoAI for my child?',
    answer: 'Setup is simple! Download the CheekoAI app, create your child\'s profile with basic information (age, interests, learning goals), connect the device via Bluetooth, and let our AI create a personalized learning path. The entire process takes less than 5 minutes.'
  },
  {
    id: 3,
    question: 'How do you protect my child\'s privacy and data?',
    answer: 'We take privacy seriously. CheekoAI is COPPA-compliant, uses end-to-end encryption, stores data locally when possible, and never shares personal information with third parties. Parents have full control over data collection and can delete all information at any time.'
  },
  {
    id: 4,
    question: 'Can I monitor my child\'s activity and progress?',
    answer: 'Absolutely! The parent dashboard provides real-time insights into learning progress, time spent on activities, skills developed, and areas for improvement. You can set usage limits, approve new activities, and receive weekly progress reports.'
  },
  {
    id: 5,
    question: 'How does the AI adapt to my child\'s learning style?',
    answer: 'Our AI observes your child\'s interaction patterns, response times, preferred activities, and learning outcomes to create a unique learning profile. It adjusts difficulty, presentation style, and pacing in real-time to optimize engagement and retention.'
  },
  {
    id: 6,
    question: 'What subjects and skills does CheekoAI cover?',
    answer: 'CheekoAI covers math, reading, science, creative arts, emotional intelligence, problem-solving, and social skills. Content is aligned with educational standards and includes STEM activities, storytelling, music, art creation, and collaborative games.'
  }
]

export function FAQ() {
  const [activeItem, setActiveItem] = useState<number | null>(1) // First question open by default
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const toggleItem = (id: number) => {
    setActiveItem(prev => prev === id ? null : id)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-2 sm:px-6 md:px-[2px] lg:px-[80px] xl:px-[60px] 2xl:px-[160px] opacity-0 transition-opacity duration-700"
    >
      <div className="max-w-full-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 h-[600px]">
          {/* Left Column - Title and Image */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sora mb-8">
              <span className="text-black">Frequently Asked</span>{" "}
              <span className="text-orange-500">Questions</span>
            </h2>
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/faq-image.png"
                alt="FAQ illustration"
                width={402}
                height={375}
                className="max-w-full h-auto"
                onError={(e) => {
                  e.currentTarget.src = '/images/default-faq.jpg'
                }}
              />
            </div>
          </div>

          {/* Right Column - FAQ List */}
          <div className="flex flex-col h-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4">
                {faqData.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      onClick={() => toggleItem(item.id)}
                    >
                      <h4 className="font-sora font-semibold text-gray-900 pr-4">{item.question}</h4>
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
                        <p className="font-switzer text-gray-700 leading-relaxed pt-3">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}