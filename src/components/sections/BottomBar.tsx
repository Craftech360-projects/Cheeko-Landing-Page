"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus } from "lucide-react";

import { useShopify } from "@/hooks/useShopify";
import { OptimizedImage as Image } from "@/components/OptimizedImage";

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
          className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 h-[66px] sm:h-[100px] overflow-visible"
        >
          <div className="h-full flex items-center px-1 sm:px-4 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full flex items-center justify-between gap-2">
              {/* Mobile Layout */}
              <div className="sm:hidden flex items-center justify-between w-full px-1">
                {/* Left side - Image and Price for Mobile */}
                <div className="flex items-center gap-2">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src="/images/bottom-bar-left.png"
                      alt="Cheeko AI Toy"
                      width={150}
                      height={150}
                      className="absolute -top-[75%] -left-1 w-[130%] h-[190%] object-contain"
                      quality="best"
                      priority
                    />
                  </div>
                  {!loading && price > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-orange-500">
                        {currencySymbol}
                        {price.toFixed(0)}
                      </span>
                      <span className="line-through text-gray-500 text-xs">
                        {currencySymbol}
                        {originalPrice}
                      </span>
                      <div className="flex items-center gap-1">
                        <Image
                          src="/icons/discount-icon.svg"
                          alt="Discount"
                          width={20}
                          height={20}
                          className="w-4 h-4"
                        />
                        <span className="text-[#4CAF50] text-xs font-semibold">
                          {discountPercentage}%
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900">
                        Grab Now!
                      </span>
                    </div>
                  )}
                </div>

                {/* Right side - Cart Button for Mobile */}
                <motion.button
                  onClick={() => {
                    window.location.href =
                      "https://cheekoai.myshopify.com/products/cheeko-ai-toy";
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors duration-200 shadow-lg flex-shrink-0 mr-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">
                    <ShoppingCart size={20} />
                    <div className="absolute -top-0.5 -right-0.5 bg-white rounded-full p-0.5">
                      <Plus
                        size={8}
                        strokeWidth={3}
                        className="text-orange-500"
                      />
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between w-full">
                {/* Left side - Image, Price and Text for Desktop */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <Image
                      src="/images/bottom-bar-left.png"
                      alt="Cheeko AI Toy"
                      width={150}
                      height={150}
                      className="absolute -top-[60%] left-0 w-full h-[150%] object-contain"
                      quality="best"
                      priority
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {!loading && price > 0 && (
                      <>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Image
                            src="/icons/discount-icon.svg"
                            alt="Discount"
                            width={32}
                            height={32}
                            className="w-6 h-6"
                          />
                          <span className="text-[#4CAF50] text-base font-semibold mr-1">
                            {discountPercentage}%
                          </span>
                          <span className="line-through font-medium text-xl">
                            {currencySymbol}
                            {originalPrice.toLocaleString()}
                          </span>
                          <div className="text-[28px] ml-1 font-bold text-orange-500 tracking-tight">
                            {currencySymbol}
                            {price.toFixed(0).toLocaleString()}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Text next to pricing */}
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-900 leading-tight">
                      {!loading && price > 0
                        ? `Early Bird Offer! Save ${discountPercentage}% on Cheeko – Sale Ends Soon!`
                        : "Early Bird Offer! Get Cheeko Now – Sale Ends Soon!"}
                    </p>
                  </div>
                </div>

                {/* Right side - Cart Button for Desktop */}
                <motion.button
                  onClick={() => {
                    window.location.href =
                      "https://cheekoai.myshopify.com/products/cheeko-ai-toy";
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full transition-colors duration-200 shadow-lg flex-shrink-0 flex items-center gap-2"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">
                    <ShoppingCart size={24} />
                    <div className="absolute -top-0.5 -right-0.5 bg-white rounded-full p-0.5">
                      <Plus
                        size={10}
                        strokeWidth={3}
                        className="text-orange-500"
                      />
                    </div>
                  </div>
                  <span className="font-semibold text-base">Add to Cart</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { BottomBar };
