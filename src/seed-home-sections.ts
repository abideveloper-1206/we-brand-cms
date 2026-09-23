/**
 * Run with: npx tsx src/seed-home-sections.ts
 * Seeds default tabs and portfolio cards for expertise & portfolio sections.
 */
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.js')

  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      expertise: {
        eyebrow: 'Our Expertise',
        heading: 'Assuring seamless Digital Marketing & Brand Building solutions',
        headingHighlight: 'Digital Marketing & Brand Building',
        description:
          'With over a decade of experience, we have served 250+ brands across 10+ countries and delivered 350+ projects — consistently helping our clients hit (and exceed) their brand marketing goals.',
        visualText:
          'We craft brand identities that speak your story — visually, emotionally, and memorably.',
        tabs: [
          { tabId: 'web', label: 'Web & Mobile Development', imageAlt: 'Web Development', visualText: 'We craft web & mobile solutions tailored to your business goals.' },
          { tabId: 'brand', label: 'Branding & Design', imageAlt: 'Branding', visualText: 'We craft brand identities that speak your story — visually, emotionally, and memorably.' },
          { tabId: 'video', label: 'Video Content Production', imageAlt: 'Video Content', visualText: 'We create high-impact video content that engages your audience.' },
          { tabId: 'social', label: 'Social Media Marketing', imageAlt: 'Social Media', visualText: 'We drive brand growth and community engagement across social channels.' },
        ],
      },
      portfolio: {
        title: 'Transforming Ideas\nInto Digital\nExperiences',
        description:
          'Every project reflects our commitment to creativity, innovation, and measurable business results.',
        cards: [
          {
            cardTitle: 'E-Commerce Platforms',
            cardDesc: 'High conversion retail experiences built to scale.',
            style: 'clay',
          },
          {
            cardTitle: 'Brand Identity',
            cardDesc: 'Memorable visuals that communicate core values.',
            style: 'blue',
          },
        ],
      },
      contactBanner: {
        heading: "We're getting a feeling you like us already!",
        subtext:
          "Our doors (and video call links!) are open. Choose the way you'd like to chat, and we'll be there!",
        ctaText: 'Contact us.',
        ctaUrl: '/contact-us',
      },
      whyChoose: {
        eyebrow: 'Why choose us',
        title: 'Why Choose We Brand Media',
        items: [
          { val: 'Transparent', lbl: 'Communication throughout' },
          { val: 'Fast', lbl: 'Turnaround time' },
          { val: 'Modern', lbl: 'Technology standards' },
          { val: 'SEO', lbl: 'Focused development' },
          { val: 'Data', lbl: 'Driven campaigns' },
          { val: 'Local', lbl: 'Market expertise' },
          { val: 'Long-Term', lbl: 'Growth strategies' },
          { val: '100%', lbl: 'Client satisfaction' },
        ],
      },
      testimonials: {
        eyebrow: 'What clients say',
        title: 'Trusted by Growing Brands',
        items: [
          { quote: 'They completely transformed our brand identity. Our online presence has never been stronger.', name: 'Arun Kumar', role: 'Startup Founder' },
          { quote: 'The website they built us is fast, modern, and actually drives leads to our sales team.', name: 'Meera S.', role: 'Marketing Director' },
          { quote: 'Incredible ROI on our paid campaigns. We Brand Media truly understands the local market in Coimbatore.', name: 'Ramesh V.', role: 'Retail Business Owner' },
        ],
      },
      workflow: {
        title: 'How We Build Your Success',
        tabs: [
          {
            tabName: 'Digital Solutions',
            steps: [
              { title: 'Onboarding', desc: 'We present a detailed overview of timelines, and welcome you to the community.' },
              { title: 'Strategy & Planning', desc: 'We craft a personalized strategy tailored precisely to your branding and business goals.' },
              { title: 'UI/UX Design', desc: 'We create wireframes and high-fidelity mockups to illustrate the final user journey.' },
              { title: 'Development', desc: 'Our professional technical team brings the approved designs to life with clean code.' },
              { title: 'Review & Delivery', desc: 'Time for the magic! We review all the elements together and launch your final product.' },
            ],
          },
          {
            tabName: 'Web Development',
            steps: [
              { title: 'Discovery', desc: 'We analyze your requirements and define the tech stack.' },
              { title: 'Prototyping', desc: 'Interactive prototypes to visualize the application structure.' },
              { title: 'Development', desc: 'Agile development with regular milestones and updates.' },
              { title: 'Testing', desc: 'Comprehensive QA testing for performance and security.' },
              { title: 'Deployment', desc: 'Smooth deployment to production environments.' },
            ],
          },
          {
            tabName: 'Branding',
            steps: [
              { title: 'Onboarding', desc: 'We understand your brand story, values, and target audience.' },
              { title: 'Scripting', desc: 'Creative directors craft compelling narratives and scripts.' },
              { title: 'Shooting', desc: 'Professional cinematography to capture your brand in its best light.' },
              { title: 'Editing & Motion', desc: 'Post-production magic — colour grading, motion graphics.' },
              { title: 'Delivery', desc: 'Final assets delivered across all formats.' },
            ],
          },
        ],
      },
    } as any,
  })

  console.log('✅ Home sections seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
