/**
 * Admin Setup Utility
 * 
 * This script helps set up the first admin user for the application.
 * Run this after you've signed up your first user account.
 * 
 * Usage:
 * 1. Sign up for an account on your app
 * 2. Replace YOUR_EMAIL with your actual email in this script
 * 3. Run: npx tsx scripts/setup-admin.ts
 */

import { prisma } from "../lib/prisma";
import { UserRole } from "@prisma/client";

async function setupAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com"; // Change this to your email
  
  console.log(`Setting up admin for email: ${adminEmail}`);
  
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (!user) {
      console.error(`User with email ${adminEmail} not found.`);
      console.log("Please sign up for an account first, then run this script again.");
      process.exit(1);
    }
    
    // Check if already admin
    if (user.role === UserRole.ADMIN) {
      console.log("User is already an admin!");
      process.exit(0);
    }
    
    // Promote to admin
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: UserRole.ADMIN }
    });
    
    console.log(`✅ Successfully promoted ${adminEmail} to admin!`);
    console.log("You can now access the admin panel at /admin");
    
  } catch (error) {
    console.error("Error setting up admin:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
setupAdmin();
