/**
 * Reset Demo Data Script
 * 
 * This script completely resets and reseeds the database with fresh demo data.
 * Useful for maintaining clean demo state on production deployments.
 * 
 * Usage: npx tsx scripts/reset-demo.ts
 */

import { prisma } from "../lib/prisma";

async function resetDemo() {
  console.log("🔄 Resetting demo database...");

  try {
    // Complete database reset
    console.log("🧹 Clearing all data...");
    
    // Delete in correct order to avoid foreign key constraints
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.wishlistItem.deleteMany({});
    await prisma.wishlist.deleteMany({});
    await prisma.collectionOnProduct.deleteMany({});
    await prisma.collection.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("✅ Database cleared successfully");

    // Import and run the seeding script
    console.log("🌱 Reseeding with fresh demo data...");
    
    // We'll re-run the seeding logic
    const { execSync } = require('child_process');
    execSync('npx tsx scripts/seed-demo-data.ts', { stdio: 'inherit' });

    console.log("🎉 Demo reset completed successfully!");
    console.log("\n📊 Fresh demo data is ready:");
    console.log("   • Admin: admin@demo.com");
    console.log("   • Customer: customer@demo.com");
    console.log("   • 22+ Additional customers with purchase history");
    console.log("   • 10 Sample products");
    console.log("   • 35-50 Sample orders");

  } catch (error) {
    console.error("❌ Error resetting demo:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the reset
resetDemo();
