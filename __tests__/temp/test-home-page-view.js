const { test, expect } = require('@playwright/test');

test('capture home page for viewing', async ({ page }) => {
  // Navigate to home page
  await page.goto('http://localhost:3000');
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Take full page screenshot
  await page.screenshot({ 
    path: '__tests__/temp/home-page-full.png', 
    fullPage: true 
  });
  
  // Take viewport screenshot
  await page.screenshot({ 
    path: '__tests__/temp/home-page-viewport.png' 
  });
  
  // Get page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Get main content text
  const mainContent = await page.locator('main').textContent();
  console.log('Main content preview:', mainContent?.substring(0, 200) + '...');
  
  // Check if navigation is present
  const nav = await page.locator('nav').count();
  console.log('Navigation elements found:', nav);
  
  // Get all headings
  const headings = await page.locator('h1, h2, h3').allTextContents();
  console.log('Page headings:', headings);
});