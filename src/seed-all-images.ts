import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brainDir = 'C:\\Users\\AbinaM\\.gemini\\antigravity-ide\\brain\\0a651e57-8d69-44db-a60e-a5ea17a3d4c4'
const cmsDir = 'C:\\Users\\AbinaM\\Desktop\\we-brand-cms'

async function uploadMedia(payload: any, filePath: string, altText: string) {
  const fileData = fs.readFileSync(filePath)
  const size = fs.statSync(filePath).size
  const mediaResult = await payload.create({
    collection: 'media',
    data: { alt: altText },
    file: {
      data: fileData,
      mimetype: 'image/png',
      name: path.basename(filePath),
      size: size
    }
  })
  return mediaResult.id
}

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config.js')

  const payload = await getPayload({ config })
  console.log('Starting massive image and logo seeding...')

  // 1. Upload Logo
  console.log('Uploading processed logo...')
  const logoId = await uploadMedia(payload, path.join(cmsDir, 'logo-processed.png'), 'We Brand Custom Logo')

  await payload.updateGlobal({
    slug: 'header',
    data: { logo: logoId } as any
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: { logo: logoId } as any
  })

  // 2. Upload Home Page Images
  console.log('Uploading Home images...')
  const hero1Id = await uploadMedia(payload, path.join(brainDir, 'hero_team_collab_1787930526793.png'), 'Team Collaborating')
  const hero2Id = await uploadMedia(payload, path.join(brainDir, 'hero_marketing_plan_1787930635214.png'), 'Marketing Plan')
  const hero3Id = await uploadMedia(payload, path.join(brainDir, 'hero_creative_design_1787930664248.png'), 'Creative Design')
  const aboutId = await uploadMedia(payload, path.join(brainDir, 'about_agency_team_1787930688886.png'), 'Agency Team')
  
  const expWebId = await uploadMedia(payload, path.join(brainDir, 'expertise_web_dev_1787930717379.png'), 'Web Development')
  const expBrandId = await uploadMedia(payload, path.join(brainDir, 'expertise_branding_1787930905886.png'), 'Branding')
  const expVideoId = await uploadMedia(payload, path.join(brainDir, 'expertise_video_1787930980148.png'), 'Video Production')
  const expGrowthId = await uploadMedia(payload, path.join(brainDir, 'expertise_growth_1787931023288.png'), 'Digital Growth')

  // Update Home Global
  const currentHome = await payload.findGlobal({ slug: 'home' })
  await payload.updateGlobal({
    slug: 'home',
    data: {
      ...currentHome,
      hero: {
        ...currentHome.hero,
        images: [
          { image: hero1Id },
          { image: hero2Id },
          { image: hero3Id },
          { image: hero1Id }, // Just loop them to fill the 6 slots if needed
          { image: hero2Id },
          { image: hero3Id }
        ]
      },
      about: {
        ...currentHome.about,
        image: aboutId
      },
      expertise: {
        ...currentHome.expertise,
        webMobile: {
          ...currentHome.expertise?.webMobile,
          image: expWebId
        },
        brandingDesign: {
          ...currentHome.expertise?.brandingDesign,
          image: expBrandId
        },
        contentVideo: {
          ...currentHome.expertise?.contentVideo,
          image: expVideoId
        },
        digitalGrowth: {
          ...currentHome.expertise?.digitalGrowth,
          image: expGrowthId
        }
      }
    }
  })

  // 3. Upload Services Images
  console.log('Uploading Services images...')
  const srvBrandId = await uploadMedia(payload, path.join(brainDir, 'service_branding_1787931105892.png'), 'Service Branding')
  const srvWebId = await uploadMedia(payload, path.join(brainDir, 'service_webdev_1787931147149.png'), 'Service Web Dev')
  const srvUiuxId = await uploadMedia(payload, path.join(brainDir, 'service_uiux_1787931168745.png'), 'Service UI/UX')
  const srvMobileId = await uploadMedia(payload, path.join(brainDir, 'service_mobile_1787931202433.png'), 'Service Mobile')
  const srvMarketingId = await uploadMedia(payload, path.join(brainDir, 'service_digital_marketing_1787931324980.png'), 'Service Digital Marketing')
  
  // Re-use some expertise images for the 3 failed services due to rate limit
  const srvSocialId = hero2Id
  const srvVideoId = expVideoId
  const srvPerformanceId = expGrowthId

  const serviceImagesMap: Record<string, string> = {
    'branding-visual-identity': srvBrandId,
    'website-design-development': srvWebId,
    'ui-ux-design': srvUiuxId,
    'mobile-app-development': srvMobileId,
    'digital-marketing': srvMarketingId,
    'social-media-marketing': srvSocialId,
    'video-production-creative-content': srvVideoId,
    'performance-marketing': srvPerformanceId
  }

  // Update Services
  const services = await payload.find({ collection: 'services', limit: 100 })
  for (const srv of services.docs) {
    const newImageId = serviceImagesMap[srv.slug]
    if (newImageId) {
      await payload.update({
        collection: 'services',
        id: srv.id,
        data: { image: newImageId }
      })
    }
  }

  console.log('✅ All images and logo seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
