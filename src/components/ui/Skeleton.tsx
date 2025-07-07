'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animated?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animated = true
}) => {
  const baseClasses = 'bg-neutral-200 animate-pulse'
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  }

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }

  if (animated) {
    return (
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
        style={style}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
      style={style}
    />
  )
}

// Pre-built skeleton components for common use cases
const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`space-y-4 p-6 ${className || ''}`}>
    <Skeleton variant="rectangular" height={200} />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
    <div className="flex gap-2">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="50%" />
      </div>
    </div>
  </div>
)

const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className 
}) => (
  <div className={`space-y-2 ${className || ''}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i}
        variant="text" 
        width={i === lines - 1 ? '60%' : '100%'}
      />
    ))}
  </div>
)

export { Skeleton, SkeletonCard, SkeletonText }