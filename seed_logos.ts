import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Setup env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })

process.env.PAYLOAD_SECRET = '1e4eb31556114b99e7d67310';
process.env.DATABASE_URL = 'mongodb+srv://devprosperoustech_db_user:hm7NWAtE0Fm4sHDF@prosperousdevelopment.tkztwlf.mongodb.net/barkat-payload-cms';

async function uploadLogos() {
  const { getPayload } = await import('payload');
  const config = (await import('./src/payload.config')).default;
  const payload = await getPayload({ config })
  
  const logoPaths = [
    'c:/Workspace/BARKAT_WEB/barkat-website/src/assets/online-logo-1.png',
    'c:/Workspace/BARKAT_WEB/barkat-website/src/assets/online-logo-2.png',
    'c:/Workspace/BARKAT_WEB/barkat-website/src/assets/online-logo-3.png',
    'c:/Workspace/BARKAT_WEB/barkat-website/src/assets/online-logo-4.png',
    'c:/Workspace/BARKAT_WEB/barkat-website/src/assets/online-logo-5.png',
    'c:/Workspace/BARKAT_WEB/barkat-website/src/assets/online-logo-6.png',
    'c:/Workspace/BARKAT_WEB/barkat-website/src/assets/online-logo-7.png',
  ]
  
  const mediaIds = [];
  
  console.log('Uploading 7 logos to media collection...');
  for (let i = 0; i < logoPaths.length; i++) {
    const filePath = logoPaths[i];
    const fileName = `online-logo-${i+1}.png`;
    const fileData = fs.readFileSync(filePath);
    
    // Check if it already exists
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: fileName } }
    });
    
    let mediaId;
    if (existing.totalDocs > 0) {
      mediaId = existing.docs[0].id;
      console.log(`Logo ${fileName} already exists. ID: ${mediaId}`);
    } else {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `Online Store Logo ${i+1}` },
        file: {
          data: fileData,
          mimetype: 'image/png',
          name: fileName,
          size: fileData.length
        }
      });
      mediaId = media.id;
      console.log(`Uploaded logo ${fileName}. ID: ${mediaId}`);
    }
    mediaIds.push(mediaId);
  }
  
  console.log('Updating all products to include these online stores...');
  const products = await payload.find({
    collection: 'products',
    limit: 1000
  });
  
  for (const product of products.docs) {
    const onlineStores = mediaIds.map(id => ({
      logo: id,
      link: '#'
    }));
    
    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        whereToBuy: {
          onlineStores: onlineStores
        }
      }
    });
    console.log(`Updated product: ${product.title}`);
  }
  
  console.log('Done!');
  process.exit(0);
}

uploadLogos().catch(err => {
  console.error(err)
  process.exit(1)
})
