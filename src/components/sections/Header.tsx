'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { cn } from '@/utils/cn'

interface NavigationItem {
  label: string
  href: string
  isButton?: boolean
}

const navigationItems: NavigationItem[] = [
  { label: 'About Cheeko', href: '#features' },
  { label: 'Key Features', href: '#how--works' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Safety & Privacy', href: '#safety' },
  { label: 'Parental Dashboard', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' }
]

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const yOffset = -80 // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToSection(href)
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border' 
          : 'bg-white'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Container>
        <nav className="flex items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            <img 
              src="/icons/logo.svg" 
              alt="CheekoAI"
              className="h-8 w-auto lg:h-10"
            />
          </motion.div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as const
                }}
              >
                <motion.a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'text-foreground hover:text-primary-600 transition-colors duration-200 font-medium',
                    'relative py-2 px-1'
                  )}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Get Started Button - Right */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94] as const
            }}
          >
            <Button
              variant="primary"
              className='text-neutral-00 bg-orange-500 rounded-md'
              size="md"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#get-started')
              }}
            >
              Pre Order Now
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-foreground hover:text-primary-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94] as const
                    }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block py-3 px-4 text-foreground hover:text-primary-600 hover:bg-muted rounded-lg transition-all duration-200 font-medium"
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                    >
                      {item.label}
                    </motion.a>
                  </motion.div>
                ))}
                
                {/* Get Started Button for Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: navigationItems.length * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94] as const
                  }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('#get-started')
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  )
}

export { Header }