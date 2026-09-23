import dotenv from 'dotenv'
dotenv.config()

import { getPayload } from 'payload'

async function run() {
  try {
    const config = (await import('./src/payload.config.ts')).default
    const payload = await getPayload({ config })
    const users = await payload.find({
      collection: 'users',
    })
    console.log("Users in DB:", users.docs.map(u => ({ id: u.id, email: u.email })))
    
    // Find if admin@barkat.com exists, or find any user and update password
    const adminUser = users.docs.find(u => u.email === 'admin@barkat.com')
    if (adminUser) {
      await payload.update({
        collection: 'users',
        id: adminUser.id,
        data: {
          password: 'admin',
        },
      })
      console.log("Updated password for admin@barkat.com to 'admin'")
    } else if (users.docs.length > 0) {
      await payload.update({
        collection: 'users',
        id: users.docs[0].id,
        data: {
          password: 'admin',
        },
      })
      console.log(`Updated password for ${users.docs[0].email} to 'admin'`)
    } else {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@barkat.com',
          password: 'admin',
        },
      })
      console.log("Created admin@barkat.com with password 'admin'")
    }
    process.exit(0)
  } catch (err) {
    console.error("Error resetting admin:", err)
    process.exit(1)
  }
}
run()
