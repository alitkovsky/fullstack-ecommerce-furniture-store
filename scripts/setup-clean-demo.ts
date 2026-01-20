import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupCleanDemo() {
  console.log('🎯 Setting up clean demo environment...')

  console.log('🧹 Clearing products and orders first...')
  
  // Clear products and orders (this should work)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  console.log('✅ Products and orders cleared')

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

  // Get the existing demo users
  let demoCustomer = await prisma.user.findUnique({
    where: { email: 'customer@demo.com' }
  })

  let demoAdmin = await prisma.user.findUnique({
    where: { email: 'admin@demo.com' }
  })

  if (!demoCustomer) {
    console.log('❌ Demo customer not found! Expected customer@demo.com to exist.')
    process.exit(1)
  }

  if (!demoAdmin) {
    console.log('❌ Demo admin not found! Expected admin@demo.com to exist.')
    process.exit(1)
  }

  console.log(`✅ Found existing demo users: ${demoCustomer.email}, ${demoAdmin.email}`)

  // Update/create your personal admin accounts
  let andreyAdmin = await prisma.user.findUnique({
    where: { email: 'andrey.litkovsky@gmail.com' }
  })

  if (!andreyAdmin) {
    console.log('Creating admin account for andrey.litkovsky@gmail.com...')
    andreyAdmin = await prisma.user.create({
      data: {
        id: 'andrey-admin-temp', // Will be updated when user signs in with Clerk
        email: 'andrey.litkovsky@gmail.com', 
        role: 'ADMIN'
      }
    })
  } else {
    console.log('Updating andrey.litkovsky@gmail.com to admin...')
    andreyAdmin = await prisma.user.update({
      where: { id: andreyAdmin.id },
      data: { role: 'ADMIN' }
    })
  }

  let alitkAdmin = await prisma.user.findUnique({
    where: { email: 'alitkovsky@me.com' }
  })

  if (!alitkAdmin) {
    console.log('Creating admin account for alitkovsky@me.com...')
    alitkAdmin = await prisma.user.create({
      data: {
        id: 'alitk-admin-temp', // Will be updated when user signs in with Clerk
        email: 'alitkovsky@me.com',
        role: 'ADMIN'
      }
    })
  } else {
    console.log('Updating alitkovsky@me.com to admin...')
    alitkAdmin = await prisma.user.update({
      where: { id: alitkAdmin.id },
      data: { role: 'ADMIN' }
    })
  }

  console.log('✅ Admin accounts configured')

  // Remove all other users (keep only the 4 essential ones)
  console.log('🗑️  Removing non-essential users...')
  const essentialEmails = [
    'customer@demo.com',
    'admin@demo.com', 
    'andrey.litkovsky@gmail.com',
    'alitkovsky@me.com'
  ]

  const usersToDelete = await prisma.user.findMany({
    where: {
      email: {
        notIn: essentialEmails
      }
    }
  })

  console.log(`Found ${usersToDelete.length} non-essential users to remove`)

  for (const user of usersToDelete) {
    try {
      await prisma.user.delete({
        where: { id: user.id }
      })
      console.log(`   ✅ Removed ${user.email}`)
    } catch (error) {
      console.log(`   ⚠️ Could not remove ${user.email}:`, error)
    }
  }

  console.log('🛍️ Creating sample orders for customer@demo.com...')

  // Create several orders for the demo customer
  const orders: { totalPrice: number }[] = await Promise.all([
    // Order 1: Sofa + Coffee Table = $1099.98
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
    // Order 2: Dining Table + Office Chair = $859.98
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
    // Order 3: Bookshelf = $349.99
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

  // Summary
  const totalUsers = await prisma.user.count()
  const totalOrders = await prisma.order.count()
  const totalProducts = await prisma.product.count()
  const totalOrderItems = await prisma.orderItem.count()
  
  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0)

  console.log('\n🎉 Clean demo setup complete!')
  console.log(`📊 Database summary:`)
  console.log(`   • Users: ${totalUsers} (essential accounts only)`)
  console.log(`   • Products: ${totalProducts}`)
  console.log(`   • Orders: ${totalOrders}`)
  console.log(`   • Order Items: ${totalOrderItems}`)
  console.log(`   • Total Sales: $${(totalSales / 100).toFixed(2)}`)
  console.log('\n🔑 Demo accounts ready for login:')
  console.log('   • Admin: admin@demo.com')
  console.log('   • Customer: customer@demo.com (has purchase history)')
  console.log('   • Admin: andrey.litkovsky@gmail.com')
  console.log('   • Admin: alitkovsky@me.com')
  console.log('\n💡 Next steps:')
  console.log('   1. Login with these accounts using the passwords set in Clerk')
  console.log('   2. User IDs will update automatically when they sign in')
  console.log('   3. Customer account will show order history')
}

setupCleanDemo()
  .catch((e) => {
    console.error('❌ Error setting up clean demo:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
