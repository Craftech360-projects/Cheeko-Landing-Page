# AI Toy Landing Page Requirements

I want to build a single-page website landing page for my company's AI toy product. This is a marketing/conversion-focused site that needs to be visually stunning and highly interactive to showcase the toy's capabilities while building trust with parents.

I have initialized an empty project with Next.js 14+ and my project should have the following features:

## Page Structure
Single-page website with these sections:
- **Hero section** - Main product showcase with animated elements
- **Key Features section** - Grid of 6 key product features with animated icons
- **How It Works section** - 3-4 step process with connecting animations
- **Safety & Privacy section** - Trust-building content with security animations
- **Testimonials section** - Customer reviews with carousel/slider
- **FAQ section** - Accordion-style expandable questions
- **Footer** - Company info, social links, newsletter signup

## Animation Requirements
### Scroll-Triggered Animations
- Use Framer Motion for all animations with `useInView` hooks
- Elements should fade in from bottom (default) or slide in from sides
- Stagger animations for card grids and lists with 0.1-0.2s delays
- Parallax effects for background elements and hero section
- Smooth scrolling between sections when navigation is clicked

### Micro-interactions
- Buttons should scale (1.05x) and change shadow on hover
- Cards should lift (translateY: -8px) and add glow effect on hover
- Icons should have subtle bounce or pulse animations when they enter viewport
- Form inputs should have smooth focus states with border color transitions
- Loading states with skeleton screens for any dynamic content

### Performance Considerations
- Respect `prefers-reduced-motion` media query - disable animations for users who prefer less motion
- Use `transform` and `opacity` properties only for animations (avoid layout-affecting properties)
- Implement `will-change` CSS property during animations, remove when complete
- Lazy load animations - only animate elements when they're visible

## Responsive Design
### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px  
- Desktop: 1024px and above

### Mobile-First Approach
- All layouts should be mobile-first with progressive enhancement
- Touch targets minimum 44px for mobile interactions
- Stack content vertically on mobile, use grids on larger screens
- Hero section should maintain impact on mobile with adjusted typography scale

## Tech Stack & Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "framer-motion": "^10.16.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "lucide-react": "^0.263.0",
    "react-intersection-observer": "^9.5.0",
    "lottie-react": "^2.4.0"
  }
}
```

## Code Structure & Organization
### Folder Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # Reusable components (Button, Card, etc.)
│   ├── sections/     # Page sections (Hero, Features, etc.)
│   └── animations/   # Animation wrapper components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions and constants
└── assets/           # Images, icons, fonts
```

### Component Architecture
- Prefer small, composable components over large monolithic ones
- Each section should be a separate component in `components/sections/`
- Create reusable UI components in `components/ui/`
- Use custom hooks for complex animation logic and scroll detection
- Implement proper TypeScript interfaces for all props and data structures

## SEO & Performance
### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5 seconds
- FID (First Input Delay): < 100 milliseconds  
- CLS (Cumulative Layout Shift): < 0.1

### Optimization Requirements
- Use Next.js Image component with `priority={true}` for hero images
- Implement lazy loading for below-the-fold content
- Optimize all SVG icons and consider converting complex animations to Lottie files
- Use proper meta tags including Open Graph for social sharing
- Implement structured data markup for product information

## Accessibility Requirements
### WCAG 2.1 AA Compliance
- Color contrast ratio minimum 4.5:1 for normal text, 3:1 for large text
- All interactive elements must be keyboard accessible with visible focus indicators
- Proper semantic HTML structure with appropriate heading hierarchy (h1 → h2 → h3)
- Alt text for all images that conveys the same information as the image
- ARIA labels for complex interactive elements and animations

### Inclusive Design
- Skip links for keyboard navigation
- Clear error messages and form validation
- Support for screen readers with proper ARIA attributes
- Content should be readable and functional at 200% zoom level

## Content & Design Guidelines
### Visual Design Principles
- **Playful but professional** - Appeal to children while building trust with parents
- **High contrast, vibrant colors** - Make the toy look exciting and engaging
- **Modern, clean layouts** - Avoid clutter, focus attention on key elements
- **Interactive elements** - Let users "experience" the toy digitally through animations

### Content Strategy
- **Benefit-focused copy** - Highlight what the toy does for children's development
- **Trust indicators** - Safety certifications, privacy commitments, testimonials
- **Clear value proposition** - Why this AI toy is better than alternatives
- **Age-appropriate messaging** - Clear age recommendations and developmental benefits

## Browser Support & Testing
### Supported Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile: iOS Safari, Chrome Mobile

### Testing Requirements
- Cross-browser compatibility testing on all supported browsers
- Device testing on various screen sizes and orientations
- Performance testing with Lighthouse CI integration
- Accessibility testing with axe-core
- User testing with target audience (parents of children in target age range)

## Deployment & Analytics
### Hosting
- Deploy on Vercel for seamless Next.js integration
- Use CDN for global content delivery
- Implement proper caching strategies for static assets
- Set up custom domain with SSL certificate

### Analytics & Tracking
- Google Analytics 4 for user behavior tracking
- Conversion tracking for key actions (CTA clicks, form submissions, scroll depth)
- Heat mapping to understand user interaction patterns
- A/B testing capability for hero messaging and CTA buttons

## Other Requirements
### Development Practices
- Use TypeScript strict mode for better type safety
- Implement ESLint and Prettier for consistent code formatting
- Use semantic commit messages following conventional commits
- Set up pre-commit hooks for code quality checks

### Error Handling
- Implement proper error boundaries for React components
- Graceful degradation for animation failures
- Loading states for any async operations
- User-friendly error messages with clear recovery actions

### Security
- Implement CSP (Content Security Policy) headers
- Use HTTPS everywhere with proper SSL configuration
- Sanitize any user inputs in forms
- Follow OWASP security guidelines for web applications