/**
 * Run with: npx tsx src/seed-faq-prefooter.ts
 * Seeds default FAQ items and Pre-Footer CTA data.
 */
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.DATABASE_URL = process.env.DATABASE_URL || ''
process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'seed-secret'

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.ts' as any)

  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      faq: {
        eyebrow: 'Got Questions?',
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'What services does We Brand Media offer?',
            answer: 'We offer a full suite of digital services including Branding & Identity, Website & App Development, Social Media Management, SEO, and Performance Marketing to help your business grow online.',
          },
          {
            question: 'How long does it take to build a custom website?',
            answer: 'A standard custom website usually takes 3 to 6 weeks from strategy and design to development and launch. Complex web applications may take longer depending on features and integrations.',
          },
          {
            question: 'Do you work with startups and small businesses?',
            answer: 'Absolutely! We love helping startups and local businesses in Coimbatore and beyond establish a strong digital footprint. We tailor our strategies to fit your specific goals and budget.',
          },
          {
            question: 'Do you provide ongoing support after launch?',
            answer: 'Yes, we offer ongoing maintenance, website hosting, and continuous digital marketing campaigns to ensure your brand keeps growing and performing optimally post-launch.',
          },
        ],
      } as any,
      preFooterCta: {
        line1: 'IDEA?',
        line2: 'STOP THINKING.',
        line3: 'START GROWING',
        buttonText: 'Contact Us',
        buttonUrl: '/contact-us',
      } as any,
    },
  })

  console.log('✅ FAQ and Pre-Footer CTA seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
