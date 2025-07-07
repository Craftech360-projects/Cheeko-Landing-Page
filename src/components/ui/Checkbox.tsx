'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface CheckboxProps {
  label?: string
  description?: string
  error?: string
  variant?: 'default' | 'card'
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, variant = 'default', ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked)
      props.onChange?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const containerStyles = variant === 'card' 
      ? 'p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer'
      : 'flex items-start space-x-3 cursor-pointer'

    return (
      <div className={cn(containerStyles, error && 'border-error-500')}>
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className="sr-only"
            ref={ref}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          <motion.div
            className={cn(
              'h-5 w-5 rounded border-2 flex items-center justify-center transition-colors',
              error 
                ? 'border-error-500' 
                : isChecked 
                  ? 'border-primary-500 bg-primary-500' 
                  : 'border-border bg-background',
              isFocused && 'ring-2 ring-ring ring-offset-2'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isChecked 
                ? error 
                  ? 'var(--error-500)' 
                  : 'var(--primary-500)'
                : 'var(--background)',
              borderColor: isChecked 
                ? error 
                  ? 'var(--error-500)' 
                  : 'var(--primary-500)'
                : error
                  ? 'var(--error-500)'
                  : 'var(--border)'
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isChecked ? 1 : 0, 
                opacity: isChecked ? 1 : 0 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 500, 
                damping: 30 
              }}
            >
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>

        {(label || description) && (
          <div className={variant === 'card' ? 'ml-3' : 'space-y-1'}>
            {label && (
              <motion.label
                htmlFor={props.id}
                className={cn(
                  'text-sm font-medium leading-none cursor-pointer',
                  error ? 'text-error-700' : 'text-foreground'
                )}
                animate={{
                  color: error 
                    ? 'var(--error-700)' 
                    : isChecked 
                      ? 'var(--primary-700)' 
                      : 'var(--foreground)'
                }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.label>
            )}
            
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-1"
          >
            <p className="text-sm text-error-600">{error}</p>
          </motion.div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }