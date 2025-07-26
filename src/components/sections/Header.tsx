"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Container } from "@/components/ui";
import { cn } from "@/utils/cn";
import { useShopify } from "@/hooks/useShopify";
import { trackEvent } from "@/components/GoogleTagManager";

interface NavigationItem {
  label: string;
  href: string;
  isButton?: boolean;
}

interface HeaderProps {
  isVisible?: boolean;
}

const navigationItems: NavigationItem[] = [
  { label: "Meet Cheeko", href: "#meet-cheeko" },
  { label: "Key Features", href: "#key-features" },
  { label: "Easy Setup", href: "#how-it-works" },
  { label: "Parental Dashboard", href: "#parental-dashboard" },
];

const Header: React.FC<HeaderProps> = ({ isVisible = true }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { price, currencySymbol, loading } = useShopify();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80; // Offset for header height
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className={cn(
            "sticky top-0 z-40 transition-all duration-300",
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-border"
              : "bg-white"
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
                <img
                  src="/images/logo.svg"
                  alt="CheekoAI"
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
                        "text-foreground hover:text-primary-600 transition-colors duration-200 font-medium",
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
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
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
                    variant="outline"
                    className="border-orange-500 text-orange-500 bg-transparent hover:bg-orange-50 rounded-md font-semibold text-sm lg:text-base px-6 lg:px-8 min-w-[120px] lg:min-w-[140px] h-8 lg:h-11"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      trackEvent('sign_in_click', {
                        location: 'header'
                      });
                      window.open("https://tools.cheekoai.in/", "_blank");
                    }}
                  >
                    Sign In
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
                  <Button
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
                  >
                    Buy Now
                    {!loading && price > 0
                      ? ` At ${currencySymbol}${price.toFixed(0)}`
                      : ""}
                  </Button>
                </motion.div>
              </div>
            </nav>
          </Container>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export { Header };
