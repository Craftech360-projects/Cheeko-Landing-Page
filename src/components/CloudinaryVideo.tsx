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
  onError,
  ...props
}: CloudinaryVideoProps) {
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Convert local path to Cloudinary public ID
  const getPublicId = (path: string) => {
    // Remove leading slash and file extension
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const pathWithoutExt = cleanPath.replace(/\.[^/.]+$/, '');
    return `cheekoai/${pathWithoutExt}`;
  };

  useEffect(() => {
    if (error && onError) {
      onError();
    }
  }, [error, onError]);

  // If error occurred and fallback exists, use standard video element
  if (error && fallbackSrc) {
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

  return (
    <CldVideoPlayer
      src={getPublicId(src)}
      width={width}
      height={height}
      controls={controls}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
      poster={poster ? getPublicId(poster) : undefined}
      className={className}
      onError={() => setError(true)}
      transformation={{
        quality: 'auto',
        fetchFormat: 'auto',
      }}
      sourceTypes={['hls', 'dash', 'mp4']}
      {...props}
    />
  );
}