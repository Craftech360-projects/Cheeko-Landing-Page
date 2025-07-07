'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'
import { Button, Typography, Container } from '@/components/ui'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps> | undefined
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service like Sentry
      console.log('Logging error to monitoring service:', { error, errorInfo })
    }
    
    this.setState({
      error,
      errorInfo
    })
  }

  resetError = () => {
    this.setState({ hasError: false })
  }

  override render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error!} 
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const [isReporting, setIsReporting] = React.useState(false)

  const handleReportError = async () => {
    setIsReporting(true)
    try {
      // Simulate error reporting
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Error reported:', error.message)
    } catch (reportError) {
      console.error('Failed to report error:', reportError)
    } finally {
      setIsReporting(false)
    }
  }

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <Container className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          {/* Error Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-warning-500 to-error-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <AlertTriangle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Error Message */}
          <div className="space-y-4">
            <Typography variant="h1" className="text-2xl md:text-3xl font-bold text-foreground">
              Oops! Something went wrong
            </Typography>
            
            <Typography className="text-muted-foreground max-w-md mx-auto">
              We encountered an unexpected error. Don't worry, our team has been notified 
              and we're working to fix this issue.
            </Typography>

            {process.env.NODE_ENV === 'development' && (
              <details className="text-left bg-neutral-100 rounded-lg p-4 mt-4">
                <summary className="cursor-pointer font-semibold text-sm text-neutral-700 mb-2">
                  Error Details (Development Mode)
                </summary>
                <pre className="text-xs text-neutral-600 whitespace-pre-wrap overflow-auto">
                  {error.message}
                  {error.stack && `\n\nStack Trace:\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={resetError}
              variant="primary"
              className="min-w-[140px]"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={goHome}
              variant="outline"
              className="min-w-[140px]"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>

            <Button
              onClick={handleReportError}
              variant="ghost"
              disabled={isReporting}
              isLoading={isReporting}
              className="min-w-[140px]"
            >
              <Mail className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>

          {/* Additional Help */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>If this problem persists, please contact our support team:</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <a 
                href="mailto:help@cheekoai.com" 
                className="hover:text-primary-600 transition-colors"
              >
                help@cheekoai.com
              </a>
              <span>•</span>
              <a 
                href="tel:1-800-CHEEKO" 
                className="hover:text-primary-600 transition-colors"
              >
                1-800-CHEEKO
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

// Higher-order component for easy wrapping
const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}

export { ErrorBoundary, withErrorBoundary, DefaultErrorFallback }
export type { ErrorBoundaryProps, ErrorFallbackProps }