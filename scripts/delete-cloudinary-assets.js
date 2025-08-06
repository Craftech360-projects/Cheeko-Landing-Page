#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;
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

// Function to delete all assets in a folder
async function deleteFolder(folderPath, resourceType = 'image') {
  try {
    console.log(`🗑️  Deleting ${resourceType}s from folder: ${folderPath}`);
    
    // Delete all resources in the folder
    const result = await cloudinary.api.delete_resources_by_prefix(folderPath, {
      resource_type: resourceType,
      invalidate: true,
    });
    
    console.log(`✅ Deleted ${result.deleted ? Object.keys(result.deleted).length : 0} ${resourceType}s`);
    
    // Try to delete the folder itself
    try {
      await cloudinary.api.delete_folder(folderPath);
      console.log(`📁 Deleted folder: ${folderPath}`);
    } catch (folderError) {
      // Folder might not be empty or might not exist
      if (folderError.error && folderError.error.message.includes('not empty')) {
        console.log(`📁 Folder ${folderPath} still contains resources`);
      }
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Error deleting ${resourceType}s from ${folderPath}:`, error.message);
    return null;
  }
}

// Main deletion function
async function deleteAllAssets() {
  console.log('🚀 Starting Cloudinary asset deletion...\n');
  console.log(`📍 Cloud Name: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
  console.log(`📁 Target Folder: cheekoai/\n`);
  
  // Prompt for confirmation
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const answer = await new Promise(resolve => {
    readline.question('⚠️  This will DELETE ALL assets in the cheekoai folder. Continue? (yes/no): ', resolve);
  });
  
  readline.close();
  
  if (answer.toLowerCase() !== 'yes') {
    console.log('❌ Deletion cancelled');
    process.exit(0);
  }
  
  console.log('\n🗑️  Starting deletion process...\n');
  
  const results = {
    images: { deleted: 0, failed: 0 },
    videos: { deleted: 0, failed: 0 },
    raw: { deleted: 0, failed: 0 },
  };
  
  // Delete images
  console.log('📸 Deleting images...');
  const imageResults = await Promise.all([
    deleteFolder('cheekoai/images', 'image'),
    deleteFolder('cheekoai/icons', 'image'),
  ]);
  
  imageResults.forEach(result => {
    if (result && result.deleted) {
      results.images.deleted += Object.keys(result.deleted).length;
    }
  });
  
  // Delete videos
  console.log('\n🎬 Deleting videos...');
  const videoResult = await deleteFolder('cheekoai/videos', 'video');
  if (videoResult && videoResult.deleted) {
    results.videos.deleted += Object.keys(videoResult.deleted).length;
  }
  
  // Delete raw files (like GIFs)
  console.log('\n📄 Deleting raw files...');
  const rawResult = await deleteFolder('cheekoai/videos', 'raw');
  if (rawResult && rawResult.deleted) {
    results.raw.deleted += Object.keys(rawResult.deleted).length;
  }
  
  // Try to delete the main folder
  console.log('\n📁 Attempting to delete main folder...');
  try {
    await cloudinary.api.delete_folder('cheekoai');
    console.log('✅ Deleted main folder: cheekoai');
  } catch (error) {
    if (error.error && error.error.message.includes('not found')) {
      console.log('📁 Main folder already deleted or does not exist');
    } else if (error.error && error.error.message.includes('not empty')) {
      console.log('📁 Main folder still contains subfolders');
      
      // List remaining subfolders
      try {
        const folders = await cloudinary.api.sub_folders('cheekoai');
        if (folders.folders && folders.folders.length > 0) {
          console.log('📁 Remaining subfolders:', folders.folders.map(f => f.name).join(', '));
        }
      } catch (listError) {
        // Ignore listing errors
      }
    }
  }
  
  // Summary
  console.log('\n📊 Deletion Summary:');
  console.log(`📸 Images deleted: ${results.images.deleted}`);
  console.log(`🎬 Videos deleted: ${results.videos.deleted}`);
  console.log(`📄 Raw files deleted: ${results.raw.deleted}`);
  console.log(`\n✅ Total assets deleted: ${results.images.deleted + results.videos.deleted + results.raw.deleted}`);
  
  console.log('\n✨ Cloudinary cleanup complete!');
  console.log('You can now run "npm run cloudinary:upload" to upload fresh assets.');
}

// Run the deletion
deleteAllAssets().catch(console.error);