'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  ArrowRight,
  Heart,
  Shield,
  Award,
  ChevronUp
} from 'lucide-react'
import { Container, Typography, Button, Input } from '@/components/ui'
import { FadeIn } from '@/components/animations'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Age Groups', href: '#age-groups' },
      { label: 'System Requirements', href: '#requirements' }
    ]
  },
  {
    title: 'Safety & Trust',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'COPPA Compliance', href: '/coppa' },
      { label: 'Data Security', href: '/security' },
      { label: 'Parental Controls', href: '/parental-controls' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Setup Guide', href: '/setup' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Community Forum', href: '/community' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Partnerships', href: '/partners' },
      { label: 'Blog', href: '/blog' }
    ]
  }
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/cheekoai', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/cheekoai', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/cheekoai', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/cheekoai', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com/company/cheekoai', label: 'LinkedIn' }
]

const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubscribed, setIsSubscribed] = React.useState(false)
  const [showScrollTop, setShowScrollTop] = React.useState(false)

  // Show scroll to top button when scrolled down
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubscribed(true)
    setEmail('')
    setIsSubmitting(false)

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="bg-neutral-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-300 rounded-full opacity-20"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <Container className="relative z-10">
          {/* Main Footer Content */}
          <div className="py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Company Info & Newsletter */}
              <div className="lg:col-span-5 space-y-8">
                <FadeIn direction="up" delay={0.2}>
                  <div>
                    <Typography 
                      variant="h3" 
                      className="text-2xl font-extrabold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4"
                    >
                      CheekoAI
                    </Typography>
                    <Typography className="text-neutral-300 leading-relaxed max-w-md">
                      Empowering children to learn, grow, and discover their potential through 
                      safe, intelligent, and engaging AI-powered educational experiences.
                    </Typography>
                  </div>
                </FadeIn>

                {/* Trust Badges */}
                <FadeIn direction="up" delay={0.4}>
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>COPPA Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Safety First</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>Family Approved</span>
                    </div>
                  </div>
                </FadeIn>

                {/* Newsletter Signup */}
                <FadeIn direction="up" delay={0.6}>
                  <div className="space-y-4">
                    <Typography variant="h4" className="text-lg font-semibold">
                      Stay Updated
                    </Typography>
                    <Typography className="text-neutral-300 text-sm">
                      Get the latest updates on new features, educational content, and parenting tips.
                    </Typography>
                    
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <div className="flex gap-3">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isSubmitting || isSubscribed}
                          className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting || isSubscribed || !email}
                          className="whitespace-nowrap"
                          isLoading={isSubmitting}
                        >
                          {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                          {!isSubmitting && !isSubscribed && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                      </div>
                      
                      {isSubscribed && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-accent-green text-sm"
                        >
                          ✓ Thanks for subscribing! Check your email for confirmation.
                        </motion.div>
                      )}
                    </form>
                  </div>
                </FadeIn>
              </div>

              {/* Footer Links */}
              <div className="lg:col-span-7">
                <div className="grid md:grid-cols-4 gap-8">
                  {footerSections.map((section, sectionIndex) => (
                    <FadeIn key={section.title} direction="up" delay={0.2 + sectionIndex * 0.1}>
                      <div>
                        <Typography variant="h5" className="font-semibold mb-4 text-white">
                          {section.title}
                        </Typography>
                        <ul className="space-y-3">
                          {section.links.map((link) => (
                            <li key={link.label}>
                              <motion.a
                                href={link.href}
                                className="text-neutral-300 hover:text-white transition-colors text-sm"
                                whileHover={{ x: 4 }}
                                transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                              >
                                {link.label}
                              </motion.a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-neutral-800 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Contact Info */}
              <FadeIn direction="up" delay={0.8}>
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>help@cheekoai.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>1-800-CHEEKO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </FadeIn>

              {/* Social Links */}
              <FadeIn direction="up" delay={1.0}>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Copyright */}
            <FadeIn direction="up" delay={1.2}>
              <div className="text-center mt-8 pt-8 border-t border-neutral-800">
                <Typography className="text-neutral-400 text-sm">
                  © {currentYear} CheekoAI Inc. All rights reserved. Made with{' '}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    className="inline-block text-accent-pink"
                  >
                    ♥
                  </motion.span>
                  {' '}for families everywhere.
                </Typography>
              </div>
            </FadeIn>
          </div>
        </Container>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </>
  )
}

export { Footer }