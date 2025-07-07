'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui'

interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'tilt'
  entranceAnimation?: 'fade' | 'slide' | 'scale' | 'flip'
  direction?: 'up' | 'down' | 'left' | 'right'
  triggerOnce?: boolean
  threshold?: number
  interactive?: boolean
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className,
  hoverEffect = 'lift',
  entranceAnimation = 'fade',
  direction = 'up',
  triggerOnce = true,
  threshold = 0.1,
  interactive = true
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin: '-20px 0px'
  })

  const entranceVariants = {
    fade: {
      hidden: { opacity: 0, y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0, x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0 },
      visible: { opacity: 1, y: 0, x: 0 }
    },
    slide: {
      hidden: { 
        opacity: 0, 
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
        x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0
      },
      visible: { opacity: 1, y: 0, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    flip: {
      hidden: { opacity: 0, rotateY: 90 },
      visible: { opacity: 1, rotateY: 0 }
    }
  }

  const hoverVariants = {
    lift: {
      y: -8,
      boxShadow: 'var(--shadow-glow)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
    },
    scale: {
      scale: 1.02,
      boxShadow: 'var(--shadow-lg)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
    },
    glow: {
      boxShadow: 'var(--shadow-glow)',
      borderColor: 'var(--primary-400)',
      transition: { duration: 0.3 }
    },
    tilt: {
      rotateY: 5,
      rotateX: 5,
      scale: 1.02,
      boxShadow: 'var(--shadow-lg)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
    }
  }

  const tapVariant = {
    scale: 0.98,
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: entranceVariants[entranceAnimation].hidden,
        visible: {
          ...entranceVariants[entranceAnimation].visible,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94] as const
          }
        }
      }}
      {...(interactive && { whileHover: hoverVariants[hoverEffect] })}
      {...(interactive && { whileTap: tapVariant })}
      className={className}
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      <Card interactive={interactive}>
        {children}
      </Card>
    </motion.div>
  )
}

export { AnimatedCard }