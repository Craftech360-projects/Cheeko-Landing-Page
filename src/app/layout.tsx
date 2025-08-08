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
  title: "CheekoAI - Best AI Toy for Kids in India | Smart Educational Toy",
  description: "CheekoAI is the #1 AI toy for kids in India. Safe, COPPA-compliant educational AI-powered toy for children aged 3-12. Free shipping across Mumbai, Delhi, Bangalore & all Indian cities. ₹3,999 only.",
  keywords: [
    "AI toy for kids",
    "AI toy for kids India",
    "best AI toy for children",
    "smart toy for kids 3-12 years",
    "educational AI toy India",
    "CheekoAI toy price",
    "AI learning toy for toddlers",
    "interactive AI toy Mumbai",
    "CheekoAI toy Delhi",
    "smart learning toy Bangalore",
    "COPPA compliant AI toy",
    "safe AI toy for 3 year old",
    "AI toy Hindi Tamil Telugu",
    "buy AI toy online India"
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
    locale: "en_IN",
    url: "https://cheekoai.in",
    siteName: "CheekoAI",
    title: "CheekoAI - AI Toy for Kids | Smart Learning Companion",
    description: "CheekoAI is the best AI toy for kids in India. Safe, educational AI-powered toy that helps children learn through play. Perfect for ages 3-12.",
    // Images will be automatically handled by Next.js when you add opengraph-image.png to app directory
  },
  twitter: {
    card: "summary_large_image",
    site: "@cheekoai",
    creator: "@cheekoai",
    title: "CheekoAI - AI Toy for Kids | Smart Learning Companion",
    description: "CheekoAI is the best AI toy for kids in India. Safe, educational AI-powered toy for children ages 3-12.",
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
        <meta name="google-site-verification" content="n8iGB7YqnZeFBCF3jSa-eka3wM4abjBm8Y9WBDNkkyI" />
        <link rel="alternate" hrefLang="en-IN" href="https://cheekoai.in" />
        <link rel="alternate" hrefLang="x-default" href="https://cheekoai.in" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
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
