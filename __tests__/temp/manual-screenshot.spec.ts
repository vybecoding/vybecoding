import { test } from '@playwright/test';

test('Take manual screenshots of pricing pages', async ({ page }) => {
  // Demo page screenshot
  console.log('Capturing demo page...');
  await page.goto('http://localhost:8080/pages/pricing.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.vybe-card', { timeout: 10000 });
  await page.screenshot({
    path: '__tests__/temp/demo-pricing-manual.png',
    fullPage: true
  });
  
  // Next.js page screenshot
  console.log('Capturing Next.js page...');
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000); // Wait for React to render
  await page.screenshot({
    path: '__tests__/temp/nextjs-pricing-manual.png',
    fullPage: true
  });
  
  console.log('Screenshots captured successfully');
});