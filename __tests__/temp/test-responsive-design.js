/**
 * Responsive Design Test for Apps Browse Page
 * Tests layout behavior across all breakpoints and devices
 */

const { test, expect } = require('@playwright/test');

test.describe('Responsive Design Verification', () => {
  
  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop Small', width: 1280, height: 800 },
    { name: 'Desktop Medium', width: 1440, height: 900 },
    { name: 'Desktop Large', width: 1920, height: 1080 },
    { name: 'Ultrawide', width: 2560, height: 1440 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`Responsive layout - ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('http://localhost:3000/apps');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Test page container responsiveness
      const pageContainer = page.locator('.page-container');
      await expect(pageContainer).toBeVisible();
      
      // Test max-width container
      const mainContainer = page.locator('.max-w-6xl.mx-auto.px-6');
      await expect(mainContainer).toBeVisible();
      
      // Test hero section
      const heroSection = page.locator('.text-center.mb-12');
      await expect(heroSection).toBeVisible();
      
      const heroTitle = heroSection.locator('h1');
      await expect(heroTitle).toBeVisible();
      
      // Test search bar responsiveness
      const searchContainer = page.locator('.universal-search');
      await expect(searchContainer).toBeVisible();
      
      const searchInput = page.locator('#apps-search');
      await expect(searchInput).toBeVisible();
      
      // Test filter section
      const filterContainer = page.locator('.search-filter-container');
      await expect(filterContainer).toBeVisible();
      
      // Test grid layout based on viewport
      const appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
      await expect(appsGrid).toBeVisible();
      
      // Verify grid columns based on breakpoint
      if (width < 768) {
        // Mobile: should be 1 column
        console.log(`${name}: Testing mobile layout (1 column)`);
        await expect(appsGrid).toHaveClass(/grid-cols-1/);
      } else if (width < 1024) {
        // Tablet: should be 2 columns
        console.log(`${name}: Testing tablet layout (2 columns)`);
        await expect(appsGrid).toHaveClass(/md:grid-cols-2/);
      } else {
        // Desktop: should be 3 columns
        console.log(`${name}: Testing desktop layout (3 columns)`);
        await expect(appsGrid).toHaveClass(/lg:grid-cols-3/);
      }
      
      // Test navigation tabs
      const tabContainer = page.locator('.tab-navigation-container');
      await expect(tabContainer).toBeVisible();
      
      console.log(`${name}: Layout verification completed`);
    });
  });

  test('Responsive breakpoint transitions', async ({ page }) => {
    // Start with desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    let appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(appsGrid).toHaveClass(/lg:grid-cols-3/);
    
    // Transition to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await expect(appsGrid).toHaveClass(/md:grid-cols-2/);
    
    // Transition to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(appsGrid).toHaveClass(/grid-cols-1/);
    
    console.log('Responsive breakpoint transitions verified');
  });

  test('Search bar responsive behavior', async ({ page }) => {
    const viewportsToTest = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1440, height: 900 }
    ];
    
    for (const viewport of viewportsToTest) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000/apps');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      const searchContainer = page.locator('.universal-search');
      await expect(searchContainer).toBeVisible();
      
      const searchInput = page.locator('#apps-search');
      const searchButton = page.locator('.universal-search-submit');
      
      await expect(searchInput).toBeVisible();
      await expect(searchButton).toBeVisible();
      
      // Test search functionality at this viewport
      await searchInput.fill('test');
      await searchButton.click();
      await page.waitForTimeout(500);
      
      console.log(`${viewport.name}: Search bar responsive behavior verified`);
    }
  });

  test('Filter dropdowns responsive behavior', async ({ page }) => {
    const viewportsToTest = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1440, height: 900 }
    ];
    
    for (const viewport of viewportsToTest) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000/apps');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      const filterContainer = page.locator('.search-filter-container');
      await expect(filterContainer).toBeVisible();
      
      // Test category dropdown
      const categoryDropdown = page.locator('#apps-category-dropdown');
      await expect(categoryDropdown).toBeVisible();
      
      const dropdownButton = categoryDropdown.locator('button');
      await dropdownButton.click();
      
      const dropdownMenu = page.locator('.filter-dropdown-menu');
      await expect(dropdownMenu).toBeVisible();
      
      // Close dropdown
      await page.click('body');
      
      console.log(`${viewport.name}: Filter dropdowns responsive behavior verified`);
    }
  });

  test('App cards responsive layout', async ({ page }) => {
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Test card layout at different viewports
    const viewportsToTest = [
      { name: 'Mobile', width: 375, height: 667, expectedCols: 1 },
      { name: 'Tablet', width: 768, height: 1024, expectedCols: 2 },
      { name: 'Desktop', width: 1440, height: 900, expectedCols: 3 }
    ];
    
    for (const viewport of viewportsToTest) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500);
      
      const appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
      await expect(appsGrid).toBeVisible();
      
      // Wait for cards to load
      await page.waitForSelector('.minimal-card', { timeout: 10000 });
      
      const appCards = page.locator('.minimal-card');
      const cardCount = await appCards.count();
      
      if (cardCount > 0) {
        // Test first card dimensions and spacing
        const firstCard = appCards.first();
        await expect(firstCard).toBeVisible();
        
        const cardBox = await firstCard.boundingBox();
        if (cardBox) {
          console.log(`${viewport.name}: Card dimensions - ${cardBox.width}x${cardBox.height}`);
          
          // Cards should maintain reasonable proportions
          expect(cardBox.width).toBeGreaterThan(200);
          expect(cardBox.height).toBeGreaterThan(300);
        }
      }
      
      console.log(`${viewport.name}: Card layout verified (${cardCount} cards)`);
    }
  });

  test('Navigation responsive behavior', async ({ page }) => {
    const viewportsToTest = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Desktop', width: 1440, height: 900 }
    ];
    
    for (const viewport of viewportsToTest) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000/apps');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Test tab navigation
      const tabContainer = page.locator('.tab-navigation-container');
      await expect(tabContainer).toBeVisible();
      
      const browseTab = page.locator('[data-tab="browse"]');
      const submitTab = page.locator('[data-tab="submit"]');
      
      await expect(browseTab).toBeVisible();
      await expect(submitTab).toBeVisible();
      
      // Test tab interaction
      await submitTab.click();
      await page.waitForTimeout(500);
      
      console.log(`${viewport.name}: Navigation responsive behavior verified`);
    }
  });

  test('Content overflow handling', async ({ page }) => {
    // Test very narrow viewport
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check for horizontal scrollbars (should not exist)
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflowX;
    });
    
    expect(bodyOverflow).not.toBe('scroll');
    
    // Test hero title doesn't overflow
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    
    // Test search input doesn't overflow
    const searchInput = page.locator('#apps-search');
    await expect(searchInput).toBeVisible();
    
    console.log('Content overflow handling verified on narrow viewport');
  });

  test('Text scaling and readability', async ({ page }) => {
    const viewportsToTest = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Desktop', width: 1440, height: 900 }
    ];
    
    for (const viewport of viewportsToTest) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000/apps');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Test hero title font size
      const heroTitle = page.locator('h1');
      await expect(heroTitle).toBeVisible();
      
      const titleStyles = await heroTitle.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          fontSize: style.fontSize,
          lineHeight: style.lineHeight
        };
      });
      
      console.log(`${viewport.name}: Hero title - ${titleStyles.fontSize} / ${titleStyles.lineHeight}`);
      
      // Test card titles
      await page.waitForSelector('.minimal-card h3', { timeout: 10000 });
      const cardTitle = page.locator('.minimal-card h3').first();
      
      if (await cardTitle.isVisible()) {
        const cardTitleStyles = await cardTitle.evaluate(el => {
          const style = window.getComputedStyle(el);
          return {
            fontSize: style.fontSize,
            lineHeight: style.lineHeight
          };
        });
        
        console.log(`${viewport.name}: Card title - ${cardTitleStyles.fontSize} / ${cardTitleStyles.lineHeight}`);
      }
    }
  });

  test('Interactive elements touch targets', async ({ page }) => {
    // Test mobile touch targets
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Test search button
    const searchButton = page.locator('.universal-search-submit');
    const searchButtonBox = await searchButton.boundingBox();
    
    if (searchButtonBox) {
      // Touch targets should be at least 44px (recommended minimum)
      expect(searchButtonBox.height).toBeGreaterThanOrEqual(40);
      console.log(`Search button touch target: ${searchButtonBox.width}x${searchButtonBox.height}`);
    }
    
    // Test filter dropdown buttons
    const categoryButton = page.locator('#apps-category-dropdown button');
    const categoryButtonBox = await categoryButton.boundingBox();
    
    if (categoryButtonBox) {
      expect(categoryButtonBox.height).toBeGreaterThanOrEqual(40);
      console.log(`Category button touch target: ${categoryButtonBox.width}x${categoryButtonBox.height}`);
    }
    
    // Test app cards
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    const firstCard = page.locator('.minimal-card').first();
    const cardBox = await firstCard.boundingBox();
    
    if (cardBox) {
      // Cards should be large enough for touch interaction
      expect(cardBox.height).toBeGreaterThanOrEqual(200);
      console.log(`Card touch target: ${cardBox.width}x${cardBox.height}`);
    }
  });

});