"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Container } from "@/components/ui";
import { cn } from "@/utils/cn";
import { trackEvent } from "@/components/GoogleTagManager";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { useShopify } from "@/hooks/useShopify";

interface NavigationItem {
  label: string;
  href: string;
  isButton?: boolean;
}

interface HeaderProps {
  isVisible?: boolean;
  showSplash?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const navigationItems: NavigationItem[] = [
  { label: "Meet Cheeko", href: "#meet-cheeko" },
  { label: "Key Features", href: "#key-features" },
  { label: "Easy Setup", href: "#how-it-works" },
  { label: "Parental Dashboard", href: "#parental-dashboard" },
];

const Header: React.FC<HeaderProps> = ({
  isVisible = true,
  showSplash = false,
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { price, currencySymbol, loading } = useShopify();
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    // Set a fixed end date - adjust this date as needed
    const endTime = new Date("2025-08-15T23:59:59Z").getTime();

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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -120; // Offset for header + promo banner height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollToSection(href);
  };

  if (isExpired) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.header
            className={cn(
              "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
              isScrolled
                ? "bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10"
                : "bg-black/90 backdrop-blur-sm"
            )}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.4 },
            }}
          >
            <Container>
              <nav className="flex items-center h-16 lg:h-20">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <Image
                    src="/images/logo.svg"
                    alt="CheekoAI"
                    width={120}
                    height={48}
                    className="h-8 w-auto sm:h-9 md:h-10 lg:h-12"
                  />
                </motion.div>

                {/* Desktop Navigation - Center */}
                <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94] as const,
                      }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "text-white hover:text-orange-500 transition-colors duration-200 font-medium",
                          "relative py-2 px-1"
                        )}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        {item.label}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.a>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons - Always visible on right */}
                <div className="ml-auto flex items-center gap-4">
                  {/* Sign In Button */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                  >
                    <Button
                      className="bg-orange-500 text-white border-none hover:bg-orange-600 rounded-md font-semibold text-sm lg:text-base px-4 sm:px-6 lg:px-8 min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] h-8 lg:h-11 flex items-center justify-center"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        trackEvent("download_app_click", {
                          location: "header",
                        });
                        scrollToSection("#how-it-works");
                      }}
                    >
                      <span className="sm:hidden">Download App</span>
                      <span className="hidden sm:inline">
                        Download Parent App
                      </span>
                    </Button>
                  </motion.div>

                  {/* Buy Now Button - Hidden on mobile */}
                  <motion.div
                    className="hidden sm:block"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                  >
                    {/* <Button
                    variant="primary"
                    className="text-neutral-00 bg-orange-500 rounded-md font-semibold text-sm lg:text-base px-6 lg:px-8 min-w-[120px] lg:min-w-[140px] h-8 lg:h-11"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      trackEvent('purchase_intent', {
                        location: 'header',
                        value: price,
                        currency: currencySymbol || 'USD',
                        item_name: 'Cheeko AI Toy'
                      });
                      window.location.href = "https://cheekoai.myshopify.com/products/cheeko-ai-toy";
                    }}
                  > */}
                    {/* Buy Now
                    {!loading && price > 0
                      ? ` At ${currencySymbol}${price.toFixed(0)}`
                      : ""}
                  </Button> */}
                  </motion.div>
                </div>
              </nav>
            </Container>
          </motion.header>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-40"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.4 },
          }}
        >
          {/* Promo Banner */}
          {!showSplash && !isExpired && (
            <div className="bg-[#FCBC17] text-black relative overflow-hidden h-[40px]">
              <div className="absolute inset-0 bg-[#FCBC17]" />
              <div className="relative z-10 h-full flex items-center">
                <motion.div
                  className="flex whitespace-nowrap"
                  animate={{
                    x: ["0%", "-25%"],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 35,
                      ease: "linear",
                    },
                  }}
                >
                  {/* Create many copies for seamless scrolling on ultra-wide screens */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                    <div
                      key={index}
                      className="flex items-center pr-12 md:pr-16 lg:pr-20"
                    >
                      <span className="font-medium text-sm md:text-base">
                        Early Bird Offer Ends In:
                      </span>
                      <span className="font-mono font-medium text-sm md:text-base mx-1">
                        {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}
                        :{formatTime(timeLeft.minutes)}:
                        {formatTime(timeLeft.seconds)},
                      </span>
                      {/* <span className="mx-2 text-black">|</span> */}
                      <span className="font-medium text-sm md:text-base">
                        Get Cheeko For
                      </span>
                      <span className="ml-1">
                        {!loading && price > 0 ? (
                          <>
                            <span className="line-through text-gray-800 text-sm md:text-base mr-1">
                              {currencySymbol}7999
                            </span>
                            <span className="text-sm md:text-base font-medium">
                              {currencySymbol}
                              {price.toFixed(0)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm md:text-base font-medium">
                            Great Price!
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          )}

          {/* Header Navigation */}
          <header
            className={cn(
              "transition-all duration-300",
              isScrolled
                ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10"
                : "bg-black/80 backdrop-blur-sm"
            )}
          >
            <Container>
              <nav className="flex items-center h-16 lg:h-20">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <Image
                    src="/images/logo.svg"
                    alt="CheekoAI"
                    width={120}
                    height={48}
                    className="h-8 w-auto sm:h-9 md:h-10 lg:h-12"
                  />
                </motion.div>

                {/* Desktop Navigation - Center */}
                <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94] as const,
                      }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "text-white hover:text-orange-500 transition-colors duration-200 font-medium",
                          "relative py-2 px-1"
                        )}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        {item.label}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.a>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons - Always visible on right */}
                <div className="ml-auto flex items-center gap-4">
                  {/* Sign In Button */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                  >
                    <Button
                      className="bg-orange-500 text-white border-none hover:bg-orange-600 rounded-md font-semibold text-sm lg:text-base px-2 sm:px-4 lg:px-8 min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] h-8 lg:h-11 flex items-center justify-center"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        trackEvent("download_app_click", {
                          location: "header",
                        });
                        scrollToSection("#how-it-works");
                      }}
                    >
                      <span className="sm:hidden">Download App</span>
                      <span className="hidden sm:inline">
                        Download Parent App
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </nav>
            </Container>
          </header>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Header };
