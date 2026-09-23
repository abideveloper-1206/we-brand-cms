import { config } from 'dotenv'
import path from 'path'
config({ path: path.resolve(process.cwd(), '.env') })
import { getPayload } from 'payload'
import configPromise from './payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const updates = [
    {
      collection: 'home-hero-section',
      data: {
        heroTitle: 'متجذر في الطبيعة',
        heroSubTitle: 'صُنع من أجلك',
        buttonText: 'تسوق الآن',
        highlights: [
          { label: 'عضوي 100%' },
          { label: 'بدون سكر مضاف' },
          { label: 'طازج يوميا' },
          { label: 'منعش دائما' }
        ]
      }
    },
    {
      collection: 'home-story-favorites',
      data: {
        storyTagline: 'قصتنا',
        storyTitle: 'مكونات طبيعية. طعم رائع حقاً',
        storyDescription: 'المملكة العربية السعودية تنعم بتراث زراعي استثنائي من نخيل الأحساء إلى بساتين الحمضيات في الطائف. نتعاون في نس مباشرة مع المزارعين المحليين لتقديم أفضل ما في هذه الأرض في كل زجاجة، لنحتفل بوفرة المملكة الطبيعية مع كل رشفة.',
        storyButtonText: 'اكتشف المزيد',
        favoritesHeading: 'تسوق من<br/> مفضلاتنا',
        viewAllText: 'عرض جميع المنتجات',
        favoriteCards: [
          { cardTitle: 'سموثي الأفوكادو', cardSubtitle: 'طبيعي 100%' },
          { cardTitle: 'عصير المانجو', cardSubtitle: 'طبيعي 100%' },
          { cardTitle: 'سموثي الأفوكادو', cardSubtitle: 'طبيعي 100%' }
        ]
      }
    },
    {
      collection: 'home-products-partnerships',
      data: {
        productsHeading: 'روعة تناسب يومك',
        products: [
          { title: 'بداية يومك', subtitle: 'ابدأ يومك بنشاط', buttonText: 'اكتشف' },
          { title: 'انتعاش الظهيرة', subtitle: 'ابق خفيفاً ونشيطاً', buttonText: 'اكتشف' },
          { title: 'توازن المساء', subtitle: 'استرخ واهدأ', buttonText: 'اكتشف' },
          { title: 'طاقة أثناء التنقل', subtitle: 'اشحن طاقتك في أي وقت', buttonText: 'اكتشف' }
        ],
        partnershipHeading: 'الشراكات </b> والبيع بالجملة',
        galleryCards: [
          { label: 'المقاهي والمطاعم' },
          { label: 'التجزئة والمتاجر' },
          { label: 'العلامة الخاصة' },
          { label: 'الضيافة' }
        ]
      }
    },
    {
      collection: 'faq-hero-product',
      data: {
        heroTagline: 'متجذر في الطبيعة',
        heroTitle: 'الأسئلة الشائعة',
        heroSubtitle: 'الأسئلة المتداولة.',
        productFAQs: [
          { question: 'هل المنتجات طبيعية بالكامل؟', answer: 'نعم، جميع منتجاتنا طبيعية 100% ولا تحتوي على إضافات صناعية.' },
          { question: 'ما هي مدة صلاحية العصائر؟', answer: 'تختلف مدة الصلاحية حسب نوع المنتج، لكنها تتراوح عادة بين 3 إلى 5 أيام.' }
        ]
      }
    },
    {
      collection: 'faq-health-nutrition',
      data: {
        sectionTitle: 'الصحة والتغذية',
        healthFAQs: [
          { question: 'هل تضيفون السكر؟', answer: 'لا، جميع عصائرنا تعتمد على الحلاوة الطبيعية للفواكه فقط.' },
          { question: 'هل تناسب العصائر الأطفال؟', answer: 'نعم، منتجاتنا آمنة وصحية وتناسب جميع أفراد الأسرة.' }
        ],
        ctaTitle: 'أرح عقلك مع عصائر نس الطازجة والنقية',
        ctaDescription: 'معصورة على البارد من مكونات طازجة من المزرعة، تصلك حتى باب بيتك. لا اختصارات ولا تنازلات.',
        ctaButtonText: 'اكتشف المزيد'
      }
    },
    {
      collection: 'faq-need-more-help',
      data: {
        title: 'هل تحتاج إلى المزيد من المساعدة؟',
        description: 'لم تجد إجابتك أعلاه؟ فريقنا مكون من أشخاص حقيقيين يهتمون بصدق بمساعدتك.',
        supportCards: [
          { title: 'اتصل بنا', description: 'تحدث مع أحد ممثلينا.', buttonText: 'اتصل الآن' },
          { title: 'راسلنا', description: 'أرسل لنا بريداً إلكترونياً وسنرد عليك في أقرب وقت.', buttonText: 'أرسل رسالة' },
          { title: 'الدردشة المباشرة', description: 'نحن متاحون للدردشة المباشرة.', buttonText: 'ابدأ الدردشة' }
        ]
      }
    },
    {
      collection: 'contact-content',
      data: {
        heroTitle: 'لتبدأ محادثة',
        heroTitleHighlight: 'حقيقية',
        heroSubtitle: 'سواء كنت تبحث عن فروعنا، أو ترغب في الشراكة معنا، أو لديك سؤال حول منتج، فريقنا هنا لمساعدتك.',
        heroButtonText: 'إرسال استفسار',
        formTitle: 'نحن هنا لـ',
        formTitleHighlight: 'مساعدتك',
        formSubtitle: 'املأ النموذج أدناه وسيرد عليك فريقنا خلال 24 ساعة في أيام العمل.',
        formPrivacyText: 'معلوماتك خاصة ولن تتم مشاركتها أبداً.',
        enquiryTypes: [
          { label: 'استفسار عام' },
          { label: 'طلب شراكة' },
          { label: 'ملاحظات المنتجات' }
        ],
        b2bTitle: 'الاستفسارات التجارية',
        b2bDescription: 'للطلبات الكبيرة والشراكات والمقاهي.',
        contactEmailSubtext: 'راسلنا لأي مساعدة',
        contactPhoneSubtext: 'اتصل بنا',
        contactAddress: 'الرياض، المملكة العربية السعودية',
        contactAddressSubtext: 'المقر الرئيسي'
      }
    }
  ]

  for (const update of updates) {
    try {
      // First, get the document to see if it exists
      const existing = await payload.find({
        collection: update.collection as any,
        locale: 'en'
      })
      
      const doc = existing.docs[0]
      if (doc) {
        // Update existing with Arabic translations
        await payload.update({
          collection: update.collection as any,
          id: doc.id,
          data: update.data,
          locale: 'ar'
        })
        console.log(`Updated ${update.collection} with Arabic content`)
      } else {
        // Create if it doesn't exist
        await payload.create({
          collection: update.collection as any,
          data: update.data,
          locale: 'ar'
        })
        console.log(`Created ${update.collection} with Arabic content`)
      }
    } catch (e) {
      console.error(`Error updating ${update.collection}:`, e)
    }
  }

  process.exit(0)
}

run()
