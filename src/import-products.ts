import { getPayload } from 'payload';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import configPromise from './payload.config';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const productsData = [
  { file: 'Fruit Cubes.jpeg', category: 'Cut Fruits' },
  { file: 'Grape Mix.jpeg', category: 'Cut Fruits' },
  { file: 'Honeydew Melon Cubed.jpeg', category: 'Cut Fruits' },
  { file: 'Kiwi Wedges.psd', category: 'Cut Fruits' },
  { file: 'Mango Cubes Fresh.jpeg', category: 'Cut Fruits' },
  { file: 'Apple Mix Cuts.jpeg', category: 'Cut Fruits' },
  { file: 'Berry Mix.jpeg', category: 'Cut Fruits' },
  { file: 'Cherry tomato.jpeg', category: 'Cut Fruits' },
  { file: 'CUCUMBER DICED.jpg', category: 'Cut Fruits' },
  { file: 'Cucumber.png', category: 'Cut Fruits' },
  { file: 'eggplant.png', category: 'Cut Vegetables' },
  { file: 'GREEN BEANS HALF CUT.jpg', category: 'Cut Vegetables' },
  { file: 'Mixed Capsicum Cubes.jpeg', category: 'Cut Vegetables' },
  { file: 'Baby Kale.png', category: 'Cut Vegetables' },
  { file: 'Baby Marrow.png', category: 'Cut Vegetables' },
  { file: 'Beetroot cubes.png', category: 'Cut Vegetables' },
  { file: 'Beetroot FinecutSliced.jpeg', category: 'Cut Vegetables' },
  { file: 'beetroot peeled.png', category: 'Cut Vegetables' },
  { file: 'Broccoli Florest.jpg', category: 'Cut Vegetables' },
  { file: 'Butternut pumpkin.png', category: 'Cut Vegetables' },
  { file: 'Cabbeage Mix.jpg', category: 'Cut Vegetables' },
  { file: 'Capsicum Green Chopped.png', category: 'Cut Vegetables' },
  { file: 'capsicum Mixed.png', category: 'Cut Vegetables' },
  { file: 'CARROT CUBES.jpg', category: 'Cut Vegetables' },
  { file: 'Carrot Peeled Fresh.png', category: 'Cut Vegetables' },
  { file: 'Carrot sliced.png', category: 'Cut Vegetables' },
  { file: 'CARROT STRIPPED.jpg', category: 'Cut Vegetables' },
  { file: 'CAULIFLOWER FLORETS.jpg', category: 'Cut Vegetables' },
  { file: 'COLESLAW MIX.jpg', category: 'Cut Vegetables' },
  { file: 'corriander.jpeg', category: 'Cut Vegetables' },
];

const IMAGES_DIR = path.resolve('C:\\Workspace\\BARKAT_WEB\\barkat-website\\src\\assets\\newimages');

const run = async () => {
  const config = await configPromise;
  const payload = await getPayload({ config });

  try {
    // 1. Ensure Categories exist
    const categoriesToCreate = ['Cut Fruits', 'Cut Vegetables'];
    const categoryMap: Record<string, string> = {};

    for (const catName of categoriesToCreate) {
      let existingCat = await payload.find({
        collection: 'categories',
        where: { name: { equals: catName } },
      });
      
      if (existingCat.docs.length > 0) {
        categoryMap[catName] = existingCat.docs[0].id;
      } else {
        const newCat = await payload.create({
          collection: 'categories',
          data: {
            name: catName,
            slug: catName.toLowerCase().replace(/\s+/g, '-'),
          },
        });
        categoryMap[catName] = newCat.id;
        console.log(`Created category: ${catName}`);
      }
    }

    // 2. Upload Media and Create Products
    for (const item of productsData) {
      const filePath = path.join(IMAGES_DIR, item.file);
      
      // Clean title from filename
      let title = item.file.replace(/\.(jpeg|jpg|png|psd)$/i, '');
      // Format Title properly (capitalize words)
      title = title.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replace(/[-_]/g, ' ');

      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        continue;
      }

      console.log(`Processing: ${title}...`);

      const fileBuffer = fs.readFileSync(filePath);
      const fileStat = fs.statSync(filePath);
      
      let mimeType = 'image/jpeg';
      if (filePath.toLowerCase().endsWith('.png')) mimeType = 'image/png';
      if (filePath.toLowerCase().endsWith('.psd')) mimeType = 'application/x-photoshop';

      let mediaId;
      try {
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: title,
          },
          file: {
            data: fileBuffer,
            name: item.file,
            mimetype: mimeType,
            size: fileStat.size,
          },
        });
        mediaId = media.id;
        console.log(`Uploaded media: ${item.file}`);
      } catch (err: any) {
        console.error(`Error uploading media for ${item.file}:`, err.message);
        // Fallback: Check if media already exists with same filename
        const existingMedia = await payload.find({
          collection: 'media',
          where: { filename: { equals: item.file } },
        });
        if (existingMedia.docs.length > 0) {
          mediaId = existingMedia.docs[0].id;
          console.log(`Using existing media for ${item.file}`);
        } else {
          continue; // Skip product creation if no media
        }
      }

      // Create Product
      try {
        await payload.create({
          collection: 'products',
          data: {
            title: title,
            category: categoryMap[item.category],
            bgColor: '#F5F0EB',
            image: mediaId,
          },
        });
        console.log(`Created product: ${title}`);
      } catch (err: any) {
        console.error(`Error creating product ${title}:`, err.message);
      }
    }

    console.log('Finished importing 30 products.');
  } catch (err) {
    console.error('Fatal Error:', err);
  }

  process.exit(0);
};

run();
