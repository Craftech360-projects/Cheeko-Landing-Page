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

// Verify configuration
if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Missing Cloudinary API credentials in .env.local');
  console.error('Please ensure CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set');
  process.exit(1);
}

// Base directory for public assets
const publicDir = path.join(__dirname, '..', 'public');

// Asset mappings
const assetMappings = {
  images: [
    'animated_logo.gif',
    'bottom-bar-left.png',
    'faq-image.png',
    'how-it-works-image.jpg',
    'key-features-child.png',
    'logo.svg',
    'meet-cheeko-img1.png',
    'meet-cheeko-img2.png',
    'meet-cheeko-img3.png',
    'meet-cheeko-img4.png',
    'newsletter-image.png',
    'parental-dashboard-parent.jpg',
    'popup-right-img.png',
    'user1.png',
    'user2.png',
    'user3.png',
    'user4.png',
    'user5.png',
    'user6.png',
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
    'download_animation.webm',
    'desktop_video.mp4',
    'mobile_video.mp4',
    'popup_video.mp4',
  ],
};

// Get file size in human readable format
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  const bytes = stats.size;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Upload function with retry logic
async function uploadAsset(filePath, folder, publicId, retries = 3) {
  const fileSize = getFileSize(filePath);
  console.log(`📤 Uploading: ${folder}/${publicId} (${fileSize})`);
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `cheekoai/${folder}`,
        public_id: publicId,
        resource_type: 'auto',
        overwrite: true,
        invalidate: true,
        use_filename: true,
        unique_filename: false,
        timeout: 600000, // 10 minutes timeout for large files
      });
      
      console.log(`✅ Success: ${folder}/${publicId} - ${result.secure_url}`);
      return result;
    } catch (error) {
      if (attempt < retries) {
        console.log(`⚠️  Attempt ${attempt}/${retries} failed. Retrying...`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
      } else {
        console.error(`❌ Failed after ${retries} attempts: ${filePath}`);
        console.error(`   Error: ${error.message}`);
        return null;
      }
    }
  }
}

// Main upload function
async function uploadAllAssets() {
  console.log('🚀 Starting Cloudinary asset upload...');
  console.log(`📍 Cloud Name: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
  console.log(`📁 Target Folder: cheekoai/\n`);
  
  const startTime = Date.now();
  const results = {
    success: [],
    failed: [],
  };
  
  // Upload images
  console.log('📸 === UPLOADING IMAGES ===\n');
  for (const image of assetMappings.images) {
    const filePath = path.join(publicDir, 'images', image);
    const publicId = path.parse(image).name;
    
    if (fs.existsSync(filePath)) {
      const result = await uploadAsset(filePath, 'images', publicId);
      if (result) {
        results.success.push({ type: 'image', file: image, url: result.secure_url, size: getFileSize(filePath) });
      } else {
        results.failed.push({ type: 'image', file: image });
      }
    } else {
      console.log(`⚠️  Skipping missing file: images/${image}`);
      results.failed.push({ type: 'image', file: image, reason: 'File not found' });
    }
  }
  
  // Upload icons
  console.log('\n🎨 === UPLOADING ICONS ===\n');
  for (const icon of assetMappings.icons) {
    const filePath = path.join(publicDir, 'icons', icon);
    const publicId = path.parse(icon).name;
    
    if (fs.existsSync(filePath)) {
      const result = await uploadAsset(filePath, 'icons', publicId);
      if (result) {
        results.success.push({ type: 'icon', file: icon, url: result.secure_url, size: getFileSize(filePath) });
      } else {
        results.failed.push({ type: 'icon', file: icon });
      }
    } else {
      console.log(`⚠️  Skipping missing file: icons/${icon}`);
      results.failed.push({ type: 'icon', file: icon, reason: 'File not found' });
    }
  }
  
  // Upload videos
  console.log('\n🎬 === UPLOADING VIDEOS ===\n');
  for (const video of assetMappings.videos) {
    const filePath = path.join(publicDir, 'videos', video);
    const publicId = path.parse(video).name;
    
    if (fs.existsSync(filePath)) {
      const result = await uploadAsset(filePath, 'videos', publicId);
      if (result) {
        results.success.push({ type: 'video', file: video, url: result.secure_url, size: getFileSize(filePath) });
      } else {
        results.failed.push({ type: 'video', file: video });
      }
    } else {
      console.log(`⚠️  Skipping missing file: videos/${video}`);
      results.failed.push({ type: 'video', file: video, reason: 'File not found' });
    }
  }
  
  // Calculate upload time
  const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);
  
  // Summary
  console.log('\n📊 === UPLOAD SUMMARY ===\n');
  console.log(`⏱️  Total upload time: ${uploadTime} seconds`);
  console.log(`✅ Successfully uploaded: ${results.success.length} assets`);
  console.log(`❌ Failed uploads: ${results.failed.length} assets`);
  
  // Show failed assets details
  if (results.failed.length > 0) {
    console.log('\n❌ Failed Assets:');
    results.failed.forEach(item => {
      console.log(`   - ${item.type}s/${item.file} ${item.reason ? `(${item.reason})` : ''}`);
    });
  }
  
  // Calculate total size uploaded
  const totalSize = results.success.reduce((acc, item) => {
    const sizeMatch = item.size.match(/(\d+\.?\d*)\s*(\w+)/);
    if (sizeMatch) {
      const [, size, unit] = sizeMatch;
      const multipliers = { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024 };
      return acc + (parseFloat(size) * (multipliers[unit] || 1));
    }
    return acc;
  }, 0);
  
  const formatBytes = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  console.log(`📦 Total data uploaded: ${formatBytes(totalSize)}`);
  
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
  
  console.log('\n✨ Upload complete! Your assets are now available on Cloudinary.');
  console.log('Run "npm run cloudinary:verify" to verify all assets are accessible.');
}

// Run the upload
uploadAllAssets().catch(console.error);