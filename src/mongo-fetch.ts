import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
import path from 'path'
import fs from 'fs'

config({ path: path.resolve(process.cwd(), '.env') })

async function run() {
  const uri = process.env.DATABASE_URL
  if (!uri) throw new Error('No DATABASE_URL')
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db()
  
  const collections = [
    'home-hero-section',
    'home-story-favorites',
    'home-products-partnerships',
    'faq-hero-product',
    'faq-health-nutrition',
    'faq-need-more-help',
    'contact-content'
  ]
  
  const data: any = {}
  
  for (const collName of collections) {
    try {
      const docs = await db.collection(collName).find({}).toArray()
      data[collName] = docs[0]
    } catch(e) {
      console.error('Error fetching', collName, e)
    }
  }
  
  fs.writeFileSync('mongo-data.json', JSON.stringify(data, null, 2))
  console.log('Saved to mongo-data.json')
  await client.close()
}

run().catch(console.error)
