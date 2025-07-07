import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CheekoAI - AI Learning Companion for Children",
  description: "Empower your child's learning journey with CheekoAI's intelligent, safe, and engaging educational AI companion. Adaptive learning for ages 3-12 with COPPA compliance and parental controls.",
  keywords: [
    "AI learning",
    "children education",
    "adaptive learning",
    "educational technology",
    "COPPA compliant",
    "safe AI for kids",
    "learning companion",
    "child development"
  ],
  authors: [{ name: "CheekoAI Team" }],
  creator: "CheekoAI Inc.",
  publisher: "CheekoAI Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cheekoai.com",
    siteName: "CheekoAI",
    title: "CheekoAI - AI Learning Companion for Children",
    description: "Empower your child's learning journey with CheekoAI's intelligent, safe, and engaging educational AI companion. Adaptive learning for ages 3-12.",
    images: [
      {
        url: "https://cheekoai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CheekoAI - AI Learning Companion for Children",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cheekoai",
    creator: "@cheekoai",
    title: "CheekoAI - AI Learning Companion for Children",
    description: "Empower your child's learning journey with CheekoAI's intelligent, safe, and engaging educational AI companion.",
    images: ["https://cheekoai.com/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      me: ["mailto:contact@cheekoai.com"],
    },
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
