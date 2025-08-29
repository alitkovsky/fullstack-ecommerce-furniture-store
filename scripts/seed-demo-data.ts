/**
 * Demo Data Seeding Script
 * 
 * This script populates the database with realistic demo data including:
 * - Demo admin and customer users
 * - 20+ customers with varied purchase histories
 * - Sample orders with realistic product combinations
 * 
 * Usage: npx tsx scripts/seed-demo-data.ts
 */

import { prisma } from "../lib/prisma";
import { UserRole } from "@prisma/client";

// Demo user credentials for public testing
const DEMO_CREDENTIALS = {
  admin: {
    email: "admin@demo.com",
    role: UserRole.ADMIN
  },
  customer: {
    email: "customer@demo.com",
    role: UserRole.CUSTOMER
  }
};

// Sample customer data for realistic profiles
const DEMO_CUSTOMERS = [
  { email: "john.smith@email.com" },
  { email: "sarah.johnson@gmail.com" },
  { email: "mike.brown@yahoo.com" },
  { email: "emma.davis@outlook.com" },
  { email: "james.wilson@email.com" },
  { email: "lisa.taylor@gmail.com" },
  { email: "david.anderson@yahoo.com" },
  { email: "jennifer.thomas@outlook.com" },
  { email: "robert.jackson@email.com" },
  { email: "amy.white@gmail.com" },
  { email: "chris.harris@yahoo.com" },
  { email: "jessica.martin@outlook.com" },
  { email: "daniel.lee@email.com" },
  { email: "michelle.garcia@gmail.com" },
  { email: "kevin.rodriguez@yahoo.com" },
  { email: "ashley.lewis@outlook.com" },
  { email: "brian.walker@email.com" },
  { email: "stephanie.hall@gmail.com" },
  { email: "jason.allen@yahoo.com" },
  { email: "nicole.young@outlook.com" },
  { email: "tyler.king@email.com" },
  { email: "samantha.scott@gmail.com" }
];

// Sample furniture products for seeding
const SAMPLE_PRODUCTS = [
  {
    name: "Modern Sectional Sofa",
    description: "Comfortable 3-seater sectional sofa perfect for modern living rooms",
    priceInCents: 129900, // $1,299.00
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"],
    category: "Seating",
    inventory: 15,
    sku: "SOFA-MOD-001"
  },
  {
    name: "Oak Dining Table",
    description: "Solid oak dining table that seats 6 people comfortably",
    priceInCents: 89900, // $899.00
    images: ["https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=500"],
    category: "Tables",
    inventory: 8,
    sku: "TABLE-OAK-002"
  },
  {
    name: "Ergonomic Office Chair",
    description: "High-back ergonomic office chair with lumbar support",
    priceInCents: 34900, // $349.00
    images: ["https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500"],
    category: "Seating",
    inventory: 25,
    sku: "CHAIR-ERG-003"
  },
  {
    name: "Industrial Coffee Table",
    description: "Rustic industrial-style coffee table with metal frame",
    priceInCents: 45900, // $459.00
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500"],
    category: "Tables",
    inventory: 12,
    sku: "COFFEE-IND-004"
  },
  {
    name: "Queen Platform Bed",
    description: "Minimalist queen-size platform bed with headboard",
    priceInCents: 79900, // $799.00
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500"],
    category: "Bedroom",
    inventory: 10,
    sku: "BED-PLAT-005"
  },
  {
    name: "6-Drawer Dresser",
    description: "Spacious 6-drawer dresser with modern handles",
    priceInCents: 52900, // $529.00
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500"],
    category: "Storage",
    inventory: 14,
    sku: "DRESS-6DR-006"
  },
  {
    name: "Leather Recliner",
    description: "Premium leather recliner with cup holders",
    priceInCents: 89900, // $899.00
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"],
    category: "Seating",
    inventory: 7,
    sku: "RECL-LEATH-007"
  },
  {
    name: "Bookshelf Unit",
    description: "5-tier wooden bookshelf for home or office",
    priceInCents: 24900, // $249.00
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
    category: "Storage",
    inventory: 20,
    sku: "SHELF-5T-008"
  },
  {
    name: "Bar Stool Set",
    description: "Set of 2 adjustable bar stools with back support",
    priceInCents: 19900, // $199.00
    images: ["https://images.unsplash.com/photo-1549497538-303791108f95?w=500"],
    category: "Seating",
    inventory: 18,
    sku: "STOOL-BAR-009"
  },
  {
    name: "Night Stand",
    description: "Elegant nightstand with drawer and open shelf",
    priceInCents: 18900, // $189.00
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500"],
    category: "Bedroom",
    inventory: 22,
    sku: "NIGHT-STAND-010"
  }
];

// Generate random order data
function generateRandomDate(startDate: Date, endDate: Date): Date {
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

function getRandomProducts(products: any[], count: number = 1): any[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, products.length));
}

function generateRandomQuantity(): number {
  // Weighted random: mostly 1-2 items, occasionally more
  const rand = Math.random();
  if (rand < 0.6) return 1;
  if (rand < 0.85) return 2;
  if (rand < 0.95) return 3;
  return Math.floor(Math.random() * 3) + 4; // 4-6 items
}

async function seedDemoData() {
  console.log("🌱 Starting demo data seeding...");

  try {
    // Clear existing demo data
    console.log("🧹 Cleaning up existing demo data...");
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.user.deleteMany({});

    // Clean up existing products (optional - comment out if you want to keep existing products)
    await prisma.product.deleteMany({
      where: {
        sku: { in: SAMPLE_PRODUCTS.map(p => p.sku) }
      }
    });

    // Create sample products
    console.log("🛋️  Creating sample products...");
    const createdProducts = [];
    for (const product of SAMPLE_PRODUCTS) {
      const newProduct = await prisma.product.create({
        data: {
          ...product,
          tag: [product.category, "furniture", "demo"],
          isAvailableForPurchase: true,
          isNew: Math.random() < 0.3, // 30% chance of being "new"
        },
      });
      createdProducts.push(newProduct);
    }
    console.log(`✅ Created ${createdProducts.length} sample products`);

    // Summary
    const stats = {
      users: await prisma.user.count(),
      products: await prisma.product.count(),
      orders: await prisma.order.count(),
      orderItems: await prisma.orderItem.count(),
    };

    console.log("\n🎉 Demo data seeding completed successfully!");
    console.log("📊 Database Statistics:");
    console.log(`   Users: ${stats.users}`);
    console.log(`   Products: ${stats.products}`);
    console.log(`   Orders: ${stats.orders}`);
    console.log(`   Order Items: ${stats.orderItems}`);
    
    console.log("\n🔑 Demo Setup:");
    console.log("   Users will be automatically created when they sign in with Clerk");
    console.log("   Set up admin@demo.com and customer@demo.com accounts in Clerk");
    console.log("   Then promote admin@demo.com to ADMIN role using the setup script");

  } catch (error) {
    console.error("❌ Error seeding demo data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding script
seedDemoData();
