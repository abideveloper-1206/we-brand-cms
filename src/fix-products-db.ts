import { MongoClient, ObjectId } from 'mongodb'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env') })

async function run() {
  try {
    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    
    const products = await db.collection('products').find({}).toArray()
    let count = 0

    for (const doc of products) {
      if (doc.gallery && Array.isArray(doc.gallery) && doc.gallery.length > 0) {
        // Check if gallery is an array of primitives (strings or ObjectIds)
        if (typeof doc.gallery[0] !== 'object' || doc.gallery[0] instanceof ObjectId) {
          const newGallery = doc.gallery.map((id: any) => ({
            id: new ObjectId().toString(),
            image: id // Assuming it's already an ObjectId or string
          }))
          
          await db.collection('products').updateOne(
            { _id: doc._id },
            { $set: { gallery: newGallery } }
          )
          count++
          console.log(`Updated product: ${doc.title || doc._id}`)
        }
      }
    }
    console.log(`Fixed ${count} products in MongoDB`)
    await client.close()
  } catch(e) {
    console.error(e)
  }
}
run()
