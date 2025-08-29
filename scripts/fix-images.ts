/**
 * Fix Product Images Script
 * 
 * This script fixes missing product images by using existing placeholder images
 * and updating the database with valid image paths
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function fixProductImages() {
  console.log('🖼️ Fixing Product Images...');
  console.log();

  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        images: true,
        category: true
      }
    });

    // Available placeholder images
    const availableImages = [
      '/assets/img/products/product1.png',
      '/assets/img/products/product2.png',
      '/assets/img/products/product3.png'
    ];

    // Verify which images exist
    const validImages = availableImages.filter(imagePath => {
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      return fs.existsSync(fullPath);
    });

    console.log(`📁 Found ${validImages.length} valid placeholder images:`);
    validImages.forEach(img => console.log(`   ✅ ${img}`));
    console.log();

    // Update products with missing images
    let updatedCount = 0;
    
    for (const product of products) {
      let needsUpdate = false;
      const newImages = [];
      
      for (const imagePath of product.images) {
        if (imagePath.startsWith('http')) {
          // Keep blob storage URLs
          newImages.push(imagePath);
        } else {
          // Check if local image exists
          const fullPath = path.join(process.cwd(), 'public', imagePath);
          if (fs.existsSync(fullPath)) {
            newImages.push(imagePath);
          } else {
            // Replace with placeholder based on category
            let placeholderImage = validImages[0]; // Default
            
            if (product.category === 'Living Room') {
              placeholderImage = validImages[0] || '/assets/img/products/product1.png';
            } else if (product.category === 'Bedroom') {
              placeholderImage = validImages[1] || '/assets/img/products/product2.png';
            } else if (product.category === 'Office') {
              placeholderImage = validImages[2] || '/assets/img/products/product3.png';
            } else {
              // Cycle through available images
              const index = updatedCount % validImages.length;
              placeholderImage = validImages[index];
            }
            
            newImages.push(placeholderImage);
            needsUpdate = true;
            console.log(`🔄 ${product.name}: ${imagePath} → ${placeholderImage}`);
          }
        }
      }
      
      if (needsUpdate) {
        await prisma.product.update({
          where: { id: product.id },
          data: { 
            images: newImages,
            imagePath: newImages[0] // Update primary image path too
          }
        });
        updatedCount++;
      }
    }

    console.log();
    console.log(`✅ Updated ${updatedCount} products with valid image paths`);

    // Verify the fix
    console.log();
    console.log('🔍 Verifying fixes...');
    const updatedProducts = await prisma.product.findMany({
      select: {
        name: true,
        images: true
      }
    });

    let totalValidImages = 0;
    let totalInvalidImages = 0;

    for (const product of updatedProducts) {
      for (const imagePath of product.images) {
        if (imagePath.startsWith('http')) {
          totalValidImages++;
        } else {
          const fullPath = path.join(process.cwd(), 'public', imagePath);
          if (fs.existsSync(fullPath)) {
            totalValidImages++;
          } else {
            totalInvalidImages++;
            console.log(`   ❌ Still missing: ${imagePath}`);
          }
        }
      }
    }

    console.log(`✅ Final result: ${totalValidImages} valid, ${totalInvalidImages} invalid images`);

  } catch (error) {
    console.error('❌ Failed to fix images:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
fixProductImages()
  .then(() => {
    console.log();
    console.log('🎉 Image fixing completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Image fixing failed:', error);
    process.exit(1);
  });

export { fixProductImages };
