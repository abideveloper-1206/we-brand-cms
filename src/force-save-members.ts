import { getPayload } from 'payload';
import configPromise from './payload.config';
import dotenv from 'dotenv';
dotenv.config();
process.env.PAYLOAD_SECRET = '1e4eb31556114b99e7d67310';

let payload: any;
const updateDoc = async (collection: any, id: any) => {
  try {
    const doc = await payload.findByID({
      collection,
      id,
      locale: 'all',
    });
    
    // Just save it again to trigger hooks and updatedAt
    await payload.update({
      collection,
      id,
      data: doc,
      locale: 'all',
    });
    console.log(`Successfully re-saved ${collection} ${id}`);
  } catch (error) {
    console.error(`Error with ${collection} ${id}:`, (error as any).message);
  }
};

const run = async () => {
  payload = await getPayload({
    config: configPromise,
  });

  const docsToUpdate = [
    { collection: 'members-hero', id: '6a2946463469090e7ee1aa15' },
    { collection: 'members-why-join', id: '6a2945ed3469090e7ee1a9df' },
    { collection: 'members-daily-freshness', id: '6a294c8d3469090e7ee1ad1b' },
    { collection: 'members-bring-freshness', id: '6a294e5a3469090e7ee1ae62' },
    { collection: 'members-how-it-works', id: '6a2959573469090e7ee1b06e' },
    { collection: 'members-sign-up', id: '6a2a3e10014a3d3556e35907' },
  ];

  for (const doc of docsToUpdate) {
    await updateDoc(doc.collection, doc.id);
  }
  
  process.exit(0);
};

run();
