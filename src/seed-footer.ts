import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.js')

  const payload = await getPayload({ config })

  console.log('Updating Footer global...')

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description: 'Creative branding and digital marketing solutions built to help ambitious businesses stand out, connect with their audience, and grow with confidence.',
      email: 'hello@webrandmedia.com',
      phone: '+91 98765 43210',
      address: 'Coimbatore, Tamil Nadu',
      companyLinks: [
        { label: 'About Us', url: '/about-us' },
        { label: 'Services', url: '/services' },
        { label: 'Portfolio', url: '/portfolio' },
        { label: 'Contact Us', url: '/contact-us' },
      ],
      bottomLinks: [
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms of Service', url: '/terms-of-service' },
      ],
      socialLinks: [
        { platform: 'LinkedIn', url: '#' },
        { platform: 'Instagram', url: '#' },
      ],
    } as any,
  })

  console.log('✅ Footer seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
