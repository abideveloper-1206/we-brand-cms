import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding Portfolio Page Data...')

  try {
    // 1. Seed Portfolio Global (text fields only — images can be set via admin panel)
    await payload.updateGlobal({
      slug: 'portfolio',
      data: {
        hero: {
          title1: 'Crafting Digital',
          title2: 'Legacies.',
          tagline: 'Explore our curated gallery of market-dominating brand identities, Next.js web platforms, mobile products, and high-octane creative campaigns.',
          badgeNum: '50+',
          badgeText: 'Flagship Projects Delivered',
        },
        zoomSection: {
          eyebrow: 'Scroll Down to Unfold Showcase',
          badgeTag: 'FLAGSHIP SHOWCASE',
          title: 'AURA PARIS — LUXURY DIGITAL EDITORIAL',
        },
        portfolioStack: {
          eyebrow: 'Curated Portfolio',
          title: 'Masterpieces Engineered for Growth.',
        }
      },
    })
    console.log('✅ Portfolio Global seeded.')

    // 2. Clear existing projects
    const existingProjects = await payload.find({ collection: 'projects', limit: 100 })
    for (const proj of existingProjects.docs) {
      await payload.delete({ collection: 'projects', id: proj.id })
    }

    // 3. Seed Projects (without images — add images via Admin Panel)
    const projectsToSeed = [
      {
        title: 'Aura Luxury Editorial',
        category: 'Branding' as const,
        year: '2026',
        client: 'Aura Paris',
        tag: 'Brand Identity & E-Commerce',
        desc: 'A high-fashion luxury digital store engineered with Next.js, 3D product previews, and bespoke typography.',
      },
      {
        title: 'NeoBank Pro Platform',
        category: 'Mobile Apps' as const,
        year: '2025',
        client: 'NeoBank International',
        tag: 'Mobile App UI/UX & React Native',
        desc: 'Futuristic mobile banking app featuring dark neon glassmorphism, instant biometric pay, and crypto analytics.',
      },
      {
        title: 'Pulse AI Analytics Dashboard',
        category: 'Web Development' as const,
        year: '2025',
        client: 'Pulse Technologies',
        tag: 'Next.js & Realtime Data Engine',
        desc: 'Enterprise-grade SaaS dashboard providing realtime predictive AI insights and custom interactive charts.',
      },
      {
        title: 'Zenith 3D Motion Identity',
        category: 'UI/UX Design' as const,
        year: '2024',
        client: 'Zenith Studios',
        tag: '3D Motion & WebGL Interaction',
        desc: 'Immersive 3D interactive web experience showcasing abstract geometric sculptures and spatial audio.',
      },
    ]

    for (const proj of projectsToSeed) {
      await payload.create({
        collection: 'projects',
        data: proj as any,
      })
    }

    console.log(`✅ ${projectsToSeed.length} Projects seeded.`)
    console.log('ℹ️  Upload project images via the Admin Panel: localhost:3005/admin/collections/projects')

  } catch (err) {
    console.error('Error seeding data:', err)
  }

  process.exit(0)
}

seed()
