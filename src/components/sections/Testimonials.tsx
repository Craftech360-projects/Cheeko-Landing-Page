'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, Heart, Users } from 'lucide-react'
import { Container, Typography, Button } from '@/components/ui'
import { FadeIn } from '@/components/animations'

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  avatar: string
  rating: number
  review: string
  highlight: string
  childAge: string
  childName: string
  beforeAfter?: {
    before: string
    after: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Mother of 2',
    location: 'San Francisco, CA',
    avatar: '👩‍💼',
    rating: 5,
    childAge: '5 years old',
    childName: 'Emma',
    review: 'CheekoAI has transformed how Emma learns. She went from struggling with basic concepts to confidently solving problems on her own. The AI adapts perfectly to her learning style.',
    highlight: 'Transformed how Emma learns',
    beforeAfter: {
      before: 'Struggled with basic math concepts',
      after: 'Confidently solving grade-level problems'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Father & Software Engineer',
    location: 'Austin, TX',
    avatar: '👨‍💻',
    rating: 5,
    childAge: '7 years old',
    childName: 'Lucas',
    review: 'As a tech professional, I was skeptical about AI toys. But CheekoAI impressed me with its sophisticated yet child-friendly approach. Lucas has developed amazing problem-solving skills.',
    highlight: 'Sophisticated yet child-friendly',
    beforeAfter: {
      before: 'Easily frustrated with challenges',
      after: 'Perseveres through complex problems'
    }
  },
  {
    id: 3,
    name: 'Dr. Amanda Rodriguez',
    role: 'Pediatric Psychologist',
    location: 'Miami, FL',
    avatar: '👩‍⚕️',
    rating: 5,
    childAge: '4 years old',
    childName: 'Sofia',
    review: 'I recommend CheekoAI to my patients\' families. It excellently balances screen time with meaningful learning, and the emotional intelligence features are remarkable.',
    highlight: 'Recommend to patient families',
    beforeAfter: {
      before: 'Difficulty expressing emotions',
      after: 'Articulates feelings clearly'
    }
  },
  {
    id: 4,
    name: 'Jennifer Williams',
    role: 'Elementary School Teacher',
    location: 'Seattle, WA',
    avatar: '👩‍🏫',
    rating: 5,
    childAge: '6 years old',
    childName: 'Noah',
    review: 'CheekoAI complements our classroom learning perfectly. I\'ve seen remarkable improvements in my students who use it at home. The progress tracking helps me understand each child better.',
    highlight: 'Complements classroom learning',
    beforeAfter: {
      before: 'Behind grade level in reading',
      after: 'Reading above grade level'
    }
  },
  {
    id: 5,
    name: 'Robert Kim',
    role: 'Working Father',
    location: 'New York, NY',
    avatar: '👨‍💼',
    rating: 5,
    childAge: '8 years old',
    childName: 'Ava',
    review: 'With my busy schedule, CheekoAI gives me peace of mind. Ava is learning and having fun, and I can track her progress remotely. It\'s like having a personal tutor at home.',
    highlight: 'Like having a personal tutor',
    beforeAfter: {
      before: 'Struggled with independent learning',
      after: 'Self-directed and motivated learner'
    }
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    role: 'Homeschooling Mother',
    location: 'Denver, CO',
    avatar: '👩‍🎓',
    rating: 5,
    childAge: '5 years old',
    childName: 'Mason',
    review: 'CheekoAI has become an essential part of our homeschool curriculum. Mason looks forward to his learning sessions, and I love how it adapts to reinforce areas where he needs more practice.',
    highlight: 'Essential homeschool tool',
    beforeAfter: {
      before: 'Resisted structured learning',
      after: 'Eagerly engages in lessons'
    }
  }
]

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary-100 rounded-full opacity-30 blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-100 rounded-full opacity-30 blur-xl" />
        
        {/* Floating hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          >
            <Heart className="w-4 h-4 text-accent-pink" />
          </motion.div>
        ))}
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 lg:mb-24">
          <FadeIn direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-pink/10 text-accent-pink border border-accent-pink/20 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>Parent Reviews</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <Typography 
              variant="h2" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              Loved by Families Everywhere
            </Typography>
          </FadeIn>

          <FadeIn direction="up" delay={0.6}>
            <Typography 
              variant="lead" 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Don't just take our word for it. Here's what parents, teachers, and child development 
              experts are saying about CheekoAI.
            </Typography>
          </FadeIn>
        </div>

        {/* Stats Row */}
        <FadeIn direction="up" delay={0.8}>
          <div className="grid grid-cols-3 gap-8 mb-16 lg:mb-24 max-w-2xl mx-auto">
            {[
              { icon: Star, value: '4.9/5', label: 'Average Rating' },
              { icon: Users, value: '10,000+', label: 'Happy Families' },
              { icon: Heart, value: '98%', label: 'Would Recommend' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-lg"
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' as const, stiffness: 300 }}
                  >
                    <Quote className="w-12 h-12 text-primary-400" />
                  </motion.div>

                  {/* Review Text */}
                  <Typography className="text-lg md:text-xl text-foreground leading-relaxed">
                    "{currentTestimonial.review}"
                  </Typography>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1 + i * 0.1, type: 'spring' as const }}
                      >
                        <Star 
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating 
                              ? 'text-secondary-500 fill-current' 
                              : 'text-neutral-300'
                          }`} 
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-2xl">
                      {currentTestimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{currentTestimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {currentTestimonial.role} • {currentTestimonial.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Before/After Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100"
                >
                  <div className="text-center mb-6">
                    <Typography variant="h4" className="text-lg font-semibold text-primary-700">
                      {currentTestimonial.childName}'s Progress
                    </Typography>
                    <Typography className="text-sm text-muted-foreground">
                      Age: {currentTestimonial.childAge}
                    </Typography>
                  </div>

                  {currentTestimonial.beforeAfter && (
                    <div className="space-y-4">
                      <div className="bg-white/60 rounded-xl p-4">
                        <div className="text-xs font-medium text-red-600 mb-1">BEFORE</div>
                        <div className="text-sm text-foreground">{currentTestimonial.beforeAfter.before}</div>
                      </div>

                      <div className="flex justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      </div>

                      <div className="bg-white/60 rounded-xl p-4">
                        <div className="text-xs font-medium text-accent-green mb-1">AFTER</div>
                        <div className="text-sm text-foreground">{currentTestimonial.beforeAfter.after}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              className="w-12 h-12 p-0"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary-500 w-8' 
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextTestimonial}
              className="w-12 h-12 p-0"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {isAutoPlaying ? 'Auto-play ON' : 'Auto-play OFF'}
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { Testimonials }