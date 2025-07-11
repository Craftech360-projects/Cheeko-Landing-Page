'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  Users, 
  Shield, 
  Sparkles, 
  Gamepad2,
  BookOpen,
  Palette,
  Music,
  Puzzle,
  Lightbulb,
  Target
} from 'lucide-react'
import { Container, Typography } from '@/components/ui'
import { FadeIn, StaggerContainer, AnimatedCard } from '@/components/animations'

interface Feature {
  icon: React.ComponentType<any>
  title: string
  description: string
  color: string
  gradient: string
}

const features: Feature[] = [
  {
    icon: Brain,
    title: 'Adaptive AI Learning',
    description: 'Advanced AI that learns your child\'s pace and adjusts difficulty in real-time for optimal engagement.',
    color: 'text-primary-600',
    gradient: 'from-primary-100 to-primary-50'
  },
  {
    icon: Heart,
    title: 'Emotional Intelligence',
    description: 'Develops empathy and emotional awareness through interactive storytelling and social scenarios.',
    color: 'text-accent-pink',
    gradient: 'from-pink-100 to-pink-50'
  },
  {
    icon: Puzzle,
    title: 'Problem Solving',
    description: 'Enhances critical thinking with age-appropriate puzzles and logical reasoning challenges.',
    color: 'text-accent-purple',
    gradient: 'from-purple-100 to-purple-50'
  },
  {
    icon: Palette,
    title: 'Creative Expression',
    description: 'Unleashes creativity through digital art, music composition, and imaginative play activities.',
    color: 'text-secondary-600',
    gradient: 'from-secondary-100 to-secondary-50'
  },
  {
    icon: Users,
    title: 'Social Skills',
    description: 'Builds communication and collaboration skills through multiplayer games and group activities.',
    color: 'text-accent-green',
    gradient: 'from-green-100 to-green-50'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'COPPA-compliant with advanced privacy protection and parental controls for peace of mind.',
    color: 'text-accent-orange',
    gradient: 'from-orange-100 to-orange-50'
  }
]

const Features: React.FC = () => {
  return (
    <section id="features" className="lg:py-0 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        <div className="text-center space-y-6 mb-16 lg:mb-24">
          <FadeIn direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Key Features</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <Typography 
              variant="h2" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Everything Your Child Needs to Learn & Grow
            </Typography>
          </FadeIn>

          <FadeIn direction="up" delay={0.6}>
            <Typography 
              variant="lead" 
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              CheekoAI combines cutting-edge artificial intelligence with proven educational methodologies 
              to create an engaging, safe, and personalized learning experience for every child.
            </Typography>
          </FadeIn>
        </div>

        {/* Features Grid */}
        <StaggerContainer
          delay={0.8}
          staggerDelay={0.15}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={1.6}>
          <div className="text-center mt-16 lg:mt-24">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-primary-600" />
              <span>Designed for ages 3-12 with personalized learning paths</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

interface FeatureCardProps {
  feature: Feature
  index: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const IconComponent = feature.icon

  return (
    <AnimatedCard
      delay={index * 0.1}
      hoverEffect="lift"
      entranceAnimation="fade"
      direction="up"
      className="h-full"
    >
      <div className="p-8 h-full flex flex-col">
        {/* Icon */}
        <div className={`relative mb-6 self-start`}>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              className="relative z-10"
            >
              <IconComponent className={`w-8 h-8 ${feature.color}`} strokeWidth={1.5} />
            </motion.div>
          </div>
          
          {/* Glow Effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 blur-xl`}
            whileHover={{ opacity: 0.3, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <Typography variant="h4" className="text-xl font-semibold">
            {feature.title}
          </Typography>
          
          <Typography className="text-muted-foreground leading-relaxed">
            {feature.description}
          </Typography>
        </div>

        {/* Interactive Element */}
        <motion.div
          className="mt-6 flex items-center text-sm font-medium text-primary-600 group cursor-pointer"
          whileHover={{ x: 4 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        >
          <span>Learn more</span>
          <motion.div
            className="ml-2 opacity-0 group-hover:opacity-100"
            initial={{ x: -4 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.div>
        </motion.div>
      </div>
    </AnimatedCard>
  )
}

export { Features }