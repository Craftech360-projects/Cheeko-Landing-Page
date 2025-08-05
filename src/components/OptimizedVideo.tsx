'use client';

import { CloudinaryVideo } from '@/components/CloudinaryVideo';
import { USE_CLOUDINARY } from '@/config/cloudinary';

interface OptimizedVideoProps {
  src: string;
  width: number;
  height: number;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  playsInline?: boolean;
  quality?: "auto" | "best" | "good" | "eco" | "low" | number;
  onLoadedData?: () => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export function OptimizedVideo({
  src,
  width,
  height,
  controls = true,
  muted = false,
  autoPlay = false,
  loop = false,
  className,
  playsInline = true,
  quality = "auto",
  onLoadedData,
  videoRef,
}: OptimizedVideoProps) {
  if (USE_CLOUDINARY) {
    return (
      <CloudinaryVideo
        src={src}
        width={width}
        height={height}
        controls={controls}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        className={className}
        quality={quality}
        fallbackSrc={src}
        onLoadedData={onLoadedData}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      width={width}
      height={height}
      controls={controls}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
      className={className}
      playsInline={playsInline}
      onLoadedData={onLoadedData}
    >
      Your browser does not support the video tag.
    </video>
  );
}