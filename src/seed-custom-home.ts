/**
 * Seed Script to populate the Home Page with user content and uploaded images.
 * Run with: npx tsx src/seed-custom-home.ts
 */
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Assuming the script is run from the project root (c:\Users\AbinaM\Desktop\we-brand-cms)
const ARTIFACTS_DIR = 'C:/Users/AbinaM/.gemini/antigravity-ide/brain/0a651e57-8d69-44db-a60e-a5ea17a3d4c4'

async function uploadMedia(payload: any, filePath: string, alt: string) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: Image file not found at ${filePath}`)
      return null
    }

    const fileName = path.basename(filePath)
    const fileData = fs.readFileSync(filePath)
    
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: alt,
      },
      file: {
        data: fileData,
        mimetype: 'image/png',
        name: fileName,
        size: fileData.length,
      },
    })
    
    return media.id
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error)
    return null
  }
}

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.js')

  const payload = await getPayload({ config })

  console.log('Uploading images...')
  
  // Upload the generated images
  const heroImgId = await uploadMedia(payload, `${ARTIFACTS_DIR}/hero_bg_1787838570237.png`, 'Hero Background')
  const aboutImgId = await uploadMedia(payload, `${ARTIFACTS_DIR}/about_us_1787838585433.png`, 'About Us Team')
  const webDevImgId = await uploadMedia(payload, `${ARTIFACTS_DIR}/web_dev_1787838619381.png`, 'Web Development')

  console.log('Images uploaded. Updating Home global...')

  await payload.updateGlobal({
    slug: 'home',
    data: {
      hero: {
        subtitle: 'Creative Digital Marketing Agency',
        title: 'Build Brands\nThat Matter.',
        statsCount: '2500+',
        statsText: 'Creative Projects Delivered',
        ctaText: 'Explore Our Projects →',
        ctaUrl: '#portfolio',
        // Optional images mapping, assuming hero images array takes media IDs
        images: heroImgId ? [{ image: heroImgId }, { image: heroImgId }, { image: heroImgId }, { image: heroImgId }, { image: heroImgId }, { image: heroImgId }] : [],
        avatars: heroImgId ? [{ image: heroImgId }, { image: heroImgId }, { image: heroImgId }, { image: heroImgId }] : [],
      },
      about: {
        leftBadge: {
          percent: '100%',
          caption: 'Brand solutions\nfor meaningful\ndigital growth',
        },
        rightCard: {
          badge: '#01',
          title: 'Your Trusted Digital Growth Partner',
          description: 'We Brand Media is a creative branding and digital marketing agency in Coimbatore, helping businesses, startups and growing brands build a strong identity, reach the right audience and achieve meaningful digital growth.',
        },
        carousel: [
          {
            word1: 'Creative',
            word2: 'Digital',
            word3: 'Growth',
            word4: 'Partner',
            image: aboutImgId || undefined,
            locationName: 'Coimbatore',
            locationRole: 'Tamil Nadu',
          }
        ],
      },
      servicesSection: {
        eyebrow: 'OUR SERVICES',
        titleLine1: 'Creative Solutions.',
        titleLine2: 'Measurable Growth.',
      },
      expertise: {
        eyebrow: 'OUR EXPERTISE',
        heading: 'Creative Thinking. Digital Impact.',
        headingHighlight: 'Creative Thinking. Digital Impact.',
        description: 'We turn bold ideas into purposeful digital experiences that strengthen brands, engage audiences, and create opportunities for growth.',
        visualText: 'Creating Work That Makes Brands Matter\nWe blend strategy, creativity, and technology to turn ambitious ideas into digital experiences that connect, engage, and deliver results.',
        tabs: [
          { tabId: 'web', label: '01 — Web & Mobile', imageAlt: 'Digital Products & Experiences', visualText: 'Digital Products & Experiences', image: webDevImgId || undefined },
          { tabId: 'brand', label: '02 — Branding & Design', imageAlt: 'Distinctive Brand Identities', visualText: 'Distinctive Brand Identities', image: aboutImgId || undefined },
          { tabId: 'video', label: '03 — Content & Video', imageAlt: 'Visual Stories That Connect', visualText: 'Visual Stories That Connect', image: heroImgId || undefined },
          { tabId: 'marketing', label: '04 — Digital Growth', imageAlt: 'Marketing That Performs', visualText: 'Marketing That Performs', image: webDevImgId || undefined },
        ],
      },
      whyChoose: {
        eyebrow: 'WHY CHOOSE US',
        title: 'More Than an Agency.\nA Growth Partner.',
        items: [
          { val: '01 — THINK DIFFERENT', lbl: 'Fresh ideas built around your brand.' },
          { val: '02 — STRATEGY FIRST', lbl: 'Every creative decision has a purpose.' },
          { val: '03 — BUILT TO PERFORM', lbl: 'Design and marketing focused on real outcomes.' },
          { val: '04 — ONE TEAM', lbl: 'Branding, digital, content, and growth under one roof.' },
          { val: '05 — DATA + CREATIVITY', lbl: 'Smart decisions powered by insights and imagination.' },
          { val: '06 — MADE FOR YOU', lbl: 'No templates. No one-size-fits-all solutions.' },
          { val: '07 — ALWAYS EVOLVING', lbl: 'We adapt your digital presence as your business grows.' },
          { val: '08 — RESULTS THAT MATTER', lbl: 'Because great work should create real business value.' },
        ],
      },
      testimonials: {
        eyebrow: 'WHAT CLIENTS SAY',
        title: 'Trusted by Brands That Are Growing',
        items: [
          { quote: 'WeBrandMedia gave our brand a clear identity and a much stronger digital presence. Their creative approach made a real difference.', name: 'Karthik R.', role: 'Founder · Growing Startup' },
          { quote: 'From the website to the overall digital strategy, everything felt thoughtful, modern, and focused on our business goals.', name: 'Priya M.', role: 'Business Director · Retail Brand' },
          { quote: 'Their team understood our audience, created the right campaigns, and helped us achieve much better visibility and engagement.', name: 'Arun S.', role: 'Marketing Head · Local Business' },
        ],
      },
      workflow: {
        title: 'How We Build Your Success',
        tabs: [
          {
            tabName: 'Digital Solutions',
            steps: [
              { title: '01 — Discovery & Onboarding', desc: 'We understand your business, audience, goals, and digital needs to create the right foundation for growth.' },
              { title: '02 — Strategy & Planning', desc: 'We develop a focused strategy that connects your brand, audience, and business objectives for measurable results.' },
              { title: '03 — Creative & UI/UX Design', desc: 'We turn ideas into engaging visuals and intuitive digital experiences that make your brand stand out.' },
              { title: '04 — Development & Execution', desc: 'We bring every approved idea to life through high-performance websites, digital campaigns, and creative solutions.' },
              { title: '05 — Review & Launch', desc: 'We refine, optimize, and deliver every project with attention to quality, performance, and your business goals.' },
            ],
          },
          {
            tabName: 'Web Development',
            steps: [
              { title: 'Discovery', desc: 'We understand your business, audience, goals, and competitors to define the right website strategy.' },
              { title: 'Architecture', desc: 'We plan your sitemap, features, technology, and website structure for a smooth digital experience.' },
              { title: 'Design', desc: 'We create modern, responsive UI/UX designs that reflect your brand and guide visitors toward action.' },
              { title: 'Development', desc: 'We build fast, secure, scalable websites with clean code, responsive performance, and seamless functionality.' },
              { title: 'Launch & Support', desc: 'We test, optimize, launch, and provide ongoing support to keep your website performing at its best.' },
            ],
          },
          {
            tabName: 'Video Production',
            steps: [
              { title: 'Onboarding', desc: 'We understand your brand, audience, objectives, and creative requirements to set the right direction.' },
              { title: 'Scripting', desc: 'We develop engaging concepts and scripts that communicate your message with clarity and impact.' },
              { title: 'Shooting', desc: 'Our production team captures high-quality visuals with the right lighting, framing, and cinematic approach.' },
              { title: 'Editing & Motion', desc: 'We enhance every frame with precise editing, colour grading, motion graphics, sound design, and visual effects.' },
              { title: 'Delivery', desc: 'We deliver polished, platform-ready videos optimized for social media, websites, campaigns, and digital marketing.' },
            ],
          },
        ],
      },
      faq: {
        eyebrow: 'Got Questions?',
        title: 'Frequently Asked Questions',
        items: [
          { question: 'Why should I choose We Brand Media for my business?', answer: 'We combine strategy, creativity, technology, and marketing to build digital solutions that are designed around your business goals—not one-size-fits-all packages.' },
          { question: 'Can you create a complete brand identity from scratch?', answer: 'Yes. We can develop your brand from the ground up, including brand strategy, logo, visual identity, communication style, and creative brand assets.' },
          { question: 'Can you redesign or improve my existing website?', answer: 'Absolutely. We can analyse your current website, identify usability and performance gaps, and create a modern, responsive experience that better represents your brand.' },
          { question: 'Can you help generate leads through digital marketing?', answer: 'Yes. We create targeted digital marketing strategies using SEO, social media, paid advertising, content, and performance-focused campaigns to attract and convert the right audience.' },
        ],
      },
      contactBanner: {
        heading: 'Your Next Big Move Starts Here.',
        subtext: 'STRATEGY. CREATIVITY. DIGITAL.\nLet’s turn your business goals into a brand people remember and a digital presence that drives growth.',
        ctaText: 'Start a Conversation ↗',
        ctaUrl: '/contact-us',
      },
      preFooterCta: {
        line1: 'Your Next Big Move Starts Here.',
        line2: 'STRATEGY.',
        line3: 'CREATIVITY. DIGITAL.',
        buttonText: 'Start a Conversation',
        buttonUrl: '/contact-us',
      }
    } as any,
  })

  console.log('✅ Custom Home sections seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
