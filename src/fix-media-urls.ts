import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.js')

  const payload = await getPayload({ config })
  console.log('Fixing media URLs...')

  const mediaDocs = await payload.find({ collection: 'media', limit: 1000 })
  for (const doc of mediaDocs.docs) {
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: { s3Url: null }
    })
  }

  console.log('✅ Media URLs fixed successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
