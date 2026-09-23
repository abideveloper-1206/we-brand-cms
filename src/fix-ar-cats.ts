import { getPayload } from 'payload';
import configPromise from './payload.config';
import dotenv from 'dotenv';
dotenv.config();

const data = {
  juices: {
    en: "Classic flavours like Orange and Green Detox—crisp, nutrient-dense and bottled for your daily reset. Available in 250 ml, 500 ml and 1 L sizes.",
    ar: "نكهات كلاسيكية مثل البرتقال والديتوكس الأخضر - منعشة، غنية بالعناصر الغذائية ومعبأة لتجديد نشاطك اليومي. متوفرة بأحجام 250 مل و 500 مل و 1 لتر."
  },
  smoothies: {
    en: "Rich, velvety blends such as Avocado—designed to elevate speciality counters and home routines.",
    ar: "مزيج غني ومخملي مثل الأفوكادو - مصمم للارتقاء بطاولات التقديم الخاصة والروتين المنزلي."
  },
  cutFruits: {
    en: "Perfectly ripened selections washed and packed for buffets, salads and retail shelves.",
    ar: "تشكيلات ناضجة تماماً، مغسولة ومعبأة للبوفيهات والسلطات ورفوف البيع بالتجزئة."
  },
  cutVegetables: {
    en: "Perfectly ripened selections washed and packed for buffets, salads and retail shelves.",
    ar: "تشكيلات ناضجة تماماً، مغسولة ومعبأة للبوفيهات والسلطات ورفوف البيع بالتجزئة."
  }
};

const categoryMap = {
  'Juices': data.juices,
  'Smoothies': data.smoothies,
  'Cut Fruits': data.cutFruits,
  'Cut Vegetables': data.cutVegetables
};

async function main() {
  const payload = await getPayload({
    config: configPromise,
  });

  const cats = await payload.find({
    collection: 'categories',
    limit: 100,
    locale: 'all',
  });

  for (const doc of cats.docs) {
    const textData = categoryMap[((doc.name as any)?.en || doc.name) as keyof typeof categoryMap];
    if (textData) {
      await payload.update({
        collection: 'categories',
        id: doc.id,
        data: {
          subText: textData.ar,
        },
        locale: 'ar',
      });
      
      await payload.update({
        collection: 'categories',
        id: doc.id,
        data: {
          subText: textData.en,
        },
        locale: 'en',
      });
      console.log('Updated AR and EN for', doc.name);
    }
  }

  process.exit(0);
}

main();
