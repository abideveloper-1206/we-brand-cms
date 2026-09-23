import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://devprosperoustech_db_user:hm7NWAtE0Fm4sHDF@prosperousdevelopment.tkztwlf.mongodb.net/barkat-payload-cms";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('barkat-payload-cms');

    const colls = [
      'members-heros',
      'members-why-joins',
      'members-daily-freshnesses',
      'members-bring-freshnesses',
      'members-how-it-works',
      'members-sign-ups'
    ];

    for (const c of colls) {
      const docs = await db.collection(c).find({}).toArray();
      console.log(`=== Collection: ${c} ===`);
      console.log(JSON.stringify(docs, null, 2));
    }

  } finally {
    await client.close();
  }
}

main().catch(console.error);
