'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// Declare gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// Page view tracking component
function PageViewTracking({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return null;
}

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Verify GA is loaded after a delay
    const verifyGA = setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (window.gtag) {
          console.log('[GA4] Successfully initialized with ID:', GA_MEASUREMENT_ID);
          // Send a test event in development
          if (process.env.NODE_ENV === 'development') {
            trackEvent('ga_initialized', {
              measurement_id: GA_MEASUREMENT_ID
            });
          }
        } else {
          console.error('[GA4] Failed to initialize. gtag not found.');
        }
      }
    }, 2000);

    return () => clearTimeout(verifyGA);
  }, [GA_MEASUREMENT_ID]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={() => {
          console.log('[GA4] Script loaded successfully');
        }}
        onError={() => {
          console.error('[GA4] Failed to load Google Analytics script');
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              debug_mode: ${process.env.NODE_ENV === 'development'}
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracking GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      </Suspense>
    </>
  );
}

// Helper function to track custom events (GA4 format)
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Debug mode - log events to console
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4 Event]', eventName, parameters);
    }
    
    window.gtag('event', eventName, parameters);
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('[GA4] gtag not loaded yet. Event not tracked:', eventName);
  }
};

// Legacy function for backward compatibility
export const trackEventLegacy = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  // Convert legacy format to GA4 format
  trackEvent(action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};