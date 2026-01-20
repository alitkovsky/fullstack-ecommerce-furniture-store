/**
 * List Users Script
 * 
 * Shows all users currently in the database
 */

import { prisma } from "../lib/prisma";

async function listUsers() {
  try {
    const users: {
      id: string;
      email: string | null;
      role: string;
      createdAt: Date;
    }[] = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('\n👥 Users in database:');
    console.log('=====================');
    
    if (users.length === 0) {
      console.log('No users found in database.');
      console.log('\n💡 Users are created automatically when they first sign in through Clerk.');
      console.log('   Make sure to sign in through the app at least once.');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email} (${user.role})`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Created: ${user.createdAt.toISOString()}`);
        console.log('');
      });
    }

    console.log(`Total users: ${users.length}`);

  } catch (error) {
    console.error("❌ Error listing users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
