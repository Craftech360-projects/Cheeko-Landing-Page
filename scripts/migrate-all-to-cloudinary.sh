#!/bin/bash

# Script to migrate all components to use OptimizedImage

echo "🚀 Migrating all components to use Cloudinary..."

# List of files to update
files=(
  "src/components/sections/Hero.tsx"
  "src/components/sections/VideoSection.tsx"
  "src/components/sections/HowItWorks.tsx"
  "src/components/sections/Testimonials.tsx"
  "src/components/sections/FAQ.tsx"
  "src/components/sections/Newsletter.tsx"
  "src/components/sections/Footer.tsx"
  "src/components/sections/Header.tsx"
  "src/components/sections/BottomBar.tsx"
  "src/components/sections/Popup.tsx"
  "src/components/sections/AccessOptions.tsx"
  "src/components/sections/PreOrderBanner.tsx"
  "src/components/SplashScreen.tsx"
)

# Update each file
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    
    # Replace Image import
    sed -i '' 's/import Image from "next\/image";/import { OptimizedImage as Image } from "@\/components\/OptimizedImage";/g' "$file"
    
    # If file already has Image imported differently, add OptimizedImage import
    if ! grep -q "OptimizedImage" "$file" && grep -q "Image" "$file"; then
      sed -i '' '/^import.*from "react"/a\
import { OptimizedImage as Image } from "@/components/OptimizedImage";' "$file"
      
      # Remove any existing next/image import
      sed -i '' '/import.*Image.*from.*"next\/image"/d' "$file"
    fi
  fi
done

echo "✅ Migration complete! Remember to:"
echo "1. Set NEXT_PUBLIC_USE_CLOUDINARY=true in .env.local"
echo "2. Test all pages before deploying"
echo "3. Commit and push changes"