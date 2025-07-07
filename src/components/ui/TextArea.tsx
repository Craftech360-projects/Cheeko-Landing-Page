'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface TextAreaProps {
  label?: string
  error?: string
  helperText?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  className?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
  rows?: number
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, helperText, resize = 'vertical', rows = 4, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const baseStyles = 'flex min-h-[80px] w-full rounded-lg border border-border bg-input px-3 py-2 text-base transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    
    const errorStyles = error ? 'border-error-500 focus-visible:ring-error-500' : 'focus-visible:border-primary-400'
    
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    }

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange?.(e)
    }

    return (
      <div className="space-y-2">
        {label && (
          <motion.label
            htmlFor={props.id}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error ? 'text-error-700' : 'text-foreground'
            )}
            animate={{
              color: isFocused 
                ? error 
                  ? 'var(--error-700)' 
                  : 'var(--primary-600)'
                : error
                  ? 'var(--error-700)'
                  : 'var(--foreground)'
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}
        
        <motion.textarea
          className={cn(
            baseStyles,
            errorStyles,
            resizeStyles[resize],
            className
          )}
          rows={rows}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          animate={{
            borderColor: isFocused 
              ? error 
                ? 'var(--error-500)' 
                : 'var(--primary-400)'
              : error
                ? 'var(--error-500)'
                : 'var(--border)',
            boxShadow: isFocused 
              ? error
                ? '0 0 0 3px rgb(239 68 68 / 0.1)'
                : '0 0 0 3px rgb(14 165 233 / 0.1)'
              : '0 0 0 0px transparent'
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />

        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error ? (
              <p className="text-sm text-error-600">{error}</p>
            ) : helperText ? (
              <p className="text-sm text-muted-foreground">{helperText}</p>
            ) : null}
          </motion.div>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

export { TextArea }