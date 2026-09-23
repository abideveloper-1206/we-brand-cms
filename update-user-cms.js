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

async function updateCategories() {
  const catsReq = await fetch('http://localhost:3000/api/categories?limit=100');
  const cats = await catsReq.json();
  
  for (const doc of cats.docs) {
    const textData = categoryMap[doc.name];
    if (textData) {
      // Update EN
      await fetch(`http://localhost:3000/api/categories/${doc.id}?locale=en`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subText: textData.en })
      });
      // Update AR
      await fetch(`http://localhost:3000/api/categories/${doc.id}?locale=ar`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subText: textData.ar })
      });
      console.log(`Updated ${doc.name}`);
    }
  }
}

async function updateTheRange() {
  const theRangeEn = {
    freshRangeSection: {
      title: "Explore our fresh range",
      description: "Every Ness juice and smoothie is cold-pressed daily in Saudi Arabia from real fruit and nothing else. No concentrates. No compromises."
    }
  };

  const theRangeAr = {
    freshRangeSection: {
      title: "اكتشف تشكيلتنا الطازجة",
      description: "كل عصير وسموثي من نِس معصور على البارد يومياً في المملكة العربية السعودية من فواكه حقيقية ولا شيء غير ذلك. بدون مركزات. بدون مساومات."
    }
  };

  // Update EN
  await fetch(`http://localhost:3000/api/globals/the-range?locale=en`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(theRangeEn)
  });

  // Update AR
  await fetch(`http://localhost:3000/api/globals/the-range?locale=ar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(theRangeAr)
  });

  console.log('Updated The Range global');
}

async function main() {
  try {
    await updateCategories();
    await updateTheRange();
    console.log("Done updating CMS!");
  } catch (err) {
    console.error(err);
  }
}

main();
