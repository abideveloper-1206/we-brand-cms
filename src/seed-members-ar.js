import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://devprosperoustech_db_user:hm7NWAtE0Fm4sHDF@prosperousdevelopment.tkztwlf.mongodb.net/barkat-payload-cms";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('barkat-payload-cms');

    // 1. members-heros
    await db.collection('members-heros').updateOne(
      { _id: new ObjectId("6a2946463469090e7ee1aa15") },
      {
        $set: {
          title: {
            en: "Join the Freshness",
            ar: "انضم إلى عالم الطزاجة"
          },
          subtitle: {
            en: "Be first to know about new juice drops, seasonal blends, retail availability, fresh offers, and member-only updates across KSA.",
            ar: "كن أول من يعرف عن إطلاقات العصائر الجديدة، والخلطات الموسمية، وتوفرها في محلات التجزئة، والعروض الطازجة، وتحديثات الأعضاء الحصرية في جميع أنحاء المملكة."
          },
          button1Label: {
            en: "Join The Members Club",
            ar: "انضم إلى نادي الأعضاء"
          },
          button2Label: {
            en: "Explore The Range",
            ar: "اكتشف تشكيلتنا"
          }
        }
      }
    );
    console.log("Updated members-heros");

    // 2. members-why-joins
    await db.collection('members-why-joins').updateOne(
      { _id: new ObjectId("6a2945ed3469090e7ee1a9df") },
      {
        $set: {
          subtitle: {
            en: "Why Join",
            ar: "لماذا الانضمام؟"
          },
          title: {
            en: "Freshness Comes With Perks",
            ar: "الطزاجة تأتي بمزايا"
          },
          description: {
            en: "Ness Members Club keeps you closer to what's new, what's fresh, and where to find it.",
            ar: "نادي أعضاء نِس يبقيك أقرب إلى كل ما هو جديد، وكل ما هو طازج، وأين تجده."
          },
          perks: {
            en: [
              {
                number: "01",
                title: "Early Product Access",
                description: "Be the first to know when Ness launches new juices, smoothies, wellness shots, and seasonal blends.",
                id: "6a294930722978b158652db5"
              },
              {
                number: "02",
                title: "Member-Only Offers",
                description: "Get access to exclusive bundles, limited drops, and special offers created for Ness members.",
                id: "6a294951722978b158652db7"
              },
              {
                number: "03",
                title: "Find Ness Faster",
                description: "Receive updates when Ness becomes available in new stores, retail partners, and online channels.",
                id: "6a294967722978b158652db9"
              },
              {
                number: "04",
                title: "Fresh Living Inspiration",
                description: "Get simple ideas for adding fresh juices into your morning, workday, fitness routine, and family moments.",
                id: "6a29497e722978b158652dbb"
              }
            ],
            ar: [
              {
                number: "01",
                title: "وصول مبكر للمنتجات",
                description: "كن أول من يعلم عندما تطلق نِس عصائر جديدة، سموذي، لقطات صحية، وخلطات موسمية.",
                id: "6a294930722978b158652db5"
              },
              {
                number: "02",
                title: "عروض للأعضاء فقط",
                description: "احصل على عروض مخصصة وباقات حصرية وإصدارات محدودة مصممة خصيصاً لأعضاء نِس.",
                id: "6a294951722978b158652db7"
              },
              {
                number: "03",
                title: "اعثر على نِس أسرع",
                description: "تلقى تحديثات فورية عندما تتوفر منتجات نِس في متاجر جديدة، لدى شركاء التجزئة، أو تطبيقات التوصيل.",
                id: "6a294967722978b158652db9"
              },
              {
                number: "04",
                title: "إلهام لحياة مفعمة بالطزاجة",
                description: "احصل على أفكار بسيطة لإدخال العصائر الطازجة في روتينك الصباحي، يوم عملك، تمارينك الرياضية، ولحظاتك العائلية.",
                id: "6a29497e722978b158652dbb"
              }
            ]
          }
        }
      }
    );
    console.log("Updated members-why-joins");

    // 3. members-daily-freshnesses
    await db.collection('members-daily-freshnesses').updateOne(
      { _id: new ObjectId("6a294c8d3469090e7ee1ad1b") },
      {
        $set: {
          sectionLabel: {
            en: "DAILY FRESHNESS",
            ar: "طزاجة يومية"
          },
          title: {
            en: "Made for People Who Choose Fresh Daily",
            ar: "مصنوع للأشخاص الذين يختارون الطازج يومياً"
          },
          description: {
            en: "For those who care about what goes into their body, where their drinks come from, and how freshness fits everyday life.",
            ar: "لأولئك الذين يهتمون بما يدخل أجسامهم، ومن أين تأتي مشروباتهم، وكيف تتناسب الطزاجة مع الحياة اليومية."
          },
          "cards.0.title": {
            en: "Morning Reset",
            ar: "إعادة ضبط الصباح"
          },
          "cards.0.description": {
            en: "Start your day with real fruit, clean taste, and fresh energy.",
            ar: "ابدأ يومك بفواكه حقيقية، ومذاق نقي، وطاقة طازجة."
          },
          "cards.0.buttonText": {
            en: "Explore",
            ar: "استكشف"
          },
          "cards.1.title": {
            en: "On-the-Go Freshness",
            ar: "طزاجة أثناء التنقل"
          },
          "cards.1.description": {
            en: "Stay refreshed at work, while travelling, or between meetings.",
            ar: "ابق منتعشًا في العمل، أثناء السفر، أو بين الاجتماعات."
          },
          "cards.1.buttonText": {
            en: "Explore",
            ar: "استكشف"
          },
          "cards.2.title": {
            en: "Family Stock-Up",
            ar: "تموين العائلة"
          },
          "cards.2.description": {
            en: "Discover packs, new flavours, and retail availability for your home fridge.",
            ar: "اكتشف حزمًا، نكهات جديدة، وتوافر البيع بالتجزئة لثلاجتك المنزلية."
          },
          "cards.2.buttonText": {
            en: "Explore",
            ar: "استكشف"
          }
        }
      }
    );
    console.log("Updated members-daily-freshnesses");

    // 4. members-bring-freshnesses
    await db.collection('members-bring-freshnesses').updateOne(
      { _id: new ObjectId("6a294e5a3469090e7ee1ae62") },
      {
        $set: {
          title: {
            en: "Bring Freshness to Your Circle",
            ar: "انقل الطزاجة إلى دائرتك"
          },
          description: {
            en: "Know someone who would love Ness? Invite them to join the Members Club and share the freshness.",
            ar: "هل تعرف شخصاً قد يحب نِس؟ ادعُه للانضمام إلى نادي الأعضاء وشاركهم الطزاجة."
          },
          buttonText: {
            en: "Invite a friend",
            ar: "دعوة صديق"
          }
        }
      }
    );
    console.log("Updated members-bring-freshnesses");

    // 5. members-how-it-works
    await db.collection('members-how-it-works').updateOne(
      { _id: new ObjectId("6a2959573469090e7ee1b06e") },
      {
        $set: {
          sectionLabel: {
            en: "How It Works",
            ar: "كيف تعمل"
          },
          title: {
            en: "Join in 3 Simple Steps",
            ar: "انضم في 3 خطوات بسيطة"
          },
          "steps.0.title": {
            en: "Sign Up",
            ar: "الاشتراك"
          },
          "steps.0.description": {
            en: "Share your name, email and city.",
            ar: "شاركنا اسمك، بريدك الإلكتروني ومدينتك."
          },
          "steps.1.title": {
            en: "Tell us your favourites",
            ar: "أخبرنا بمفضلاتك"
          },
          "steps.1.description": {
            en: "Choose juices, smoothies or wellness shots—so we know what to send you.",
            ar: "اختر ما تفضله من العصائر أو السموذي أو اللقطات الصحية لنعرف ما نرسله لك."
          },
          "steps.2.title": {
            en: "Stay close",
            ar: "ابقَ قريباً"
          },
          "steps.2.description": {
            en: "We'll send you updates, offers and fresh ideas—no spam, just pure freshness.",
            ar: "سنرسل لك التحديثات والعروض والأفكار الطازجة - بدون رسائل مزعجة، فقط طزاجة نقية."
          }
        }
      }
    );
    console.log("Updated members-how-it-works");

    // 6. members-sign-ups
    await db.collection('members-sign-ups').updateOne(
      { _id: new ObjectId("6a2a3e10014a3d3556e35907") },
      {
        $set: {
          sectionLabel: {
            en: "Sign Up",
            ar: "اشتراك"
          },
          title: {
            en: "Become A Ness Member",
            ar: "كن عضواً في نِس"
          },
          description: {
            en: "No spam. Just fresh updates, offers, and product drops from Ness.",
            ar: "بدون رسائل مزعجة. فقط تحديثات طازجة، وعروض، وإطلاقات حصرية للمنتجات من نِس."
          },
          overlayText: {
            en: "Tell us what you love.<br/>We'll keep<br/>you closer to what's<br/>fresh.",
            ar: "أخبرنا بما تحب.<br/>سنبقيك<br/>أقرب إلى ما هو<br/>طازج."
          }
        }
      }
    );
    console.log("Updated members-sign-ups");

  } finally {
    await client.close();
  }
}

main().catch(console.error);
