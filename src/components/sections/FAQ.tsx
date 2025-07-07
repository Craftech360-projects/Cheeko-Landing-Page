'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, Search, Clock, Phone, Mail } from 'lucide-react'
import { Container, Typography, Button, Input } from '@/components/ui'
import { FadeIn, StaggerContainer } from '@/components/animations'

interface FAQItem {
  id: number
  category: string
  question: string
  answer: string
  tags: string[]
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: 'Getting Started',
    question: 'What age is CheekoAI suitable for?',
    answer: 'CheekoAI is designed for children ages 3-12, with adaptive learning that adjusts to your child\'s developmental stage. Our AI automatically calibrates content difficulty, interaction complexity, and learning pace based on your child\'s age and demonstrated abilities.',
    tags: ['age', 'suitable', 'children', 'development']
  },
  {
    id: 2,
    category: 'Getting Started',
    question: 'How do I set up CheekoAI for my child?',
    answer: 'Setup is simple! Download the CheekoAI app, create your child\'s profile with basic information (age, interests, learning goals), connect the device via Bluetooth, and let our AI create a personalized learning path. The entire process takes less than 5 minutes.',
    tags: ['setup', 'installation', 'profile', 'bluetooth']
  },
  {
    id: 3,
    category: 'Safety & Privacy',
    question: 'How do you protect my child\'s privacy and data?',
    answer: 'We take privacy seriously. CheekoAI is COPPA-compliant, uses end-to-end encryption, stores data locally when possible, and never shares personal information with third parties. Parents have full control over data collection and can delete all information at any time.',
    tags: ['privacy', 'data', 'coppa', 'security', 'encryption']
  },
  {
    id: 4,
    category: 'Safety & Privacy',
    question: 'Can I monitor my child\'s activity and progress?',
    answer: 'Absolutely! The parent dashboard provides real-time insights into learning progress, time spent on activities, skills developed, and areas for improvement. You can set usage limits, approve new activities, and receive weekly progress reports.',
    tags: ['monitoring', 'progress', 'dashboard', 'reports']
  },
  {
    id: 5,
    category: 'Learning & Development',
    question: 'How does the AI adapt to my child\'s learning style?',
    answer: 'Our AI observes your child\'s interaction patterns, response times, preferred activities, and learning outcomes to create a unique learning profile. It adjusts difficulty, presentation style, and pacing in real-time to optimize engagement and retention.',
    tags: ['ai', 'adaptive', 'learning style', 'personalization']
  },
  {
    id: 6,
    category: 'Learning & Development',
    question: 'What subjects and skills does CheekoAI cover?',
    answer: 'CheekoAI covers math, reading, science, creative arts, emotional intelligence, problem-solving, and social skills. Content is aligned with educational standards and includes STEM activities, storytelling, music, art creation, and collaborative games.',
    tags: ['subjects', 'skills', 'math', 'reading', 'science', 'stem']
  },
  {
    id: 7,
    category: 'Technical',
    question: 'What devices are compatible with CheekoAI?',
    answer: 'CheekoAI works with iOS (12+), Android (8+), tablets, and computers. The main CheekoAI device connects via Bluetooth and WiFi. A stable internet connection is recommended for content updates and cloud sync features.',
    tags: ['compatibility', 'devices', 'ios', 'android', 'bluetooth', 'wifi']
  },
  {
    id: 8,
    category: 'Technical',
    question: 'Do I need internet access for CheekoAI to work?',
    answer: 'CheekoAI can work offline for most activities. Internet is needed for initial setup, content updates, progress sync, and accessing new learning modules. Once downloaded, your child can enjoy learning activities without constant connectivity.',
    tags: ['internet', 'offline', 'connectivity', 'updates']
  },
  {
    id: 9,
    category: 'Subscription & Pricing',
    question: 'What subscription plans are available?',
    answer: 'We offer monthly ($29.99), annual ($299.99), and family plans (up to 4 children, $499.99/year). All plans include unlimited access to learning content, regular updates, parent dashboard, and customer support. 30-day free trial available.',
    tags: ['subscription', 'pricing', 'plans', 'trial', 'family']
  },
  {
    id: 10,
    category: 'Subscription & Pricing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime with no penalties. Your subscription remains active until the current billing period ends. All downloaded content stays accessible during your subscription period, and progress data is preserved for 90 days after cancellation.',
    tags: ['cancel', 'subscription', 'billing', 'refund']
  }
]

