'use client';

import React, { useRef, useEffect } from 'react';

interface DelayedLoopVideoProps {
  src: string;
  fallbackSrc?: string;
  className?: string;
  delay?: number; // delay in milliseconds
}

export const DelayedLoopVideo: React.FC<DelayedLoopVideoProps> = ({
  src,
  fallbackSrc,
  className = '',
  delay = 3000, // 3 seconds default
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setTimeout(() => {
        video.play();
      }, delay);
    };

    video.addEventListener('ended', handleEnded);

    // Start playing
    video.play().catch(() => {
      // Handle autoplay policy restrictions
      console.log('Autoplay prevented');
    });

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [delay]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      playsInline
      style={{
        display: 'inline-block',
        backgroundColor: 'transparent',
        mixBlendMode: 'screen',
        filter: 'contrast(1.5) brightness(1.2) saturate(1.3)', // Much bolder appearance
        transform: 'scale(1.1)', // Slightly larger for more prominence
      }}
    >
      <source src={src} type="video/webm" />
      {fallbackSrc && <source src={fallbackSrc} type="video/quicktime" />}
    </video>
  );
};