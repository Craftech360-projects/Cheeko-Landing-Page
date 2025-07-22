"use client";

import { useState, useEffect, useRef } from "react";

interface ScrollBehaviorState {
  isHeaderVisible: boolean;
  isBottomBarVisible: boolean;
  meetCheekoInView: boolean;
}

export const useScrollBehavior = () => {
  const [state, setState] = useState<ScrollBehaviorState>({
    isHeaderVisible: true,
    isBottomBarVisible: false,
    meetCheekoInView: false,
  });

  const lastScrollY = useRef(0);
  const accumulatedScroll = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);
  const isTransitioning = useRef(false);
  const sectionReached = useRef(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 50; // Minimum pixels to scroll before triggering change
    const TRANSITION_DELAY = 600; // Delay to prevent rapid changes

    const handleScroll = () => {
      if (isTransitioning.current) return;

      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;
      
      // Skip tiny movements
      if (Math.abs(scrollDiff) < 2) return;

      // Accumulate scroll distance in the same direction
      if (scrollDiff > 0 && lastDirection.current !== 'up') {
        // Scrolling down
        accumulatedScroll.current += scrollDiff;
        lastDirection.current = 'down';
      } else if (scrollDiff < 0 && lastDirection.current !== 'down') {
        // Scrolling up
        accumulatedScroll.current += Math.abs(scrollDiff);
        lastDirection.current = 'up';
      } else if (scrollDiff > 0 && lastDirection.current === 'up') {
        // Direction changed to down
        accumulatedScroll.current = scrollDiff;
        lastDirection.current = 'down';
      } else if (scrollDiff < 0 && lastDirection.current === 'down') {
        // Direction changed to up
        accumulatedScroll.current = Math.abs(scrollDiff);
        lastDirection.current = 'up';
      }

      lastScrollY.current = currentScrollY;

      // Check Meet Cheeko section
      const meetCheekoElement = document.querySelector('#meet-cheeko');
      if (!meetCheekoElement) return;

      const rect = meetCheekoElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const hasReachedSection = rect.top < windowHeight * 0.5;
      
      if (hasReachedSection && !sectionReached.current) {
        sectionReached.current = true;
      }

      // Only trigger changes after significant scroll AND section reached
      if (sectionReached.current && accumulatedScroll.current >= SCROLL_THRESHOLD) {
        isTransitioning.current = true;
        
        setState(prevState => {
          // Only update if direction actually changed the visibility
          const shouldShowBottomBar = lastDirection.current === 'down';
          const shouldShowHeader = lastDirection.current === 'up';
          
          if (prevState.isBottomBarVisible === shouldShowBottomBar && 
              prevState.isHeaderVisible === shouldShowHeader) {
            // No change needed
            isTransitioning.current = false;
            return prevState;
          }
          
          return {
            isHeaderVisible: shouldShowHeader,
            isBottomBarVisible: shouldShowBottomBar,
            meetCheekoInView: rect.top < windowHeight && rect.bottom > 0,
          };
        });

        // Reset accumulated scroll
        accumulatedScroll.current = 0;

        // Prevent transitions for a period
        setTimeout(() => {
          isTransitioning.current = false;
        }, TRANSITION_DELAY);
      }
    };

    // Throttled scroll handler
    let rafId: number;
    const throttledScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return state;
};