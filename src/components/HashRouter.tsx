"use client";

import { useEffect, useState } from "react";
import { PrivacyPolicy } from "@/components/sections/PrivacyPolicy";

interface HashRouterProps {
  children: React.ReactNode;
}

export function HashRouter({ children }: HashRouterProps) {
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setCurrentHash(newHash);
      
      // Scroll to top when navigating to privacy policy
      if (newHash === "#privacy-policy") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    // Set initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // If we're on the privacy policy hash, show only the privacy policy
  if (currentHash === "#privacy-policy") {
    return (
      <>
        <div className="min-h-screen">
          <PrivacyPolicy />
          <div className="text-center py-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </>
    );
  }

  // Otherwise show the normal page content
  return <>{children}</>;
}