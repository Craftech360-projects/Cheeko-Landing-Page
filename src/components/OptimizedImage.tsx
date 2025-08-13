'use client';

import Image from 'next/image';
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { USE_CLOUDINARY } from '@/config/cloudinary';
import { ComponentProps } from 'react';

type ImageProps = ComponentProps<typeof Image>;

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  quality?: 'auto' | 'best' | 'good' | 'eco' | 'low' | number;
}

export function OptimizedImage({ src, alt, width, height, fill, quality, ...props }: OptimizedImageProps) {
  if (USE_CLOUDINARY) {
    if (fill) {
      return (
        <CloudinaryImage
          src={src}
          alt={alt}
          fill
          fallbackSrc={src}
          quality={quality}
          {...props}
        />
      );
    }
    return (
      <CloudinaryImage
        src={src}
        alt={alt}
        width={width!}
        height={height!}
        fallbackSrc={src}
        quality={quality}
        {...props}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      {...props}
    />
  );
}