"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { Snackbar } from "@/components/ui/Snackbar";
import { trackEvent } from "@/components/GoogleAnalytics";

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
        trackEvent('form_submit', 'newsletter', 'newsletter_subscription_success');
        setMessage({ type: 'success', text: data.message });
        setEmail(''); // Clear the email input
      } else {
        trackEvent('form_submit', 'newsletter', 'newsletter_subscription_error');
        setMessage({ type: 'error', text: data.error || 'Subscription failed. Please try again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        id="newsletter"
        ref={sectionRef}
        className="relative section-padding opacity-0 transition-opacity duration-700"
      >
        <Container>
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-500 rounded-3xl overflow-hidden">
            {/* Simplified Pattern */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  {/* Simple dot pattern */}
                  <pattern
                    id="dotPattern"
                    patternUnits="userSpaceOnUse"
                    width="40"
                    height="40"
                  >
                    <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.1" />
                  </pattern>

                  {/* Small rhombus pattern */}
                  <pattern
                    id="smallRhombusPattern"
                    patternUnits="userSpaceOnUse"
                    width="60"
                    height="60"
                  >
                    <path
                      d="M30,25 L35,30 L30,35 L25,30 Z"
                      fill="white"
                      opacity="0.08"
                    />
                  </pattern>
                </defs>

                {/* Apply patterns */}
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#dotPattern)"
                />
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#smallRhombusPattern)"
                  transform="translate(20, 20)"
                />
              </svg>

              {/* Few subtle standalone shapes */}
              <div className="absolute top-20 right-1/4 w-3 h-3 bg-white/10 transform rotate-45"></div>
              <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/8 transform rotate-45"></div>
              <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-white/10 transform rotate-45"></div>
            </div>

            <div className="relative z-10 py-6 sm:py-8 lg:py-12">
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full px-4 sm:px-6 lg:px-12">
                {/* Left Content */}
                <div className="flex flex-col justify-center space-y-2 sm:space-y-2">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white leading-tight">
                    Join the Cheeko Club
                  </h2>
                  <p className="text-sm sm:text-lg md:text-xl lg:text-xl font-switzer text-white/90 max-w-full lg:max-w-md leading-relaxed">
                    Get exclusive updates, early access to new features, and
                    special offers delivered straight to your inbox.
                  </p>

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
      {message && (
        <Snackbar
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}
    </>
  );
}
