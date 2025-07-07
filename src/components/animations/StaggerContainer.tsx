'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface StaggerContainerProps {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  triggerOnce?: boolean
  threshold?: number
}

const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className,
  direction = 'up',
  distance = 30,
  triggerOnce = true,
  threshold = 0.1
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin: '-50px 0px'
  })

  const directionVariants = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  }

  const itemVariants = {
    hidden: directionVariants[direction],
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 120,
        duration: 0.6
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export { StaggerContainer }