"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Shield, Star, Truck, Clock } from "lucide-react";
import { useShopify } from "@/hooks/useShopify";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { OptimizedImage as Image } from "@/components/OptimizedImage";

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const { price, currencySymbol, loading, openCheckout } = useShopify();
  const { timeLeft, isExpired, formatTime } = useCountdownTimer();


  // Multiple trigger strategies
  React.useEffect(() => {
    // Don't show popup if offer has expired
    if (isExpired) return;
    
    // Check localStorage to avoid annoying repeat visitors
    const lastDismissed = localStorage.getItem('cheeko_popup_dismissed');
    if (lastDismissed) {
      const hoursSinceDismissal = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60);
      if (hoursSinceDismissal < 24) return; // Don't show again for 24 hours
    }

    let timeoutId: NodeJS.Timeout;
    let exitIntentTriggered = false;

    // Scroll trigger
    const handleScroll = () => {
      if (hasTriggered) return;
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= 25) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    // Exit intent trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered || exitIntentTriggered) return;
      
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0) {
        exitIntentTriggered = true;
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    // Time-based trigger (30 seconds)
    timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    }, 30000);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [hasTriggered, isExpired]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('cheeko_popup_dismissed', Date.now().toString());
  };

  const handleBuyNow = () => {
    // Track conversion event (you can add analytics here)
    console.log('Popup CTA clicked');
    openCheckout();
  };

  const originalPrice = 7999; // Original price matching Header component
  const discountPercentage = price > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Don't render popup if offer has expired
  if (isExpired) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[100]"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[480px] max-h-[90vh] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Limited Offer Badge */}
            <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 sm:px-4 py-1 rounded-br-xl z-20">
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                <span className="hidden sm:inline">LIMITED LAUNCH OFFER</span>
                <span className="sm:hidden">LIMITED OFFER</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 bg-orange-500 hover:bg-black rounded-full flex items-center justify-center transition-all duration-200 z-20 shadow-lg hover:scale-110"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-neutral-00" />
            </button>

            <div className="relative flex-1 overflow-y-auto">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 opacity-70" />
              
              <div className="relative p-4 sm:p-6 md:p-8">
                {/* Timer */}
                <div className="text-center mb-3 sm:mb-4">
                  <div className="inline-flex items-center gap-1 sm:gap-2 bg-red-50 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Offer ends in: {formatTime(timeLeft.days)}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s</span>
                    <span className="sm:hidden">{formatTime(timeLeft.days)}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                    MEET CHEEKO
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 mb-1">
                    Your Child's AI Learning Buddy
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < 4 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : i === 4 
                              ? 'fill-yellow-400/50 text-yellow-400' 
                              : 'fill-gray-300 text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">(4.5 / 5 from 127 parents)</span>
                  </div>

                  {/* Price Section */}
                  {!loading && price > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <span className="text-gray-400 line-through text-lg sm:text-xl">
                          {currencySymbol}{originalPrice}
                        </span>
                        <span className="text-2xl sm:text-3xl font-bold text-orange-500">
                          {currencySymbol}{price.toFixed(0)}
                        </span>
                        {discountPercentage > 0 && (
                          <span className="bg-green-100 text-green-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm font-semibold">
                            SAVE {discountPercentage}%
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-left max-w-sm mx-auto">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">Screen-free interactive learning for age 4+</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">Safe AI that adapts to your child's learning pace</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">Parent dashboard to track progress</span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative h-32 sm:h-40 md:h-48 mb-4 sm:mb-6">
                    <Image
                      src="/images/faq-image.png"
                      alt="Child with Cheeko and Dinosaur"
                      width={400}
                      height={300}
                      className="absolute left-1/2 transform -translate-x-1/2 h-full w-auto object-contain"
                      quality="best"
                      priority
                    />
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full h-12 sm:h-14 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl mb-3 relative overflow-hidden transition-colors duration-200"
                    onClick={handleBuyNow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{
                        x: ["-200%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative z-10">
                      <span className="hidden sm:inline">
                        {!loading && price > 0 
                          ? `Get Cheeko Now - Only ${currencySymbol}${price.toFixed(0)}`
                          : "Pre-Order Now"
                        }
                      </span>
                      <span className="sm:hidden">
                        {!loading && price > 0 
                          ? `Buy Now ${currencySymbol}${price.toFixed(0)}`
                          : "Pre-Order"
                        }
                      </span>
                    </span>
                  </motion.button>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Free Shipping</span>
                    </div>
                  </div>

                  {/* Guarantee */}
                  {/* <p className="text-xs text-gray-500 mt-3">
                    30-day money-back guarantee • No questions asked
                  </p> */}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Popup };