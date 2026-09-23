import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1000 }
  });
  const page = await context.newPage();

  console.log('Navigating to login page...');
  await page.goto('http://localhost:3001/admin/login');
  await page.waitForLoadState('networkidle');

  console.log('Filling form...');
  await page.waitForSelector('input[name="email"], input[type="email"]');
  await page.fill('input[name="email"], input[type="email"]', 'admin@barkat.com');
  
  await page.waitForSelector('input[name="password"], input[type="password"]');
  await page.fill('input[name="password"], input[type="password"]', 'admin');

  console.log('Submitting login form by pressing Enter...');
  await page.press('input[name="password"]', 'Enter');

  console.log('Waiting for URL to change...');
  await page.waitForTimeout(5000);
  console.log('Current URL after press Enter:', page.url());

  if (page.url().includes('/login')) {
    console.log('Clicking submit button as fallback...');
    const loginBtn = page.locator('button[type="submit"], button:has-text("LOGIN"), .btn--style-primary');
    await loginBtn.click();
    await page.waitForTimeout(5000);
    console.log('Current URL after button click:', page.url());
  }

  console.log('Navigating to Members Hero page...');
  await page.goto('http://localhost:3001/admin/collections/members-hero/6a2946463469090c7ec1aa15');
  await page.waitForTimeout(6000);

  await page.screenshot({ path: '/home/prosperoustech/Desktop/barkat-payload-cms/public/screenshot-hero.png' });
  console.log('Hero screenshot saved to public/screenshot-hero.png');

  // Click on "Edit Document" to ensure we are in edit mode
  console.log('Clicking Edit Document...');
  const editBtn = page.locator('.btn-edit, button:has-text("Edit Document")').first();
  if (await editBtn.count() > 0) {
    await editBtn.click();
    await page.waitForTimeout(2000);
  }

  // Click on the Background Image field card to open the drawer
  console.log('Opening Custom Media Drawer...');
  const mediaCard = page.locator('.cuf-card, .cuf-empty').first();
  if (await mediaCard.count() > 0) {
    await mediaCard.click();
    await page.waitForTimeout(3000);

    // Take a screenshot of the open drawer
    await page.screenshot({ path: '/home/prosperoustech/Desktop/barkat-payload-cms/public/screenshot-drawer.png' });
    console.log('Drawer screenshot saved to public/screenshot-drawer.png');
  } else {
    console.log('No CustomUploadField card or empty state found.');
  }

  await browser.close();
}

main().catch(console.error);
