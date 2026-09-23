import { getPayload } from 'payload';
import configPromise from './payload.config';
import dotenv from 'dotenv';
dotenv.config();
process.env.PAYLOAD_SECRET = '1e4eb31556114b99e7d67310';

const run = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  console.log("Updating Members Hero...");
  await payload.update({
    collection: 'members-hero',
    id: '6a2946463469090e7ee1aa15',
    locale: 'en',
    data: {
      title: "Join the Freshness",
      subtitle: "Get first access to new blends, member-only offers, nutrition tips and simple recipes delivered straight from our kitchen.",
      button1Label: "Sign up now",
      button2Label: "Explore the range"
    }
  });
  await payload.update({
    collection: 'members-hero',
    id: '6a2946463469090e7ee1aa15',
    locale: 'ar',
    data: {
      title: "انضم إلى عالم الطزاجة",
      subtitle: "احصل على وصول مبكر للخلطات الجديدة، وعروض حصرية للأعضاء، ونصائح غذائية ووصفات بسيطة تصلك مباشرة من مطبخنا.",
      button1Label: "سجل الآن",
      button2Label: "اكتشف تشكيلتنا"
    }
  });

  console.log("Updating Members Why Join...");
  await payload.update({
    collection: 'members-why-join',
    id: '6a2945ed3469090e7ee1a9df',
    locale: 'en',
    data: {
      subtitle: "Why join?",
      title: "Freshness Comes With Perks",
      description: "Ness Members Club keeps you closer to what's new, what's fresh, and where to find it.",
      perks: [
        {
          number: "01",
          title: "Early access",
          description: "Be the first to taste new juices, smoothies and seasonal flavours."
        },
        {
          number: "02",
          title: "Exclusive offers",
          description: "Enjoy special bundles and limited releases available only to members."
        },
        {
          number: "03",
          title: "Fresh inspiration",
          description: "Receive easy recipes, nutrition tips and ways to fit Ness into your daily routine."
        }
      ]
    }
  });
  await payload.update({
    collection: 'members-why-join',
    id: '6a2945ed3469090e7ee1a9df',
    locale: 'ar',
    data: {
      subtitle: "لماذا الانضمام؟",
      title: "الطزاجة تأتي بمزايا",
      description: "نادي أعضاء نِس يبقيك أقرب إلى كل ما هو جديد، وكل ما هو طازج، وأين تجده.",
      perks: [
        {
          number: "01",
          title: "وصول مبكر",
          description: "كن أول من يتذوق العصائر الجديدة والسموذي والنكهات الموسمية."
        },
        {
          number: "02",
          title: "عروض حصرية",
          description: "استمتع بباقات خاصة وإصدارات محدودة متوفرة فقط للأعضاء."
        },
        {
          number: "03",
          title: "إلهام طازج",
          description: "احصل على وصفات سهلة، نصائح غذائية وطرق لإدخال نِس في روتينك اليومي."
        }
      ]
    }
  });

  console.log("Updating Members How It Works...");
  await payload.update({
    collection: 'members-how-it-works',
    id: '6a2959573469090e7ee1b06e',
    locale: 'en',
    data: {
      sectionLabel: "How It Works",
      title: "Join In 3 Simple Steps",
      steps: [
        {
          title: "Sign up",
          description: "Share your name, email and city."
        },
        {
          title: "Tell us your favourites",
          description: "Choose juices, smoothies or wellness shots—so we know what to send you."
        },
        {
          title: "Stay close",
          description: "We'll send you updates, offers and fresh ideas—no spam, just pure freshness."
        }
      ]
    }
  });
  await payload.update({
    collection: 'members-how-it-works',
    id: '6a2959573469090e7ee1b06e',
    locale: 'ar',
    data: {
      sectionLabel: "كيف تعمل",
      title: "انضم في 3 خطوات بسيطة",
      steps: [
        {
          title: "الاشتراك",
          description: "شاركنا اسمك وبريدك الإلكتروني ومدينتك."
        },
        {
          title: "أخبرنا بمفضلاتك",
          description: "اختر ما تفضله من العصائر أو السموذي أو اللقطات الصحية لنعرف ما نرسله لك."
        },
        {
          title: "ابق قريباً",
          description: "سنرسل لك التحديثات والعروض والأفكار الطازجة - بدون رسائل مزعجة، فقط طزاجة نقية."
        }
      ]
    }
  });

  console.log("Updating Members Bring Freshness...");
  await payload.update({
    collection: 'members-bring-freshness',
    id: '6a294e5a3469090e7ee1ae62',
    locale: 'en',
    data: {
      title: "Bring Freshness to Your Circle",
      description: "Know someone who loves real juice? Invite them to join the Members Club and share the freshness.",
      buttonText: "Invite a friend"
    }
  });
  await payload.update({
    collection: 'members-bring-freshness',
    id: '6a294e5a3469090e7ee1ae62',
    locale: 'ar',
    data: {
      title: "انقل الطزاجة إلى دائرتك",
      description: "هل تعرف شخصاً يحب العصير الطبيعي؟ ادعُه للانضمام إلى نادي الأعضاء وشارك الطزاجة.",
      buttonText: "دعوة صديق"
    }
  });

  console.log("Updating Members Sign Up...");
  await payload.update({
    collection: 'members-sign-up',
    id: '6a2a3e10014a3d3556e35907',
    locale: 'en',
    data: {
      title: "Become a Ness Member"
    }
  });
  await payload.update({
    collection: 'members-sign-up',
    id: '6a2a3e10014a3d3556e35907',
    locale: 'ar',
    data: {
      title: "كن عضواً في نِس"
    }
  });

  console.log("All done!");
  process.exit(0);
};

run().catch(console.error);
