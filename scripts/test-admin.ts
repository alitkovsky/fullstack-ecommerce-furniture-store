/**
 * Admin Section Error Debugging Script
 * 
 * This script tests the admin functionality to identify specific errors
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAdminFunctionality() {
  console.log('🔍 Testing Admin Section Functionality...');
  console.log();

  try {
    // Test 1: Basic database connectivity
    console.log('1️⃣ Testing Database Connection...');
    const productCount = await prisma.product.count();
    console.log(`   ✅ Database connected: ${productCount} products found`);
    console.log();

    // Test 2: Test admin dashboard queries
    console.log('2️⃣ Testing Admin Dashboard Queries...');
    
    // Sales data
    try {
      const salesData = await prisma.order.aggregate({
        _sum: { totalPrice: true },
        _count: true,
      });
      console.log(`   ✅ Sales query: ${salesData._count} orders, total: $${(salesData._sum.totalPrice || 0) / 100}`);
    } catch (error) {
      console.log(`   ❌ Sales query failed: ${error instanceof Error ? error.message : error}`);
    }

    // User data
    try {
      const userCount = await prisma.user.count();
      console.log(`   ✅ User query: ${userCount} users`);
    } catch (error) {
      console.log(`   ❌ User query failed: ${error instanceof Error ? error.message : error}`);
    }

    // Product availability data
    try {
      const [activeCount, inactiveCount] = await Promise.all([
        prisma.product.count({ where: { isAvailableForPurchase: true } }),
        prisma.product.count({ where: { isAvailableForPurchase: false } }),
      ]);
      console.log(`   ✅ Product availability: ${activeCount} active, ${inactiveCount} inactive`);
    } catch (error) {
      console.log(`   ❌ Product availability failed: ${error instanceof Error ? error.message : error}`);
    }

    console.log();

    // Test 3: Test products table query
    console.log('3️⃣ Testing Products Table Query...');
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          collectionIDs: true,
          priceInCents: true,
          isAvailableForPurchase: true,
          _count: { select: { orderItems: true } },
        },
        take: 5, // Limit to 5 for testing
        orderBy: { name: "asc" },
      });
      console.log(`   ✅ Products table query: ${products.length} products retrieved`);
      products.forEach(product => {
        console.log(`     - ${product.name}: $${(product.priceInCents / 100).toFixed(2)} (${product.isAvailableForPurchase ? 'Active' : 'Inactive'})`);
      });
    } catch (error) {
      console.log(`   ❌ Products table query failed: ${error instanceof Error ? error.message : error}`);
    }

    console.log();

    // Test 4: Check for common admin component issues
    console.log('4️⃣ Checking Component Dependencies...');
    
    // Check if UI components path exists
    const fs = await import('fs');
    const path = await import('path');
    
    const uiComponentsPath = path.join(process.cwd(), 'components', 'ui');
    if (fs.existsSync(uiComponentsPath)) {
      console.log('   ✅ UI components directory exists');
      const files = fs.readdirSync(uiComponentsPath);
      console.log(`   📁 UI components: ${files.join(', ')}`);
    } else {
      console.log('   ❌ UI components directory missing');
    }

    // Check formatters
    const formattersPath = path.join(process.cwd(), 'lib', 'formatters.ts');
    if (fs.existsSync(formattersPath)) {
      console.log('   ✅ Formatters file exists');
    } else {
      console.log('   ❌ Formatters file missing');
    }

    console.log();

    // Test 5: Environment Variables
    console.log('5️⃣ Checking Environment Variables...');
    
    if (process.env.DATABASE_URL) {
      console.log('   ✅ DATABASE_URL is set');
    } else {
      console.log('   ❌ DATABASE_URL is missing');
    }

    if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      console.log('   ✅ Clerk publishable key is set');
    } else {
      console.log('   ⚠️  Clerk publishable key is missing (admin auth may not work)');
    }

    if (process.env.CLERK_SECRET_KEY) {
      console.log('   ✅ Clerk secret key is set');
    } else {
      console.log('   ⚠️  Clerk secret key is missing (admin auth may not work)');
    }

    console.log();
    console.log('🎯 Summary:');
    console.log('Most admin functionality should work. Check the specific error message you received.');
    console.log('Common issues:');
    console.log('  - Clerk authentication not configured (auth errors)');
    console.log('  - Missing UI components (component import errors)');
    console.log('  - Database field name mismatches (database errors)');

  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testAdminFunctionality()
  .then(() => {
    console.log();
    console.log('✨ Admin test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Admin test failed:', error);
    process.exit(1);
  });

export { testAdminFunctionality };
