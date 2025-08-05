"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryImageProps extends Omit<CldImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "auto";
  quality?: "auto" | "best" | "good" | "eco" | "low" | number;
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  aspectRatio = "auto",
  quality = "auto",
  loading = "lazy",
  className,
  sizes,
  priority,
  ...props
}: CloudinaryImageProps) {
  const [error, setError] = useState(false);

  // Convert local path to Cloudinary public ID
  // Example: /images/logo.svg -> cheekoai/images/logo
  const getPublicId = (path: string) => {
    // Remove leading slash and file extension
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const pathWithoutExt = cleanPath.replace(/\.[^/.]+$/, "");
    return `cheekoai/${pathWithoutExt}`;
  };

  // If error occurred and fallback exists, use Next/Image with local asset
  if (error && fallbackSrc) {
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
  const defaultSizes =
    sizes || `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`;

  const publicId = getPublicId(src);

  return (
    <CldImage
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? undefined : loading}
      quality={quality}
      format="auto"
      sizes={defaultSizes}
      className={className}
      style={props.fill ? undefined : { width: "auto", height: "auto" }}
      onError={() => {
        // console.error(`[CloudinaryImage] Failed to load from Cloudinary: ${publicId}`);
        // console.log(`[CloudinaryImage] Falling back to local asset: ${fallbackSrc || src}`);
        setError(true);
      }}
      crop="fit"
      gravity="center"
      priority={priority || false}
      {...props}
    />
  );
}
