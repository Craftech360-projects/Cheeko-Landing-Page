"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui";

interface BottomBarProps {
  isVisible: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.4 }
          }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 h-[80px] sm:h-[100px]"
        >
          <Container>
            <div className="h-full flex items-center justify-between py-2 sm:py-4 gap-2 sm:gap-4">
              {/* Left side - Image and Price */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative w-12 h-12 sm:w-[76px] sm:h-[76px] flex-shrink-0">
                  <img
                    src="/images/bottom-bar-left.png"
                    alt="Cheeko AI Toy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-lg sm:text-[28px] font-bold text-gray-900 leading-tight">₹3,999</div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-base text-gray-700">
                    <span className="bg-green-100 text-green-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-sm font-semibold">
                      50% Off
                    </span>
                    <span className="line-through font-medium text-xs sm:text-base">₹7,999</span>
                  </div>
                </div>
              </div>

              {/* Center - Text */}
              <div className="hidden sm:flex flex-1 text-center px-2 sm:px-4">
                <p className="text-sm sm:text-lg font-semibold text-gray-900 leading-tight">
                  Limited Offer! Buy Cheeko & Get Free Stickers – Ends Soon!
                </p>
              </div>

              {/* Mobile: Text + Cart Button */}
              <div className="flex sm:hidden items-center gap-2 flex-1">
                <p className="text-xs font-semibold text-gray-900 leading-tight flex-1">
                  Limited Offer! Free Stickers!
                </p>
                <button
                  onClick={() => {
                    window.open(
                      "https://cheekoai.myshopify.com/products/cheeko-ai-toy",
                      "_blank"
                    );
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors duration-200 shadow-lg flex-shrink-0"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>

              {/* Desktop: Cart Button */}
              <div className="hidden sm:block flex-shrink-0">
                <button
                  onClick={() => {
                    window.open(
                      "https://cheekoai.myshopify.com/products/cheeko-ai-toy",
                      "_blank"
                    );
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
                >
                  <ShoppingCart size={24} />
                </button>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { BottomBar };