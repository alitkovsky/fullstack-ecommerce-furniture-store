/**
 * Promote Clerk User to Admin
 * 
 * Usage: CLERK_USER_ID=user_31K1yE5pXjWD8w9nfUkHZYXpdUl npx tsx scripts/promote-clerk-user.ts
 */

import { prisma } from "../lib/prisma";
import { UserRole } from "@prisma/client";

async function promoteClerkUser() {
  const clerkUserId = process.env.CLERK_USER_ID || "user_31K1yE5pXjWD8w9nfUkHZYXpdUl";
  
  console.log(`🔍 Looking for Clerk user with ID: ${clerkUserId}`);
  
  try {
    // First try to find the user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { id: clerkUserId }
    });
    
    if (!user) {
      console.log("❌ Clerk user not found in database.");
      console.log("💡 The user needs to sign in through the app first to be created.");
      console.log("   1. Go to your app and sign in with admin@demo.com");
      console.log("   2. Then run this script again");
      
      // Check if there are any users with the demo email
      const demoUser = await prisma.user.findUnique({
        where: { email: "admin@demo.com" }
      });
      
      if (demoUser) {
        console.log(`\n🔄 Found existing demo user with different ID: ${demoUser.id}`);
        console.log("   Deleting old demo user to avoid conflicts...");
        await prisma.user.delete({ where: { id: demoUser.id } });
        console.log("   ✅ Old demo user deleted");
      }
      
      process.exit(1);
    }
    
    // Check if already admin
    if (user.role === UserRole.ADMIN) {
      console.log("✅ User is already an admin!");
      process.exit(0);
    }
    
    // Promote to admin
    const updatedUser = await prisma.user.update({
      where: { id: clerkUserId },
      data: { role: UserRole.ADMIN }
    });
    
    console.log(`✅ Successfully promoted ${updatedUser.email} to admin!`);
    console.log("🎉 You can now access the admin panel at /admin");
    
  } catch (error) {
    console.error("❌ Error promoting user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

promoteClerkUser();
