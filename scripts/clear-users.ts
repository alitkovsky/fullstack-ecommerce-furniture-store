/**
 * Clear Users Script
 * 
 * Removes all users from the database
 */

import { prisma } from "../lib/prisma";

async function clearUsers() {
  try {
    console.log("🧹 Clearing all users from database...");
    
    // Delete all related data first
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.wishlistItem.deleteMany({});
    await prisma.wishlist.deleteMany({});
    
    // Now delete all users
    const result = await prisma.user.deleteMany({});
    
    console.log(`✅ Deleted ${result.count} users`);
    console.log("✅ Database cleared successfully");
    
  } catch (error) {
    console.error("❌ Error clearing users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearUsers();
