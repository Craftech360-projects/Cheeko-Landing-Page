'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
  isLoading?: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onFocus?: React.FocusEventHandler<HTMLButtonElement>
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, isLoading = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
      outline: 'border border-border bg-background hover:bg-muted hover:border-primary-400',
      ghost: 'hover:bg-muted hover:text-foreground'
    }

    const sizes = {
      sm: 'text-sm px-3 py-1.5 min-h-[32px]',
      md: 'text-base px-4 py-2 min-h-[44px]',
      lg: 'text-lg px-6 py-3 min-h-[48px]',
      xl: 'text-xl px-8 py-4 min-h-[56px]'
    }

    const Component = asChild ? 'span' : motion.button

    return (
      <Component
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export { Button }