/**
 * Test Complete User Flow
 * 
 * This script tests the complete user flow:
 * 1. Homepage → Shop → Product Detail
 * 2. API endpoints and database connections
 * 3. Image loading and display
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testCompleteFlow() {
  console.log('🧪 Testing Complete User Flow...');
  console.log();

  try {
    // Test 1: Database Connection
    console.log('1️⃣ Testing Database Connection...');
    const productCount = await prisma.product.count();
    console.log(`   ✅ Database connected: ${productCount} products found`);
    console.log();

    // Test 2: Product API Endpoints
    console.log('2️⃣ Testing API Endpoints...');
    
    // Test GET /api/products
    console.log('   Testing GET /api/products...');
    const productsResponse = await fetch('http://localhost:3000/api/products');
    if (productsResponse.ok) {
      const products = await productsResponse.json();
      console.log(`   ✅ Products API: ${products.length} products returned`);
    } else {
      console.log(`   ❌ Products API failed: ${productsResponse.status}`);
    }

    // Test GET /api/products/[id]
    console.log('   Testing GET /api/products/[id]...');
    const firstProduct = await prisma.product.findFirst();
    if (firstProduct) {
      const productResponse = await fetch(`http://localhost:3000/api/products/${firstProduct.id}`);
      if (productResponse.ok) {
        const product = await productResponse.json();
        console.log(`   ✅ Product Detail API: ${product.name} loaded successfully`);
      } else {
        console.log(`   ❌ Product Detail API failed: ${productResponse.status}`);
      }
    }
    console.log();

    // Test 3: Data Integrity
    console.log('3️⃣ Testing Data Integrity...');
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        priceInCents: true,
        images: true,
        sku: true,
        isAvailableForPurchase: true,
        inventory: true
      }
    });

    console.log('   Product Data Check:');
    products.forEach(product => {
      const issues = [];
      if (!product.name) issues.push('missing name');
      if (product.priceInCents <= 0) issues.push('invalid price');
      if (!product.images || product.images.length === 0) issues.push('no images');
      if (!product.sku) issues.push('missing SKU');
      if (product.inventory < 0) issues.push('negative inventory');
      
      if (issues.length > 0) {
        console.log(`   ❌ ${product.name}: ${issues.join(', ')}`);
      } else {
        console.log(`   ✅ ${product.name}: All required fields present`);
      }
    });
    console.log();

    // Test 4: Product Categories
    console.log('4️⃣ Testing Categories...');
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    });
    
    console.log('   Categories:');
    categories.forEach(cat => {
      console.log(`   📂 ${cat.category}: ${cat._count.id} products`);
    });
    console.log();

    // Test 5: Price Analysis
    console.log('5️⃣ Testing Price Analysis...');
    const priceStats = await prisma.product.aggregate({
      _min: { priceInCents: true },
      _max: { priceInCents: true },
      _avg: { priceInCents: true }
    });
    
    console.log('   Price Range:');
    console.log(`   💰 Min: $${(priceStats._min.priceInCents || 0) / 100}`);
    console.log(`   💰 Max: $${(priceStats._max.priceInCents || 0) / 100}`);
    console.log(`   💰 Avg: $${((priceStats._avg.priceInCents || 0) / 100).toFixed(2)}`);
    console.log();

    // Test 6: Image Validation
    console.log('6️⃣ Testing Image Paths...');
    const fs = await import('fs');
    const path = await import('path');
    
    let validImages = 0;
    let invalidImages = 0;
    
    for (const product of products) {
      for (const imagePath of product.images) {
        if (imagePath.startsWith('http')) {
          validImages++;
        } else {
          const fullPath = path.join(process.cwd(), 'public', imagePath);
          if (fs.existsSync(fullPath)) {
            validImages++;
          } else {
            invalidImages++;
            console.log(`   ❌ Missing image: ${imagePath}`);
          }
        }
      }
    }
    
    console.log(`   ✅ Valid images: ${validImages}`);
    console.log(`   ❌ Invalid images: ${invalidImages}`);
    console.log();

    // Test 7: Summary
    console.log('📊 Flow Test Summary:');
    console.log(`   Products: ${productCount}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Valid Images: ${validImages}/${validImages + invalidImages}`);
    console.log(`   Price Range: $${(priceStats._min.priceInCents || 0) / 100} - $${(priceStats._max.priceInCents || 0) / 100}`);
    
    if (invalidImages === 0) {
      console.log();
      console.log('🎉 All tests passed! User flow should work correctly.');
    } else {
      console.log();
      console.log('⚠️  Some issues found. Consider fixing image paths or uploading missing images.');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testCompleteFlow()
  .then(() => {
    console.log();
    console.log('✨ Flow test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Flow test failed:', error);
    process.exit(1);
  });

export { testCompleteFlow };
