import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.js')

  const payload = await getPayload({ config })
  
  const header = await payload.findGlobal({ slug: 'header' })
  if (header.logo) {
    const logoId = typeof header.logo === 'string' ? header.logo : header.logo.id
    await payload.updateGlobal({
      slug: 'header',
      data: {
        ...header,
        whatsappLogo: logoId
      }
    })
    console.log('✅ WhatsApp Logo updated successfully!')
  }
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
