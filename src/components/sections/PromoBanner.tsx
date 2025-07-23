"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PromoBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = React.useState(true);
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    const savedEndTime = localStorage.getItem("promo-end-time");
    const endTime = savedEndTime
      ? parseInt(savedEndTime)
      : Date.now() + 5 * 24 * 60 * 60 * 1000;

    if (!savedEndTime) {
      localStorage.setItem("promo-end-time", endTime.toString());
    }

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
        className="bg-orange-600 text-white relative overflow-hidden fixed top-0 left-0 right-0 z-50 h-[100px]"
      >
        <div className="absolute inset-0 bg-orange-600" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-2 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl">🎉</span>
                <span className="font-bold text-lg sm:text-xl">
                  Super Sale Ends In:
                </span>
                <div className="font-mono font-bold text-lg sm:text-xl">
                  {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
                  {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </div>
              </div>

              <div className="hidden xl:block text-white">|</div>

              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <span className="font-bold text-lg sm:text-xl">
                  Get Cheeko For
                </span>
                <div className="inline-block">
                  <span className="text-lg sm:text-xl font-bold">₹3999</span>
                  <span className="line-through text-white/80 font-bold text-sm ml-1">
                    ₹7999
                  </span>
                </div>
                <div className="hidden xl:block text-white">|</div>
                <a
                  href="https://cheekoai.myshopify.com/products/cheeko-ai-toy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-yellow-300 transition-colors duration-200 text-lg sm:text-xl font-bold"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { PromoBanner };
