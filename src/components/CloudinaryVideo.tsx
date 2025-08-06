'use client';

import { useEffect, useRef, useState } from 'react';

interface CloudinaryVideoProps {
  src: string;
  fallbackSrc?: string;
  poster?: string;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | number;
  onError?: () => void;
}

export function CloudinaryVideo({
  src,
  width,
  height,
  fallbackSrc,
  poster,
  controls = true,
  muted = false,
  autoPlay = false,
  loop = false,
  className,
  quality = 'auto:best',
  onError,
}: CloudinaryVideoProps) {
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Convert local path to Cloudinary public ID
  const getPublicId = (path: string) => {
    // Remove leading slash and file extension
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const pathWithoutExt = cleanPath.replace(/\.[^/.]+$/, '');
    const publicId = `cheekoai/${pathWithoutExt}`;
    
    // Log Cloudinary video loading
    // console.log(`🎬 Cloudinary Video: Loading "${src}" as "${publicId}"`);
    
    return publicId;
  };

  useEffect(() => {
    if (error && onError) {
      onError();
    }
  }, [error, onError]);

  // If error occurred and fallback exists, use standard video element
  if (error && fallbackSrc) {
    // console.log(`⚠️ Cloudinary Video: Failed to load "${src}", using fallback "${fallbackSrc}"`);
    return (
      <video
        ref={videoRef}
        src={fallbackSrc}
        width={width}
        height={height}
        controls={controls}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        poster={poster}
        className={className}
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  // For better compatibility, use direct video element with Cloudinary URL
  const publicId = getPublicId(src);
  const cloudName = 'dqtrjeegb'; // Hardcoded for now since env variable might not be available
  
  // Build quality parameter
  const qualityParam = typeof quality === 'number' ? `q_${quality}` : `q_${quality}`;
  
  // Enhanced video transformation for better quality
  // vc_h265 for better compression, br_2m for 2Mbps bitrate
  const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${qualityParam},f_auto,vc_auto,br_2m/${publicId}.mp4`;
  
  // console.log(`🎬 Cloudinary Video URL: ${cloudinaryUrl}`);
  
  return (
    <video
      src={cloudinaryUrl}
      width={width}
      height={height}
      controls={controls}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
      poster={poster}
      className={className}
      playsInline
      crossOrigin="anonymous"
      preload={autoPlay ? "auto" : "metadata"}
      onError={(e) => {
        console.error(`❌ Cloudinary Video: Failed to load "${src}" from URL: ${cloudinaryUrl}`);
        console.error('Video error event:', e);
        setError(true);
      }}
      onLoadedData={() => {
        // console.log(`✅ Cloudinary Video: Successfully loaded "${src}"`);
      }}
      onLoadedMetadata={() => {
        // console.log(`📊 Cloudinary Video: Metadata loaded for "${src}"`);
      }}
      onCanPlay={() => {
        // console.log(`▶️ Cloudinary Video: Ready to play "${src}"`);
      }}
    >
      Your browser does not support the video tag.
    </video>
  );
}