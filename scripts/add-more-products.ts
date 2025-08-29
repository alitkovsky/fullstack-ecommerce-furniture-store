/**
 * Add More Products Script
 * 
 * This script adds more diverse furniture products to the database
 * Run with: npx ts-node scripts/add-more-products.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const moreProducts = [
  {
    name: "Levitan Sectional Sofa",
    description: "Modern L-shaped sectional sofa with premium fabric upholstery",
    additionalInfo: "Perfect for large living rooms, seats up to 6 people comfortably",
    priceInCents: 129900, // $1,299.00
    oldPriceInCents: 149900, // $1,499.00
    discountPercentage: 13,
    images: ["/assets/img/products/sofa1.jpg", "/assets/img/products/sofa1-alt.jpg"],
    imagePath: "/assets/img/products/sofa1.jpg",
    isNew: true,
    inventory: 5,
    category: "Living Room",
    collectionIDs: ["Modern", "Bestsellers"],
    tag: ["sofa", "sectional", "living room", "modern"],
    sku: "FURN-004",
    weight: 85.5,
    dimensions: {
      length: 280,
      width: 180,
      height: 85
    }
  },
  {
    name: "Oak Dining Table",
    description: "Solid oak dining table with natural wood finish",
    additionalInfo: "Handcrafted from sustainable oak wood, seats 6-8 people",
    priceInCents: 89900, // $899.00
    images: ["/assets/img/products/table1.jpg"],
    imagePath: "/assets/img/products/table1.jpg",
    isNew: false,
    inventory: 8,
    category: "Dining Room",
    collectionIDs: ["Traditional", "Wood Furniture"],
    tag: ["dining table", "oak", "wood", "traditional"],
    sku: "FURN-005",
    weight: 45.2,
    dimensions: {
      length: 180,
      width: 90,
      height: 75
    }
  },
  {
    name: "Memory Foam Mattress Queen",
    description: "Premium memory foam mattress with cooling gel layer",
    additionalInfo: "10-year warranty, hypoallergenic, medium-firm support",
    priceInCents: 79900, // $799.00
    oldPriceInCents: 99900, // $999.00
    discountPercentage: 20,
    images: ["/assets/img/products/mattress1.jpg"],
    imagePath: "/assets/img/products/mattress1.jpg",
    isNew: false,
    inventory: 12,
    category: "Bedroom",
    collectionIDs: ["Comfort", "Bestsellers"],
    tag: ["mattress", "memory foam", "queen", "bedroom"],
    sku: "FURN-006",
    weight: 32.0,
    dimensions: {
      length: 203,
      width: 152,
      height: 25
    }
  },
  {
    name: "Industrial Bookshelf",
    description: "5-tier industrial style bookshelf with metal frame",
    additionalInfo: "Easy assembly, adjustable shelves, holds up to 200 books",
    priceInCents: 24900, // $249.00
    images: ["/assets/img/products/bookshelf1.jpg"],
    imagePath: "/assets/img/products/bookshelf1.jpg",
    isNew: true,
    inventory: 15,
    category: "Office",
    collectionIDs: ["Industrial", "Storage"],
    tag: ["bookshelf", "industrial", "storage", "office"],
    sku: "FURN-007",
    weight: 18.7,
    dimensions: {
      length: 80,
      width: 30,
      height: 180
    }
  },
  {
    name: "Velvet Accent Chair",
    description: "Luxurious velvet accent chair in emerald green",
    additionalInfo: "Perfect statement piece for any room, solid wood legs",
    priceInCents: 45900, // $459.00
    images: ["/assets/img/products/chair1.jpg", "/assets/img/products/chair1-side.jpg"],
    imagePath: "/assets/img/products/chair1.jpg",
    isNew: false,
    inventory: 7,
    category: "Living Room",
    collectionIDs: ["Luxury", "Chairs"],
    tag: ["chair", "velvet", "accent", "luxury"],
    sku: "FURN-008",
    weight: 12.3,
    dimensions: {
      length: 70,
      width: 65,
      height: 90
    }
  },
  {
    name: "Standing Desk Converter",
    description: "Adjustable standing desk converter for ergonomic workspace",
    additionalInfo: "Height adjustable from 15-50cm, supports dual monitors",
    priceInCents: 32900, // $329.00
    images: ["/assets/img/products/desk1.jpg"],
    imagePath: "/assets/img/products/desk1.jpg",
    isNew: true,
    inventory: 20,
    category: "Office",
    collectionIDs: ["Ergonomic", "Modern"],
    tag: ["desk", "standing", "ergonomic", "office"],
    sku: "FURN-009",
    weight: 8.5,
    dimensions: {
      length: 90,
      width: 60,
      height: 50
    }
  },
  {
    name: "Floating Nightstand Set",
    description: "Set of 2 floating nightstands with hidden storage",
    additionalInfo: "Wall-mounted design saves floor space, soft-close drawers",
    priceInCents: 18900, // $189.00
    images: ["/assets/img/products/nightstand1.jpg"],
    imagePath: "/assets/img/products/nightstand1.jpg",
    isNew: false,
    inventory: 10,
    category: "Bedroom",
    collectionIDs: ["Modern", "Storage"],
    tag: ["nightstand", "floating", "storage", "bedroom"],
    sku: "FURN-010",
    weight: 6.8,
    dimensions: {
      length: 45,
      width: 30,
      height: 15
    }
  },
  {
    name: "Rustic Coffee Table",
    description: "Reclaimed wood coffee table with industrial metal legs",
    additionalInfo: "Each piece is unique due to reclaimed wood character",
    priceInCents: 39900, // $399.00
    images: ["/assets/img/products/coffee-table1.jpg"],
    imagePath: "/assets/img/products/coffee-table1.jpg",
    isNew: false,
    inventory: 6,
    category: "Living Room",
    collectionIDs: ["Rustic", "Coffee Tables"],
    tag: ["coffee table", "rustic", "reclaimed wood", "industrial"],
    sku: "FURN-011",
    weight: 25.4,
    dimensions: {
      length: 120,
      width: 60,
      height: 45
    }
  }
];

async function addMoreProducts() {
  try {
    console.log('🚀 Adding more products to the database...');

    // Insert products
    console.log('📦 Creating additional products...');
    const result = await prisma.product.createMany({
      data: moreProducts,
    });

    console.log(`✅ Successfully added ${result.count} new products`);

    // Show total count
    const totalCount = await prisma.product.count();
    console.log(`📊 Total products in database: ${totalCount}`);

    // Show some sample products
    const recentProducts = await prisma.product.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        name: true,
        priceInCents: true,
        sku: true,
        category: true
      }
    });
    
    console.log('📄 Recent products added:');
    recentProducts.forEach(product => {
      console.log(`  - ${product.name} (${product.category}) - ${formatPrice(product.priceInCents)} - ${product.sku}`);
    });

  } catch (error) {
    console.error('❌ Failed to add products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

// Run the script
addMoreProducts()
  .then(() => {
    console.log('🎉 Additional products added successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed to add products:', error);
    process.exit(1);
  });

export { addMoreProducts };
