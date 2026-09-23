import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'

const run = async () => {
  const payload = await getPayload({ config })
  const sourceDir = "C:\\Users\\AbinaM\\Downloads\\WBM Video Samples"
  
  // First, find or upload a thumbnail image
  let thumbnailId;
  const thumbnailPath = path.join(sourceDir, 'Instagram Grid.jpeg')
  if (fs.existsSync(thumbnailPath)) {
    console.log("Uploading thumbnail...")
    const thumbFile = fs.readFileSync(thumbnailPath)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Thumbnail placeholder'
      },
      file: {
        data: thumbFile,
        mimetype: 'image/jpeg',
        name: 'Instagram Grid.jpeg',
        size: fs.statSync(thumbnailPath).size
      }
    })
    thumbnailId = media.id
    console.log("Thumbnail uploaded, ID:", thumbnailId)
  }

  const files = fs.readdirSync(sourceDir)
  const videoFiles = files.filter(f => f.endsWith('.mp4'))

  for (let i = 0; i < videoFiles.length; i++) {
    const file = videoFiles[i]
    const filePath = path.join(sourceDir, file)
    console.log(`Uploading video ${i+1}/${videoFiles.length}: ${file}`)
    
    try {
      const fileBuffer = fs.readFileSync(filePath)
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: file
        },
        file: {
          data: fileBuffer,
          mimetype: 'video/mp4',
          name: file,
          size: fs.statSync(filePath).size
        }
      })

      console.log(`Creating PortfolioVideo entry for ${file}`)
      await payload.create({
        collection: 'portfolio-videos',
        data: {
          title: file.replace('.mp4', ''),
          thumbnail: thumbnailId,
          videoType: 'file',
          videoFile: media.id,
          order: i
        }
      })
      console.log(`Successfully added ${file}`)
    } catch (err) {
      console.error(`Failed to process ${file}:`, err)
    }
  }

  console.log("Done importing videos!")
  process.exit(0)
}

run().catch(console.error)
