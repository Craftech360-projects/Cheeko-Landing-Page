import Link from 'next/link'
import type { Metadata } from 'next'
import { OptimizedImage as Image } from "@/components/OptimizedImage";

export const metadata: Metadata = {
  title: '404 - Page Not Found | CheekoAI',
  description: 'The page you are looking for does not exist. Return to CheekoAI homepage to explore our AI toy for kids.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-teal-50 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* CheekoAI Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo.svg"
            alt="CheekoAI Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
        </div>
        
        <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to exploring CheekoAI!
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Back to Home
        </Link>
        
        {/* Additional Navigation */}
        <div className="mt-12 space-y-2 text-sm text-gray-500">
          <p>Looking for information about our AI toy?</p>
          <div className="space-x-4">
            <Link href="/#meet-cheeko" className="text-orange-500 hover:text-orange-600 font-medium">
              Meet CheekoAI
            </Link>
            <span>•</span>
            <Link href="/#key-features" className="text-orange-500 hover:text-orange-600 font-medium">
              Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}