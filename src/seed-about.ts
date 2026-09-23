/**
 * Run with: npx tsx src/seed-about.ts
 * Seeds default data into the About global.
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
    slug: 'about',
    data: {
      hero: {
        title: 'Who We Are.',
        tagline: 'We are a high-octane team of designers, engineers, and digital marketers based in Coimbatore, transforming ambitious ideas into market-dominating brand experiences.',
        badgeNum: '500+',
        badgeText: 'Brands Scaled Nationwide',
      } as any,
      ticker: [
        { text: '500+ PROJECTS DELIVERED' },
        { text: '98% CLIENT RETENTION' },
        { text: '10+ YEARS INDUSTRY MASTERY' },
        { text: '2500+ ENGAGED GROWTH CLIENTS' },
        { text: 'COIMBATORE & NATIONWIDE' },
      ],
      philosophy: {
        eyebrow: 'Our Philosophy',
        title: 'Driven by Innovation, Defined by Impact.',
        cards: [
          {
            chip: '#01',
            title: 'Artistry Meets Code',
            desc: 'We combine high-end fashion editorial aesthetics with ultra-fast modern web technology to build experiences that stun visitors and convert instantly.',
          },
          {
            chip: '#02',
            title: 'Data-Backed Growth',
            desc: 'Every brand identity, website layout, and marketing funnel is engineered with clear metrics, ROI tracking, and performance optimization.',
          },
          {
            chip: '#03',
            title: 'Unmatched Speed',
            desc: 'From initial design sprint to full production deployment, we deliver lightning-fast execution without compromising an inch of visual quality.',
          },
        ],
      } as any,
      timeline: {
        eyebrow: 'Our Growth Trajectory',
        title: 'The Journey of We Brand.',
        items: [
          {
            year: '2018',
            title: 'The Genesis',
            desc: 'Founded in Coimbatore with a vision to revolutionize brand identities and digital marketing for ambitious local businesses.',
            stats: '15+ Early Adopter Clients',
            chip: 'Founding Era',
          },
          {
            year: '2020',
            title: 'Full-Stack Expansion',
            desc: 'Expanded into high-performance custom web app development, UI/UX engineering, and performance marketing funnels.',
            stats: '120+ Digital Platforms Launched',
            chip: 'Tech Growth',
          },
          {
            year: '2023',
            title: 'Next-Gen Creative Studio',
            desc: 'Integrated cinematic video production, 3D motion design, and enterprise-grade Next.js web applications into our core offerings.',
            stats: '350+ Projects & National Reach',
            chip: 'Creative Scale',
          },
          {
            year: '2026',
            title: 'Market Leaders',
            desc: 'Recognized as Coimbatore\'s premier digital agency, scaling 500+ brands with ROI-focused creative and technical excellence.',
            stats: '500+ Active Client Portfolio',
            chip: 'Current Milestone',
          },
        ],
      } as any,
      team: {
        eyebrow: 'Creative Minds',
        title: 'The Masterminds Behind We Brand.',
        members: [
          {
            role: 'Founder & Creative Director',
            name: 'Abinash M',
            bio: 'Visionary design strategist leading brand transformations and high-impact digital experiences.',
          },
          {
            role: 'Lead UX & Product Designer',
            name: 'Sowmiya R',
            bio: 'Master of intuitive user interfaces, design systems, and human-centric interaction design.',
          },
          {
            role: 'Head of Web Engineering',
            name: 'Karthik Raja',
            bio: 'Full-stack architect specializing in ultra-fast Next.js apps, animation engines, and cloud solutions.',
          },
        ],
      } as any,
      contactCta: {
        title: 'Ready to transform your brand into a digital powerhouse?',
        desc: 'Connect with our creative strategists today and let\'s craft something unforgettable.',
        buttonText: 'Get In Touch',
        buttonUrl: '/contact-us',
      } as any,
    },
  })

  console.log('✅ About page sections seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
