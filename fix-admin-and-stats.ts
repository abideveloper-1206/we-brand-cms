import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  const payload = await getPayload({ config })

  console.log('Finding admin@demo.com...')
  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@demo.com' } },
  })

  if (users.docs.length > 0) {
    const user = users.docs[0]
    console.log('Found user. Resetting password to "password123"...')
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: 'password123',
      },
    })
    console.log('Password reset successfully to "password123".')
  } else {
    console.log('User not found. Creating admin@demo.com...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@demo.com',
        password: 'password123',
        name: 'Admin User',
        roles: ['admin'],
      },
    })
    console.log('User created with password "password123".')
  }

  console.log('Updating Home Stats...')
  try {
    const home = await payload.findGlobal({ slug: 'home' })
    if (home) {
      await payload.updateGlobal({
        slug: 'home',
        data: {
          stats: {
            ...home.stats,
            items: [
              {
                number: 10,
                suffix: '+',
                label: home.stats?.items?.[0]?.label || 'Years Experience',
              },
              {
                number: 8,
                suffix: '+',
                label: home.stats?.items?.[1]?.label || 'Offices',
              },
              {
                number: 30,
                suffix: '+',
                label: home.stats?.items?.[2]?.label || 'Professionals',
              },
            ],
          },
        },
      })
      console.log('Home stats updated successfully!')
    }
  } catch (error) {
    console.log('Error updating home:', error.message)
  }

  process.exit(0)
}

run()
