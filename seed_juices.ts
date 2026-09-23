// import * as dotenv from 'dotenv'
// import path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// dotenv.config({ path: path.resolve(__dirname, '.env') })

// import { getPayload } from 'payload'
// import config from './src/payload.config'
// import fs from 'fs'

// async function seed() {
//   const payload = await getPayload({ config })
  
//   // Find or create categories
//   const categories = await payload.find({ collection: 'categories' })
  
//   let juiceCategory = categories.docs.find(c => c.name.toLowerCase() === 'juices')
//   if (!juiceCategory) {
//     juiceCategory = await payload.create({
//       collection: 'categories',
//       data: { name: 'Juices' },
//     })
//     console.log("Created category: Juices")
//   }
  
//   let smoothiesCategory = categories.docs.find(c => c.name.toLowerCase() === 'smoothies' || c.name.toLowerCase() === 'smoothie')
//   if (!smoothiesCategory) {
//     smoothiesCategory = await payload.create({
//       collection: 'categories',
//       data: { name: 'Smoothies' },
//     })
//     console.log("Created category: Smoothies")
//   }

//   const publicDir = 'c:/Workspace/BARKAT_WEB/barkat-website/public/juices_smoothies_images'
//   const folders = fs.readdirSync(publicDir).filter(f => fs.statSync(path.join(publicDir, f)).isDirectory())

//   for (const folder of folders) {
//     if (folder === 'icons' || folder === 'images') continue;
    
//     let isSmoothie = folder.toLowerCase().includes('smoothie')
//     let categoryId = isSmoothie ? smoothiesCategory.id : juiceCategory.id;
    
//     let title = folder.split('-').join(' ')
    
//     // Upload Images to Media collection
//     const files = fs.readdirSync(path.join(publicDir, folder))
//     let frontImage = files.find(f => f.toLowerCase().includes('front'))
//     let backImage = files.find(f => f.toLowerCase().includes('back'))
    
//     if (!frontImage && files.length > 0) frontImage = files[0]
//     if (!backImage && files.length > 1) backImage = files[1]
//     if (!backImage && files.length > 0) backImage = files[0]

//     let frontMediaId = null;
//     let backMediaId = null;

//     if (frontImage) {
//         const filePath = path.join(publicDir, folder, frontImage);
//         const fileData = fs.readFileSync(filePath);
//         const media = await payload.create({
//             collection: 'media',
//             data: { alt: title + ' Front' },
//             file: {
//                 data: fileData,
//                 mimetype: frontImage.endsWith('png') ? 'image/png' : 'image/jpeg',
//                 name: frontImage,
//                 size: fileData.length
//             }
//         });
//         frontMediaId = media.id;
//         console.log("Uploaded front image for", title);
//     }

//     if (backImage) {
//         const filePath = path.join(publicDir, folder, backImage);
//         const fileData = fs.readFileSync(filePath);
//         const media = await payload.create({
//             collection: 'media',
//             data: { alt: title + ' Back' },
//             file: {
//                 data: fileData,
//                 mimetype: backImage.endsWith('png') ? 'image/png' : 'image/jpeg',
//                 name: backImage,
//                 size: fileData.length
//             }
//         });
//         backMediaId = media.id;
//         console.log("Uploaded back image for", title);
//     }

//     const hoverColor = isSmoothie ? '#F4B0C7' : '#FFA500';
//     const hoverGradient = isSmoothie ? 'linear-gradient(180deg, #F4B0C7 0%, rgba(255, 255, 255, 1) 90%)' : 'linear-gradient(180deg, #FFA500 0%, rgba(255, 255, 255, 1) 90%)';

//     // Create Product
//     await payload.create({
//       collection: 'products',
//       data: {
//         title: title,
//         category: categoryId,
//         description: 'Freshly prepared, sourced from the best farms. Carefully washed, packed, and delivered to preserve maximum freshness and nutrients.',
//         sizes: [
//           { size: '250ml' },
//           { size: '500ml' },
//           { size: '1L' }
//         ],
//         bgColor: hoverColor,
//         gradientBg: hoverGradient,
//         image: frontMediaId,
//         gallery: backMediaId ? [backMediaId, backMediaId, backMediaId] : [],
//       }
//     });
//     console.log("Created product:", title);
//   }
  
//   console.log("Finished seeding!");
//   process.exit(0);
// }

// seed().catch(err => {
//   console.error(err)
//   process.exit(1)
// })
