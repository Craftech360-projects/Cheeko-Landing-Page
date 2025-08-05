'use client'

import * as React from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <ErrorBoundary>
          <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-warning-500 to-error-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Application Error
                </h1>
                
                <p className="text-gray-600 max-w-md mx-auto">
                  We're experiencing technical difficulties. Our team has been notified 
                  and is working to resolve this issue.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-w-[140px] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Go Home
                </button>
              </div>

              <div className="text-sm text-gray-500 space-y-2">
                <p>If this problem persists, please contact our support team:</p>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <a 
                    href="mailto:help@cheekoai.in" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    help@cheekoai.in
                  </a>
                  <span>•</span>
                  <a 
                    href="tel:1-800-CHEEKO" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    1-800-CHEEKO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}