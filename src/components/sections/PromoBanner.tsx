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

const PromoBanner: React.FC = () => {
  const { price, currencySymbol, loading } = useShopify();
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = React.useState(true);
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    // Set a fixed end date - adjust this date as needed
    // Example: February 1, 2025 at 23:59:59 UTC
    const endTime = new Date('2025-08-04T23:59:59Z').getTime();

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
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  if (!isVisible || isExpired) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "80px", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-orange-600 text-white relative overflow-hidden fixed top-0 left-0 right-0 z-50 h-auto min-h-[70px] py-2 md:py-0 md:h-[80px]"
      >
        <div className="absolute inset-0 bg-orange-600" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-0 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-2">
                {/* <span className="text-lg sm:text-xl">🎉</span> */}
                <span className="font-semibold text-base sm:text-2xl">
                  Early Bird Offer Ends In:
                </span>
                <div className="font-mono font-semibold text-base sm:text-2xl">
                  {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
                  {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </div>
              </div>

              <div className="hidden lg:block text-white text-xl">|</div>

              <div className="flex items-center space-x-2">
                <span className="font-semibold text-base sm:text-2xl">
                  Get Cheeko For
                </span>
                <div className="inline-block">
                  {!loading && price > 0 ? (
                    <>
                      <span className="line-through text-white font-normal text-base sm:text-xl mr-2">
                        {currencySymbol}7999
                      </span>
                      <span className="text-base sm:text-2xl font-semibold">
                        {currencySymbol}
                        {price.toFixed(0)}
                      </span>
                    </>
                  ) : (
                    <span className="text-base sm:text-xl font-semibold">
                      Great Price!
                    </span>
                  )}
                </div>
                {/* <div className="hidden xl:block text-white">|</div>
                <a
                  href="https://cheekoai.myshopify.com/products/cheeko-ai-toy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-yellow-300 transition-colors duration-200 text-lg sm:text-xl font-semibold"
                >
                  Shop Now
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { PromoBanner };
