"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
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

  // Auto-dismiss message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail(''); // Clear the email input
      } else {
        setMessage({ type: 'error', text: data.error || 'Subscription failed. Please try again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 opacity-0 transition-opacity duration-700"
    >
      <Container>
        <div className="relative bg-gradient-to-r from-orange-500 to-orange-500 rounded-3xl overflow-hidden">
          {/* Rhombus Pattern */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                {/* Rhombus pattern */}
                <pattern
                  id="rhombusPattern"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  height="60"
                >
                  {/* Large rhombus */}
                  <path
                    d="M30,10 L50,30 L30,50 L10,30 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.2"
                  />

                  {/* Small rhombus inside */}
                  <path
                    d="M30,20 L40,30 L30,40 L20,30 Z"
                    fill="white"
                    opacity="0.1"
                  />

                  {/* Corner dots */}
                  <circle cx="10" cy="10" r="1" fill="white" opacity="0.15" />
                  <circle cx="50" cy="10" r="1" fill="white" opacity="0.15" />
                  <circle cx="10" cy="50" r="1" fill="white" opacity="0.15" />
                  <circle cx="50" cy="50" r="1" fill="white" opacity="0.15" />
                </pattern>

                {/* Smaller rhombus pattern */}
                <pattern
                  id="smallRhombusPattern"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                >
                  {/* Small rhombus */}
                  <path
                    d="M20,5 L35,20 L20,35 L5,20 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.15"
                  />

                  {/* Center dot */}
                  <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.15" />
                </pattern>

                {/* Diamond grid pattern */}
                <pattern
                  id="diamondPattern"
                  patternUnits="userSpaceOnUse"
                  width="80"
                  height="80"
                >
                  {/* Diamond outline */}
                  <path
                    d="M40,10 L70,40 L40,70 L10,40 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.18"
                  />

                  {/* Inner diamond */}
                  <path
                    d="M40,20 L60,40 L40,60 L20,40 Z"
                    fill="white"
                    opacity="0.08"
                  />

                  {/* Cross lines */}
                  <line
                    x1="40"
                    y1="10"
                    x2="40"
                    y2="70"
                    stroke="white"
                    strokeWidth="0.3"
                    opacity="0.12"
                  />
                  <line
                    x1="10"
                    y1="40"
                    x2="70"
                    y2="40"
                    stroke="white"
                    strokeWidth="0.3"
                    opacity="0.12"
                  />
                </pattern>
              </defs>

              {/* Apply rhombus patterns */}
              <rect
                width="100%"
                height="100%"
                fill="url(#rhombusPattern)"
                opacity="1"
              />
              <rect
                width="100%"
                height="100%"
                fill="url(#smallRhombusPattern)"
                opacity="0.8"
                transform="translate(30, 30)"
              />
              <rect
                width="100%"
                height="100%"
                fill="url(#diamondPattern)"
                opacity="0.6"
                transform="translate(-20, 10)"
              />
            </svg>

            {/* Additional standalone rhombus shapes */}
            <div className="absolute top-12 left-20 w-8 h-8 bg-white/15 transform rotate-45"></div>
            <div className="absolute top-24 right-32 w-6 h-6 bg-white/18 transform rotate-45"></div>
            <div className="absolute bottom-16 left-40 w-10 h-10 bg-white/12 transform rotate-45"></div>
            <div className="absolute bottom-28 right-24 w-7 h-7 bg-white/15 transform rotate-45"></div>
            <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-white/18 transform rotate-45"></div>
            <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-white/20 transform rotate-45"></div>
          </div>

          <div className="relative z-10 py-6 sm:py-8 lg:py-12">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full px-4 sm:px-6 lg:px-12">
              {/* Left Content */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white leading-tight">
                  Join the Cheeko Club
                </h2>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-switzer text-white/90 max-w-full lg:max-w-md leading-relaxed">
                  Get exclusive updates, early access to new features, and
                  special offers delivered straight to your inbox.
                </p>

                {/* Message Banner */}
                {message && (
                  <div className={`mt-4 p-3 rounded-md text-sm font-medium ${
                    message.type === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Email Subscription Form */}
                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="flex flex-col sm:flex-row bg-white font-medium rounded-md p-2 shadow-lg w-full max-w-md">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email Address"
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-transparent text-black placeholder-black focus:outline-none focus:ring-0 focus:border-none border-none font-switzer text-sm sm:text-base"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-md transition-colors duration-200 whitespace-nowrap text-sm sm:text-base mt-2 sm:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Image */}
              <div className="hidden lg:flex items-center justify-center lg:justify-end">
                <Image
                  src="/images/newsletter-image.png"
                  alt="Join Cheeko Club"
                  width={541}
                  height={458}
                  className="max-w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = "/images/default-newsletter.jpg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
