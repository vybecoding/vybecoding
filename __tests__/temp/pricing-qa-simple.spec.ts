import { test, expect } from '@playwright/test';

test.describe('Pricing Page QA Verification', () => {
  const demoUrl = 'http://localhost:8080/pages/pricing.html';
  const nextUrl = 'http://localhost:3000/pricing';
  
  const breakpoints = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];

  test('Visual comparison and content accuracy', async ({ page }) => {
    const results = {
      demo: {},
      next: {},
      comparison: {}
    };

    // Test Demo Page
    console.log('Testing demo page...');
    await page.goto(demoUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.vybe-card', { timeout: 10000 });
    
    results.demo = {
      cards: await page.locator('.vybe-card').count(),
      title: await page.locator('h1').textContent(),
      badges: await page.locator('[style*="rgba(138, 43, 226, 0.1)"], [style*="rgba(233, 75, 157, 0.1)"]').count(),
      buttons: await page.locator('.btn').count(),
      features: await page.locator('.vybe-feature-item').count()
    };
    
    // Test Next.js Page
    console.log('Testing Next.js page...');
    await page.goto(nextUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h1', { timeout: 10000 });
    
    results.next = {
      cards: await page.locator('[style*="rgba(26, 26, 26, 0.8)"]').count(),
      title: await page.locator('h1').textContent(),
      badges: await page.locator('[style*="rgba(138, 43, 226, 0.1)"], [style*="rgba(233, 75, 157, 0.1)"]').count(),
      buttons: await page.locator('a[href="/sign-up"]').count(),
      features: await page.locator('li:has(span[style*="color"])').count(),
      gradientText: await page.locator('[class*="GradientText"]').count(),
      glassCards: await page.locator('[style*="backdrop-filter"]').count(),
      nebulaBackground: await page.locator('[class*="NebulaBackground"]').count()
    };

    // Content verification
    expect(results.next.cards).toBe(results.demo.cards);
    expect(results.next.title?.trim()).toBe(results.demo.title?.trim());
    expect(results.next.badges).toBe(results.demo.badges);
    expect(results.next.buttons).toBe(results.demo.buttons);
    expect(results.next.features).toBe(results.demo.features);
    
    // Next.js specific features
    expect(results.next.gradientText).toBeGreaterThan(0);
    expect(results.next.glassCards).toBeGreaterThan(0);
    expect(results.next.nebulaBackground).toBeGreaterThan(0);
    
    console.log('Content verification passed:', results);
  });

  test('Interactive elements functionality', async ({ page }) => {
    await page.goto(nextUrl, { waitUntil: 'domcontentloaded' });
    
    // Test card hover effects
    const card = page.locator('[style*="rgba(26, 26, 26, 0.8)"]').first();
    const borderBefore = await card.evaluate(el => getComputedStyle(el).borderColor);
    
    await card.hover();
    await page.waitForTimeout(300);
    
    const borderAfter = await card.evaluate(el => getComputedStyle(el).borderColor);
    expect(borderBefore).not.toBe(borderAfter);
    
    // Test button hover effects
    const button = page.locator('a[href="/sign-up"]').first();
    await button.hover();
    await page.waitForTimeout(300);
    
    const transform = await button.evaluate(el => getComputedStyle(el).transform);
    expect(transform).not.toBe('none');
    
    console.log('Interactive elements working correctly');
  });

  test('Responsive design validation', async ({ page }) => {
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto(nextUrl, { waitUntil: 'domcontentloaded' });
      
      // Take screenshot
      await page.screenshot({
        path: `__tests__/temp/pricing-${breakpoint.name}-${breakpoint.width}x${breakpoint.height}.png`,
        fullPage: true
      });
      
      // Check if content is visible
      const title = page.locator('h1');
      await expect(title).toBeVisible();
      
      const cards = page.locator('[style*="rgba(26, 26, 26, 0.8)"]');
      const cardCount = await cards.count();
      expect(cardCount).toBe(2);
      
      console.log(`Responsive test passed for ${breakpoint.name}: ${breakpoint.width}x${breakpoint.height}`);
    }
  });

  test('Performance and accessibility', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(nextUrl, { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
    
    // Check accessibility features
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headings).toBeGreaterThan(0);
    
    // Check CSS Grid support
    const supportsGrid = await page.evaluate(() => CSS.supports('display', 'grid'));
    expect(supportsGrid).toBe(true);
    
    // Check backdrop filter support
    const supportsBackdrop = await page.evaluate(() => 
      CSS.supports('backdrop-filter', 'blur(10px)') || 
      CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
    );
    expect(supportsBackdrop).toBe(true);
    
    console.log(`Performance test passed: loaded in ${loadTime}ms`);
  });
});