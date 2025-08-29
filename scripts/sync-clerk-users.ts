import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function syncClerkUsers() {
  console.log('🔄 Syncing Clerk users with database records...')

  // Check current users
  const users = await prisma.user.findMany()
  console.log('\nCurrent database users:')
  users.forEach(user => {
    console.log(`- ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`)
  })

  console.log('\n⚠️  To complete the sync, you need to:')
  console.log('1. Sign in with each demo account through the app')
  console.log('2. The app will automatically update the database records with real Clerk IDs')
  console.log('3. Run this script to verify the sync')

  // Look for any users with temporary IDs that need updating
  const tempUsers = users.filter(user => user.id.includes('temp') || user.id.includes('demo'))
  
  if (tempUsers.length > 0) {
    console.log('\n🔍 Found users with temporary IDs:')
    tempUsers.forEach(user => {
      console.log(`- ${user.email} (ID: ${user.id}) - Needs Clerk sync`)
    })
    
    console.log('\n💡 Steps to fix:')
    console.log('1. Go to your app and sign in with each email:')
    tempUsers.forEach(user => {
      console.log(`   - ${user.email}`)
    })
    console.log('2. After signing in, the database will update automatically')
    console.log('3. Admin access will work once the sync is complete')
  } else {
    console.log('\n✅ All users appear to have real Clerk IDs')
    
    // Check if andrey.litkovsky@gmail.com is properly set as admin
    const andreyUser = users.find(user => user.email === 'andrey.litkovsky@gmail.com')
    if (andreyUser) {
      if (andreyUser.role === 'ADMIN') {
        console.log(`✅ ${andreyUser.email} has admin access`)
      } else {
        console.log(`⚠️  ${andreyUser.email} role: ${andreyUser.role} - promoting to ADMIN...`)
        await prisma.user.update({
          where: { id: andreyUser.id },
          data: { role: 'ADMIN' }
        })
        console.log(`✅ ${andreyUser.email} promoted to ADMIN`)
      }
    }
  }

  await prisma.$disconnect()
}

// Alternative: Manually update a user to admin by their current Clerk ID
async function promoteUserToAdmin(clerkUserId: string, email: string) {
  console.log(`🛡️  Promoting user ${email} (ID: ${clerkUserId}) to admin...`)
  
  try {
    // First try to find by ID
    let user = await prisma.user.findUnique({
      where: { id: clerkUserId }
    })
    
    if (!user) {
      // If not found by ID, try by email
      user = await prisma.user.findUnique({
        where: { email: email }
      })
      
      if (user) {
        // Update the ID to match Clerk
        user = await prisma.user.update({
          where: { email: email },
          data: { 
            id: clerkUserId,
            role: 'ADMIN' 
          }
        })
      } else {
        // Create new user
        user = await prisma.user.create({
          data: {
            id: clerkUserId,
            email: email,
            role: 'ADMIN'
          }
        })
      }
    } else {
      // Update existing user to admin
      user = await prisma.user.update({
        where: { id: clerkUserId },
        data: { role: 'ADMIN' }
      })
    }
    
    console.log(`✅ ${email} is now an admin with ID: ${clerkUserId}`)
    return user
  } catch (error) {
    console.error(`❌ Error promoting ${email}:`, error)
  } finally {
    await prisma.$disconnect()
  }
}

// Check command line arguments
const args = process.argv.slice(2)
if (args.length === 2 && args[0] === '--promote') {
  const [_, email] = args
  console.log('To promote a user to admin after they sign in:')
  console.log(`node scripts/sync-clerk-users.js --promote-with-id <clerk_user_id> ${email}`)
} else if (args.length === 3 && args[0] === '--promote-with-id') {
  const [_, clerkUserId, email] = args
  promoteUserToAdmin(clerkUserId, email)
} else {
  syncClerkUsers()
}
