import { config } from 'dotenv'
import path from 'path'
config({ path: path.resolve(process.cwd(), '.env') })
import { getPayload } from 'payload'
import configPromise from './payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const collections = [
    'home-hero-section',
    'home-story-favorites',
    'home-products-partnerships',
    'faq-hero-product',
    'faq-health-nutrition',
    'faq-need-more-help',
    'contact-content'
  ]

  const data: Record<string, any> = {}

  for (const slug of collections) {
    try {
      const result = await payload.find({
        collection: slug as any,
        locale: 'en',
      })
      data[slug] = result.docs[0] || null
    } catch (e) {
      console.error(`Error fetching ${slug}:`, e)
    }
  }

  const fs = require('fs')
  fs.writeFileSync('en-data.json', JSON.stringify(data, null, 2))
  console.log('Data saved to en-data.json')
  process.exit(0)
}

run()
