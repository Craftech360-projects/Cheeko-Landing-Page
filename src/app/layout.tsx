import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import GoogleTagManager, { GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import { GATestButton } from "@/components/GATestButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer-Variable.ttf",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const sora = localFont({
  src: [
    {
      path: "./fonts/Sora-Variable.ttf",
      weight: "300 800",
      style: "normal",
    },
  ],
  variable: "--font-sora",
  display: "swap",
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
    url: "https://cheekoai.in",
    siteName: "CheekoAI",
    title: "CheekoAI - AI Learning Companion for Children",
    description: "Empower your child's learning journey with CheekoAI's intelligent, safe, and engaging educational AI companion. Adaptive learning for ages 3-12.",
    images: [
      {
        url: "https://cheekoai.in/og-image.jpg",
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
    images: ["https://cheekoai.in/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      me: ["mailto:hr@altio.me"],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#f36e24" />
      </head>
      <body
        className={`${switzer.variable} ${sora.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {process.env['NEXT_PUBLIC_GTM_ID'] && (
          <>
            <GoogleTagManager GTM_ID={process.env['NEXT_PUBLIC_GTM_ID']} />
            <GoogleTagManagerNoscript GTM_ID={process.env['NEXT_PUBLIC_GTM_ID']} />
          </>
        )}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <GATestButton />
      </body>
    </html>
  );
}
