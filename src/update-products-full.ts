import { getPayload } from 'payload';
import dotenv from 'dotenv';
import path from 'path';
import configPromise from './payload.config';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const productsData = [
  { file: 'Fruit Cubes.jpeg', category: 'Cut Fruits', color: '#7ECB20' },
  { file: 'Grape Mix.jpeg', category: 'Cut Fruits', color: '#662D91' },
  { file: 'Honeydew Melon Cubed.jpeg', category: 'Cut Fruits', color: '#D4E79E' },
  { file: 'Kiwi Wedges.psd', category: 'Cut Fruits', color: '#8EE53F' },
  { file: 'Mango Cubes Fresh.jpeg', category: 'Cut Fruits', color: '#FFC133' },
  { file: 'Apple Mix Cuts.jpeg', category: 'Cut Fruits', color: '#FF5733' },
  { file: 'Berry Mix.jpeg', category: 'Cut Fruits', color: '#E52B50' },
  { file: 'Cherry tomato.jpeg', category: 'Cut Fruits', color: '#D2143A' },
  { file: 'CUCUMBER DICED.jpg', category: 'Cut Fruits', color: '#366829' },
  { file: 'Cucumber.png', category: 'Cut Fruits', color: '#366829' },
  { file: 'eggplant.png', category: 'Cut Vegetables', color: '#48233C' },
  { file: 'GREEN BEANS HALF CUT.jpg', category: 'Cut Vegetables', color: '#5D9C45' },
  { file: 'Mixed Capsicum Cubes.jpeg', category: 'Cut Vegetables', color: '#E3242B' },
  { file: 'Baby Kale.png', category: 'Cut Vegetables', color: '#2E8B57' },
  { file: 'Baby Marrow.png', category: 'Cut Vegetables', color: '#A4C639' },
  { file: 'Beetroot cubes.png', category: 'Cut Vegetables', color: '#8A2BE2' },
  { file: 'Beetroot FinecutSliced.jpeg', category: 'Cut Vegetables', color: '#8A2BE2' },
  { file: 'beetroot peeled.png', category: 'Cut Vegetables', color: '#8A2BE2' },
  { file: 'Broccoli Florest.jpg', category: 'Cut Vegetables', color: '#228B22' },
  { file: 'Butternut pumpkin.png', category: 'Cut Vegetables', color: '#FF7518' },
  { file: 'Cabbeage Mix.jpg', category: 'Cut Vegetables', color: '#98FB98' },
  { file: 'Capsicum Green Chopped.png', category: 'Cut Vegetables', color: '#008000' },
  { file: 'capsicum Mixed.png', category: 'Cut Vegetables', color: '#FFD700' },
  { file: 'CARROT CUBES.jpg', category: 'Cut Vegetables', color: '#ED9121' },
  { file: 'Carrot Peeled Fresh.png', category: 'Cut Vegetables', color: '#ED9121' },
  { file: 'Carrot sliced.png', category: 'Cut Vegetables', color: '#ED9121' },
  { file: 'CARROT STRIPPED.jpg', category: 'Cut Vegetables', color: '#ED9121' },
  { file: 'CAULIFLOWER FLORETS.jpg', category: 'Cut Vegetables', color: '#D9E4C3' },
  { file: 'COLESLAW MIX.jpg', category: 'Cut Vegetables', color: '#D0F0C0' },
  { file: 'corriander.jpeg', category: 'Cut Vegetables', color: '#32CD32' },
];

function generateMockData(title: string, color: string) {
  // Use a softer gradient to transition from color to white (like the design)
  const gradient = `linear-gradient(180deg, ${color} 0%, rgba(255, 255, 255, 1) 90%)`;
  return {
    subtitle: 'Fresh & Hygienic',
    description: `Enjoy our freshly prepared ${title}, sourced from the best farms. Carefully washed, packed, and delivered to preserve maximum freshness and nutrients.`,
    bgColor: color,
    gradientBg: gradient,
    'You May Also Love Title': 'You May Also Love',
    benefits: [
      { benefitText: 'Farm Fresh' },
      { benefitText: 'No Preservatives' },
      { benefitText: 'Rich in Vitamins' }
    ],
    sizes: [
      { size: '250g' },
      { size: '500g' },
      { size: '1Kg' }
    ],
    ingredientsTitle: 'Ingredients & Details',
    ingredients: [
      { name: title, desc: `100% Fresh ${title}` }
    ],
    goodToKnow: {
      title: 'Good To Know',
      description: 'Keep refrigerated below 4°C. Consume within 3 days of opening.'
    },
    highlights: [
      { label: 'Vegan' },
      { label: 'Gluten Free' }
    ],
    whyYouLoveItGroup: {
      headingText: `Why You'll Love ${title}`,
      subheadingText: 'Handpicked and prepared under the highest hygiene standards.',
      points: [
        { pointText: 'Saves preparation time' },
        { pointText: 'Zero waste' },
        { pointText: 'Consistent quality' }
      ]
    },
    nutrition: {
      title: 'Nutrition Info',
      items: [
        { label: 'Calories', percentage: 20, desc: 'Low Calorie' },
        { label: 'Vitamins', percentage: 80, desc: 'Rich in Nutrients' }
      ]
    },
    tasteProfile: {
      title: 'Taste Profile',
      items: [
        { label: 'Sweetness', value: 3 },
        { label: 'Freshness', value: 5 }
      ]
    }
  };
}

const run = async () => {
  const config = await configPromise;
  const payload = await getPayload({ config });

  try {
    for (const item of productsData) {
      let title = item.file.replace(/\.(jpeg|jpg|png|psd)$/i, '');
      title = title.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replace(/[-_]/g, ' ');

      const mockData = generateMockData(title, item.color);
      
      try {
        const existing = await payload.find({
          collection: 'products',
          where: { title: { equals: title } },
        });

        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'products',
            id: existing.docs[0].id,
            data: mockData, // Only updating text data, hover colors and gradients
          });
          console.log(`  Updated product: ${title} with full text/color data.`);
        } else {
          console.log(`  Product not found, skipping: ${title}`);
        }
      } catch (err: any) {
        console.error(`  Error updating product ${title}:`, err.message);
      }
    }

    console.log('Finished updating all 30 products in CMS.');
  } catch (err) {
    console.error('Fatal Error:', err);
  }

  process.exit(0);
};

run();
