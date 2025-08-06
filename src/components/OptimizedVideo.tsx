'use client';

import { USE_CLOUDINARY } from '@/config/cloudinary';
import { useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  onLoadedData?: () => void;
}

export function OptimizedVideo({ 
  src, 
  className,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = true,
  controls = false,
  width,
  height,
  onLoadedData,
  ...props 
}: OptimizedVideoProps) {
  const [useCloudinary, setUseCloudinary] = useState(USE_CLOUDINARY);
  
  // Convert local path to Cloudinary URL
  const getCloudinaryUrl = (path: string) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const pathWithoutExt = cleanPath.replace(/\.[^/.]+$/, '');
    return `https://res.cloudinary.com/dqtrjeegb/video/upload/q_auto,f_auto/cheekoai/${pathWithoutExt}.mp4`;
  };
  
  const videoSrc = useCloudinary ? getCloudinaryUrl(src) : src;
  
  if (useCloudinary) {
    // console.log(`🎬 OptimizedVideo: Attempting Cloudinary URL for "${src}"`);
    // console.log(`🎬 Cloudinary URL: ${videoSrc}`);
  }

  
  return (
    <video
      src={videoSrc}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      onLoadedData={() => {
        // console.log(`✅ Video loaded successfully: ${useCloudinary ? 'Cloudinary' : 'Local'} - "${src}"`);
        onLoadedData?.();
      }}
      onError={(e) => {
        if (useCloudinary) {
          console.error(`❌ Cloudinary video failed, falling back to local: "${src}"`);
          setUseCloudinary(false);
        } else {
          console.error(`❌ Local video also failed: "${src}"`, e);
        }
      }}
    >
      Your browser does not support the video tag.
    </video>
  );
}