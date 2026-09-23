import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.js')

  const payload = await getPayload({ config })

  console.log('Seeding Services collection...')

  const services = [
    {
      title: 'Branding & Visual Identity',
      slug: 'branding-visual-identity',
      shortDescription: 'Build a brand that feels distinctive, communicates with purpose, and stays memorable across every touchpoint.',
      fullDescription: 'Build a brand that feels distinctive, communicates with purpose, and stays memorable across every touchpoint.',
      order: 1,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'Brand Strategy' }] // Dummy feature to pass required validation
    },
    {
      title: 'Website Design & Development',
      slug: 'website-design-development',
      shortDescription: 'Craft modern digital experiences that look exceptional, perform seamlessly, and turn every visit into an opportunity.',
      fullDescription: 'Craft modern digital experiences that look exceptional, perform seamlessly, and turn every visit into an opportunity.',
      order: 2,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'Responsive Design' }]
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      shortDescription: 'Design intuitive digital experiences that feel effortless, look refined, and keep users engaged at every interaction.',
      fullDescription: 'Design intuitive digital experiences that feel effortless, look refined, and keep users engaged at every interaction.',
      order: 3,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'User Research' }]
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      shortDescription: 'Transform your ideas into seamless mobile experiences built for performance, scalability, and real-world impact.',
      fullDescription: 'Transform your ideas into seamless mobile experiences built for performance, scalability, and real-world impact.',
      order: 4,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'iOS & Android' }]
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      shortDescription: 'Build meaningful digital presence with strategic campaigns that connect your brand to the right people and drive measurable results.',
      fullDescription: 'Build meaningful digital presence with strategic campaigns that connect your brand to the right people and drive measurable results.',
      order: 5,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'SEO & SEM' }]
    },
    {
      title: 'Social Media Marketing',
      slug: 'social-media-marketing',
      shortDescription: 'Turn your brand into a conversation with strategic content, compelling creatives, and social campaigns built to capture attention and create lasting impact.',
      fullDescription: 'Turn your brand into a conversation with strategic content, compelling creatives, and social campaigns built to capture attention and create lasting impact.',
      order: 6,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'Content Strategy' }]
    },
    {
      title: 'Video Production & Creative Content',
      slug: 'video-production-creative-content',
      shortDescription: 'Create bold visuals and engaging stories that make your brand stand out.',
      fullDescription: 'Create bold visuals and engaging stories that make your brand stand out.',
      order: 7,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'Video Editing' }]
    },
    {
      title: 'Performance Marketing',
      slug: 'performance-marketing',
      shortDescription: 'Turn every ad spend into meaningful growth with targeted campaigns built for better reach and conversions.',
      fullDescription: 'Turn every ad spend into meaningful growth with targeted campaigns built for better reach and conversions.',
      order: 8,
      accent: '#2563c9',
      tint: '#e8f0ff',
      features: [{ feature: 'Paid Campaigns' }]
    }
  ]

  const mediaResult = await payload.find({ collection: 'media', limit: 1 })
  const imageId = mediaResult.docs[0]?.id

  if (!imageId) {
    console.log("No images found in media collection to attach to services!")
    process.exit(1)
  }

  const existingServices = await payload.find({ collection: 'services', limit: 100 })
  for (const s of existingServices.docs) {
    await payload.delete({ collection: 'services', id: s.id })
  }

  for (const s of services) {
    await payload.create({
      collection: 'services',
      data: {
        ...s,
        image: imageId
      }
    })
  }

  console.log('✅ Services seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
