import { test } from '@playwright/test';

test('Final component verification for pricing page', async ({ page }) => {
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  console.log('=== COMPONENT PRESENCE CHECK ===');
  
  // Check for gradient text (different selectors)
  const gradientSelectors = [
    '[class*="GradientText"]',
    '[class*="gradient"]', 
    '.bg-clip-text',
    '.text-transparent',
    '[class*="bg-gradient"]'
  ];
  
  for (const selector of gradientSelectors) {
    const count = await page.locator(selector).count();
    console.log(`${selector}: ${count} elements`);
  }
  
  // Check for nebula background (different selectors)
  const nebulaSelectors = [
    '[class*="NebulaBackground"]',
    '[class*="nebula"]',
    'canvas',
    '.fixed.inset-0',
    '[style*="radial-gradient"]'
  ];
  
  for (const selector of nebulaSelectors) {
    const count = await page.locator(selector).count();
    console.log(`${selector}: ${count} elements`);
  }
  
  // Check all class names on pricing title
  const titleClasses = await page.locator('h1').first().getAttribute('class');
  console.log('Title classes:', titleClasses);
  
  // Check all class names on first span inside h1
  const titleSpanClasses = await page.locator('h1 span').first().getAttribute('class');
  console.log('Title span classes:', titleSpanClasses);
  
  // Get page HTML for analysis
  const pageContent = await page.content();
  const hasGradientText = pageContent.includes('GradientText') || pageContent.includes('bg-clip-text');
  const hasNebulaBackground = pageContent.includes('NebulaBackground') || pageContent.includes('nebula');
  
  console.log('Page content analysis:');
  console.log('  Has GradientText reference:', hasGradientText);
  console.log('  Has NebulaBackground reference:', hasNebulaBackground);
  
  // Check computed styles
  const titleElement = page.locator('h1 span').first();
  const computedBackground = await titleElement.evaluate(el => {
    const style = window.getComputedStyle(el);
    return {
      background: style.background,
      backgroundImage: style.backgroundImage,
      backgroundClip: style.backgroundClip,
      webkitBackgroundClip: style.webkitBackgroundClip
    };
  });
  
  console.log('Title computed styles:', computedBackground);
});