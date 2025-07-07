'use client'

import * as React from 'react'

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CheekoAI",
    "description": "AI-powered learning companion for children ages 3-12. Safe, adaptive, and engaging educational technology with COPPA compliance.",
    "url": "https://cheekoai.com",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "iOS, Android, Web",
    "offers": {
      "@type": "Offer",
      "price": "29.99",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "10000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CheekoAI Inc.",
      "url": "https://cheekoai.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cheekoai.com/logo.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "1-800-CHEEKO",
        "contactType": "customer service",
        "email": "help@cheekoai.com"
      },
      "sameAs": [
        "https://twitter.com/cheekoai",
        "https://facebook.com/cheekoai",
        "https://instagram.com/cheekoai",
        "https://linkedin.com/company/cheekoai"
      ]
    },
    "featureList": [
      "Adaptive AI Learning",
      "Emotional Intelligence Development",
      "Problem Solving Skills",
      "Creative Expression Tools",
      "Social Skills Development",
      "COPPA Compliance",
      "Parental Controls",
      "Progress Tracking"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Children aged 3-12 and their parents"
    },
    "educationalLevel": "Elementary School",
    "learningResourceType": "Interactive Learning Platform",
    "accessibilityFeature": [
      "alternativeText",
      "structuralNavigation",
      "readingOrder"
    ],
    "accessibilityControl": [
      "fullKeyboardControl",
      "fullMouseControl",
      "fullTouchControl"
    ],
    "accessibilityHazard": "none",
    "accessibilitySummary": "Fully accessible learning platform with keyboard navigation, screen reader support, and reduced motion options."
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What age is CheekoAI suitable for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CheekoAI is designed for children ages 3-12, with adaptive learning that adjusts to your child's developmental stage. Our AI automatically calibrates content difficulty, interaction complexity, and learning pace based on your child's age and demonstrated abilities."
        }
      },
      {
        "@type": "Question", 
        "name": "How do you protect my child's privacy and data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We take privacy seriously. CheekoAI is COPPA-compliant, uses end-to-end encryption, stores data locally when possible, and never shares personal information with third parties. Parents have full control over data collection and can delete all information at any time."
        }
      },
      {
        "@type": "Question",
        "name": "What subscription plans are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer monthly ($29.99), annual ($299.99), and family plans (up to 4 children, $499.99/year). All plans include unlimited access to learning content, regular updates, parent dashboard, and customer support. 30-day free trial available."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  )
}

export { StructuredData }