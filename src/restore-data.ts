import { config } from 'dotenv'
import path from 'path'
config({ path: path.resolve(process.cwd(), '.env') })
import { getPayload } from 'payload'
import configPromise from './payload.config'
import fs from 'fs'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const backupPath = path.resolve(process.cwd(), 'mongo-data.json')
  if (!fs.existsSync(backupPath)) {
    console.error('Backup not found!')
    process.exit(1)
  }

  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'))

  // Restore home-story-favorites
  if (backupData['home-story-favorites']) {
    try {
      const docId = backupData['home-story-favorites']._id
      
      // We must pass the array as it was to restore the IDs and images
      const originalCards = backupData['home-story-favorites'].favoriteCards.map((card: any) => ({
        id: card.id,
        cardImage: card.cardImage,
        cardTitle: card.cardTitle?.en || card.cardTitle,
        cardSubtitle: card.cardSubtitle?.en || card.cardSubtitle,
        backgroundColor: card.backgroundColor,
        buttonLink: card.buttonLink
      }))

      await payload.update({
        collection: 'home-story-favorites',
        id: docId,
        data: {
          storyTagline: backupData['home-story-favorites'].storyTagline?.en,
          storyTitle: backupData['home-story-favorites'].storyTitle?.en,
          storyDescription: backupData['home-story-favorites'].storyDescription?.en,
          storyButtonText: backupData['home-story-favorites'].storyButtonText?.en,
          favoritesHeading: backupData['home-story-favorites'].favoritesHeading?.en,
          viewAllText: backupData['home-story-favorites'].viewAllText?.en,
          favoriteCards: originalCards
        },
        locale: 'en'
      })
      console.log('Restored home-story-favorites')
      
      // Now set the Arabic content using the IDs
      const arCards = originalCards.map((card: any, i: number) => ({
        id: card.id,
        cardTitle: i === 1 ? 'عصير المانجو' : 'سموثي الأفوكادو',
        cardSubtitle: 'طبيعي 100%'
      }))
      
      await payload.update({
        collection: 'home-story-favorites',
        id: docId,
        data: {
          storyTagline: 'قصتنا',
          storyTitle: 'مكونات طبيعية. طعم رائع حقاً',
          storyDescription: 'المملكة العربية السعودية تنعم بتراث زراعي استثنائي من نخيل الأحساء إلى بساتين الحمضيات في الطائف. نتعاون في نس مباشرة مع المزارعين المحليين لتقديم أفضل ما في هذه الأرض في كل زجاجة، لنحتفل بوفرة المملكة الطبيعية مع كل رشفة.',
          storyButtonText: 'اكتشف المزيد',
          favoritesHeading: 'تسوق من<br/> مفضلاتنا',
          viewAllText: 'عرض جميع المنتجات',
          favoriteCards: arCards
        },
        locale: 'ar'
      })
      console.log('Re-applied Arabic translations to home-story-favorites safely')
    } catch(e) {
      console.error(e)
    }
  }

  // Restore home-products-partnerships
  if (backupData['home-products-partnerships']) {
    try {
      const docId = backupData['home-products-partnerships']._id
      
      const originalProducts = backupData['home-products-partnerships'].products.map((p: any) => ({
        id: p.id,
        title: p.title?.en || p.title,
        subtitle: p.subtitle?.en || p.subtitle,
        taglineIcon: p.taglineIcon,
        image: p.image,
        buttonText: p.buttonText?.en || p.buttonText,
        buttonLink: p.buttonLink
      }))

      const originalGallery = backupData['home-products-partnerships'].galleryCards.map((g: any) => ({
        id: g.id,
        label: g.label?.en || g.label,
        image: g.image,
        link: g.link
      }))

      await payload.update({
        collection: 'home-products-partnerships',
        id: docId,
        data: {
          productsHeading: backupData['home-products-partnerships'].productsHeading?.en || backupData['home-products-partnerships'].productsHeading,
          partnershipHeading: backupData['home-products-partnerships'].partnershipHeading?.en || backupData['home-products-partnerships'].partnershipHeading,
          products: originalProducts,
          galleryCards: originalGallery
        },
        locale: 'en'
      })
      console.log('Restored home-products-partnerships')
      
      // Add arabic translations safely
      const arProducts = originalProducts.map((p: any, i: number) => {
        const tr = [
          { title: 'بداية يومك', subtitle: 'ابدأ يومك بنشاط', buttonText: 'اكتشف' },
          { title: 'انتعاش الظهيرة', subtitle: 'ابق خفيفاً ونشيطاً', buttonText: 'اكتشف' },
          { title: 'توازن المساء', subtitle: 'استرخ واهدأ', buttonText: 'اكتشف' },
          { title: 'طاقة أثناء التنقل', subtitle: 'اشحن طاقتك في أي وقت', buttonText: 'اكتشف' }
        ]
        return {
          id: p.id,
          ...tr[i % tr.length]
        }
      })
      
      const arGallery = originalGallery.map((g: any, i: number) => {
        const tr = [
          { label: 'المقاهي والمطاعم' },
          { label: 'التجزئة والمتاجر' },
          { label: 'العلامة الخاصة' },
          { label: 'الضيافة' }
        ]
        return {
          id: g.id,
          ...tr[i % tr.length]
        }
      })

      await payload.update({
        collection: 'home-products-partnerships',
        id: docId,
        data: {
          productsHeading: 'روعة تناسب يومك',
          partnershipHeading: 'الشراكات </b> والبيع بالجملة',
          products: arProducts,
          galleryCards: arGallery
        },
        locale: 'ar'
      })
      console.log('Re-applied Arabic translations to home-products-partnerships safely')
    } catch(e) {
      console.error(e)
    }
  }

  process.exit(0)
}

run()
