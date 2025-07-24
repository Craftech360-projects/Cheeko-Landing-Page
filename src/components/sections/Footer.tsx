"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

const navigationLinks = [
  { label: "Meet Cheeko", href: "#meet-cheeko" },
  { label: "Key Features", href: "#key-features" },
  { label: "Easy Setup", href: "#how-it-works" },
  { label: "Parental Dashboard", href: "#parental-dashboard" },
];

const socialLinks = [
  {
    icon: "/icons/facebook.svg",
    href: "https://www.facebook.com/profile.php?id=61574727151719",
    label: "Facebook",
  },
  {
    icon: "/icons/instagram.svg",
    href: "https://www.instagram.com/cheekoai/",
    label: "Instagram",
  },
  {
    icon: "/icons/x.svg",
    href: "https://x.com/Cheekoai",
    label: "X",
  },
  {
    icon: "/icons/linkedin.svg",
    href: "https://www.linkedin.com/company/cheekoai/?viewAsMember=true",
    label: "LinkedIn",
  },
  {
    icon: "/icons/youtube.svg",
    href: "https://www.youtube.com/@Cheekoai",
    label: "YouTube",
  },
];

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-white relative py-16 px-2 sm:px-6 md:px-[2px] lg:px-[80px] xl:px-[60px] 2xl:px-[160px]">
        <div className="max-w-full-2xl mx-auto">
          {/* First Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/icons/logo.svg"
                alt="CheekoAI Logo"
                width={120}
                height={40}
                className="h-12 w-auto"
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center gap-8 justify-center">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-orange-500 transition-colors font-medium font-switzer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:opacity-60"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-8"></div>

          {/* Second Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left side - Copyright and legal links */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
              <span>© {currentYear} CheekoAI. All rights reserved.</span>
              <div className="flex items-center gap-4">
                {/* <a
                  href="#privacy-policy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </a> */}
                {/* <a
                  href="/terms"
                  className="hover:text-orange-500 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="hover:text-orange-500 transition-colors"
                >
                  Cookie Settings
                </a> */}
              </div>
            </div>

            {/* Right side - Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <ChevronUp className="w-4 h-4" />
              Back to Top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
