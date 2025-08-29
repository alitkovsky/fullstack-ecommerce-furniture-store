import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export interface UserWithRole {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

/**
 * Get the current authenticated user with their role from the database
 */
export async function getCurrentUser(): Promise<UserWithRole | null> {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === UserRole.ADMIN;
}

/**
 * Check if the current user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const { userId } = await auth();
  return !!userId;
}

/**
 * Ensure user exists in database and sync with Clerk
 * This should be called when a user signs in
 */
export async function ensureUserExists(clerkUserId: string, email: string): Promise<UserWithRole> {
  let user = await prisma.user.findUnique({
    where: { id: clerkUserId },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    // Check if there's an existing user with this email (demo user with temp ID)
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (existingUser) {
      console.log(`🔄 Syncing demo user ${email} from temp ID ${existingUser.id} to Clerk ID ${clerkUserId}`);
      
      try {
        // First, update any orders to use the new user ID
        await prisma.order.updateMany({
          where: { userId: existingUser.id },
          data: { userId: clerkUserId }
        });
        
        // Delete the old temp user and create with the real Clerk ID, preserving role
        await prisma.user.delete({ where: { id: existingUser.id } });
        
        user = await prisma.user.create({
          data: {
            id: clerkUserId,
            email: email,
            role: existingUser.role, // Preserve the existing role (ADMIN for demo accounts)
          },
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
          },
        });
        
        console.log(`✅ Successfully synced user ${email} with role ${existingUser.role}`);
      } catch (error) {
        console.error(`❌ Error syncing user ${email}:`, error);
        // If sync fails, fall back to creating a new user
        user = await prisma.user.create({
          data: {
            id: clerkUserId,
            email: email,
            role: UserRole.CUSTOMER, // Default role as fallback
          },
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
          },
        });
      }
    } else {
      // Create new user with default role
      user = await prisma.user.create({
        data: {
          id: clerkUserId,
          email: email,
          role: UserRole.CUSTOMER, // Default role for new users
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
    }
  }

  return user;
}

/**
 * Promote a user to admin role (useful for initial setup)
 */
export async function promoteToAdmin(userId: string): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.ADMIN },
    });
    return true;
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    return false;
  }
}

/**
 * Get user role by email (useful for initial admin setup)
 */
export async function getUserByEmail(email: string): Promise<UserWithRole | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}
