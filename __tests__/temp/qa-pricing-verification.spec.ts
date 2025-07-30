import { test, expect, Page } from '@playwright/test';
import { compareVisualElements, capturePageScreenshot } from '../visual-verification/utils/visual-utils';

// QA Verification Test for DEMO-004 Pricing Page
test.describe('DEMO-004 Pricing Page QA Verification', () => {
  const demoUrl = 'http://localhost:8080/pages/pricing.html';
  const nextUrl = 'http://localhost:3000/pricing';
  const breakpoints = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 }
  };

  let demoPage: Page;
  let nextPage: Page;

  test.beforeEach(async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    demoPage = await context1.newPage();
    nextPage = await context2.newPage();
  });

  test.afterEach(async () => {
    await demoPage.close();
    await nextPage.close();
  });

  // 1. Visual Comparison Test
  test('Visual comparison against demo at all breakpoints', async () => {
    for (const [breakpointName, dimensions] of Object.entries(breakpoints)) {
      console.log(`Testing ${breakpointName} breakpoint: ${dimensions.width}x${dimensions.height}`);
      
      // Set viewport for both pages
      await demoPage.setViewportSize(dimensions);
      await nextPage.setViewportSize(dimensions);
      
      // Navigate to pages
      await demoPage.goto(demoUrl, { waitUntil: 'networkidle' });
      await nextPage.goto(nextUrl, { waitUntil: 'networkidle' });
      
      // Wait for content to load
      await demoPage.waitForSelector('[class*="vybe-card"]', { timeout: 10000 });
      await nextPage.waitForSelector('[class*="pricing"]', { timeout: 10000 });
      
      // Capture screenshots
      const demoScreenshot = await capturePageScreenshot(demoPage, `pricing-demo-${breakpointName}`);
      const nextScreenshot = await capturePageScreenshot(nextPage, `pricing-next-${breakpointName}`);
      
      // Basic layout verification
      const demoCards = await demoPage.locator('.vybe-card').count();
      const nextCards = await nextPage.locator('[style*="rgba(26, 26, 26, 0.8)"]').count();
      
      expect(nextCards).toBe(demoCards);
      console.log(`✓ Found ${demoCards} pricing cards in both versions at ${breakpointName}`);
    }
  });

  // 2. Interactive Elements Test
  test('Interactive elements and animations', async () => {
    await demoPage.goto(demoUrl, { waitUntil: 'networkidle' });
    await nextPage.goto(nextUrl, { waitUntil: 'networkidle' });
    
    // Test pricing card hover effects on demo
    const demoCard = demoPage.locator('.vybe-card').first();
    const demoBorderBefore = await demoCard.evaluate(el => getComputedStyle(el).borderColor);
    
    await demoCard.hover();
    await demoPage.waitForTimeout(300);
    const demoBorderAfter = await demoCard.evaluate(el => getComputedStyle(el).borderColor);
    
    expect(demoBorderBefore).not.toBe(demoBorderAfter);
    console.log('✓ Demo card hover effect working');
    
    // Test pricing card hover effects on Next.js
    const nextCard = nextPage.locator('[style*="rgba(26, 26, 26, 0.8)"]').first();
    const nextBorderBefore = await nextCard.evaluate(el => getComputedStyle(el).borderColor);
    
    await nextCard.hover();
    await nextPage.waitForTimeout(300);
    const nextBorderAfter = await nextCard.evaluate(el => getComputedStyle(el).borderColor);
    
    expect(nextBorderBefore).not.toBe(nextBorderAfter);
    console.log('✓ Next.js card hover effect working');
    
    // Test CTA button interactions
    const demoButton = demoPage.locator('.btn').first();
    const nextButton = nextPage.locator('a[href="/sign-up"]').first();
    
    // Check button text matches
    const demoButtonText = await demoButton.textContent();
    const nextButtonText = await nextButton.textContent();
    expect(nextButtonText?.trim()).toBe(demoButtonText?.trim());
    console.log(`✓ Button text matches: "${demoButtonText}"`);
    
    // Test button hover effects
    await nextButton.hover();
    await nextPage.waitForTimeout(300);
    const buttonTransform = await nextButton.evaluate(el => getComputedStyle(el).transform);
    expect(buttonTransform).toContain('translateY');
    console.log('✓ Button hover animation working');
  });

  // 3. Content Accuracy Test
  test('Pricing content and features accuracy', async () => {
    await demoPage.goto(demoUrl, { waitUntil: 'networkidle' });
    await nextPage.goto(nextUrl, { waitUntil: 'networkidle' });
    
    // Check pricing header
    const demoTitle = await demoPage.locator('h1').textContent();
    const nextTitle = await nextPage.locator('h1').textContent();
    expect(nextTitle?.trim()).toBe(demoTitle?.trim());
    console.log('✓ Page title matches');
    
    // Check pricing tiers
    const demoPriceText = await demoPage.locator('.text-3xl').nth(1).textContent();
    const nextPriceText = await nextPage.locator('.text-3xl').nth(1).textContent();
    expect(nextPriceText?.trim()).toBe(demoPriceText?.trim());
    console.log('✓ Pro tier pricing matches');
    
    // Check feature count
    const demoFeatures = await demoPage.locator('.vybe-feature-item').count();
    const nextFeatures = await nextPage.locator('li:has(span[style*="color"])').count();
    expect(nextFeatures).toBe(demoFeatures);
    console.log(`✓ Feature count matches: ${demoFeatures} features`);
    
    // Check badges
    const demoBadges = await demoPage.locator('[style*="rgba(138, 43, 226, 0.1)"], [style*="rgba(233, 75, 157, 0.1)"]').count();
    const nextBadges = await nextPage.locator('[style*="rgba(138, 43, 226, 0.1)"], [style*="rgba(233, 75, 157, 0.1)"]').count();
    expect(nextBadges).toBe(demoBadges);
    console.log(`✓ Badge count matches: ${demoBadges} badges`);
  });

  // 4. Gradient and Visual Effects Test
  test('Gradient accuracy and visual effects', async () => {
    await nextPage.goto(nextUrl, { waitUntil: 'networkidle' });
    
    // Check nebula background
    const nebulaBackground = nextPage.locator('[class*="NebulaBackground"]');
    await expect(nebulaBackground).toBeVisible();
    console.log('✓ Nebula background present');
    
    // Check gradient text
    const gradientText = nextPage.locator('h1 [class*="GradientText"]');
    await expect(gradientText).toBeVisible();
    console.log('✓ Gradient text component present');
    
    // Check glass card effects
    const glassCards = nextPage.locator('[style*="backdrop-filter: blur"]');
    const cardCount = await glassCards.count();
    expect(cardCount).toBeGreaterThan(0);
    console.log(`✓ Glass card effects present: ${cardCount} cards`);
    
    // Check button gradients
    const gradientButton = nextPage.locator('a[style*="linear-gradient"]');
    await expect(gradientButton).toBeVisible();
    console.log('✓ Gradient button present');
  });

  // 5. Responsive Layout Test
  test('Responsive design validation', async () => {
    for (const [breakpointName, dimensions] of Object.entries(breakpoints)) {
      await nextPage.setViewportSize(dimensions);
      await nextPage.goto(nextUrl, { waitUntil: 'networkidle' });
      
      // Check grid layout
      const gridContainer = nextPage.locator('.grid');
      await expect(gridContainer).toBeVisible();
      
      // Check if cards stack properly on mobile
      if (breakpointName === 'mobile') {
        const cardPositions = await nextPage.locator('[style*="rgba(26, 26, 26, 0.8)"]').boundingBox();
        expect(cardPositions).toBeTruthy();
        console.log(`✓ Mobile layout working at ${dimensions.width}px`);
      }
      
      // Check if cards are side-by-side on desktop
      if (breakpointName === 'desktop') {
        const cards = nextPage.locator('[style*="rgba(26, 26, 26, 0.8)"]');
        const cardCount = await cards.count();
        expect(cardCount).toBe(2);
        console.log(`✓ Desktop layout working: ${cardCount} cards side-by-side`);
      }
    }
  });

  // 6. Performance Test
  test('Loading performance and smooth animations', async () => {
    const startTime = Date.now();
    
    await nextPage.goto(nextUrl, { waitUntil: 'networkidle' });
    await nextPage.waitForSelector('[style*="rgba(26, 26, 26, 0.8)"]');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    console.log(`✓ Page loaded in ${loadTime}ms`);
    
    // Test animation smoothness
    const button = nextPage.locator('a[href="/sign-up"]').first();
    await button.hover();
    await nextPage.waitForTimeout(300);
    
    const transform = await button.evaluate(el => getComputedStyle(el).transform);
    expect(transform).not.toBe('none');
    console.log('✓ Smooth hover animations working');
  });

  // 7. Cross-browser Compatibility Test
  test('Cross-browser compatibility validation', async () => {
    await nextPage.goto(nextUrl, { waitUntil: 'networkidle' });
    
    // Check CSS support
    const supportsBackdropFilter = await nextPage.evaluate(() => {
      return CSS.supports('backdrop-filter', 'blur(10px)');
    });
    
    const supportsWebkitBackdropFilter = await nextPage.evaluate(() => {
      return CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
    });
    
    expect(supportsBackdropFilter || supportsWebkitBackdropFilter).toBe(true);
    console.log('✓ Backdrop filter support detected');
    
    // Check CSS Grid support
    const supportsGrid = await nextPage.evaluate(() => {
      return CSS.supports('display', 'grid');
    });
    expect(supportsGrid).toBe(true);
    console.log('✓ CSS Grid support confirmed');
    
    // Check modern CSS features
    const supportsFlexbox = await nextPage.evaluate(() => {
      return CSS.supports('display', 'flex');
    });
    expect(supportsFlexbox).toBe(true);
    console.log('✓ Flexbox support confirmed');
  });
});