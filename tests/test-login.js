import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen to console logs in browser
  page.on('console', msg => {
    console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`);
  });

  // Listen to page errors
  page.on('pageerror', err => {
    console.error(`BROWSER ERROR: ${err.toString()}`);
  });

  // Listen to network requests/responses
  page.on('response', response => {
    const url = response.url();
    if (url.includes('/api/')) {
      console.log(`API RESPONSE: ${response.status()} ${response.statusText()} for ${url}`);
    }
  });

  console.log('Navigating to login page...');
  await page.goto('http://localhost:3001/admin/login');
  await page.waitForLoadState('networkidle');

  console.log('Filling form...');
  await page.fill('input[name="email"], input[type="email"]', 'admin@barkat.com');
  await page.fill('input[name="password"], input[type="password"]', 'admin');

  console.log('Clicking login button...');
  await page.click('button[type="submit"]');

  console.log('Waiting 5 seconds for login processing...');
  await page.waitForTimeout(5000);
  console.log('Final URL:', page.url());

  await browser.close();
}

main().catch(console.error);
