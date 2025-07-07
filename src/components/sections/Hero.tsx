'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Star, Users, Award, ArrowRight } from 'lucide-react'
import { Button, Container, Typography } from '@/components/ui'
import { FadeIn, SlideIn } from '@/components/animations'

const Hero: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Families' },
    { icon: Star, value: '4.9/5', label: 'Parent Rating' },
    { icon: Award, value: '15+', label: 'Safety Awards' }
  ]

  const floatingElements = [
    { id: 1, x: '10%', y: '20%', delay: 0 },
    { id: 2, x: '85%', y: '15%', delay: 0.2 },
    { id: 3, x: '5%', y: '60%', delay: 0.4 },
    { id: 4, x: '90%', y: '70%', delay: 0.6 },
    { id: 5, x: '15%', y: '80%', delay: 0.8 }
  ]

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden"> */}
        {/* {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-4 h-4 bg-primary-200 rounded-full opacity-60"
            style={{ left: element.x, top: element.y }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + element.id,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut'
            }}
          />
        ))} */}

        {/* Large background shapes */}
        {/* <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        /> */}

        {/* <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-secondary-200 to-accent-purple opacity-20 rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        /> */}
      {/* </div> */}

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="space-y-8">
            <FadeIn direction="up" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>Rated #1 AI Learning Toy 2024</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <Typography
                variant="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 bg-clip-text text-transparent leading-tight"
              >
                Meet CheekoAI
                <br />
                <span className="text-foreground">Your Child's AI Learning Companion</span>
              </Typography>
            </FadeIn>

            <FadeIn direction="up" delay={0.6}>
              <Typography
                variant="lead"
                className="text-xl text-muted-foreground max-w-2xl"
              >
                The world's first AI-powered educational toy that adapts to your child's learning style,
                fostering creativity, problem-solving, and emotional intelligence through interactive play.
              </Typography>
            </FadeIn>

            <FadeIn direction="up" delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group"
                  onClick={() => {
                    const element = document.getElementById('get-started')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn direction="up" delay={1.0}>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center space-y-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                  >
                    <div className="flex justify-center">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            <SlideIn direction="right" delay={0.6}>
              <div className="relative">
                {/* Main Product Image */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-full aspect-square max-w-lg mx-auto">
                    {/* Placeholder for product image */}
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl shadow-2xl flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 bg-primary-200 rounded-2xl mx-auto flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-lg"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary-700">CheekoAI</div>
                          <div className="text-sm text-primary-600">AI Learning Companion</div>
                        </div>
                      </div>
                    </div>

                    {/* Floating UI Elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-border"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent-green rounded-full"></div>
                        <span className="text-xs font-medium">Learning Active</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-border"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-secondary-500 fill-current" />
                        <span className="text-xs font-medium">Level Up!</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 -left-8 bg-white rounded-xl shadow-lg p-3 border border-border"
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary-600">98%</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-300 to-secondary-300 opacity-20 blur-3xl -z-10 scale-110"></div>
              </div>
            </SlideIn>
          </div>
        </div>
      </Container>

      {/* Video Modal (placeholder) */}
      {isVideoPlaying && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full aspect-video"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Play className="w-16 h-16 text-primary-600 mx-auto" />
                <div className="text-xl font-semibold text-primary-700">Product Demo Video</div>
                <div className="text-muted-foreground">Video content would be embedded here</div>
                <Button
                  variant="outline"
                  onClick={() => setIsVideoPlaying(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export { Hero }