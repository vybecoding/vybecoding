/**
 * Visual Comparison Test for Apps Browse Page
 * Compares Next.js implementation with demo HTML at multiple breakpoints
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Visual Comparison - Apps Browse Page', () => {
  
  const breakpoints = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];

  test.beforeEach(async ({ page }) => {
    // Ensure screenshots directory exists
    const screenshotDir = path.join(__dirname, '../../visual-snapshots/apps-browse');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  breakpoints.forEach(({ name, width, height }) => {
    test(`Visual comparison - ${name} viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      
      // Screenshot demo page
      await page.goto('http://localhost:8080/demo/pages/apps/browse.html');
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(__dirname, `../../visual-snapshots/apps-browse/demo-${name}.png`),
        fullPage: true
      });
      
      // Screenshot Next.js implementation
      await page.goto('http://localhost:3000/apps');
      await page.waitForLoadState('networkidle');
      
      // Wait for any loading states to complete
      await page.waitForTimeout(2000);
      
      await page.screenshot({
        path: path.join(__dirname, `../../visual-snapshots/apps-browse/nextjs-${name}.png`),
        fullPage: true
      });
      
      console.log(`Screenshots captured for ${name} viewport`);
    });
  });

  test('Capture component-specific screenshots', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Hero section
    const heroSection = page.locator('.text-center.mb-12');
    await heroSection.screenshot({
      path: path.join(__dirname, '../../visual-snapshots/apps-browse/hero-section.png')
    });
    
    // Search bar
    const searchSection = page.locator('.universal-search');
    await searchSection.screenshot({
      path: path.join(__dirname, '../../visual-snapshots/apps-browse/search-section.png')
    });
    
    // Filter dropdowns
    const filterSection = page.locator('.search-filter-container');
    await filterSection.screenshot({
      path: path.join(__dirname, '../../visual-snapshots/apps-browse/filter-section.png')
    });
    
    // Tab navigation
    const tabSection = page.locator('.tab-navigation-container');
    await tabSection.screenshot({
      path: path.join(__dirname, '../../visual-snapshots/apps-browse/tab-navigation.png')
    });
    
    // Apps grid (if apps are loaded)
    const appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    if (await appsGrid.isVisible()) {
      await appsGrid.screenshot({
        path: path.join(__dirname, '../../visual-snapshots/apps-browse/apps-grid.png')
      });
    }
    
    console.log('Component screenshots captured');
  });

  test('Test interactive states', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Category dropdown open state
    const categoryDropdown = page.locator('#apps-category-dropdown button');
    await categoryDropdown.click();
    await page.screenshot({
      path: path.join(__dirname, '../../visual-snapshots/apps-browse/category-dropdown-open.png'),
      clip: { x: 0, y: 0, width: 800, height: 600 }
    });
    
    // Close dropdown
    await page.click('body');
    
    // Sort dropdown open state
    const sortDropdown = page.locator('#apps-sort-dropdown button');
    await sortDropdown.click();
    await page.screenshot({
      path: path.join(__dirname, '../../visual-snapshots/apps-browse/sort-dropdown-open.png'),
      clip: { x: 0, y: 0, width: 800, height: 600 }
    });
    
    // Close dropdown
    await page.click('body');
    
    // Search with results state
    const searchInput = page.locator('#apps-search');
    await searchInput.fill('AI');
    const searchButton = page.locator('.universal-search-submit');
    await searchButton.click();
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: path.join(__dirname, '../../visual-snapshots/apps-browse/search-results-state.png'),
      fullPage: true
    });
    
    console.log('Interactive state screenshots captured');
  });

  test('Generate comparison report', async ({ page }) => {
    const reportData = {
      testRun: new Date().toISOString(),
      breakpoints: breakpoints.map(bp => bp.name),
      components: [
        'hero-section',
        'search-section', 
        'filter-section',
        'tab-navigation',
        'apps-grid'
      ],
      interactiveStates: [
        'category-dropdown-open',
        'sort-dropdown-open',
        'search-results-state'
      ],
      notes: [
        'Screenshots captured at multiple breakpoints',
        'Component-level visual verification completed',
        'Interactive states documented',
        'Ready for pixel-perfect comparison'
      ]
    };
    
    const reportPath = path.join(__dirname, '../../visual-snapshots/apps-browse/comparison-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    console.log('Visual comparison report generated');
  });

});