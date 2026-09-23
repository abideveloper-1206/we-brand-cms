import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://devprosperoustech_db_user:hm7NWAtE0Fm4sHDF@prosperousdevelopment.tkztwlf.mongodb.net/barkat-payload-cms";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('barkat-payload-cms');
    const now = new Date();

    // 1. faq-hero-products
    await db.collection('faq-hero-products').updateOne(
      { _id: new ObjectId("6a2a5ef96fa10d3b74f28318") },
      {
        $set: {
          updatedAt: now,
          heroTagline: {
            en: "ROOTED IN NATURE",
            ar: "متأصل في الطبيعة"
          },
          heroTitle: {
            en: "FAQ",
            ar: "الأسئلة الشائعة"
          },
          heroSubtitle: {
            en: "Frequently asked questions.",
            ar: "الأسئلة المتداولة بكثرة."
          },
          productFAQs: {
            en: [
              {
                question: "What ingredients do you use in your juices?",
                answer: "Every Ness product is made with 100% real fruits and vegetables. There are no artificial flavours, added sugars, concentrates or preservatives.",
                id: new ObjectId().toString()
              },
              {
                question: "Are your products cold-pressed and made daily?",
                answer: "Yes. We cold-press our juices each morning in Saudi Arabia to preserve nutrients and flavour.",
                id: new ObjectId().toString()
              },
              {
                question: "How long do Ness juices stay fresh?",
                answer: "Because we don't use preservatives, our juices typically last 3-5 days when kept refrigerated. Always check the label for the best-before date.",
                id: new ObjectId().toString()
              },
              {
                question: "Where do you source your produce?",
                answer: "We work directly with trusted local farms and selected global suppliers to ensure quality and traceability.",
                id: new ObjectId().toString()
              },
              {
                question: "Do you offer bundles or variety packs?",
                answer: "Yes. Visit our Range page to see curated packs for home, offices or hospitality.",
                id: new ObjectId().toString()
              }
            ],
            ar: [
              {
                question: "ما هي المكونات التي تستخدمونها في عصائركم؟",
                answer: "كل منتج من نِس مصنوع من فواكه وخضروات حقيقية بنسبة 100%. لا توجد نكهات صناعية أو سكريات مضافة أو مركزات أو مواد حافظة.",
                id: new ObjectId().toString()
              },
              {
                question: "هل منتجاتكم معصورة على البارد وتُصنع يومياً؟",
                answer: "نعم. نحن نعصر عصائرنا على البارد كل صباح في المملكة العربية السعودية للحفاظ على العناصر الغذائية والنكهة.",
                id: new ObjectId().toString()
              },
              {
                question: "إلى متى تبقى عصائر نِس طازجة؟",
                answer: "نظراً لعدم استخدامنا مواد حافظة، تدوم عصائرنا عادةً من 3 إلى 5 أيام عند حفظها في الثلاجة. تحقق دائماً من الملصق لمعرفة تاريخ انتهاء الصلاحية.",
                id: new ObjectId().toString()
              },
              {
                question: "من أين تحصلون على منتجاتكم؟",
                answer: "نحن نعمل مباشرة مع مزارع محلية موثوقة وموردين عالميين مختارين لضمان الجودة وإمكانية التتبع.",
                id: new ObjectId().toString()
              },
              {
                question: "هل تقدمون باقات أو مجموعات متنوعة؟",
                answer: "نعم. تفضل بزيارة صفحة تشكيلتنا لرؤية الباقات المنسقة للمنزل أو المكاتب أو الضيافة.",
                id: new ObjectId().toString()
              }
            ]
          }
        }
      }
    );
    console.log("Updated faq-hero-products");

    // 2. faq-need-more-helps
    await db.collection('faq-need-more-helps').updateOne(
      { _id: new ObjectId("6a2a6b89171cf5a69a0bd4c6") },
      {
        $set: {
          updatedAt: now,
          title: {
            en: "Need more help?",
            ar: "هل تحتاج المزيد من المساعدة؟"
          },
          description: {
            en: "Can't find your answer? Our team of real people is happy to help. Send us a message and we'll typically reply within 24 hours—often sooner.",
            ar: "لم تجد إجابتك أعلاه؟ فريقنا مكون من أشخاص حقيقيين يسعدون بمساعدتك. أرسل لنا رسالة وسنرد عليك عادةً في غضون 24 ساعة — وغالباً قبل ذلك."
          },
          supportCards: {
            en: [
              {
                icon: new ObjectId("6a2a6c24171cf5a69a0bd530"),
                title: "Email Support",
                description: "Send us a detailed message and we'll get back to you within 24 hours — usually much sooner.",
                buttonText: "SEND MESSAGE",
                highlightCard: false,
                id: new ObjectId().toString()
              },
              {
                icon: new ObjectId("6a2a6cdc171cf5a69a0bd59e"),
                title: "Product Questions",
                description: "Curious about ingredients, allergens, or nutritional values? Our product team has all the details.",
                buttonText: "CHAT WITH US",
                highlightCard: true,
                id: new ObjectId().toString()
              },
              {
                icon: new ObjectId("6a2a6d08171cf5a69a0bd5e7"),
                title: "Wholesale & partnerships",
                description: "For wholesale, retail or partnership enquiries, please contact our B2B team here.",
                buttonText: "CONTACT US",
                highlightCard: false,
                id: new ObjectId().toString()
              }
            ],
            ar: [
              {
                icon: new ObjectId("6a2a6c24171cf5a69a0bd530"),
                title: "دعم البريد الإلكتروني",
                description: "أرسل لنا رسالة مفصلة وسنعاود الاتصال بك في غضون 24 ساعة — وعادة ما يكون أسرع بكثير.",
                buttonText: "إرسال رسالة",
                highlightCard: false,
                id: new ObjectId().toString()
              },
              {
                icon: new ObjectId("6a2a6cdc171cf5a69a0bd59e"),
                title: "أسئلة المنتجات",
                description: "هل تود معرفة المكونات أو مسببات الحساسية أو القيم الغذائية؟ يمتلك فريق منتجاتنا جميع التفاصيل.",
                buttonText: "تحدث معنا",
                highlightCard: true,
                id: new ObjectId().toString()
              },
              {
                icon: new ObjectId("6a2a6d08171cf5a69a0bd5e7"),
                title: "الجملة والشراكات",
                description: "لاستفسارات الجملة أو التجزئة أو الشراكة، يرجى التواصل مع فريق المبيعات هنا.",
                buttonText: "اتصل بنا",
                highlightCard: false,
                id: new ObjectId().toString()
              }
            ]
          }
        }
      }
    );
    console.log("Updated faq-need-more-helps");

  } finally {
    await client.close();
  }
}

main().catch(console.error);
