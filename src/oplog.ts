import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env') })

async function run() {
  try {
    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db('local')
    const oplog = db.collection('oplog.rs')
    const entries = await oplog.find({ ns: 'barkat-payload-cms.home-hero-sections' }).sort({ $natural: -1 }).limit(100).toArray()
    console.log('Hero:', JSON.stringify(entries, null, 2))
    
    const contactEntries = await oplog.find({ ns: 'barkat-payload-cms.contact-contents' }).sort({ $natural: -1 }).limit(100).toArray()
    console.log('Contact:', JSON.stringify(contactEntries, null, 2))
    
    const allOpLogs = await oplog.find({ ns: { $regex: '^barkat-payload-cms' } }).sort({ $natural: -1 }).limit(100).toArray()
    console.log('Recent Oplogs:', allOpLogs.map(o => o.ns))

    await client.close()
  } catch(e) {
    console.error(e)
  }
}
run()
