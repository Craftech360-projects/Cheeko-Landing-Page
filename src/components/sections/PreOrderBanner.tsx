"use client";

import { useEffect, useRef } from "react";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { useShopify } from "@/hooks/useShopify";

export function PreOrderBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { price, currencySymbol, loading } = useShopify();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-banner");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div ref={bannerRef} className="relative w-full my-8 sm:my-12 md:my-16 banner-initial">
      <div className="relative overflow-hidden py-4">
        <div className="relative h-[118px] transform -rotate-1">
          {/* Banner Pattern Container */}
          <div className="absolute -left-4 -right-4 top-0 bottom-0 overflow-hidden">
            <div className="animate-scroll-banner flex">
              {/* Repeat the banner shape pattern */}
              {[...Array(20)].map((_, index) => (
                <div key={index} className="relative flex-shrink-0" style={{ width: '718px', height: '118px', marginRight: '-1px' }}>
                  <Image
                    src="/images/banner-shape.svg"
                    alt="Pre-order banner background pattern"
                    width={718}
                    height={118}
                    className="w-full h-full"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                      ✻ Pre Order Now{loading ? (
                        <span className="inline-block w-20 h-6 bg-white/30 animate-pulse rounded ml-2 align-middle"></span>
                      ) : price > 0 ? (
                        ` At ${currencySymbol}${price.toFixed(0)}`
                      ) : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-initial {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out;
        }

        .animate-banner {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes scroll-banner {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-banner {
          display: flex;
          animation: scroll-banner 20s linear infinite;
          width: fit-content;
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-initial {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .animate-scroll-banner {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}