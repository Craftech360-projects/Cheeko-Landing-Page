# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 15 project for building an AI toy landing page. The project is set up with TypeScript, Tailwind CSS, and ESLint. It's a single-page marketing website focused on conversion and showcasing AI toy capabilities to parents.

## Development Commands
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture & Structure
- **Next.js App Router**: Uses the new app directory structure (src/app/)
- **TypeScript**: Strict mode enabled with path mapping (@/* → ./src/*)
- **Tailwind CSS v4**: For styling with PostCSS configuration
- **Responsive Design**: Mobile-first approach with specific breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px  
  - Desktop: 1024px+

## Planned Component Structure
Based on project requirements, the following structure should be implemented:
```
src/
├── app/
├── components/
│   ├── ui/           # Reusable UI components (Button, Card, etc.)
│   ├── sections/     # Page sections (Hero, Features, FAQ, etc.)
│   └── animations/   # Animation wrapper components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions and constants
└── assets/           # Images, icons, fonts
```

## Key Requirements
- **Animation Framework**: Framer Motion for scroll-triggered animations and micro-interactions
- **Performance**: Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Accessibility**: WCAG 2.1 AA compliance with proper semantic HTML
- **SEO**: Structured data, Open Graph meta tags, optimized images
- **Responsive**: Touch targets minimum 44px, mobile-first design

## Dependencies to Install
The project currently has basic Next.js setup. Per requirements, these dependencies need to be added:
- framer-motion
- lucide-react
- react-intersection-observer
- lottie-react

## Animation Guidelines
- Use `useInView` hooks for scroll-triggered animations
- Respect `prefers-reduced-motion` media query
- Use transform and opacity properties only for performance
- Implement lazy loading for animations
- Stagger animations with 0.1-0.2s delays

## Content Strategy
- Benefit-focused copy highlighting child development
- Trust indicators (safety certifications, privacy)
- Age-appropriate messaging with clear recommendations
- Playful but professional tone for parent trust