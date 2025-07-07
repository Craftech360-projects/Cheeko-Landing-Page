'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Download, Power, Sparkles, Trophy, ArrowRight, Play } from 'lucide-react'
import { Container, Typography, Button } from '@/components/ui'
import { FadeIn, SlideIn } from '@/components/animations'

interface Step {
  number: number
  icon: React.ComponentType<any>
  title: string
  description: string
  details: string[]
  color: string
  gradient: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: Download,
    title: 'Download & Setup',
    description: 'Get the CheekoAI app and connect your device in just 2 minutes.',
    details: ['Download from App Store', 'Quick device pairing', 'Create child profile'],
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    number: 2,
    icon: Power,
    title: 'Power On & Connect',
    description: 'Turn on CheekoAI and watch as it greets your child by name.',
    details: ['Voice recognition setup', 'Personalized greeting', 'Safety mode activation'],
    color: 'text-secondary-600',
    gradient: 'from-secondary-500 to-secondary-600'
  },
  {
    number: 3,
    icon: Sparkles,
    title: 'AI Learns & Adapts',
    description: 'CheekoAI observes learning patterns and customizes activities.',
    details: ['Learning style assessment', 'Adaptive difficulty', 'Progress tracking'],
    color: 'text-accent-purple',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    number: 4,
    icon: Trophy,
    title: 'Learn & Grow Together',
    description: 'Enjoy personalized learning adventures that grow with your child.',
    details: ['Interactive challenges', 'Skill development', 'Parent insights'],
    color: 'text-accent-green',
    gradient: 'from-green-500 to-green-600'
  }
]

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-100 rounded-full opacity-40 blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-100 rounded-full opacity-40 blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full opacity-30 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 lg:mb-24">
          <FadeIn direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
              <Play className="w-4 h-4" />
              <span>How It Works</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <Typography 
              variant="h2" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              Get Started in 4 Simple Steps
            </Typography>
          </FadeIn>

          <FadeIn direction="up" delay={0.6}>
            <Typography 
              variant="lead" 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Setting up CheekoAI is designed to be quick and intuitive. 
              Your child will be learning and playing in no time!
            </Typography>
          </FadeIn>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-purple opacity-40 transform -translate-y-1/2" />
              
              {/* Animated Progress Line */}
              <motion.div
                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />

              {/* Steps Container */}
              <div className="grid grid-cols-4 gap-8 relative z-10">
                {steps.map((step, index) => (
                  <StepCard
                    key={step.number}
                    step={step}
                    index={index}
                    isActive={index <= activeStep}
                    isDesktop={true}
                    onClick={() => setActiveStep(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connecting Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-primary-200 to-secondary-200 opacity-40" />
                )}
                
                <StepCard
                  step={step}
                  index={index}
                  isActive={true}
                  isDesktop={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <FadeIn direction="up" delay={1.2}>
          <div className="text-center mt-16 lg:mt-24 space-y-6">
            <Typography variant="h3" className="text-2xl font-semibold">
              Ready to Get Started?
            </Typography>
            <Typography className="text-muted-foreground max-w-lg mx-auto">
              Join thousands of families who are already using CheekoAI to enhance their children's learning journey.
            </Typography>
            <Button 
              size="lg"
              className="group"
              onClick={() => {
                const element = document.getElementById('get-started')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

interface StepCardProps {
  step: Step
  index: number
  isActive: boolean
  isDesktop: boolean
  onClick?: () => void
}

const StepCard: React.FC<StepCardProps> = ({ 
  step, 
  index, 
  isActive, 
  isDesktop,
  onClick 
}) => {
  const IconComponent = step.icon

  return (
    <motion.div
      className={`relative ${isDesktop ? 'text-center' : 'flex gap-6'} ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onClick={onClick}
      {...(onClick && { whileHover: { scale: 1.02 } })}
    >
      {/* Step Number & Icon */}
      <div className={`${isDesktop ? 'mx-auto mb-6' : 'flex-shrink-0'} relative`}>
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center relative overflow-hidden ${
            isActive ? 'shadow-lg' : 'opacity-60'
          }`}
          animate={{
            scale: isActive ? 1 : 0.9,
            opacity: isActive ? 1 : 0.6
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <motion.div
            animate={{
              rotate: isActive ? [0, 5, -5, 0] : 0,
              scale: isActive ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}
          >
            <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Step Number Badge */}
        <motion.div
          className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-background rounded-full flex items-center justify-center text-sm font-bold shadow-md"
          animate={{
            backgroundColor: isActive ? '#ffffff' : '#f3f4f6',
            color: isActive ? step.color : '#6b7280'
          }}
        >
          {step.number}
        </motion.div>

        {/* Glow Effect */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 blur-xl`}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        )}
      </div>

      {/* Content */}
      <div className={`${isDesktop ? 'space-y-4' : 'space-y-3 flex-1'}`}>
        <motion.div
          animate={{ color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)' }}
        >
          <Typography 
            variant="h4" 
            className={`${isDesktop ? 'text-xl' : 'text-lg'} font-semibold`}
          >
            {step.title}
          </Typography>
        </motion.div>

        <Typography 
          className={`text-muted-foreground ${isDesktop ? 'text-sm' : 'text-base'}`}
        >
          {step.description}
        </Typography>

        {/* Details List */}
        <motion.div
          className={`space-y-2 ${isDesktop ? 'text-xs' : 'text-sm'}`}
          animate={{
            opacity: isActive ? 1 : 0.7,
            height: isDesktop && !isActive ? 0 : 'auto'
          }}
          transition={{ duration: 0.3 }}
        >
          {step.details.map((detail, detailIndex) => (
            <motion.div
              key={detail}
              className="flex items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isActive ? 1 : 0.5,
                x: 0 
              }}
              transition={{ 
                duration: 0.3, 
                delay: isActive ? detailIndex * 0.1 : 0 
              }}
            >
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`} />
              <span>{detail}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export { HowItWorks }