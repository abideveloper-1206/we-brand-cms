import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://devprosperoustech_db_user:hm7NWAtE0Fm4sHDF@prosperousdevelopment.tkztwlf.mongodb.net/barkat-payload-cms";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('barkat-payload-cms');

    const collections = [
      { name: 'members-heros', id: "6a2946463469090e7ee1aa15" },
      { name: 'members-why-joins', id: "6a2945ed3469090e7ee1a9df" },
      { name: 'members-daily-freshnesses', id: "6a294c8d3469090e7ee1ad1b" },
      { name: 'members-bring-freshnesses', id: "6a294e5a3469090e7ee1ae62" },
      { name: 'members-how-it-works', id: "6a2959573469090e7ee1b06e" },
      { name: 'members-sign-ups', id: "6a2a3e10014a3d3556e35907" }
    ];

    const now = new Date();

    for (const coll of collections) {
      await db.collection(coll.name).updateOne(
        { _id: new ObjectId(coll.id) },
        { $set: { updatedAt: now } }
      );
      console.log(`Updated timestamp for ${coll.name}`);
    }

  } finally {
    await client.close();
  }
}

main().catch(console.error);
