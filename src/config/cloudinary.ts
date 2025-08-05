// Cloudinary configuration
// Set USE_CLOUDINARY to false to use local assets during development
// Set to true for production or when testing Cloudinary integration

export const USE_CLOUDINARY = process.env.NEXT_PUBLIC_USE_CLOUDINARY === 'true' || process.env.NODE_ENV === 'production';

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqtrjeegb',
  folder: 'cheekoai',
};

// Helper to get the correct image component based on configuration
export { CloudinaryImage } from '@/components/CloudinaryImage';
export { CloudinaryVideo } from '@/components/CloudinaryVideo';