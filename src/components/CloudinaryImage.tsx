'use client';

import { CldImage, CldImageProps } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
  quality?: 'auto' | 'best' | 'good' | 'eco' | 'low' | number;
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  aspectRatio = 'auto',
  quality = 'auto',
  loading = 'lazy',
  className,
  sizes,
  priority,
  ...props
}: CloudinaryImageProps & { priority?: boolean }) {
  const [error, setError] = useState(false);

  // Convert local path to Cloudinary public ID
  // Example: /images/logo.svg -> cheekoai/images/logo
  const getPublicId = (path: string) => {
    // Remove leading slash and file extension
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const pathWithoutExt = cleanPath.replace(/\.[^/.]+$/, '');
    const publicId = `cheekoai/${pathWithoutExt}`;
    
    // Log Cloudinary image loading
    // console.log(`🌩️ Cloudinary Image: Loading "${src}" as "${publicId}"`);
    
    return publicId;
  };

  // If error occurred and fallback exists, use Next/Image with local asset
  if (error && fallbackSrc) {
    // console.log(`⚠️ Cloudinary Image: Failed to load "${src}", using fallback "${fallbackSrc}"`);
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? undefined : loading}
        className={className}
      />
    );
  }

  // Calculate sizes if not provided
  const defaultSizes = sizes || `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`;

  // Don't pass loading prop if priority is true
  const imageProps = {
    src: getPublicId(src),
    alt,
    width,
    height,
    quality,
    format: "auto",
    sizes: defaultSizes,
    className,
    onError: () => {
      // console.error(`❌ Cloudinary Image: Failed to load "${src}"`);
      setError(true);
    },
    onLoad: () => {
      // console.log(`✅ Cloudinary Image: Successfully loaded "${src}"`);
    },
    crop: "fit",
    gravity: "center",
    ...props,
    ...(priority ? { priority } : { loading }),
  };

  return (
    <CldImage
      {...imageProps}
    />
  );
}