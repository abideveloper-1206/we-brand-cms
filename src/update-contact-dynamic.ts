import { getPayload } from 'payload';
import dotenv from 'dotenv';
import path from 'path';
import configPromise from './payload.config';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const updateContact = async () => {
  const config = await configPromise;
  const payload = await getPayload({ config });

  try {
    // 1. Update Contact Content (Collection, not Global)
    const contactRes = await payload.find({
      collection: 'contact-content',
      limit: 1,
    });
    
    if (contactRes.docs && contactRes.docs.length > 0) {
      const docId = contactRes.docs[0].id;
      await payload.update({
        collection: 'contact-content',
        id: docId,
        data: {
          contactEmail: 'info@ness.sa',
          contactPhone: '966549117080',
        },
      });

      // Update Arabic
      await payload.update({
        collection: 'contact-content',
        id: docId,
        locale: 'ar',
        data: {
          contactAddress: '7044 طريق الخرج، 4814، حي المصفاة، الرياض 14542',
          contactAddressSubtext: 'ساعات العمل: 8 صباحًا - 5 مساءً (ما عدا الجمعة)',
        },
      });

      // Update English
      await payload.update({
        collection: 'contact-content',
        id: docId,
        locale: 'en',
        data: {
          contactAddress: '7044, Ibn Muthana Alanzi, Al Misfat Dist, Riyadh 14542',
          contactAddressSubtext: '8am - 5pm (Except Friday)',
        },
      });
      console.log('Contact Content updated successfully.');
    } else {
      console.log('No Contact Content document found!');
    }

    // 2. Update FAQ Need More Help (Also a Collection)
    const faqRes = await payload.find({
      collection: 'faq-need-more-help',
      limit: 1,
    });
    
    if (faqRes.docs && faqRes.docs.length > 0) {
      const faqId = faqRes.docs[0].id;
      const faqData = faqRes.docs[0] as any;
      
      if (faqData.supportCards) {
        const cards = faqData.supportCards.map((card: any) => {
          if (card.buttonLink && card.buttonLink.includes('@')) {
            card.buttonLink = 'mailto:info@ness.sa';
          } else if (card.buttonLink && card.buttonLink.includes('wa.me')) {
            card.buttonLink = 'https://wa.me/966549117080';
          }
          return card;
        });
        
        await payload.update({
          collection: 'faq-need-more-help',
          id: faqId,
          data: {
            supportCards: cards,
          }
        });
        console.log('FAQ Need More Help updated.');
      }
    } else {
        console.log('No FAQ Need More Help document found!');
    }

  } catch (err) {
    console.error('Error:', err);
  }

  process.exit(0);
};

updateContact();
