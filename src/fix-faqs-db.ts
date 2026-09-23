import { MongoClient, ObjectId } from 'mongodb'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env') })

async function run() {
  try {
    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    
    // faq-hero-products
    const faqProdDoc = await db.collection('faq-hero-products').findOne({})
    if (faqProdDoc) {
      const enArray = [
        { question: "What makes Ness juices different from store-bought juices?", answer: "Ness juices are 100% cold-pressed from fresh fruits and vegetables daily. We use zero concentrates, zero artificial preservatives, and zero added sugars — just real produce, juiced fresh and delivered chilled.", id: new ObjectId() },
        { question: "Are Ness products suitable for children?", answer: "Yes! Our juices are made from natural ingredients with no artificial additives, making them a great choice for children. We recommend checking specific product labels for allergen information.", id: new ObjectId() },
        { question: "How long do Ness juices stay fresh?", answer: "Because we don't use preservatives, our cold-pressed juices have a shelf life of 3–5 days when kept refrigerated. Always check the label for the exact best-before date.", id: new ObjectId() },
        { question: "Where can I buy Ness products?", answer: "Ness products are available in select supermarkets, specialty health stores, and online delivery platforms across Saudi Arabia. Use our 'Find Ness' feature to locate the nearest stockist.", id: new ObjectId() }
      ]
      const arArray = [
        { question: "ما الذي يميز عصائر نس عن عصائر المتاجر؟", answer: "عصائر نس معصورة على البارد بنسبة 100٪ من الفواكه والخضروات الطازجة يومياً. لا نستخدم أي مركزات، ولا مواد حافظة صناعية، ولا سكريات مضافة - مجرد منتجات حقيقية، معصورة طازجة وتصلك مبردة.", id: enArray[0].id },
        { question: "هل منتجات نس مناسبة للأطفال؟", answer: "نعم! عصائرنا مصنوعة من مكونات طبيعية بدون أي إضافات صناعية، مما يجعلها خياراً رائعاً للأطفال. نوصي بالتحقق من ملصقات المنتجات الخاصة لمعلومات مسببات الحساسية.", id: enArray[1].id },
        { question: "كم تدوم طزاجة عصائر نس؟", answer: "لأننا لا نستخدم مواد حافظة، فإن عصائرنا المعصورة على البارد لها فترة صلاحية تتراوح بين 3 إلى 5 أيام عند حفظها في الثلاجة. تحقق دائماً من الملصق لمعرفة تاريخ انتهاء الصلاحية الدقيق.", id: enArray[2].id },
        { question: "أين يمكنني شراء منتجات نس؟", answer: "تتوفر منتجات نس في بعض المتاجر الكبرى، ومتاجر الصحة المتخصصة، ومنصات التوصيل عبر الإنترنت في جميع أنحاء المملكة العربية السعودية. استخدم ميزة 'أين تجد نس' لتحديد أقرب بائع.", id: enArray[3].id }
      ]
      
      await db.collection('faq-hero-products').updateOne(
        { _id: faqProdDoc._id },
        { $set: { "productFAQs": { en: enArray, ar: arArray } } }
      )
      console.log('Fixed faq-hero-products arrays in MongoDB')
    }

    // faq-health-nutritions
    const faqHealthDoc = await db.collection('faq-health-nutritions').findOne({})
    if (faqHealthDoc) {
      const enArray = [
        { question: "What ingredients do you use in your juices?", answer: "Every Ness product is made with 100% real fruits, vegetables, and natural botanicals. No artificial flavors, added sugars, concentrates, or preservatives — ever. Our ingredient list is always short and honest.", id: new ObjectId() },
        { question: "Are your products cold-pressed?", answer: "Yes. We use a hydraulic cold-press method that extracts more nutrients compared to centrifugal juicing. No heat means all the natural vitamins and enzymes are preserved at their peak.", id: new ObjectId() },
        { question: "Are your products vegan and allergen-free?", answer: "Yes, all our juices are 100% vegan. For specific allergens, please check the ingredient label on each bottle.", id: new ObjectId() },
        { question: "Where do you source your produce?", answer: "We source our fresh fruits and vegetables from trusted local farms and premium global suppliers to ensure the highest quality.", id: new ObjectId() }
      ]
      const arArray = [
        { question: "ما هي المكونات التي تستخدمونها في عصائركم؟", answer: "كل منتج من منتجات نس مصنوع من فواكه وخضروات ونباتات طبيعية 100٪. بدون نكهات صناعية، أو سكريات مضافة، أو مركزات، أو مواد حافظة - أبداً. قائمة مكوناتنا دائماً قصيرة وصادقة.", id: enArray[0].id },
        { question: "هل منتجاتكم معصورة على البارد؟", answer: "نعم. نحن نستخدم طريقة العصر الهيدروليكي البارد التي تستخلص المزيد من العناصر الغذائية مقارنة بالعصر المركزي. عدم وجود حرارة يعني أن جميع الفيتامينات والإنزيمات الطبيعية محفوظة في ذروتها.", id: enArray[1].id },
        { question: "هل منتجاتكم نباتية وخالية من مسببات الحساسية؟", answer: "نعم، جميع عصائرنا نباتية 100٪. للتحقق من مسببات حساسية معينة، يرجى قراءة ملصق المكونات على كل زجاجة.", id: enArray[2].id },
        { question: "من أين تحصلون على منتجاتكم؟", answer: "نحصل على الفواكه والخضروات الطازجة من مزارع محلية موثوقة وموردين عالميين متميزين لضمان أعلى جودة.", id: enArray[3].id }
      ]
      
      await db.collection('faq-health-nutritions').updateOne(
        { _id: faqHealthDoc._id },
        { $set: { "healthFAQs": { en: enArray, ar: arArray } } }
      )
      console.log('Fixed faq-health-nutritions arrays in MongoDB')
    }

    await client.close()
  } catch(e) {
    console.error(e)
  }
}
run()
