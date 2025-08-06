"use client";

import { useState, useEffect, useRef } from "react";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { Container } from "@/components/ui";
import { Snackbar } from "@/components/ui/Snackbar";
import { trackEvent } from "@/components/GoogleTagManager";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
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
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && !data.errors) {
        trackEvent("newsletter_subscribe", {
          method: "email",
          success: true,
        });
        setMessage({
          type: "success",
          text: "Successfully subscribed to CheekoAI",
        });
        setEmail("");
      } else {
        trackEvent("newsletter_subscribe", {
          method: "email",
          success: false,
          error_type: data.errors ? data.errors[0].message : "unknown",
        });
        setMessage({
          type: "error",
          text: data.errors
            ? data.errors[0].message
            : "Subscription failed. Please try again.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
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
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl overflow-hidden">
            {/* Simplified Pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  {/* Simple dot pattern */}
                  <pattern
                    id="dotPattern"
                    patternUnits="userSpaceOnUse"
                    width="20"
                    height="20"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="1.5"
                      fill="white"
                      opacity="0.1"
                    />
                  </pattern>

                  {/* Small rhombus pattern */}
                  <pattern
                    id="smallRhombusPattern"
                    patternUnits="userSpaceOnUse"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M30,25 L35,30 L30,35 L25,30 Z"
                      fill="white"
                      opacity="0.05"
                    />
                  </pattern>
                </defs>

                {/* Apply patterns */}
                <rect width="100%" height="100%" fill="url(#dotPattern)" />
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

            <div className="relative z-10 py-4 sm:py-6 md:py-8 lg:py-4 xl:py-8">
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-2 xl:gap-6 w-full px-3 sm:px-4 lg:px-3 xl:px-8 items-center">
                {/* Left Content */}
                <div className="flex flex-col justify-center space-y-2 sm:space-y-3 lg:space-y-1.5 xl:space-y-3">
                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-xl xl:text-3xl font-sora font-bold text-white leading-tight">
                    Join the Cheeko Club
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-lg font-switzer text-white/90 max-w-full lg:max-w-md leading-snug lg:leading-tight xl:leading-relaxed">
                    Get exclusive updates, early access to new features, and
                    special offers delivered straight to your inbox.
                  </p>

                  {/* Email Subscription Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-3 lg:mt-2 xl:mt-4"
                  >
                    <div className="flex flex-col bg-white font-medium rounded-md p-1.5 shadow-lg w-full max-w-md space-y-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                        className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 border border-gray-400 rounded-md font-switzer text-sm sm:text-base transition-colors duration-200"
                        style={{ outline: 'none', boxShadow: 'none' }}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-md transition-colors duration-200 whitespace-nowrap text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                    width={700}
                    height={406}
                    className="w-full h-auto lg:max-w-[450px] xl:max-w-[700px] object-contain"
                    quality={100}
                    priority
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.src = "/images/newsletter-image.png";
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
