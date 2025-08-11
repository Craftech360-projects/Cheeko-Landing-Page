'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'full', children, ...props }, ref) => {
    // Mobile-first responsive padding - optimized for better desktop spacing
    // Mobile: 16px, Small: 24px, Tablet: 32px, Laptop: 80px, Desktop: 128px, Large Desktop: 200px
    const baseStyles = 'mx-auto px-8 sm:px-6 md:px-8 lg:px-20 xl:px-28 2xl:px-[240px]'
    
    const sizes = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl', 
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full'
    }

    return (
      <div
        className={cn(
          baseStyles,
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export { Container }