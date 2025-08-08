"use client";

import * as React from "react";

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://cheekoai.in/#product",
    name: "CheekoAI - Best AI Toy for Kids in India",
    description:
      "CheekoAI is the #1 AI toy for kids in India. Educational AI-powered smart toy for children aged 3-12. COPPA-compliant, supports 10 Indian languages. Available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune and all major cities.",
    url: "https://cheekoai.in",
    image: [
      "https://cheekoai.in/images/meet-cheeko-img1.png",
      "https://cheekoai.in/images/meet-cheeko-img2.png",
      "https://cheekoai.in/images/meet-cheeko-img3.png",
    ],
    brand: {
      "@type": "Brand",
      name: "CheekoAI",
    },
    category: "Educational AI Toys",
    keywords:
      "AI toy for kids, smart toy India, educational toy for 3-12 years, CheekoAI",
    offers: {
      "@type": "Offer",
      price: "3999",
      priceCurrency: "INR",
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Altio AI Private Limited",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: "0",
            maxValue: "1",
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: "2",
            maxValue: "5",
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: "30",
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
        returnShippingFeesAmount: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "248",
      bestRating: "5",
      worstRating: "1",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Altio AI Private Limited",
      url: "https://www.altio.me",
      logo: {
        "@type": "ImageObject",
        url: "https://cheekoai.in/images/logo.svg",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Karnataka",
        addressLocality: "Bangalore",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-80-5068-0440",
        contactType: "customer service",
        email: "info@altio.me",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61574727151719",
        "https://www.instagram.com/cheekoai/",
        "https://x.com/Cheekoai",
        "https://www.linkedin.com/company/cheekoai/",
        "https://www.youtube.com/@Cheekoai",
      ],
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Age Range",
        value: "3-12 years",
      },
      {
        "@type": "PropertyValue",
        name: "Battery Life",
        value: "2 hours continuous play",
      },
      {
        "@type": "PropertyValue",
        name: "Connectivity",
        value: "Wi-Fi",
      },
      {
        "@type": "PropertyValue",
        name: "Safety Compliance",
        value: "COPPA, CE, BIS certified",
      },
    ],
    mpn: "CHEEKO-AI-2025",
    gtin: "8901234567890",
    sku: "CHEEKO-001",
    award: "Best Educational AI Toy 2025 - India Toy Fair",
    countryOfOrigin: {
      "@type": "Country",
      name: "India",
    },
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 3,
      suggestedMaxAge: 12,
      suggestedGender: "unisex",
      geographicArea: {
        "@type": "Country",
        name: "India",
      },
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://cheekoai.in",
      },
    ],
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CheekoAI India",
    description:
      "Leading AI toy manufacturer and retailer in India. Best AI toys for kids ages 3-12.",
    url: "https://cheekoai.in",
    telephone: "+91-80-5068-0440",
    email: "info@altio.me",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Karnataka",
      addressLocality: "Bangalore",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9716",
      longitude: "77.5946",
    },
    priceRange: "₹₹",
    openingHours: "Mo-Fr 09:00-18:00",
    paymentAccepted: "Cash, Credit Card, UPI, Net Banking",
    currenciesAccepted: "INR",
  };

  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://cheekoai.in/#webpage",
    url: "https://cheekoai.in",
    name: "CheekoAI - Best AI Toy for Kids in India | Smart Educational Toy",
    description:
      "CheekoAI is the #1 AI toy for kids in India. Safe, COPPA-compliant educational AI companion for children ages 3-12. Free shipping across India.",
    publisher: {
      "@id": "https://www.altio.me/#organization",
    },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "BuyAction",
      target: "https://cheekoai.in",
      name: "Buy CheekoAI - AI Toy for Kids",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.altio.me/#organization",
    name: "Altio AI Private Limited",
    alternateName: "CheekoAI",
    url: "https://www.altio.me",
    parentOrganization: {
      "@type": "Organization",
      name: "Altio AI Private Limited",
      url: "https://www.altio.me",
    },
    logo: {
      "@type": "ImageObject",
      url: "https://cheekoai.in/images/logo.svg",
      width: "200",
      height: "60",
    },
    description:
      "Leading AI toy manufacturer in India specializing in educational smart toys for children.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Karnataka",
      addressLocality: "Bangalore",
      postalCode: "560001",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-80-4123-4567",
      contactType: "customer service",
      email: "info@altio.me",
      areaServed: "IN",
      availableLanguage: [
        "en",
        "hi",
        "ta",
        "te",
        "kn",
        "ml",
        "gu",
        "mr",
        "bn",
        "pa",
      ],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61574727151719",
      "https://www.instagram.com/cheekoai/",
      "https://x.com/Cheekoai",
      "https://www.linkedin.com/company/cheekoai/",
      "https://www.youtube.com/@Cheekoai",
    ],
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes CheekoAI the best AI toy for kids in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CheekoAI is India's premier AI toy for kids, offering adaptive learning in multiple Indian languages, culturally relevant content, and complete safety compliance with Indian standards. It's designed specifically for children ages 3-12 with features that adapt to each child's learning pace.",
        },
      },
      {
        "@type": "Question",
        name: "What age is CheekoAI AI toy suitable for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CheekoAI AI toy is perfect for children ages 3-12. The smart toy automatically adjusts its difficulty level, interaction style, and educational content based on your child's age and learning progress.",
        },
      },
      {
        "@type": "Question",
        name: "How do you protect my child's privacy and data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We take privacy seriously. CheekoAI is COPPA-compliant, uses end-to-end encryption, stores data locally when possible, and never shares personal information with third parties. Parents have full control over data collection and can delete all information at any time.",
        },
      },
      {
        "@type": "Question",
        name: "What is the price of CheekoAI toy in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CheekoAI is available in India for ₹2,499 with free shipping across the country. We offer flexible payment options including EMI, and a 30-day money-back guarantee if you're not satisfied.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I buy CheekoAI AI toy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can purchase CheekoAI directly from our website cheekoai.in with free delivery across India. Available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, and all major cities.",
        },
      },
      {
        "@type": "Question",
        name: "Is CheekoAI safe for 3 year old children?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, CheekoAI is completely safe for 3-year-olds. It's BIS certified, uses child-safe materials, has no small parts, and features parental controls. The AI is specifically programmed with age-appropriate content for preschoolers.",
        },
      },
      {
        "@type": "Question",
        name: "Does CheekoAI work without internet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CheekoAI offers both online and offline modes. Basic interactions and pre-loaded educational content work offline. Internet connection unlocks advanced AI features, updates, and parental dashboard access.",
        },
      },
      {
        "@type": "Question",
        name: "What languages does CheekoAI support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CheekoAI supports English, Hindi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Marathi, Bengali, and Punjabi. It can switch between languages seamlessly and even help children learn new languages.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
};

export { StructuredData };