const categories = ['All', 'Getting Started', 'Safety & Privacy', 'Learning & Development', 'Technical', 'Subscription & Pricing']

const FAQ: React.FC = () => {
  const [activeItems, setActiveItems] = React.useState<number[]>([])
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const toggleItem = (id: number) => {
    setActiveItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <section id="faq" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-100 rounded-full opacity-30 blur-xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary-100 rounded-full opacity-30 blur-xl" />
        
        {/* Floating question marks */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 2) * 60}%`
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut'
            }}
          >
            <HelpCircle className="w-6 h-6 text-primary-400" />
          </motion.div>
        ))}
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 lg:mb-24">
          <FadeIn direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <Typography 
              variant="h2" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              Got Questions? We've Got Answers
            </Typography>
          </FadeIn>

          <FadeIn direction="up" delay={0.6}>
            <Typography 
              variant="lead" 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Find answers to common questions about CheekoAI, from setup and safety 
              to learning features and subscription details.
            </Typography>
          </FadeIn>
        </div>

        {/* Search and Filter */}
        <FadeIn direction="up" delay={0.8}>
          <div className="max-w-4xl mx-auto mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                className="w-full py-4 pl-12 text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white/50 text-muted-foreground hover:bg-white/80 hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <StaggerContainer
              delay={1.0}
              staggerDelay={0.1}
              className="space-y-4"
            >
              {filteredFAQs.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isActive={activeItems.includes(item.id)}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn direction="up" delay={1.0}>
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <Typography variant="h4" className="mb-2">No questions found</Typography>
                <Typography className="text-muted-foreground">
                  Try adjusting your search terms or category filter.
                </Typography>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Contact Support */}
        <FadeIn direction="up" delay={1.4}>
          <div className="max-w-2xl mx-auto mt-16 lg:mt-24 text-center">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
              <Typography variant="h3" className="text-xl font-semibold mb-4">
                Still Need Help?
              </Typography>
              <Typography className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help 24/7.
              </Typography>
              
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  className="flex items-center gap-3 p-4 bg-white/60 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <Clock className="w-5 h-5 text-primary-600" />
                  <div className="text-left">
                    <div className="font-medium text-sm">24/7 Support</div>
                    <div className="text-xs text-muted-foreground">Always available</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-white/60 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="w-5 h-5 text-primary-600" />
                  <div className="text-left">
                    <div className="font-medium text-sm">Email Support</div>
                    <div className="text-xs text-muted-foreground">help@cheekoai.com</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-white/60 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="w-5 h-5 text-primary-600" />
                  <div className="text-left">
                    <div className="font-medium text-sm">Phone Support</div>
                    <div className="text-xs text-muted-foreground">1-800-CHEEKO</div>
                  </div>
                </motion.div>
              </div>

              <Button 
                variant="primary" 
                className="mt-6"
                onClick={() => {
                  // Open support contact form
                  window.open('mailto:help@cheekoai.com', '_blank')
                }}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

interface FAQItemProps {
  item: FAQItem
  isActive: boolean
  onToggle: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isActive, onToggle }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 shadow-sm"
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
    >
      <motion.button
        className="w-full p-6 text-left flex items-center justify-between hover:bg-primary-50/50 transition-colors"
        onClick={onToggle}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              {item.category}
            </span>
          </div>
          <Typography variant="h5" className="text-lg font-semibold text-foreground">
            {item.question}
          </Typography>
        </div>
        
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-600"
        >
          {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border/30">
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Typography className="text-muted-foreground leading-relaxed pt-4">
                  {item.answer}
                </Typography>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export { FAQ }