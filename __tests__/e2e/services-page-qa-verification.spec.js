const { test, expect } = require('@playwright/test');

// QA Verification for Services Page
// Note: This is testing the Next.js implementation since no demo services page exists

test.describe('Services Page QA Verification', () => {
  const NEXTJS_URL = 'http://localhost:3003/services';
  
  // Responsive breakpoints
  const breakpoints = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto(NEXTJS_URL);
  });

  // Visual verification at different breakpoints
  for (const bp of breakpoints) {
    test(`Services page visual verification - ${bp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for verification
      await page.screenshot({
        path: `__tests__/temp/services-${bp.name}-${bp.width}x${bp.height}.png`,
        fullPage: true
      });
      
      // Verify key elements are visible
      await expect(page.locator('h1')).toContainText('Professional Services');
      await expect(page.locator('.grid')).toBeVisible();
    });
  }

  test('Services page functionality verification', async ({ page }) => {
    // Test service cards are rendered
    const serviceCards = page.locator('.bg-white.rounded-lg.shadow-lg');
    await expect(serviceCards).toHaveCount(4); // Code Review, Interview Prep, Architecture, Debugging
    
    // Test each service card has required elements
    for (let i = 0; i < 4; i++) {
      const card = serviceCards.nth(i);
      await expect(card.locator('h3')).toBeVisible(); // Title
      await expect(card.locator('p')).toBeVisible(); // Description
      await expect(card.locator('.text-2xl.font-bold')).toBeVisible(); // Price
      await expect(card.locator('button, a')).toBeVisible(); // Book button
    }
    
    // Test custom consultation section
    await expect(page.locator('.bg-indigo-50')).toBeVisible();
    await expect(page.locator('h2')).toContainText('Need Something Custom?');
    
    // Test floating button exists
    await expect(page.locator('[class*="fixed"]')).toBeVisible();
  });

  test('Services page performance check', async ({ page }) => {
    const start = Date.now();
    await page.goto(NEXTJS_URL);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    
    console.log(`Services page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
  });

  test('Services page accessibility check', async ({ page }) => {
    // Basic accessibility checks
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    // Check buttons have accessible text
    const buttons = await page.locator('button, a[role="button"]').all();
    for (const button of buttons) {
      const text = await button.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('Services page console errors check', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(NEXTJS_URL);
    await page.waitForLoadState('networkidle');
    
    // Check for console errors
    expect(errors).toHaveLength(0);
  });

  test('Services page responsive design check', async ({ page }) => {
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileGrid = page.locator('.grid');
    await expect(mobileGrid).toBeVisible();
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(mobileGrid).toBeVisible();
    
    // Test desktop layout
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(mobileGrid).toBeVisible();
    
    // Verify grid adapts to viewport
    const gridClasses = await mobileGrid.getAttribute('class');
    expect(gridClasses).toContain('md:grid-cols-2'); // Should use 2 columns on medium screens
  });
});