'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  Award, 
  FileCheck, 
  Clock,
  Smartphone,
  Globe,
  Heart,
  CheckCircle,
  Star
} from 'lucide-react'
import { Container, Typography, Button } from '@/components/ui'
import { FadeIn, StaggerContainer, AnimatedCard } from '@/components/animations'

interface SafetyFeature {
  icon: React.ComponentType<any>
  title: string
  description: string
  details: string[]
  color: string
  gradient: string
}

interface Certification {
  name: string
  description: string
  logo: React.ComponentType<any>
  verified: boolean
}

const safetyFeatures: SafetyFeature[] = [
  {
    icon: Shield,
    title: 'COPPA Compliant',
    description: 'Fully compliant with Children\'s Online Privacy Protection Act regulations.',
    details: ['No personal data collection', 'Parental consent required', 'Secure data handling'],
    color: 'text-accent-green',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: Lock,
    title: 'Data Encryption',
    description: 'End-to-end encryption protects all communications and stored data.',
    details: ['256-bit AES encryption', 'Secure transmission', 'Local data storage'],
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: UserCheck,
    title: 'Parental Controls',
    description: 'Comprehensive parental dashboard with full control and monitoring.',
    details: ['Real-time monitoring', 'Usage limits', 'Content filtering'],
    color: 'text-secondary-600',
    gradient: 'from-secondary-500 to-secondary-600'
  },
  {
    icon: Eye,
    title: 'Privacy by Design',
    description: 'Built from the ground up with privacy as the core principle.',
    details: ['Minimal data collection', 'Anonymous analytics', 'User data ownership'],
    color: 'text-accent-purple',
    gradient: 'from-purple-500 to-purple-600'
  }
]

const certifications: Certification[] = [
  { name: 'COPPA', description: 'Children\'s Online Privacy Protection', logo: Award, verified: true },
  { name: 'GDPR', description: 'General Data Protection Regulation', logo: FileCheck, verified: true },
  { name: 'SOC 2', description: 'Security & Availability', logo: Shield, verified: true },
  { name: 'ISO 27001', description: 'Information Security Management', logo: CheckCircle, verified: true }
]

const trustMetrics = [
  { icon: Heart, value: '98%', label: 'Parent Satisfaction', color: 'text-accent-pink' },
  { icon: Star, value: '4.9/5', label: 'Safety Rating', color: 'text-secondary-600' },
  { icon: Clock, value: '24/7', label: 'Support Available', color: 'text-primary-600' },
  { icon: Globe, value: '50+', label: 'Countries Approved', color: 'text-accent-green' }
]

const Safety: React.FC = () => {
  return (
    <section id="safety" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Security Shield Animation */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Shield className="w-full h-full text-primary-500" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 opacity-10"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Lock className="w-full h-full text-accent-green" />
        </motion.div>

        {/* Floating Security Icons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-300 rounded-full opacity-40"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 lg:mb-24">
          <FadeIn direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/10 text-accent-green border border-accent-green/20 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Safety & Privacy</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <Typography 
              variant="h2" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              Your Child's Safety is Our Top Priority
            </Typography>
          </FadeIn>

          <FadeIn direction="up" delay={0.6}>
            <Typography 
              variant="lead" 
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              CheekoAI is designed with industry-leading security measures and privacy protections. 
              We believe parents should have complete peace of mind when their children are learning and playing.
            </Typography>
          </FadeIn>
        </div>

        {/* Trust Metrics */}
        <FadeIn direction="up" delay={0.8}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-24">
            {trustMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-border/50"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="mx-auto mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center"
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </motion.div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Safety Features Grid */}
        <div className="mb-16 lg:mb-24">
          <FadeIn direction="up" delay={1.0}>
            <Typography 
              variant="h3" 
              className="text-2xl md:text-3xl font-bold text-center mb-12"
            >
              Comprehensive Security Features
            </Typography>
          </FadeIn>

          <StaggerContainer
            delay={1.2}
            staggerDelay={0.15}
            className="grid md:grid-cols-2 gap-8"
          >
            {safetyFeatures.map((feature, index) => (
              <SafetyFeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </StaggerContainer>
        </div>

        {/* Certifications */}
        <div className="mb-16 lg:mb-24">
          <FadeIn direction="up" delay={1.6}>
            <Typography 
              variant="h3" 
              className="text-2xl md:text-3xl font-bold text-center mb-12"
            >
              Industry Certifications & Compliance
            </Typography>
          </FadeIn>

          <FadeIn direction="up" delay={1.8}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border/50 relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                >
                  {/* Verified Badge */}
                  {cert.verified && (
                    <motion.div
                      className="absolute top-3 right-3"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      <CheckCircle className="w-5 h-5 text-accent-green" />
                    </motion.div>
                  )}

                  <div className="mb-4">
                    <cert.logo className="w-12 h-12 mx-auto text-primary-600" />
                  </div>
                  <div className="font-semibold text-foreground mb-1">{cert.name}</div>
                  <div className="text-xs text-muted-foreground">{cert.description}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Security Promise */}
        <FadeIn direction="up" delay={2.0}>
          <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border border-primary-100">
            <div className="max-w-2xl mx-auto space-y-6">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mx-auto flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(14, 165, 233, 0.4)',
                    '0 0 0 20px rgba(14, 165, 233, 0)',
                    '0 0 0 0 rgba(14, 165, 233, 0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>

              <Typography variant="h3" className="text-xl md:text-2xl font-bold">
                Our Security Promise
              </Typography>

              <Typography className="text-muted-foreground">
                We pledge to maintain the highest standards of security and privacy protection. 
                Your child's data will never be sold, shared, or used for advertising. 
                CheekoAI is designed to be a safe, nurturing environment for learning and growth.
              </Typography>

              <Button 
                variant="outline"
                className="mt-4"
                onClick={() => {
                  // Link to privacy policy or security documentation
                  window.open('#privacy-policy', '_blank')
                }}
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Read Our Privacy Policy
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

interface SafetyFeatureCardProps {
  feature: SafetyFeature
  index: number
}

const SafetyFeatureCard: React.FC<SafetyFeatureCardProps> = ({ feature, index }) => {
  const IconComponent = feature.icon

  return (
    <AnimatedCard
      delay={index * 0.1}
      hoverEffect="lift"
      entranceAnimation="fade"
      direction="up"
      className="h-full"
    >
      <div className="p-8 h-full">
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center relative overflow-hidden`}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}
          >
            {/* Animated security pulse */}
            <motion.div
              className="absolute inset-0 bg-white rounded-2xl"
              animate={{
                opacity: [0, 0.2, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            />

            <IconComponent className="w-8 h-8 text-white relative z-10" strokeWidth={1.5} />
          </motion.div>

          {/* Security shield overlay */}
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          >
            <CheckCircle className="w-4 h-4 text-white" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <Typography variant="h4" className="text-xl font-semibold">
            {feature.title}
          </Typography>
          
          <Typography className="text-muted-foreground leading-relaxed">
            {feature.description}
          </Typography>

          {/* Feature details */}
          <div className="space-y-2">
            {feature.details.map((detail, detailIndex) => (
              <motion.div
                key={detail}
                className="flex items-center gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3, 
                  delay: detailIndex * 0.1 
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green flex-shrink-0" />
                <span>{detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedCard>
  )
}

export { Safety }