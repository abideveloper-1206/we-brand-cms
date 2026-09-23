const { MongoClient, ObjectId } = require('mongodb');
async function run() {
  const client = new MongoClient('mongodb://127.0.0.1/we-brand-cms');
  await client.connect();
  const db = client.db('we-brand-cms');
  
  await db.collection('globals').updateOne(
    { globalType: 'header' },
    { $set: { 
        navItems: [
          { label: 'About Us', url: '/about-us', _id: new ObjectId() },
          { label: 'Services', url: '/services', _id: new ObjectId() },
          { label: 'Portfolio', url: '/portfolio', _id: new ObjectId() },
          { label: 'Reviews', url: '/#testimonials', _id: new ObjectId() }
        ] 
      } 
    }
  );

  await db.collection('globals').updateOne(
    { globalType: 'footer' },
    { $set: { 
        companyLinks: [
          { label: 'About Us', url: '/about-us', _id: new ObjectId() },
          { label: 'Services', url: '/services', _id: new ObjectId() },
          { label: 'Portfolio', url: '/portfolio', _id: new ObjectId() },
          { label: 'Contact Us', url: '/contact-us', _id: new ObjectId() }
        ],
        bottomLinks: [
          { label: 'Privacy', url: '/privacy', _id: new ObjectId() },
          { label: 'Terms', url: '/terms', _id: new ObjectId() }
        ],
        socialLinks: [
          { platform: 'Instagram', url: '#', _id: new ObjectId() },
          { platform: 'LinkedIn', url: '#', _id: new ObjectId() },
          { platform: 'Facebook', url: '#', _id: new ObjectId() },
          { platform: 'WhatsApp', url: '#', _id: new ObjectId() }
        ]
      } 
    }
  );

  await client.close();
}
run();
