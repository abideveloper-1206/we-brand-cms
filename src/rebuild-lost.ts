import { getPayload } from 'payload'
import config from './payload.config'

async function run() {
  const payload = await getPayload({ config })
  console.log('Rebuilding lost arrays with EN and AR texts...')

  // 1. Home Hero Sections
  const heroDocs = await payload.find({ collection: 'home-hero-section' })
  if (heroDocs.docs.length > 0) {
    const heroId = heroDocs.docs[0].id
    await payload.update({
      collection: 'home-hero-section',
      id: heroId,
      data: {
        highlights: [
          { label: { en: '100% Fresh', ar: 'عضوي 100%' } },
          { label: { en: '100% Cold Pressed', ar: 'بدون سكر مضاف' } },
          { label: { en: '0% Concentrates', ar: 'طازج يوميا' } },
          { label: { en: 'Juiced Daily', ar: 'منعش دائما' } }
        ]
      } as any,
      locale: 'all' as any // pass all locales at once using object syntax if supported, but Payload 'all' locale for updating localized arrays requires specific format. 
      // Actually, better to do it locale by locale or pass `locale: 'all'` and structure as `{ label: { en: '', ar: '' } }`.
    })
    console.log('Rebuilt home-hero-sections highlights')
  }

  // 2. FAQ Product
  const faqProdDocs = await payload.find({ collection: 'faq-hero-product' })
  if (faqProdDocs.docs.length > 0) {
    const faqProdId = faqProdDocs.docs[0].id
    await payload.update({
      collection: 'faq-hero-product',
      id: faqProdId,
      data: {
        productFAQs: [
          {
            question: { en: "What makes Ness juices different from store-bought juices?", ar: "ما الذي يميز عصائر نس عن عصائر المتاجر؟" },
            answer: { en: "Ness juices are 100% cold-pressed from fresh fruits and vegetables daily. We use zero concentrates, zero artificial preservatives, and zero added sugars — just real produce, juiced fresh and delivered chilled.", ar: "عصائر نس معصورة على البارد بنسبة 100٪ من الفواكه والخضروات الطازجة يومياً. لا نستخدم أي مركزات، ولا مواد حافظة صناعية، ولا سكريات مضافة - مجرد منتجات حقيقية، معصورة طازجة وتصلك مبردة." }
          },
          {
            question: { en: "Are Ness products suitable for children?", ar: "هل منتجات نس مناسبة للأطفال؟" },
            answer: { en: "Yes! Our juices are made from natural ingredients with no artificial additives, making them a great choice for children. We recommend checking specific product labels for allergen information.", ar: "نعم! عصائرنا مصنوعة من مكونات طبيعية بدون أي إضافات صناعية، مما يجعلها خياراً رائعاً للأطفال. نوصي بالتحقق من ملصقات المنتجات الخاصة لمعلومات مسببات الحساسية." }
          },
          {
            question: { en: "How long do Ness juices stay fresh?", ar: "كم تدوم طزاجة عصائر نس؟" },
            answer: { en: "Because we don't use preservatives, our cold-pressed juices have a shelf life of 3–5 days when kept refrigerated. Always check the label for the exact best-before date.", ar: "لأننا لا نستخدم مواد حافظة، فإن عصائرنا المعصورة على البارد لها فترة صلاحية تتراوح بين 3 إلى 5 أيام عند حفظها في الثلاجة. تحقق دائماً من الملصق لمعرفة تاريخ انتهاء الصلاحية الدقيق." }
          },
          {
            question: { en: "Where can I buy Ness products?", ar: "أين يمكنني شراء منتجات نس؟" },
            answer: { en: "Ness products are available in select supermarkets, specialty health stores, and online delivery platforms across Saudi Arabia. Use our 'Find Ness' feature to locate the nearest stockist.", ar: "تتوفر منتجات نس في بعض المتاجر الكبرى، ومتاجر الصحة المتخصصة، ومنصات التوصيل عبر الإنترنت في جميع أنحاء المملكة العربية السعودية. استخدم ميزة 'أين تجد نس' لتحديد أقرب بائع." }
          },
          {
            question: { en: "Do you offer bulk or wholesale orders?", ar: "هل توفرون طلبات الجملة؟" },
            answer: { en: "Yes, we partner with cafés, hotels, gyms, and corporate clients across KSA. Visit our Partner page or contact us directly to discuss your wholesale requirements.", ar: "نعم، نحن نتعاون مع المقاهي والفنادق والنوادي الرياضية والعملاء من الشركات في جميع أنحاء المملكة العربية السعودية. قم بزيارة صفحة الشركاء أو اتصل بنا مباشرة لمناقشة متطلبات الجملة الخاصة بك." }
          },
          {
            question: { en: "Are your products certified halal?", ar: "هل منتجاتكم معتمدة كحلال؟" },
            answer: { en: "Yes, all Ness products are 100% halal certified. Our production facilities strictly adhere to halal standards and are regularly audited.", ar: "نعم، جميع منتجات نس معتمدة كحلال بنسبة 100٪. تلتزم منشآت الإنتاج لدينا التزاماً صارماً بمعايير الحلال وتخضع للتدقيق بانتظام." }
          },
          {
            question: { en: "Can I customise a juice blend for my business?", ar: "هل يمكنني تخصيص مزيج عصير لعملي؟" },
            answer: { en: "Absolutely. We offer private label and custom blend programs for B2B clients. Get in touch with our sales team to explore what's possible for your brand.", ar: "بالتأكيد. نحن نقدم برامج العلامات الخاصة والمزائج المخصصة لعملاء B2B. تواصل مع فريق المبيعات لدينا لاستكشاف ما يمكن القيام به لعلامتك التجارية." }
          },
          {
            question: { en: "How do I join the Ness Members Club?", ar: "كيف أنضم إلى نادي أعضاء نس؟" },
            answer: { en: "Simply head to our Members page, fill in your details, choose your preferences, and you're in. Members get early access to new products, exclusive offers, and fresh updates.", ar: "ببساطة توجه إلى صفحة الأعضاء، املأ بياناتك، اختر تفضيلاتك، وستكون قد انضممت. يحصل الأعضاء على وصول مبكر للمنتجات الجديدة والعروض الحصرية وآخر التحديثات." }
          }
        ]
      } as any,
      locale: 'all' as any
    })
    console.log('Rebuilt faq-hero-product')
  }

  // 3. FAQ Health
  const faqHealthDocs = await payload.find({ collection: 'faq-health-nutrition' })
  if (faqHealthDocs.docs.length > 0) {
    const faqHealthId = faqHealthDocs.docs[0].id
    await payload.update({
      collection: 'faq-health-nutrition',
      id: faqHealthId,
      data: {
        healthFAQs: [
          {
            question: { en: "What ingredients do you use in your juices?", ar: "ما هي المكونات التي تستخدمونها في عصائركم؟" },
            answer: { en: "Every Ness product is made with 100% real fruits, vegetables, and natural botanicals. No artificial flavors, added sugars, concentrates, or preservatives — ever. Our ingredient list is always short and honest.", ar: "كل منتج من منتجات نس مصنوع من فواكه وخضروات ونباتات طبيعية 100٪. بدون نكهات صناعية، أو سكريات مضافة، أو مركزات، أو مواد حافظة - أبداً. قائمة مكوناتنا دائماً قصيرة وصادقة." }
          },
          {
            question: { en: "Are your products cold-pressed?", ar: "هل منتجاتكم معصورة على البارد؟" },
            answer: { en: "Yes. We use a hydraulic cold-press method that extracts more nutrients compared to centrifugal juicing. No heat means all the natural vitamins and enzymes are preserved at their peak.", ar: "نعم. نحن نستخدم طريقة العصر الهيدروليكي البارد التي تستخلص المزيد من العناصر الغذائية مقارنة بالعصر المركزي. عدم وجود حرارة يعني أن جميع الفيتامينات والإنزيمات الطبيعية محفوظة في ذروتها." }
          },
          {
            question: { en: "Are your products vegan and allergen-free?", ar: "هل منتجاتكم نباتية وخالية من مسببات الحساسية؟" },
            answer: { en: "Yes, all our juices are 100% vegan. For specific allergens, please check the ingredient label on each bottle.", ar: "نعم، جميع عصائرنا نباتية 100٪. للتحقق من مسببات حساسية معينة، يرجى قراءة ملصق المكونات على كل زجاجة." }
          },
          {
            question: { en: "Where do you source your produce?", ar: "من أين تحصلون على منتجاتكم؟" },
            answer: { en: "We source our fresh fruits and vegetables from trusted local farms and premium global suppliers to ensure the highest quality.", ar: "نحصل على الفواكه والخضروات الطازجة من مزارع محلية موثوقة وموردين عالميين متميزين لضمان أعلى جودة." }
          },
          {
            question: { en: "Do you offer bundles or variety packs?", ar: "هل تقدمون باقات أو عبوات متنوعة؟" },
            answer: { en: "Yes, we offer a range of bundles and variety packs. Check out our 'Range' page for more details.", ar: "نعم، نحن نقدم مجموعة من الباقات والعبوات المتنوعة. تحقق من صفحة 'منتجاتنا' لمزيد من التفاصيل." }
          },
          {
            question: { en: "Are your products suitable for diabetics?", ar: "هل منتجاتكم مناسبة لمرضى السكري؟" },
            answer: { en: "Our juices contain naturally occurring sugars from fruit. We recommend consulting with your healthcare provider if you have specific dietary requirements.", ar: "تحتوي عصائرنا على سكريات طبيعية من الفواكه. نوصي باستشارة طبيبك إذا كان لديك متطلبات غذائية خاصة." }
          },
          {
            question: { en: "How many calories are in your juices?", ar: "كم عدد السعرات الحرارية في عصائركم؟" },
            answer: { en: "Calorie content varies by flavor. You can find detailed nutritional information on each product's label and on our website.", ar: "يختلف محتوى السعرات الحرارية باختلاف النكهة. يمكنك العثور على معلومات غذائية مفصلة على ملصق كل منتج وعلى موقعنا الإلكتروني." }
          },
          {
            question: { en: "What's the best time to drink your juices?", ar: "ما هو أفضل وقت لشرب عصائركم؟" },
            answer: { en: "Anytime! Many of our customers enjoy our juices first thing in the morning for a refreshing start, or as an afternoon energy boost.", ar: "في أي وقت! يستمتع العديد من عملائنا بعصائرنا في الصباح الباكر لبداية منعشة، أو كمعزز للطاقة في فترة ما بعد الظهر." }
          }
        ]
      } as any,
      locale: 'all' as any
    })
    console.log('Rebuilt faq-health-nutrition')
  }

  // 4. Contact Content
  const contactDocs = await payload.find({ collection: 'contact-content' })
  if (contactDocs.docs.length > 0) {
    const contactId = contactDocs.docs[0].id
    await payload.update({
      collection: 'contact-content',
      id: contactId,
      data: {
        enquiryTypes: [
          { label: { en: "Order Support", ar: "دعم الطلبات" } },
          { label: { en: "Wholesale", ar: "طلبات الجملة" } },
          { label: { en: "Partnerships", ar: "شراكات" } },
          { label: { en: "Feedback", ar: "الملاحظات" } }
        ]
      } as any,
      locale: 'all' as any
    })
    console.log('Rebuilt contact-content')
  }

  process.exit(0)
}

run()
