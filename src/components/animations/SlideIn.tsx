'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SlideInProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  triggerOnce?: boolean
  threshold?: number
  stagger?: boolean
  staggerDelay?: number
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.8,
  distance = 100,
  className,
  triggerOnce = true,
  threshold = 0.1,
  stagger = false,
  staggerDelay = 0.1
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin: '-50px 0px'
  })

  const directionVariants = {
    left: { x: -distance, opacity: 0 },
    right: { x: distance, opacity: 0 },
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 }
  }

  const variants = {
    hidden: directionVariants[direction],
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 120,
        duration,
        delay: stagger ? delay : delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  const containerVariants = stagger ? {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  } : variants

  if (stagger && React.Children.count(children) > 1) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className={className}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={variants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { SlideIn }