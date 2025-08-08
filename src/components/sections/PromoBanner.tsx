"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShopify } from "@/hooks/useShopify";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface PromoBannerProps {
  isVisible?: boolean;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ isVisible = true }) => {
  const { price, currencySymbol, loading } = useShopify();
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    // Set a fixed end date - adjust this date as needed
    // Example: February 1, 2025 at 23:59:59 UTC
    const endTime = new Date("2025-08-09T23:59:59Z").getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  if (isExpired) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "40px", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FCBC17] text-black relative overflow-hidden fixed top-0 left-0 right-0 z-50 h-auto min-h-[48px] py-0 md:py-0 md:h-[40px] pt-1 md:pt-0"
      >
        <div className="absolute inset-0 bg-[#FCBC17]" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-center pt-2 pb-2">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-0 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-2">
                {/* <span className="text-lg sm:text-xl">🎉</span> */}
                <span className="font-medium text-sm lg:text-base">
                  Early Bird Offer Ends In:
                </span>
                <div className="font-mono font-medium text-xs lg:text-sm">
                  {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
                  {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </div>
              </div>

              <div className="hidden lg:block text-black text-sm lg:text-base">
                |
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm lg:text-base">
                  Get Cheeko For
                </span>
                <div className="inline-block">
                  {!loading && price > 0 ? (
                    <>
                      <span className="line-through text-gray text-sm lg:text-base mr-1">
                        {currencySymbol}7999
                      </span>
                      <span className="text-sm lg:text-base font-medium">
                        {currencySymbol}
                        {price.toFixed(0)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs lg:text-sm font-medium">
                      Great Price!
                    </span>
                  )}
                </div>
                {/* <div className="hidden xl:block text-white">|</div>
                <a
                  href="https://cheekoai.myshopify.com/products/cheeko-ai-toy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-yellow-300 transition-colors duration-200 text-lg sm:text-xl font-medium"
                >
                  Shop Now
                </a> */}
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { PromoBanner };
