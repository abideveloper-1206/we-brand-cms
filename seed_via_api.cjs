const fs = require('fs');
const path = require('path');

const publicDir = 'c:/Workspace/BARKAT_WEB/barkat-website/public/juices_smoothies_images';
const API_URL = 'http://localhost:3000/api'; // Adjust port if payload is running on 3001

async function seed() {
  const folders = fs.readdirSync(publicDir).filter(f => fs.statSync(path.join(publicDir, f)).isDirectory());

  // Get categories
  const catRes = await fetch(`${API_URL}/categories?limit=100`);
  const catData = await catRes.json();
  let categories = catData.docs;

  let juiceCategory = categories.find(c => c.name && c.name.toLowerCase() === 'juices');
  if (!juiceCategory) {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Juices' })
    });
    juiceCategory = (await res.json()).doc;
    console.log("Created Juices category");
  }

  let smoothiesCategory = categories.find(c => c.name && (c.name.toLowerCase() === 'smoothies' || c.name.toLowerCase() === 'smoothie'));
  if (!smoothiesCategory) {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Smoothies' })
    });
    smoothiesCategory = (await res.json()).doc;
    console.log("Created Smoothies category");
  }

  for (const folder of folders) {
    if (folder === 'icons' || folder === 'images') continue;
    
    let isSmoothie = folder.toLowerCase().includes('smoothie');
    let categoryId = isSmoothie ? smoothiesCategory.id : juiceCategory.id;
    let title = folder.split('-').join(' ');
    
    const files = fs.readdirSync(path.join(publicDir, folder));
    let frontImage = files.find(f => f.toLowerCase().includes('front'));
    let backImage = files.find(f => f.toLowerCase().includes('back'));
    
    if (!frontImage && files.length > 0) frontImage = files[0];
    if (!backImage && files.length > 1) backImage = files[1];
    if (!backImage && files.length > 0) backImage = files[0];

    let frontMediaId = null;
    let backMediaId = null;

    if (frontImage) {
      const filePath = path.join(publicDir, folder, frontImage);
      const fileData = fs.readFileSync(filePath);
      const blob = new Blob([fileData], { type: frontImage.endsWith('png') ? 'image/png' : 'image/jpeg' });
      const formData = new FormData();
      formData.append('file', blob, frontImage);
      formData.append('alt', title + ' Front');

      const res = await fetch(`${API_URL}/media`, { method: 'POST', body: formData });
      if (res.ok) {
        const mediaData = await res.json();
        frontMediaId = mediaData.doc.id;
        console.log("Uploaded front image for", title);
      } else {
        console.error("Failed front image upload", await res.text());
      }
    }

    if (backImage) {
      const filePath = path.join(publicDir, folder, backImage);
      const fileData = fs.readFileSync(filePath);
      const blob = new Blob([fileData], { type: backImage.endsWith('png') ? 'image/png' : 'image/jpeg' });
      const formData = new FormData();
      formData.append('file', blob, backImage);
      formData.append('alt', title + ' Back');

      const res = await fetch(`${API_URL}/media`, { method: 'POST', body: formData });
      if (res.ok) {
        const mediaData = await res.json();
        backMediaId = mediaData.doc.id;
        console.log("Uploaded back image for", title);
      } else {
        console.error("Failed back image upload", await res.text());
      }
    }

    const hoverColor = isSmoothie ? '#F4B0C7' : '#FFA500';
    const hoverGradient = isSmoothie ? 'linear-gradient(180deg, #F4B0C7 0%, rgba(255, 255, 255, 1) 90%)' : 'linear-gradient(180deg, #FFA500 0%, rgba(255, 255, 255, 1) 90%)';

    const productData = {
      title: title,
      category: categoryId,
      description: 'Freshly prepared, sourced from the best farms. Carefully washed, packed, and delivered to preserve maximum freshness and nutrients.',
      sizes: [
        { size: '250ml' },
        { size: '500ml' },
        { size: '1L' }
      ],
      bgColor: hoverColor,
      gradientBg: hoverGradient,
      image: frontMediaId,
      gallery: backMediaId ? [backMediaId, backMediaId, backMediaId] : []
    };

    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    
    if (res.ok) {
      console.log("Created product:", title);
    } else {
      console.error("Failed product creation", await res.text());
    }
  }
}

seed().catch(console.error);
