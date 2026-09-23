import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicon() {
  const inputPath = path.join(__dirname, 'logo-processed.png');
  const outputIco1 = path.join('c:', 'Users', 'AbinaM', 'Desktop', 'We-brand', 'webrand', 'src', 'app', 'favicon.ico');
  const outputIco2 = path.join(__dirname, 'public', 'favicon.ico');
  const outputSvg2 = path.join(__dirname, 'public', 'favicon.svg');
  const outputWebp = path.join('c:', 'Users', 'AbinaM', 'Desktop', 'We-brand', 'webrand', 'public', 'favicon.webp');

  try {
    const size = 256;
    const padding = 40;
    const logoSize = size - (padding * 2);

    // 1. Resize the logo
    const resizedLogo = await sharp(inputPath)
      .resize(logoSize, logoSize, { fit: 'inside' })
      .toBuffer();

    // 2. Composite over blue circle
    // Creating an SVG circle as the base
    const svgBase = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#2563c9" />
      </svg>
    `;

    const finalImageBuffer = await sharp(Buffer.from(svgBase))
      .composite([{ input: resizedLogo, gravity: 'center' }])
      .png()
      .toBuffer();

    // 3. Save as various formats
    
    // We-brand app router uses favicon.ico in src/app
    await sharp(finalImageBuffer)
      .resize(64, 64)
      .toFile(outputIco1.replace('.ico', '.png')); // Save as PNG first, then we can rename it. 
      // Next.js actually prefers favicon.ico, but it also accepts favicon.png in app router (often as icon.png or icon.ico)
      // Actually, sharp can't output .ico directly in older versions, we can output .png and rename to .ico or just use icon.png
      
    // Let's create an icon.png in src/app for Next.js App Router (it automatically uses icon.png)
    const nextjsIconPng = path.join('c:', 'Users', 'AbinaM', 'Desktop', 'We-brand', 'webrand', 'src', 'app', 'icon.png');
    await sharp(finalImageBuffer).resize(64, 64).png().toFile(nextjsIconPng);
    
    // Replace public/favicon.webp
    await sharp(finalImageBuffer).resize(64, 64).webp().toFile(outputWebp);
    
    // For Payload CMS
    // Overwrite public/favicon.svg with a basic SVG
    const finalSvg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#2563c9" />
        <image href="data:image/png;base64,${resizedLogo.toString('base64')}" x="${padding}" y="${padding}" width="${logoSize}" height="${logoSize}" />
      </svg>
    `;
    fs.mkdirSync(path.dirname(outputSvg2), { recursive: true });
    fs.writeFileSync(outputSvg2, finalSvg);
    
    console.log("Favicons generated successfully!");

  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();
