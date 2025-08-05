#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Base directory for public assets
const publicDir = path.join(__dirname, '..', 'public');

// Asset mappings
const assetMappings = {
  images: [
    'bottom-bar-left.png',
    'faq-image.png',
    'how-it-works-image.png',
    'key-features-child.png',
    'logo.svg',
    'meet-cheeko-img1.png',
    'meet-cheeko-img2.png',
    'meet-cheeko-img3.png',
    'meet-cheeko-img4.png',
    'newsletter-image.png',
    'parental-dashboard-parent.png',
    'popup-right-img.png',
    'user1.png',
    'user2.png',
    'user3.png',
  ],
  icons: [
    'Ball.png',
    'Ellipse.png',
    'Header-Icon-Left.svg',
    'Header-Icon-Right.svg',
    'Rounded.png',
    'Triangle.png',
    'appstore_logo.png',
    'creative-content.svg',
    'discount-icon.svg',
    'facebook.svg',
    'features-star-red.svg',
    'features-star-teal.svg',
    'google-play.png',
    'how-it-works-bottomright.svg',
    'how-it-works-topleft.svg',
    'instagram.svg',
    'linkedin.svg',
    'meet-cheeko-bottomright.svg',
    'meet-cheeko-topleft.svg',
    'multilingual-support.svg',
    'parental-dashboard1.svg',
    'parental-dashboard2.svg',
    'parental-dashboard3.svg',
    'parental-dashboard4.svg',
    'parental-setup.svg',
    'playstore_logo.png',
    'popup-left-bottom-img.png',
    'popup-right-bottom-img.png',
    'safety-bottomleft.svg',
    'safety-privacy-1.svg',
    'safety-privacy-2.svg',
    'safety-privacy-3.svg',
    'smart-learning.svg',
    'x.svg',
    'youtube.svg',
  ],
  videos: [
    'animated_logo.gif',
    'desktop_video.mp4',
    'mobile_video.mp4',
    'popup_video.mp4',
  ],
};

// Upload function
async function uploadAsset(filePath, folder, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `cheekoai/${folder}`,
      public_id: publicId,
      resource_type: 'auto',
      overwrite: true,
      invalidate: true,
      use_filename: true,
      unique_filename: false,
    });
    
    console.log(`✅ Uploaded: ${folder}/${publicId}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

// Main upload function
async function uploadAllAssets() {
  console.log('🚀 Starting Cloudinary asset upload...\n');
  
  const results = {
    success: [],
    failed: [],
  };
  
  // Upload images
  console.log('📸 Uploading images...');
  for (const image of assetMappings.images) {
    const filePath = path.join(publicDir, 'images', image);
    const publicId = path.parse(image).name;
    
    if (fs.existsSync(filePath)) {
      const result = await uploadAsset(filePath, 'images', publicId);
      if (result) {
        results.success.push({ type: 'image', file: image, url: result.secure_url });
      } else {
        results.failed.push({ type: 'image', file: image });
      }
    } else {
      console.log(`⚠️  Skipping missing file: images/${image}`);
      results.failed.push({ type: 'image', file: image, reason: 'File not found' });
    }
  }
  
  // Upload icons
  console.log('\n🎨 Uploading icons...');
  for (const icon of assetMappings.icons) {
    const filePath = path.join(publicDir, 'icons', icon);
    const publicId = path.parse(icon).name;
    
    if (fs.existsSync(filePath)) {
      const result = await uploadAsset(filePath, 'icons', publicId);
      if (result) {
        results.success.push({ type: 'icon', file: icon, url: result.secure_url });
      } else {
        results.failed.push({ type: 'icon', file: icon });
      }
    } else {
      console.log(`⚠️  Skipping missing file: icons/${icon}`);
      results.failed.push({ type: 'icon', file: icon, reason: 'File not found' });
    }
  }
  
  // Upload videos
  console.log('\n🎬 Uploading videos...');
  for (const video of assetMappings.videos) {
    const filePath = path.join(publicDir, 'videos', video);
    const publicId = path.parse(video).name;
    
    if (fs.existsSync(filePath)) {
      console.log(`📤 Uploading video: ${video} (this may take a while...)`);
      const result = await uploadAsset(filePath, 'videos', publicId);
      if (result) {
        results.success.push({ type: 'video', file: video, url: result.secure_url });
      } else {
        results.failed.push({ type: 'video', file: video });
      }
    } else {
      console.log(`⚠️  Skipping missing file: videos/${video}`);
      results.failed.push({ type: 'video', file: video, reason: 'File not found' });
    }
  }
  
  // Summary
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successfully uploaded: ${results.success.length} assets`);
  console.log(`❌ Failed uploads: ${results.failed.length} assets`);
  
  // Save results to file
  const resultsPath = path.join(__dirname, '..', 'cloudinary-upload-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsPath}`);
  
  // Create mapping file for easy reference
  const mappingPath = path.join(__dirname, '..', 'src', 'lib', 'cloudinary-mappings.json');
  const mappings = {};
  
  results.success.forEach(item => {
    const key = `${item.type}s/${item.file}`;
    mappings[key] = {
      publicId: `cheekoai/${item.type}s/${path.parse(item.file).name}`,
      url: item.url,
    };
  });
  
  // Ensure lib directory exists
  const libDir = path.join(__dirname, '..', 'src', 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  fs.writeFileSync(mappingPath, JSON.stringify(mappings, null, 2));
  console.log(`📄 Mappings saved to: ${mappingPath}`);
}

// Run the upload
uploadAllAssets().catch(console.error);