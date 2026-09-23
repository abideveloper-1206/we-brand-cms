import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://devprosperoustech_db_user:hm7NWAtE0Fm4sHDF@prosperousdevelopment.tkztwlf.mongodb.net/barkat-payload-cms";

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
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('barkat-payload-cms');
    const categories = db.collection('categories');

    const docs = await categories.find({}).toArray();
    for (const doc of docs) {
      // payload might store name as string or object if localized
      const name = typeof doc.name === 'object' ? doc.name.en : doc.name;
      const textData = categoryMap[name];
      if (textData) {
        await categories.updateOne(
          { _id: doc._id },
          {
            $set: {
              "subText": {
                "en": textData.en,
                "ar": textData.ar
              }
            }
          }
        );
        console.log(`Updated mongo AR and EN for ${name}`);
      }
    }

  } finally {
    await client.close();
  }
}

main().catch(console.error);



