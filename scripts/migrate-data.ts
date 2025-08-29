/**
 * Data Migration Script
 * 
 * This script migrates static product data to the MongoDB database
 * Run with: npx ts-node scripts/migrate-data.ts
 * 
 * Part of the e-commerce modernization project
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Static products data (from the existing system)
const staticProducts = [
  {
    id: 1,
    title: "Syltherine",
    about: "Stylish cafe chair",
    oldprice: 3500,
    price: 2500,
    discount: 30,
    image: "/assets/img/products/product1.png",
    isnew: false
  },
  {
    id: 2,
    title: "Grifo",
    about: "Night lamp",
    price: 1500,
    image: "/assets/img/products/product2.png",
    isnew: false
  },
  {
    id: 3,
    title: "Muggo",
    about: "Small mug",
    price: 2000,
    image: "/assets/img/products/product3.png",
    isnew: true
  }
];

async function migrateData() {
  try {
    console.log('🚀 Starting data migration...');

    // Convert static products to database format
    const productsData = staticProducts.map((product, index) => ({
      name: product.title,
      description: product.about,
      priceInCents: product.price * 100, // Convert to cents
      oldPriceInCents: product.oldprice ? product.oldprice * 100 : null,
      discountPercentage: product.discount || null,
      images: [product.image], // Use existing image paths for now
      imagePath: product.image, // For admin compatibility
      isNew: product.isnew,
      isAvailableForPurchase: true,
      inventory: 10, // Default inventory
      sku: `FURN-${product.id.toString().padStart(3, '0')}`,
      category: "Furniture",
      collectionIDs: ["General"],
      tag: ["furniture", "modern"],
    }));

    // Clear existing products (optional - remove this in production)
    console.log('🗑️  Clearing existing products...');
    await prisma.product.deleteMany({});

    // Insert products
    console.log('📦 Creating products...');
    const result = await prisma.product.createMany({
      data: productsData,
    });

    console.log(`✅ Successfully migrated ${result.count} products`);

    // Verify the data
    const productCount = await prisma.product.count();
    console.log(`📊 Total products in database: ${productCount}`);

    // Show a sample product
    const sampleProduct = await prisma.product.findFirst();
    if (sampleProduct) {
      console.log('📄 Sample product:', {
        name: sampleProduct.name,
        price: `$${sampleProduct.priceInCents / 100}`,
        sku: sampleProduct.sku,
      });
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateData()
  .then(() => {
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });

export { migrateData };
