const fs = require('fs');
const path = require('path');

const tickerPath = 'C:\\Users\\AbinaM\\Desktop\\We-brand\\webrand\\src\\components\\PortfolioVideoTicker.tsx';
let content = fs.readFileSync(tickerPath, 'utf8');

// Fix the thumbnail URL logic
content = content.replace(
  /const thumbUrl = video\.thumbnail\?\.url\?\.startsWith\('http'\) \|\| video\.thumbnail\?\.url\?\.startsWith\('\/'\)\s*\n?\s*\? video\.thumbnail\.url\s*\n?\s*: video\.thumbnail\?\.url\s*\n?\s*\? `\$\{process\.env\.NEXT_PUBLIC_CMS_URL \|\| 'http:\/\/localhost:3002'\}\$\{video\.thumbnail\.url\}`\s*\n?\s*: "https:\/\/images\.unsplash\.com\/photo-1557683316-973673baf926\?w=600&q=80";/g,
  `const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';
                        const thumbUrl = video.thumbnail?.url?.startsWith('http')
                          ? video.thumbnail.url
                          : video.thumbnail?.url
                            ? \`\${cmsUrl}\${video.thumbnail.url}\`
                            : "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80";`
);

// Fix the videoFile URL logic
content = content.replace(
  /\`\$\{process\.env\.NEXT_PUBLIC_CMS_URL \|\| 'http:\/\/localhost:3002'\}\$\{video\.videoFile\.url\}\`/g,
  `\`\${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}\${video.videoFile.url}\``
);

// Fix activeVideo logic just in case
content = content.replace(
  /\`\$\{process\.env\.NEXT_PUBLIC_CMS_URL \|\| 'http:\/\/localhost:3002'\}\$\{activeVideo\.videoFile\.url\}\`/g,
  `\`\${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}\${activeVideo.videoFile.url}\``
);


fs.writeFileSync(tickerPath, content, 'utf8');
console.log('Fixed PortfolioVideoTicker.tsx');

// Fix env file for local testing
const envPath = 'C:\\Users\\AbinaM\\Desktop\\We-brand\\webrand\\.env';
let envContent = fs.readFileSync(envPath, 'utf8');
envContent = envContent.replace(/NEXT_PUBLIC_CMS_URL=https:\/\/cms\.webrandmedia\.in/g, 'NEXT_PUBLIC_CMS_URL=http://localhost:3000');
envContent = envContent.replace(/NEXT_PUBLIC_WEB_URL=https:\/\/webrandmedia\.in/g, 'NEXT_PUBLIC_WEB_URL=http://localhost:3001');
fs.writeFileSync(envPath, envContent, 'utf8');
console.log('Fixed .env');

// Fix api.ts to use localhost:3000
const apiPath = 'C:\\Users\\AbinaM\\Desktop\\We-brand\\webrand\\src\\utils\\api.ts';
let apiContent = fs.readFileSync(apiPath, 'utf8');
apiContent = apiContent.replace(/baseURL:'http:\/\/localhost:3000',/g, 'baseURL: process.env.NEXT_PUBLIC_CMS_URL || \'http://localhost:3000\',');
fs.writeFileSync(apiPath, apiContent, 'utf8');
console.log('Fixed api.ts');

