'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Declare dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface GoogleTagManagerProps {
  GTM_ID: string;
}

export default function GoogleTagManager({ GTM_ID }: GoogleTagManagerProps) {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Verify GTM is loaded after a delay
    const verifyGTM = setTimeout(() => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        // console.log('[GTM] Successfully initialized with ID:', GTM_ID);
        // console.log('[GTM] DataLayer:', window.dataLayer);
        
        // Push a test event in development
        if (process.env.NODE_ENV === 'development') {
          pushToDataLayer({
            event: 'gtm_initialized',
            gtm_id: GTM_ID
          });
        }
      } else {
        console.error('[GTM] Failed to initialize. dataLayer not found.');
      }
    }, 2000);

    return () => clearTimeout(verifyGTM);
  }, [GTM_ID]);

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

// Google Tag Manager noscript component
export function GoogleTagManagerNoscript({ GTM_ID }: GoogleTagManagerProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// Helper function to push events to dataLayer
export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    // Debug mode - log events to console
    if (process.env.NODE_ENV === 'development') {
      // console.log('[GTM DataLayer Push]', data);
    }
    
    window.dataLayer.push(data);
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('[GTM] dataLayer not available. Event not pushed:', data);
  }
};

// Updated trackEvent function for GTM
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  pushToDataLayer({
    event: eventName,
    ...parameters
  });
};