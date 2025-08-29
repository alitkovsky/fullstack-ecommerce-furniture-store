import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetDemoData() {
  console.log('🧹 Completely clearing all database collections...')
  
  // Clear everything in correct order to respect foreign key constraints
  try {
    await prisma.collectionOnProduct.deleteMany()
    await prisma.collection.deleteMany()
    await prisma.cartItem.deleteMany() 
    await prisma.cart.deleteMany()
    await prisma.wishlistItem.deleteMany()
    await prisma.wishlist.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.user.deleteMany()
    console.log('✅ All data cleared')
  } catch (error) {
    console.log('⚠️  Some data might not have been deleted:', error)
  }

  console.log('🌱 Creating fresh products...')
  
  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Modern Sofa',
        priceInCents: 89999,
        description: 'Comfortable 3-seater sofa with premium fabric upholstery',
        imagePath: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        isAvailableForPurchase: true,
        sku: 'SOFA-001',
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'],
        inventory: 10,
        tag: ['furniture', 'sofa', 'living room'],
        category: 'Living Room',
        collectionIDs: ['furniture']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Dining Table',
        priceInCents: 59999,
        description: 'Solid wood dining table for 6 people',
        imagePath: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop',
        isAvailableForPurchase: true,
        sku: 'TABLE-001',
        images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop'],
        inventory: 5,
        tag: ['furniture', 'dining', 'table'],
        category: 'Dining Room',
        collectionIDs: ['furniture']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Office Chair',
        priceInCents: 25999,
        description: 'Ergonomic office chair with lumbar support',
        imagePath: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop',
        isAvailableForPurchase: true,
        sku: 'CHAIR-001',
        images: ['https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop'],
        inventory: 15,
        tag: ['furniture', 'chair', 'office'],
        category: 'Office',
        collectionIDs: ['furniture']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Bookshelf',
        priceInCents: 34999,
        description: '5-tier wooden bookshelf with modern design',
        imagePath: 'https://images.unsplash.com/photo-1594736797933-d0bc0c7137b7?w=500&h=400&fit=crop',
        isAvailableForPurchase: true,
        sku: 'SHELF-001',
        images: ['https://images.unsplash.com/photo-1594736797933-d0bc0c7137b7?w=500&h=400&fit=crop'],
        inventory: 8,
        tag: ['furniture', 'storage', 'bookshelf'],
        category: 'Storage',
        collectionIDs: ['furniture']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Coffee Table',
        priceInCents: 19999,
        description: 'Glass-top coffee table with metal legs',
        imagePath: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
        isAvailableForPurchase: true,
        sku: 'CTABLE-001',
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'],
        inventory: 12,
        tag: ['furniture', 'table', 'living room'],
        category: 'Living Room',
        collectionIDs: ['furniture']
      }
    })
  ])

  console.log(`✅ Created ${products.length} products`)

  console.log('👤 Creating demo users...')

  // Create essential demo users
  const demoCustomer = await prisma.user.create({
    data: {
      id: 'demo-customer-temp', // Will be updated when user signs in with Clerk
      email: 'customer@demo.com',
      role: 'CUSTOMER'
    }
  })

  const demoAdmin = await prisma.user.create({
    data: {
      id: 'demo-admin-temp', // Will be updated when user signs in with Clerk
      email: 'admin@demo.com',
      role: 'ADMIN'
    }
  })

  // Create admin accounts for personal emails
  const andreyAdmin = await prisma.user.create({
    data: {
      id: 'andrey-admin-temp', // Will be updated when user signs in with Clerk
      email: 'andrey.litkovsky@gmail.com', 
      role: 'ADMIN'
    }
  })

  const alitkAdmin = await prisma.user.create({
    data: {
      id: 'alitk-admin-temp', // Will be updated when user signs in with Clerk
      email: 'alitkovsky@me.com',
      role: 'ADMIN'
    }
  })

  console.log('✅ Created demo users')

  console.log('🛍️ Creating sample orders for customer@demo.com...')

  // Create several orders for the demo customer with purchase history
  const orders = await Promise.all([
    // Order 1: Sofa + Coffee Table
    prisma.order.create({
      data: {
        userId: demoCustomer.id,
        totalPrice: products[0].priceInCents + products[4].priceInCents, // 89999 + 19999 = 109998
        createdAt: new Date('2024-01-15'),
        items: {
          create: [
            {
              productId: products[0].id,
              quantity: 1,
              price: products[0].priceInCents
            },
            {
              productId: products[4].id,
              quantity: 1, 
              price: products[4].priceInCents
            }
          ]
        }
      }
    }),
    // Order 2: Dining Table + Office Chair
    prisma.order.create({
      data: {
        userId: demoCustomer.id,
        totalPrice: products[1].priceInCents + products[2].priceInCents, // 59999 + 25999 = 85998
        createdAt: new Date('2024-02-20'),
        items: {
          create: [
            {
              productId: products[1].id,
              quantity: 1,
              price: products[1].priceInCents
            },
            {
              productId: products[2].id,
              quantity: 1,
              price: products[2].priceInCents
            }
          ]
        }
      }
    }),
    // Order 3: Just Bookshelf
    prisma.order.create({
      data: {
        userId: demoCustomer.id,
        totalPrice: products[3].priceInCents, // 34999
        createdAt: new Date('2024-03-10'),
        items: {
          create: [
            {
              productId: products[3].id,
              quantity: 1,
              price: products[3].priceInCents
            }
          ]
        }
      }
    })
  ])

  console.log(`✅ Created ${orders.length} sample orders`)

  const totalUsers = await prisma.user.count()
  const totalOrders = await prisma.order.count()
  const totalProducts = await prisma.product.count()
  const totalOrderItems = await prisma.orderItem.count()
  
  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0)

  console.log('\n🎉 Demo data reset complete!')
  console.log(`📊 Database summary:`)
  console.log(`   • Users: ${totalUsers}`)
  console.log(`   • Products: ${totalProducts}`)
  console.log(`   • Orders: ${totalOrders}`)
  console.log(`   • Order Items: ${totalOrderItems}`)
  console.log(`   • Total Sales: $${(totalSales / 100).toFixed(2)}`)
  console.log('\n🔑 Demo accounts:')
  console.log('   • Admin: admin@demo.com (password set in Clerk)')
  console.log('   • Customer: customer@demo.com (password set in Clerk)')
  console.log('   • Admin: andrey.litkovsky@gmail.com')
  console.log('   • Admin: alitkovsky@me.com')
  console.log('\n💡 Users will be updated with real Clerk IDs when they first sign in')
  console.log('💡 All orders belong to customer@demo.com for demo purposes')
}

resetDemoData()
  .catch((e) => {
    console.error('❌ Error resetting demo data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
