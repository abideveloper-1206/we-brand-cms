import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://devprosperoustech_db_user:hm7NWAtE0Fm4sHDF@prosperousdevelopment.tkztwlf.mongodb.net/barkat-payload-cms";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('barkat-payload-cms');
    const now = new Date();

    // 1. members-heros
    await db.collection('members-heros').updateOne(
      { _id: new ObjectId("6a2946463469090e7ee1aa15") },
      {
        $set: {
          updatedAt: now,
          title: {
            en: "Join the Freshness",
            ar: "انضم إلى عالم الطزاجة"
          },
          subtitle: {
            en: "Get first access to new blends, member-only offers, nutrition tips and simple recipes delivered straight from our kitchen.",
            ar: "احصل على وصول مبكر للخلطات الجديدة، وعروض حصرية للأعضاء، ونصائح غذائية ووصفات بسيطة تصلك مباشرة من مطبخنا."
          },
          button1Label: {
            en: "Sign up now",
            ar: "سجل الآن"
          },
          button2Label: {
            en: "Explore the range",
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
          updatedAt: now,
          subtitle: {
            en: "Why join?",
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
                title: "Early access",
                description: "Be the first to taste new juices, smoothies and seasonal flavours.",
                id: new ObjectId().toString()
              },
              {
                number: "02",
                title: "Exclusive offers",
                description: "Enjoy special bundles and limited releases available only to members.",
                id: new ObjectId().toString()
              },
              {
                number: "03",
                title: "Fresh inspiration",
                description: "Receive easy recipes, nutrition tips and ways to fit Ness into your daily routine.",
                id: new ObjectId().toString()
              }
            ],
            ar: [
              {
                number: "01",
                title: "وصول مبكر",
                description: "كن أول من يتذوق العصائر الجديدة والسموذي والنكهات الموسمية.",
                id: new ObjectId().toString()
              },
              {
                number: "02",
                title: "عروض حصرية",
                description: "استمتع بباقات خاصة وإصدارات محدودة متوفرة فقط للأعضاء.",
                id: new ObjectId().toString()
              },
              {
                number: "03",
                title: "إلهام طازج",
                description: "احصل على وصفات سهلة، نصائح غذائية وطرق لإدخال نِس في روتينك اليومي.",
                id: new ObjectId().toString()
              }
            ]
          }
        }
      }
    );
    console.log("Updated members-why-joins");

    // 5. members-how-it-works
    await db.collection('members-how-it-works').updateOne(
      { _id: new ObjectId("6a2959573469090e7ee1b06e") },
      {
        $set: {
          updatedAt: now,
          sectionLabel: {
            en: "How It Works",
            ar: "كيف تعمل"
          },
          title: {
            en: "Join In 3 Simple Steps",
            ar: "انضم في 3 خطوات بسيطة"
          },
          steps: {
            en: [
              {
                title: "Sign up",
                description: "Share your name, email and city.",
                id: new ObjectId().toString()
              },
              {
                title: "Tell us your favourites",
                description: "Choose juices, smoothies or wellness shots—so we know what to send you.",
                id: new ObjectId().toString()
              },
              {
                title: "Stay close",
                description: "We'll send you updates, offers and fresh ideas—no spam, just pure freshness.",
                id: new ObjectId().toString()
              }
            ],
            ar: [
              {
                title: "الاشتراك",
                description: "شاركنا اسمك وبريدك الإلكتروني ومدينتك.",
                id: new ObjectId().toString()
              },
              {
                title: "أخبرنا بمفضلاتك",
                description: "اختر ما تفضله من العصائر أو السموذي أو اللقطات الصحية لنعرف ما نرسله لك.",
                id: new ObjectId().toString()
              },
              {
                title: "ابق قريباً",
                description: "سنرسل لك التحديثات والعروض والأفكار الطازجة - بدون رسائل مزعجة، فقط طزاجة نقية.",
                id: new ObjectId().toString()
              }
            ]
          }
        }
      }
    );
    console.log("Updated members-how-it-works");

    // 4. members-bring-freshnesses
    await db.collection('members-bring-freshnesses').updateOne(
      { _id: new ObjectId("6a294e5a3469090e7ee1ae62") },
      {
        $set: {
          updatedAt: now,
          title: {
            en: "Bring Freshness to Your Circle",
            ar: "انقل الطزاجة إلى دائرتك"
          },
          description: {
            en: "Know someone who loves real juice? Invite them to join the Members Club and share the freshness.",
            ar: "هل تعرف شخصاً يحب العصير الطبيعي؟ ادعُه للانضمام إلى نادي الأعضاء وشارك الطزاجة."
          },
          buttonText: {
            en: "Invite a friend",
            ar: "دعوة صديق"
          }
        }
      }
    );
    console.log("Updated members-bring-freshnesses");

  } finally {
    await client.close();
  }
}

main().catch(console.error);
