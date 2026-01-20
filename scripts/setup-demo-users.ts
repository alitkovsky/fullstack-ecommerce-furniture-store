import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupDemoUsers() {
  console.log('🧹 Clearing existing data...')
  
  // Delete in correct order to respect foreign key constraints
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Existing data cleared')

  console.log('🌱 Creating products...')
  
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
        imagePath: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop',
        isAvailableForPurchase: true,
        sku: 'SHELF-001',
        images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop'],
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

  console.log('👤 Managing demo users...')

  // Get existing demo users
  let demoCustomer = await prisma.user.findUnique({
    where: { email: 'customer@demo.com' }
  })
  
  let demoAdmin = await prisma.user.findUnique({
    where: { email: 'admin@demo.com' }
  })

  if (!demoCustomer) {
    demoCustomer = await prisma.user.create({
      data: {
        id: 'temp-customer',
        email: 'customer@demo.com',
        role: 'CUSTOMER'
      }
    })
  }
  
  if (!demoAdmin) {
    demoAdmin = await prisma.user.create({
      data: {
        id: 'temp-admin',
        email: 'admin@demo.com',
        role: 'ADMIN'
      }
    })
  }

  // Create/update admin accounts for your personal emails
  let andreyAdmin = await prisma.user.findUnique({
    where: { email: 'andrey.litkovsky@gmail.com' }
  })
  
  if (!andreyAdmin) {
    andreyAdmin = await prisma.user.create({
      data: {
        id: 'temp-andrey',
        email: 'andrey.litkovsky@gmail.com', 
        role: 'ADMIN'
      }
    })
  } else {
    // Update role to admin if not already
    andreyAdmin = await prisma.user.update({
      where: { id: andreyAdmin.id },
      data: { role: 'ADMIN' }
    })
  }

  let alitkAdmin = await prisma.user.findUnique({
    where: { email: 'alitkovsky@me.com' }
  })
  
  if (!alitkAdmin) {
    alitkAdmin = await prisma.user.create({
      data: {
        id: 'temp-alitk',
        email: 'alitkovsky@me.com',
        role: 'ADMIN'
      }
    })
  } else {
    // Update role to admin if not already
    alitkAdmin = await prisma.user.update({
      where: { id: alitkAdmin.id },
      data: { role: 'ADMIN' }
    })
  }

  console.log('✅ Demo users ready')

  console.log('🛍️ Creating sample orders for customer@demo.com...')

  // Create several orders with different statuses for the demo customer
  const orders = await Promise.all([
    // Order 1
    prisma.order.create({
      data: {
        userId: demoCustomer.id,
        totalPrice: products[0].priceInCents + products[4].priceInCents, // Sofa + Coffee Table
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
    // Order 2
    prisma.order.create({
      data: {
        userId: demoCustomer.id,
        totalPrice: products[1].priceInCents + products[2].priceInCents, // Dining Table + Office Chair
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
    // Order 3
    prisma.order.create({
      data: {
        userId: demoCustomer.id,
        totalPrice: products[3].priceInCents, // Bookshelf
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

  console.log('\n🎉 Demo setup complete!')
  console.log(`📊 Database summary:`)
  console.log(`   • Users: ${totalUsers}`)
  console.log(`   • Products: ${totalProducts}`)
  console.log(`   • Orders: ${totalOrders}`)
  console.log('\n🔑 Demo accounts:')
  console.log('   • Admin: admin@demo.com')
  console.log('   • Customer: customer@demo.com')
  console.log('   • Admin: andrey.litkovsky@gmail.com')
  console.log('   • Admin: alitkovsky@me.com')
  console.log('\n💡 Note: User IDs will be updated with real Clerk IDs when users sign in')
}

setupDemoUsers()
  .catch((e) => {
    console.error('❌ Error setting up demo users:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
