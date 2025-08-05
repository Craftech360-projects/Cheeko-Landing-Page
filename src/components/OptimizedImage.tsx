'use client';

import Image from 'next/image';
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { USE_CLOUDINARY } from '@/config/cloudinary';
import { ComponentProps } from 'react';

type ImageProps = ComponentProps<typeof Image>;

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function OptimizedImage({ src, alt, width, height, ...props }: OptimizedImageProps) {
  if (USE_CLOUDINARY) {
    return (
      <CloudinaryImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        fallbackSrc={src}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}