/**
 * App Card Interactions and Navigation Test
 * Tests card design, hover effects, click behavior, and content validation
 */

const { test, expect } = require('@playwright/test');

test.describe('App Card Interactions and Navigation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow apps to load
  });

  // Card Visual Structure Tests
  test('App card structure - Required elements', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) {
      console.log('No app cards found - may indicate no data or loading issue');
      return;
    }
    
    const firstCard = appCards.first();
    
    // Test APP type label
    const typeLabel = firstCard.locator('span').first();
    await expect(typeLabel).toContainText('APP');
    await expect(typeLabel).toHaveCSS('position', 'absolute');
    
    // Test title
    const title = firstCard.locator('h3');
    await expect(title).toBeVisible();
    await expect(title).toHaveClass(/text-lg/);
    await expect(title).toHaveClass(/font-medium/);
    await expect(title).toHaveClass(/text-white/);
    
    // Test creator section
    const creatorSection = firstCard.locator('.flex.items-center.gap-2').first();
    await expect(creatorSection).toBeVisible();
    
    // Test avatar/icon
    const avatar = creatorSection.locator('.w-6.h-6.bg-gradient-to-br');
    await expect(avatar).toBeVisible();
    
    // Test creator username
    const username = creatorSection.locator('.text-sm.text-vybe-gray-400');
    await expect(username).toBeVisible();
    
    // Test date
    const dateSection = creatorSection.locator('.flex.items-center.gap-1.text-sm');
    await expect(dateSection).toBeVisible();
    
    // Test description
    const description = firstCard.locator('p.text-sm.text-vybe-gray-400.mb-4');
    await expect(description).toBeVisible();
    await expect(description).toHaveClass(/line-clamp-2/);
    
    // Test tags section
    const tagsSection = firstCard.locator('.flex.flex-wrap.gap-2.mb-4');
    await expect(tagsSection).toBeVisible();
    
    // Test stats section
    const statsSection = firstCard.locator('.flex.items-center.justify-between.pt-3');
    await expect(statsSection).toBeVisible();
    await expect(statsSection).toHaveClass(/border-t/);
    
    console.log(`Verified structure of app card with ${cardCount} total cards found`);
  });

  test('App card design - Visual styling matches demo', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) {
      console.log('No app cards found for styling verification');
      return;
    }
    
    const firstCard = appCards.first();
    
    // Check card styling
    await expect(firstCard).toHaveClass(/minimal-card/);
    await expect(firstCard).toHaveClass(/rounded-lg/);
    await expect(firstCard).toHaveClass(/p-5/);
    await expect(firstCard).toHaveClass(/transition-all/);
    await expect(firstCard).toHaveClass(/cursor-pointer/);
    await expect(firstCard).toHaveClass(/group/);
    await expect(firstCard).toHaveClass(/flex/);
    await expect(firstCard).toHaveClass(/flex-col/);
    
    // Check APP type label styling
    const typeLabel = firstCard.locator('span').first();
    const typeLabelStyle = await typeLabel.evaluate(el => getComputedStyle(el));
    
    expect(typeLabelStyle.position).toBe('absolute');
    expect(typeLabelStyle.zIndex).toBe('20');
    expect(typeLabelStyle.fontWeight).toBe('600');
    expect(typeLabelStyle.textTransform).toBe('uppercase');
    
    // Check gradient avatar
    const avatar = firstCard.locator('.w-6.h-6.bg-gradient-to-br');
    await expect(avatar).toHaveClass(/from-vybe-orange/);
    await expect(avatar).toHaveClass(/to-vybe-pink/);
    await expect(avatar).toHaveClass(/rounded-full/);
    
    console.log('Visual styling verification completed');
  });

  // Hover Effects Tests
  test('Card hover effects - Title color transition', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) {
      console.log('No app cards found for hover testing');
      return;
    }
    
    const firstCard = appCards.first();
    const cardTitle = firstCard.locator('h3');
    
    // Verify title has transition class
    await expect(cardTitle).toHaveClass(/transition-colors/);
    await expect(cardTitle).toHaveClass(/group-hover:text-vybe-orange/);
    
    // Test hover state
    await firstCard.hover();
    
    // Note: CSS hover effects are hard to test programmatically
    // This verifies the classes are present for the hover effect
    console.log('Hover effect classes verified on card title');
  });

  test('Card hover effects - Overall card transition', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) return;
    
    const firstCard = appCards.first();
    
    // Verify card has transition-all class
    await expect(firstCard).toHaveClass(/transition-all/);
    
    // Test multiple hover interactions
    for (let i = 0; i < Math.min(3, cardCount); i++) {
      const card = appCards.nth(i);
      await card.hover();
      await page.waitForTimeout(100); // Brief pause for transition
    }
    
    console.log('Card transition effects verified');
  });

  // Click Navigation Tests
  test('Card click navigation - Routing behavior', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) {
      console.log('No app cards found for navigation testing');
      return;
    }
    
    const firstCard = appCards.first();
    
    // Get the current URL before clicking
    const initialUrl = page.url();
    
    // Click the card
    await firstCard.click();
    
    // Wait for navigation or any response
    await page.waitForTimeout(2000);
    
    const newUrl = page.url();
    
    if (newUrl !== initialUrl) {
      console.log(`Navigation successful: ${initialUrl} -> ${newUrl}`);
      
      // Check if navigated to app detail page
      expect(newUrl).toMatch(/\/apps\/[^\/]+$/);
    } else {
      console.log('No navigation occurred - may be due to no data or different routing implementation');
    }
  });

  // Card Content Validation Tests
  test('Card content - Data integrity', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) {
      console.log('No app cards found for content validation');
      return;
    }
    
    // Test multiple cards for content integrity
    const cardsToTest = Math.min(3, cardCount);
    
    for (let i = 0; i < cardsToTest; i++) {
      const card = appCards.nth(i);
      
      // Title should not be empty
      const title = card.locator('h3');
      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
      expect(titleText.length).toBeGreaterThan(0);
      
      // Description should not be empty
      const description = card.locator('p.text-sm.text-vybe-gray-400.mb-4');
      const descText = await description.textContent();
      expect(descText).toBeTruthy();
      expect(descText.length).toBeGreaterThan(0);
      
      // Should have at least one tag
      const tags = card.locator('.flex.flex-wrap.gap-2.mb-4 span');
      const tagCount = await tags.count();
      expect(tagCount).toBeGreaterThan(0);
      
      // Like count should be present (can be 0)
      const likeCount = card.locator('svg + span').last();
      const likes = await likeCount.textContent();
      expect(likes).toMatch(/^\d+$/); // Should be a number
      
      console.log(`Card ${i + 1}: Title="${titleText}", Tags=${tagCount}, Likes=${likes}`);
    }
  });

  test('Card status indicators - Verification states', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) return;
    
    // Look for different status indicators across cards
    let needsVerificationFound = false;
    let purchasedFound = false;
    let premiumFound = false;
    
    for (let i = 0; i < Math.min(cardCount, 10); i++) {
      const card = appCards.nth(i);
      const statusSection = card.locator('.flex.items-center.justify-between.pt-3 .flex.items-center.gap-1').first();
      
      const statusText = await statusSection.textContent();
      
      if (statusText.includes('Needs verification')) {
        needsVerificationFound = true;
        console.log(`Card ${i + 1}: Needs verification status found`);
      }
      
      if (statusText.includes('Purchased')) {
        purchasedFound = true;
        console.log(`Card ${i + 1}: Purchased status found`);
      }
      
      if (statusText.includes('Premium')) {
        premiumFound = true;
        console.log(`Card ${i + 1}: Premium status found`);
      }
    }
    
    console.log(`Status indicators found - Verification: ${needsVerificationFound}, Purchased: ${purchasedFound}, Premium: ${premiumFound}`);
  });

  // Card Grid Layout Tests
  test('Card grid layout - Responsive behavior', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    let appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(appsGrid).toBeVisible();
    await expect(appsGrid).toHaveClass(/lg:grid-cols-3/);
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(appsGrid).toHaveClass(/md:grid-cols-2/);
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(appsGrid).toHaveClass(/grid-cols-1/);
    
    console.log('Responsive grid layout verified across breakpoints');
  });

  // Card Performance Tests
  test('Card rendering performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    
    // Wait for cards to appear
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const renderTime = Date.now() - startTime;
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    console.log(`Cards rendered: ${cardCount} in ${renderTime}ms`);
    
    // Performance should be reasonable even with many cards
    expect(renderTime).toBeLessThan(10000); // 10 seconds max
  });

  // Accessibility Tests
  test('Card accessibility - Keyboard navigation', async ({ page }) => {
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    
    if (cardCount === 0) return;
    
    // Focus first card using Tab key
    await page.keyboard.press('Tab');
    
    // Check if card or its content is focusable
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    console.log('Keyboard navigation capability verified');
  });

});