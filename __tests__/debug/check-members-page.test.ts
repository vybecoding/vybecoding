import { test, expect } from '@playwright/test';

test('check members page content', async ({ page }) => {
  await page.goto('http://localhost:3000/members');
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ 
    path: '__tests__/debug/screenshots/members-page-content.png',
    fullPage: true 
  });
  
  // Check for member cards
  const memberCards = await page.locator('[class*="DemoMemberCard"], [class*="cursor-pointer"][class*="rounded-lg"]').count();
  console.log('Number of member cards found:', memberCards);
  
  // Get all text content
  const pageText = await page.textContent('body');
  console.log('Page contains "Alex Chen":', pageText?.includes('Alex Chen'));
  console.log('Page contains "@alexchen":', pageText?.includes('@alexchen'));
});