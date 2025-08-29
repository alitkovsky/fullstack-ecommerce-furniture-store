import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAdminAccess() {
  console.log('🔍 Testing admin access...')

  // Check andrey's current status
  const andreyUser = await prisma.user.findUnique({
    where: { email: 'andrey.litkovsky@gmail.com' }
  })

  if (!andreyUser) {
    console.log('❌ Andrey user not found in database')
    return
  }

  console.log(`👤 Andrey's database record:`)
  console.log(`   - ID: ${andreyUser.id}`)
  console.log(`   - Email: ${andreyUser.email}`)
  console.log(`   - Role: ${andreyUser.role}`)
  console.log(`   - Created: ${andreyUser.createdAt}`)

  if (andreyUser.role === 'ADMIN') {
    console.log('✅ Andrey has ADMIN role in database')
  } else {
    console.log('❌ Andrey does NOT have ADMIN role')
    
    console.log('🛠️  Promoting Andrey to admin...')
    await prisma.user.update({
      where: { id: andreyUser.id },
      data: { role: 'ADMIN' }
    })
    console.log('✅ Andrey promoted to ADMIN')
  }

  // Test the middleware logic manually
  console.log('\n🧪 Testing middleware logic...')
  
  const user = await prisma.user.findUnique({
    where: { id: andreyUser.id },
    select: { role: true },
  })

  if (!user) {
    console.log('❌ User not found (middleware would redirect)')
  } else if (user.role !== 'ADMIN') {
    console.log('❌ User is not admin (middleware would redirect)')
  } else {
    console.log('✅ User passes middleware check - should have admin access')
  }

  await prisma.$disconnect()
}

testAdminAccess().catch(console.error)
