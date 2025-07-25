"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useShopify } from "@/hooks/useShopify";

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const { price, currencySymbol, loading } = useShopify();

  React.useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return;
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= 25) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);


  const handleClose = () => {
    setIsVisible(false);
  };

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[850px] h-[60vh] md:h-[75vh] max-h-[495px] bg-white rounded-xl overflow-hidden shadow-2xl z-[101]"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              <div className="hidden md:block md:h-full md:w-1/2 bg-orange-500 relative overflow-hidden">
                <img
                  src="/videos/popup_video.gif"
                  alt="Cheeko animation"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="h-full w-full md:w-1/2 bg-white relative">
                <div className="text-center pt-8 md:pt-[46px] px-4">
                  <h2 className="text-3xl md:text-[38px] font-semibold text-orange-500 leading-tight">
                    MEET CHEEKO
                  </h2>
                  <p className="text-md md:text-[18px] text-black mb-3 -mt-1">
                    Your Child's AI Learning Buddy
                  </p>
                  
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-md transition-colors duration-200"
                    onClick={() => window.open("https://cheekoai.myshopify.com/products/cheeko-ai-toy", "_blank")}
                  >
                    {!loading && price > 0 
                      ? <span className="text-[18px]">Buy Now At <span className="text-[24px]">{currencySymbol}{price.toFixed(0)}</span></span>
                      : "Buy Now"
                    }
                  </button>
                </div>

                <img
                  src="/icons/popup-left-bottom-img.png"
                  alt="Decorative icon"
                  className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16"
                />
                
                <img
                  src="/images/popup-right-img.png"
                  alt="Child with Cheeko"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-72 md:h-72 w-auto"
                />
                
                <img
                  src="/icons/popup-right-bottom-img.png"
                  alt="Decorative icon"
                  className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Popup };