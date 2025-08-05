'use client';

import { CldVideoPlayer, CldVideoPlayerProps } from 'next-cloudinary';
import { useEffect, useRef, useState } from 'react';
import 'next-cloudinary/dist/cld-video-player.css';

interface CloudinaryVideoProps extends Omit<CldVideoPlayerProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  poster?: string;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  quality?: "auto" | "best" | "good" | "eco" | "low" | number;
  onError?: () => void;
  onLoadedData?: () => void;
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
  quality = "auto",
  onError,
  onLoadedData,
  ...props
}: CloudinaryVideoProps) {
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Convert local path to Cloudinary public ID
  const getPublicId = (path: string) => {
    // Remove leading slash and file extension
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const pathWithoutExt = cleanPath.replace(/\.[^/.]+$/, '');
    return `cheekoai/${pathWithoutExt}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (error && onError) {
      onError();
    }
  }, [error, onError]);

  // If error occurred and fallback exists, use standard video element
  if (error || !mounted) {
    return (
      <video
        ref={videoRef}
        src={fallbackSrc || src}
        width={width}
        height={height}
        controls={controls}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        poster={poster}
        className={className}
        playsInline
        onLoadedData={onLoadedData}
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  // Use simple video element with direct Cloudinary URL
  const qualityParam = typeof quality === 'number' ? `q_${quality}` : `q_${quality}`;
  const cloudinaryUrl = `https://res.cloudinary.com/dqtrjeegb/video/upload/f_auto,${qualityParam}/${getPublicId(src)}.mp4`;

  return (
    <video
      ref={videoRef}
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
      onLoadedData={() => {
        // console.log(`[CloudinaryVideo] Successfully loaded video from Cloudinary: ${src}`);
        if (onLoadedData) onLoadedData();
      }}
      onError={() => {
        // console.error(`[CloudinaryVideo] Failed to load from Cloudinary: ${cloudinaryUrl}`);
        // console.log(`[CloudinaryVideo] Falling back to local asset: ${fallbackSrc || src}`);
        setError(true);
      }}
    >
      Your browser does not support the video tag.
    </video>
  );
}