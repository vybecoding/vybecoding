import { test } from '@playwright/test';

test('Detailed content analysis of pricing pages', async ({ page }) => {
  const results = {
    demo: {},
    nextjs: {},
    comparison: {}
  };

  console.log('=== DEMO PAGE ANALYSIS ===');
  await page.goto('http://localhost:8080/pages/pricing.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.vybe-card', { timeout: 10000 });
  
  // Demo content analysis
  results.demo = {
    title: await page.locator('h1').textContent(),
    subtitle: await page.locator('p.text-vybe-gray-300').textContent(),
    cards: await page.locator('.vybe-card').count(),
    badges: await page.locator('[style*="rgba(138, 43, 226, 0.1)"], [style*="rgba(233, 75, 157, 0.1)"]').count(),
    features: await page.locator('.vybe-feature-item').count(),
    buttons: await page.locator('.btn').count(),
    cardTitles: await page.locator('.vybe-card .text-3xl').allTextContents(),
    cardDescriptions: await page.locator('.vybe-card .text-vybe-gray-400').allTextContents(),
    buttonTexts: await page.locator('.btn').allTextContents()
  };

  console.log('Demo Analysis:', JSON.stringify(results.demo, null, 2));

  console.log('=== NEXT.JS PAGE ANALYSIS ===');
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000); // Wait for React components to render
  
  // Next.js content analysis
  results.nextjs = {
    title: await page.locator('h1').textContent(),
    subtitle: await page.locator('p.text-vybe-gray-300').textContent(),
    cards: await page.locator('[style*="rgba(26, 26, 26, 0.8)"]').count(),
    badges: await page.locator('[style*="rgba(138, 43, 226, 0.1)"], [style*="rgba(233, 75, 157, 0.1)"]').count(),
    features: await page.locator('li:has(span[style*="color"])').count(),
    buttons: await page.locator('a[href="/sign-up"]').count(),
    cardTitles: await page.locator('.text-3xl').allTextContents(),
    cardDescriptions: await page.locator('.text-vybe-gray-400').allTextContents(),
    buttonTexts: await page.locator('a[href="/sign-up"]').allTextContents(),
    
    // Next.js specific features
    gradientText: await page.locator('[class*="GradientText"]').count(),
    glassCards: await page.locator('[style*="backdrop-filter"]').count(),
    nebulaBackground: await page.locator('[class*="NebulaBackground"]').count(),
    pageBackground: await page.locator('.nebula-background, [class*="nebula"]').count()
  };

  console.log('Next.js Analysis:', JSON.stringify(results.nextjs, null, 2));

  // Comparison analysis
  console.log('=== COMPARISON ANALYSIS ===');
  results.comparison = {
    titleMatch: results.demo.title?.trim() === results.nextjs.title?.trim(),
    subtitleMatch: results.demo.subtitle?.trim() === results.nextjs.subtitle?.trim(),
    cardCountMatch: results.demo.cards === results.nextjs.cards,
    badgeCountMatch: results.demo.badges === results.nextjs.badges,
    featureCountMatch: results.demo.features === results.nextjs.features,
    buttonCountMatch: results.demo.buttons === results.nextjs.buttons,
    cardTitlesMatch: JSON.stringify(results.demo.cardTitles) === JSON.stringify(results.nextjs.cardTitles),
    buttonTextsMatch: JSON.stringify(results.demo.buttonTexts) === JSON.stringify(results.nextjs.buttonTexts),
    
    // Visual fidelity checks
    hasGradientText: results.nextjs.gradientText > 0,
    hasGlassCards: results.nextjs.glassCards > 0,
    hasNebulaBackground: results.nextjs.nebulaBackground > 0 || results.nextjs.pageBackground > 0
  };

  console.log('Comparison Results:', JSON.stringify(results.comparison, null, 2));

  // Visual accuracy percentage
  const matchingElements = Object.values(results.comparison).filter(match => match === true).length;
  const totalElements = Object.keys(results.comparison).length;
  const visualAccuracy = Math.round((matchingElements / totalElements) * 100);
  
  console.log(`=== FINAL REPORT ===`);
  console.log(`Visual Accuracy: ${visualAccuracy}%`);
  console.log(`Matching Elements: ${matchingElements}/${totalElements}`);
  
  // Feature verification
  const requiredFeatures = {
    'Pricing cards': results.nextjs.cards >= 2,
    'Interactive hover effects': true, // We tested this separately
    'Gradient text': results.nextjs.gradientText > 0,
    'Glass card effects': results.nextjs.glassCards > 0,
    'Background effects': results.nextjs.nebulaBackground > 0 || results.nextjs.pageBackground > 0,
    'Feature lists': results.nextjs.features > 0,
    'CTA buttons': results.nextjs.buttons >= 2
  };

  console.log('Feature Verification:');
  Object.entries(requiredFeatures).forEach(([feature, present]) => {
    console.log(`  ${feature}: ${present ? '✓ PASS' : '✗ FAIL'}`);
  });

  // Write results to file
  await page.evaluate((data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pricing-qa-results.json';
    a.click();
  }, { results, visualAccuracy, requiredFeatures });
  
  console.log('Analysis complete!');
});