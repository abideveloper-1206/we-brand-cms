import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env') })

async function run() {
  try {
    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    
    // Fix home-products-partnerships AR array images
    const doc = await db.collection('home-products-partnerships').findOne({})
    if (doc && doc.products && doc.products.en && doc.products.ar) {
      doc.products.ar.forEach((arItem: any, index: number) => {
        if (doc.products.en[index]) {
          arItem.image = doc.products.en[index].image
          arItem.taglineIcon = doc.products.en[index].taglineIcon
        }
      })
      doc.galleryCards.ar.forEach((arItem: any, index: number) => {
        if (doc.galleryCards.en[index]) {
          arItem.image = doc.galleryCards.en[index].image
        }
      })
      
      await db.collection('home-products-partnerships').updateOne(
        { _id: doc._id },
        { $set: { "products.ar": doc.products.ar, "galleryCards.ar": doc.galleryCards.ar } }
      )
      console.log('Fixed AR images in home-products-partnerships')
    }

    await client.close()
  } catch(e) {
    console.error(e)
  }
}
run()
