'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'large' | 'small' | 'muted'
  as?: React.ElementType
  children: React.ReactNode
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', as, children, ...props }, ref) => {
    const variants = {
      h1: {
        tag: 'h1',
        className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
      },
      h2: {
        tag: 'h2',
        className: 'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl'
      },
      h3: {
        tag: 'h3',
        className: 'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl'
      },
      h4: {
        tag: 'h4',
        className: 'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl'
      },
      h5: {
        tag: 'h5',
        className: 'scroll-m-20 text-lg font-semibold tracking-tight'
      },
      h6: {
        tag: 'h6',
        className: 'scroll-m-20 text-base font-semibold tracking-tight'
      },
      p: {
        tag: 'p',
        className: 'leading-7 [&:not(:first-child)]:mt-6'
      },
      lead: {
        tag: 'p',
        className: 'text-xl text-muted-foreground'
      },
      large: {
        tag: 'div',
        className: 'text-lg font-semibold'
      },
      small: {
        tag: 'small',
        className: 'text-sm font-medium leading-none'
      },
      muted: {
        tag: 'p',
        className: 'text-sm text-muted-foreground'
      }
    }

    const { tag, className: variantClassName } = variants[variant]
    const Component = as || tag

    return (
      <Component
        className={cn(variantClassName, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'

export { Typography }