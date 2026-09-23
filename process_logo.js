import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processLogo() {
  const inputPath = path.join(__dirname, 'logo-original.png');
  const outputPath = path.join(__dirname, 'logo-processed.png');

  try {
    // Read the image
    const { data, info } = await sharp(inputPath)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    // The image has a light background and a dark blue logo.
    // We want to turn the dark parts into solid white, and the light parts into transparent.
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate perceived brightness (luminance)
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // If it's a light pixel (brightness > 200), make it transparent
      // If it's a dark pixel (brightness <= 200), make it white with full opacity
      // To add anti-aliasing, we can map brightness to alpha.
      // Brightness range: ~0 (dark blue) to ~255 (white/light gray)
      // We want alpha = 255 for brightness = 0, alpha = 0 for brightness = 255.
      let alpha = 255 - brightness;
      
      // Increase contrast of alpha
      alpha = Math.max(0, Math.min(255, (alpha - 50) * 2));
      
      // Set to solid white
      data[i] = 255;     // R
      data[i + 1] = 255; // G
      data[i + 2] = 255; // B
      data[i + 3] = alpha; // A
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    }).toFile(outputPath);
    
    console.log('✅ Logo processed successfully and saved as logo-processed.png');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
