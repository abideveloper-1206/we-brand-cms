import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function seedMenus() {
  const payload = await getPayload({ config })
  
  console.log('Seeding Header...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { label: 'About Us', url: '/about-us' },
        { label: 'Services', url: '/services' },
        { label: 'Portfolio', url: '/portfolio' },
        { label: 'Reviews', url: '/#testimonials' },
      ],
      callToActionText: "Let's Talk",
      callToActionUrl: "/contact-us"
    }
  })
  
  console.log('Seeding Footer...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description: "Creative branding and digital marketing agency based in Coimbatore, helping brands build a strong digital presence.",
      email: "hello@webrandmedia.com",
      phone: "+91 98765 43210",
      address: "Coimbatore, Tamil Nadu",
      companyLinks: [
        { label: 'About Us', url: '/about-us' },
        { label: 'Services', url: '/services' },
        { label: 'Portfolio', url: '/portfolio' },
        { label: 'Contact Us', url: '/contact-us' },
      ],
      bottomLinks: [
        { label: 'Privacy', url: '/privacy' },
        { label: 'Terms', url: '/terms' },
      ],
      socialLinks: [
        { platform: 'Instagram', url: '#' },
        { platform: 'LinkedIn', url: '#' },
        { platform: 'Facebook', url: '#' },
        { platform: 'WhatsApp', url: '#' },
      ]
    }
  })
  
  console.log('Successfully seeded Header and Footer menus.')
  process.exit(0)
}

seedMenus().catch((err) => {
  console.error(err)
  process.exit(1)
})
