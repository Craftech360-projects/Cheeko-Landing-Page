import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import GoogleTagManager, { GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
// import { GATestButton } from "@/components/GATestButton";

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
  description: "Empower your child's learning journey with CheekoAI's intelligent, safe, and engaging educational AI companion. Adaptive learning for ages 5-12 with COPPA compliance and parental controls.",
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
  authors: [{ name: "Altio AI" }],
  creator: "Altio AI Private Limited",
  publisher: "Altio AI Private Limited",
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
    description: "Empower your child's learning journey with CheekoAI's intelligent, safe, and engaging educational AI companion. Adaptive learning for ages 5-12.",
    // Images will be automatically handled by Next.js when you add opengraph-image.png to app directory
  },
  twitter: {
    card: "summary_large_image",
    site: "@cheekoai",
    creator: "@cheekoai",
    title: "CheekoAI - AI Learning Companion for Children",
    description: "Empower your child's learning journey with CheekoAI's intelligent, safe, and engaging educational AI companion.",
    // Images will be automatically handled by Next.js when you add twitter-image.png to app directory
  },
  verification: {
    // Verified via DNS TXT record in Hostinger
    other: {
      me: ["mailto:info@altio.me"],
    },
  },
  category: "education",
  alternates: {
    canonical: "https://cheekoai.in",
  },
  metadataBase: new URL("https://cheekoai.in"),
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
      </body>
    </html>
  );
}
