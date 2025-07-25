"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui";
import { useShopify } from "@/hooks/useShopify";

interface BottomBarProps {
  isVisible: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({ isVisible }) => {
  const { price, currencySymbol, loading } = useShopify();
  const originalPrice = 7999;
  const discountPercentage =
    price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 50;
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
            opacity: { duration: 0.4 },
          }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 h-[80px] sm:h-[100px]"
        >
          <Container className="h-full flex items-center">
            <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
              {/* Left side - Image and Price */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative w-8 h-8 sm:w-12 sm:h-12 md:w-18 md:h-18 flex-shrink-0">
                  <img
                    src="/images/bottom-bar-left.png"
                    alt="Cheeko AI Toy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {!loading && price > 0 && (
                    <>
                      <div className="text-lg sm:text-[32px] font-bold text-orange-500 leading-tight">
                        {currencySymbol}
                        {price.toFixed(0).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-base text-gray-700">
                        <span className="line-through font-medium text-xs sm:text-lg">
                          {currencySymbol}
                          {originalPrice.toLocaleString()}
                        </span>
                        <img
                          src="/icons/discount-icon.svg"
                          alt="Discount"
                          className="w-4 h-4 sm:w-8 sm:h-8"
                        />
                        <span className="text-[#4CAF50] text-[12px] sm:text-lg font-semibold mr-1">
                          {discountPercentage}%
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Center - Text */}
              <div className="hidden sm:flex flex-1 items-center text-center px-2 sm:px-4">
                <p className="text-sm sm:text-lg font-semibold text-gray-900 leading-tight">
                  {!loading && price > 0
                    ? `Early Bird Offer! Save ${discountPercentage}% on Cheeko – Sale Ends Soon!`
                    : "Early Bird Offer! Get Cheeko Now – Sale Ends Soon!"}
                </p>
              </div>

              {/* Mobile: Text + Cart Button */}
              <div className="flex sm:hidden items-center gap-2 flex-1">
                <p className="text-sm font-semibold text-gray-900 leading-tight flex-1">
                  {!loading && price > 0
                    ? `Grab Now!`
                    : "Early Bird Offer!"}
                </p>
                <button
                  onClick={() => {
                    window.location.href =
                      "https://cheekoai.myshopify.com/products/cheeko-ai-toy";
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors duration-200 shadow-lg flex-shrink-0"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>

              {/* Desktop: Cart Button */}
              <div className="hidden sm:flex items-center flex-shrink-0">
                <button
                  onClick={() => {
                    window.location.href =
                      "https://cheekoai.myshopify.com/products/cheeko-ai-toy";
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
