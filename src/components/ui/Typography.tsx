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
        className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-sora'
      },
      h2: {
        tag: 'h2',
        className: 'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl font-sora'
      },
      h3: {
        tag: 'h3',
        className: 'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl font-sora'
      },
      h4: {
        tag: 'h4',
        className: 'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl font-sora'
      },
      h5: {
        tag: 'h5',
        className: 'scroll-m-20 text-lg font-semibold tracking-tight font-sora'
      },
      h6: {
        tag: 'h6',
        className: 'scroll-m-20 text-base font-semibold tracking-tight font-sora'
      },
      p: {
        tag: 'p',
        className: 'leading-7 [&:not(:first-child)]:mt-6 font-switzer'
      },
      lead: {
        tag: 'p',
        className: 'text-xl text-muted-foreground font-switzer'
      },
      large: {
        tag: 'div',
        className: 'text-lg font-semibold font-switzer'
      },
      small: {
        tag: 'small',
        className: 'text-sm font-medium leading-none font-switzer'
      },
      muted: {
        tag: 'p',
        className: 'text-sm text-muted-foreground font-switzer'
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