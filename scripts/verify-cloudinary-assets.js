#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const https = require('https');

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

// Expected assets
const expectedAssets = {
  images: [
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

// Check if URL is accessible
async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { timeout: 10000 }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    }).on('timeout', () => {
      resolve(false);
    });
  });
}

// Get Cloudinary URL for asset
function getCloudinaryUrl(folder, filename) {
  const publicId = path.parse(filename).name;
  const extension = path.extname(filename).slice(1);
  const resourceType = folder === 'videos' && (extension === 'mp4' || extension === 'webm') ? 'video' : 'image';
  
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/cheekoai/${folder}/${publicId}.${extension}`;
}

// Verify assets
async function verifyAssets() {
  console.log('🔍 Starting Cloudinary asset verification...');
  console.log(`📍 Cloud Name: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
  console.log(`📁 Target Folder: cheekoai/\n`);
  
  const results = {
    verified: [],
    missing: [],
    failed: [],
    localOnly: [],
    cloudinaryOnly: [],
  };
  
  // Load upload results if available
  const resultsPath = path.join(__dirname, '..', 'cloudinary-upload-results.json');
  let uploadResults = null;
  if (fs.existsSync(resultsPath)) {
    uploadResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  }
  
  // Verify images
  console.log('📸 === VERIFYING IMAGES ===\n');
  for (const image of expectedAssets.images) {
    const localPath = path.join(publicDir, 'images', image);
    const cloudinaryUrl = getCloudinaryUrl('images', image);
    const localExists = fs.existsSync(localPath);
    
    process.stdout.write(`Checking images/${image}... `);
    
    if (!localExists) {
      console.log('❌ Missing locally');
      results.localOnly.push({ type: 'image', file: image });
      continue;
    }
    
    const cloudinaryExists = await checkUrl(cloudinaryUrl);
    
    if (cloudinaryExists) {
      console.log('✅ Verified');
      results.verified.push({ type: 'image', file: image, url: cloudinaryUrl });
    } else {
      console.log('❌ Not on Cloudinary');
      results.missing.push({ type: 'image', file: image });
    }
  }
  
  // Verify icons
  console.log('\n🎨 === VERIFYING ICONS ===\n');
  for (const icon of expectedAssets.icons) {
    const localPath = path.join(publicDir, 'icons', icon);
    const cloudinaryUrl = getCloudinaryUrl('icons', icon);
    const localExists = fs.existsSync(localPath);
    
    process.stdout.write(`Checking icons/${icon}... `);
    
    if (!localExists) {
      console.log('❌ Missing locally');
      results.localOnly.push({ type: 'icon', file: icon });
      continue;
    }
    
    const cloudinaryExists = await checkUrl(cloudinaryUrl);
    
    if (cloudinaryExists) {
      console.log('✅ Verified');
      results.verified.push({ type: 'icon', file: icon, url: cloudinaryUrl });
    } else {
      console.log('❌ Not on Cloudinary');
      results.missing.push({ type: 'icon', file: icon });
    }
  }
  
  // Verify videos
  console.log('\n🎬 === VERIFYING VIDEOS ===\n');
  for (const video of expectedAssets.videos) {
    const localPath = path.join(publicDir, 'videos', video);
    const cloudinaryUrl = getCloudinaryUrl('videos', video);
    const localExists = fs.existsSync(localPath);
    
    process.stdout.write(`Checking videos/${video}... `);
    
    if (!localExists) {
      console.log('❌ Missing locally');
      results.localOnly.push({ type: 'video', file: video });
      continue;
    }
    
    const cloudinaryExists = await checkUrl(cloudinaryUrl);
    
    if (cloudinaryExists) {
      console.log('✅ Verified');
      results.verified.push({ type: 'video', file: video, url: cloudinaryUrl });
    } else {
      console.log('❌ Not on Cloudinary');
      results.missing.push({ type: 'video', file: video });
    }
  }
  
  // Summary
  console.log('\n📊 === VERIFICATION SUMMARY ===\n');
  console.log(`✅ Verified on Cloudinary: ${results.verified.length} assets`);
  console.log(`❌ Missing on Cloudinary: ${results.missing.length} assets`);
  console.log(`📁 Missing locally: ${results.localOnly.length} assets`);
  
  // Show missing assets
  if (results.missing.length > 0) {
    console.log('\n❌ Assets missing on Cloudinary:');
    results.missing.forEach(item => {
      console.log(`   - ${item.type}s/${item.file}`);
    });
    console.log('\nRun "npm run cloudinary:upload" to upload missing assets.');
  }
  
  if (results.localOnly.length > 0) {
    console.log('\n📁 Assets missing locally:');
    results.localOnly.forEach(item => {
      console.log(`   - ${item.type}s/${item.file}`);
    });
  }
  
  // Save verification results
  const verifyPath = path.join(__dirname, '..', 'cloudinary-verification-results.json');
  fs.writeFileSync(verifyPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Verification results saved to: ${verifyPath}`);
  
  // Success message
  if (results.missing.length === 0 && results.localOnly.length === 0) {
    console.log('\n✨ All assets are properly synced between local and Cloudinary!');
  }
  
  // Return exit code based on results
  process.exit(results.missing.length > 0 ? 1 : 0);
}

// Run verification
verifyAssets().catch(console.error);