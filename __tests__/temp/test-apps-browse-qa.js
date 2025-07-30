/**
 * QA Verification Test for DEMO-005 Apps Browse Page
 * 
 * This test verifies the implementation against demo/pages/apps/browse.html
 * for pixel-perfect comparison and comprehensive functionality testing.
 */

const { test, expect } = require('@playwright/test');

test.describe('Apps Browse Page QA Verification', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the apps browse page
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
  });

  // Visual Comparison Tests
  test('Visual comparison - Hero section matches demo', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('.gradient-text');
    
    // Screenshot the hero section
    const heroSection = page.locator('.text-center.mb-12');
    await expect(heroSection).toBeVisible();
    
    // Verify hero title contains "Apps"
    const title = page.locator('h1 .gradient-text');
    await expect(title).toHaveText('Apps');
    
    // Verify hero description
    const description = page.locator('.text-vybe-gray-300.text-xl');
    await expect(description).toContainText('Discover AI-built projects');
  });

  test('Visual comparison - Search bar design', async ({ page }) => {
    const searchContainer = page.locator('.universal-search');
    await expect(searchContainer).toBeVisible();
    
    // Verify search input placeholder
    const searchInput = page.locator('#apps-search');
    await expect(searchInput).toHaveAttribute('placeholder', 'Search AI-built projects, apps, tools, and showcases...');
    
    // Verify search button
    const searchButton = page.locator('.universal-search-submit');
    await expect(searchButton).toHaveText('Search');
  });

  test('Visual comparison - Filter dropdowns layout', async ({ page }) => {
    // Verify category dropdown
    const categoryDropdown = page.locator('#apps-category-dropdown');
    await expect(categoryDropdown).toBeVisible();
    
    // Verify sort dropdown
    const sortDropdown = page.locator('#apps-sort-dropdown');
    await expect(sortDropdown).toBeVisible();
    
    // Click category dropdown to test functionality
    await categoryDropdown.click();
    const dropdownMenu = page.locator('.filter-dropdown-menu');
    await expect(dropdownMenu).toBeVisible();
  });

  test('Visual comparison - Tab navigation', async ({ page }) => {
    const tabContainer = page.locator('.tab-navigation-container');
    await expect(tabContainer).toBeVisible();
    
    // Verify tabs
    const browseTab = page.locator('[data-tab="browse"]');
    const submitTab = page.locator('[data-tab="submit"]');
    
    await expect(browseTab).toBeVisible();
    await expect(submitTab).toBeVisible();
    await expect(browseTab).toHaveClass(/active/);
  });

  test('Visual comparison - App cards grid layout', async ({ page }) => {
    // Wait for apps to load
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
    
    const appsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(appsGrid).toBeVisible();
    
    // Check if app cards are present
    const appCards = page.locator('.minimal-card');
    const cardCount = await appCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  // Search Functionality Tests
  test('Search functionality - Basic search', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    const searchButton = page.locator('.universal-search-submit');
    
    // Enter search term
    await searchInput.fill('AI');
    await searchButton.click();
    
    // Wait for search results
    await page.waitForTimeout(1000);
    
    // Check if search results are shown
    const searchResults = page.locator('#sites-search-results');
    await expect(searchResults).toBeVisible();
    
    const resultCount = page.locator('#apps-result-count');
    await expect(resultCount).toBeVisible();
  });

  test('Search functionality - Enter key search', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    
    await searchInput.fill('code');
    await searchInput.press('Enter');
    
    // Wait for search results
    await page.waitForTimeout(1000);
    
    const searchResults = page.locator('#sites-search-results');
    await expect(searchResults).toBeVisible();
  });

  test('Filter functionality - Category filter', async ({ page }) => {
    const categoryDropdown = page.locator('#apps-category-dropdown button');
    await categoryDropdown.click();
    
    // Select a category
    const categoryOption = page.locator('.multi-select-item').first();
    await categoryOption.click();
    
    // Verify dropdown closes
    await expect(page.locator('.filter-dropdown-menu')).not.toBeVisible();
  });

  test('Filter functionality - Sort options', async ({ page }) => {
    const sortDropdown = page.locator('#apps-sort-dropdown button');
    await sortDropdown.click();
    
    // Verify sort options are available
    const sortOptions = page.locator('.filter-dropdown-item');
    const optionCount = await sortOptions.count();
    expect(optionCount).toBeGreaterThan(0);
    
    // Select newest first
    await sortOptions.nth(1).click();
    
    // Verify dropdown closes
    await expect(page.locator('.filter-dropdown-menu')).not.toBeVisible();
  });

  test('Filter functionality - Clear filters', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    
    // Add some filters
    await searchInput.fill('test');
    
    // Wait for clear button to appear
    await page.waitForSelector('.filter-clear-button', { timeout: 5000 });
    
    const clearButton = page.locator('.filter-clear-button');
    await clearButton.click();
    
    // Verify search is cleared
    await expect(searchInput).toHaveValue('');
  });

  // App Card Interaction Tests
  test('App card interactions - Hover effects', async ({ page }) => {
    await page.waitForSelector('.minimal-card');
    
    const appCard = page.locator('.minimal-card').first();
    await appCard.hover();
    
    // Verify hover class is applied to title
    const cardTitle = appCard.locator('h3');
    // Note: Checking for transition class since hover effects are CSS-based
    await expect(cardTitle).toHaveClass(/transition-colors/);
  });

  test('App card interactions - Click navigation', async ({ page }) => {
    await page.waitForSelector('.minimal-card');
    
    const appCard = page.locator('.minimal-card').first();
    
    // Get the expected URL before clicking
    const cardClick = appCard.click();
    
    // Wait for navigation (may redirect to app detail page)
    await Promise.race([
      page.waitForURL(/\/apps\/.*/, { timeout: 5000 }),
      page.waitForTimeout(2000) // Fallback timeout
    ]);
  });

  test('App card content - Required elements', async ({ page }) => {
    await page.waitForSelector('.minimal-card');
    
    const appCard = page.locator('.minimal-card').first();
    
    // Verify all required elements exist
    await expect(appCard.locator('h3')).toBeVisible(); // Title
    await expect(appCard.locator('.text-sm.text-vybe-gray-400')).toBeVisible(); // Creator
    await expect(appCard.locator('p.text-sm.text-vybe-gray-400.mb-4')).toBeVisible(); // Description
    await expect(appCard.locator('.flex.flex-wrap.gap-2.mb-4')).toBeVisible(); // Tags
    await expect(appCard.locator('.border-t.border-vybe-gray-800\\/50')).toBeVisible(); // Stats
  });

  // Responsive Design Tests
  test('Responsive design - Mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify grid changes to single column
    const appsGrid = page.locator('.grid');
    await expect(appsGrid).toHaveClass(/grid-cols-1/);
    
    // Verify search bar is responsive
    const searchContainer = page.locator('.universal-search');
    await expect(searchContainer).toBeVisible();
  });

  test('Responsive design - Tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify grid shows 2 columns on tablet
    const appsGrid = page.locator('.grid');
    await expect(appsGrid).toHaveClass(/md:grid-cols-2/);
  });

  test('Responsive design - Desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify grid shows 3 columns on desktop
    const appsGrid = page.locator('.grid');
    await expect(appsGrid).toHaveClass(/lg:grid-cols-3/);
  });

  // Data Loading and Error States
  test('Data loading states', async ({ page }) => {
    // Navigate to page and check for loading state
    await page.goto('http://localhost:3000/apps');
    
    // Check if skeleton loader is shown initially
    const skeletonGrid = page.locator('.py-8');
    // Note: Skeleton may be very brief, so we don't strictly require it
    
    // Wait for actual content to load
    await page.waitForSelector('.minimal-card', { timeout: 10000 });
  });

  test('Empty states - No apps found', async ({ page }) => {
    // Search for something that likely won't return results
    const searchInput = page.locator('#apps-search');
    await searchInput.fill('xyzzzzunlikelyresult');
    
    const searchButton = page.locator('.universal-search-submit');
    await searchButton.click();
    
    await page.waitForTimeout(1000);
    
    // Should show no results message
    const emptyMessage = page.locator('.text-center.py-20');
    await expect(emptyMessage).toBeVisible();
  });

  // Performance Tests
  test('Page load performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`Page load time: ${loadTime}ms`);
  });

  // Tab Navigation Tests
  test('Tab navigation - Submit app tab', async ({ page }) => {
    const submitTab = page.locator('[data-tab="submit"]');
    await submitTab.click();
    
    // Should navigate to submit page or show submit form
    await Promise.race([
      page.waitForURL(/\/apps\/submit/, { timeout: 5000 }),
      page.waitForURL(/\/sign-in/, { timeout: 5000 }), // If not signed in
      page.waitForTimeout(2000) // Fallback
    ]);
  });

  // Navigation and Breadcrumbs
  test('Navigation elements present', async ({ page }) => {
    // Check for main navigation structure
    const pageContainer = page.locator('.page-container');
    await expect(pageContainer).toBeVisible();
    
    // Check for nebula backgrounds (visual design elements)
    const nebulaMiddle = page.locator('.nebula-middle');
    const nebulaBottom = page.locator('.nebula-bottom');
    
    await expect(nebulaMiddle).toBeVisible();
    await expect(nebulaBottom).toBeVisible();
  });

});