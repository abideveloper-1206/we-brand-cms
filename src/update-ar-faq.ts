import { config } from 'dotenv'
import path from 'path'
config({ path: path.resolve(process.cwd(), '.env') })
import { getPayload } from 'payload'
import configPromise from './payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })

  try {
    const existing = await payload.find({
      collection: 'faq-need-more-help',
      locale: 'en'
    })
    
    const doc = existing.docs[0]
    if (doc && doc.supportCards) {
      // Map existing array items to preserve IDs and icons
      const translatedCards = doc.supportCards.map((card: any, i: number) => {
        let arabicData = {}
        if (i === 0) {
          arabicData = { title: 'اتصل بنا', description: 'تحدث مع أحد ممثلينا.', buttonText: 'اتصل الآن' }
        } else if (i === 1) {
          arabicData = { title: 'راسلنا', description: 'أرسل لنا بريداً إلكترونياً وسنرد عليك في أقرب وقت.', buttonText: 'أرسل رسالة' }
        } else {
          arabicData = { title: 'الدردشة المباشرة', description: 'نحن متاحون للدردشة المباشرة.', buttonText: 'ابدأ الدردشة' }
        }

        return {
          ...card, // Preserve icon and id and highlightCard
          ...arabicData
        }
      })

      const updateData = {
        title: 'هل تحتاج إلى المزيد من المساعدة؟',
        description: 'لم تجد إجابتك أعلاه؟ فريقنا مكون من أشخاص حقيقيين يهتمون بصدق بمساعدتك.',
        supportCards: translatedCards
      }

      await payload.update({
        collection: 'faq-need-more-help',
        id: doc.id,
        data: updateData,
        locale: 'ar'
      })
      console.log('Updated faq-need-more-help with Arabic content')
    }
  } catch (e) {
    console.error('Error updating faq-need-more-help:', e)
  }

  process.exit(0)
}

run()
