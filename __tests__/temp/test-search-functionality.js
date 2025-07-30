/**
 * Search and Filter Functionality Test
 * Comprehensive testing of search, filtering, and sorting capabilities
 */

const { test, expect } = require('@playwright/test');

test.describe('Search and Filter Functionality Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/apps');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow initial data to load
  });

  // Search Functionality Tests
  test('Search functionality - Basic text search', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    const searchButton = page.locator('.universal-search-submit');
    
    // Test search with common term
    await searchInput.fill('AI');
    await searchButton.click();
    await page.waitForTimeout(1000);
    
    // Verify search results section appears
    const searchResults = page.locator('#sites-search-results');
    await expect(searchResults).toBeVisible();
    
    // Verify result count is displayed
    const resultCount = page.locator('#apps-result-count');
    await expect(resultCount).toBeVisible();
    
    const count = await resultCount.textContent();
    console.log(`Search for "AI" returned ${count} results`);
  });

  test('Search functionality - Enter key submission', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    
    await searchInput.fill('code');
    await searchInput.press('Enter');
    await page.waitForTimeout(1000);
    
    const searchResults = page.locator('#sites-search-results');
    await expect(searchResults).toBeVisible();
  });

  test('Search functionality - Empty search handling', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    const searchButton = page.locator('.universal-search-submit');
    
    // Submit empty search
    await searchInput.fill('');
    await searchButton.click();
    await page.waitForTimeout(500);
    
    // Search results should not be visible for empty search
    const searchResults = page.locator('#sites-search-results');
    await expect(searchResults).not.toBeVisible();
  });

  test('Search functionality - No results found', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    const searchButton = page.locator('.universal-search-submit');
    
    // Search for something unlikely to exist
    await searchInput.fill('xyzabc123nonexistent');
    await searchButton.click();
    await page.waitForTimeout(1000);
    
    const searchResults = page.locator('#sites-search-results');
    await expect(searchResults).toBeVisible();
    
    const resultCount = page.locator('#apps-result-count');
    const count = await resultCount.textContent();
    expect(count).toBe('0');
  });

  // Category Filter Tests
  test('Category filter - Display and functionality', async ({ page }) => {
    const categoryDropdown = page.locator('#apps-category-dropdown');
    await expect(categoryDropdown).toBeVisible();
    
    // Click to open dropdown
    const dropdownButton = categoryDropdown.locator('button');
    await dropdownButton.click();
    
    // Verify dropdown menu appears
    const dropdownMenu = page.locator('.filter-dropdown-menu');
    await expect(dropdownMenu).toBeVisible();
    
    // Verify "All Categories" option exists
    const allCategoriesOption = page.locator('.multi-select-item').first();
    await expect(allCategoriesOption).toContainText('All Categories');
    
    // Count available categories
    const categoryOptions = page.locator('.multi-select-item');
    const optionCount = await categoryOptions.count();
    console.log(`Found ${optionCount} category options`);
    
    // Select a category (not "All Categories")
    if (optionCount > 1) {
      await categoryOptions.nth(1).click();
      
      // Verify dropdown closes
      await expect(dropdownMenu).not.toBeVisible();
      
      // Verify selection counter appears
      const selectionCounter = page.locator('#apps-category-counter');
      await expect(selectionCounter).toBeVisible();
    }
  });

  test('Category filter - Clear selection', async ({ page }) => {
    const categoryDropdown = page.locator('#apps-category-dropdown button');
    await categoryDropdown.click();
    
    // Select a category first
    const categoryOptions = page.locator('.multi-select-item');
    const optionCount = await categoryOptions.count();
    
    if (optionCount > 1) {
      await categoryOptions.nth(1).click();
      
      // Verify counter appears
      const selectionCounter = page.locator('#apps-category-counter');
      await expect(selectionCounter).toBeVisible();
      
      // Open dropdown again and select "All Categories"
      await categoryDropdown.click();
      await categoryOptions.first().click();
      
      // Counter should disappear
      await expect(selectionCounter).not.toBeVisible();
    }
  });

  // Sort Functionality Tests
  test('Sort functionality - Display and options', async ({ page }) => {
    const sortDropdown = page.locator('#apps-sort-dropdown');
    await expect(sortDropdown).toBeVisible();
    
    // Click to open dropdown
    const dropdownButton = sortDropdown.locator('button');
    await dropdownButton.click();
    
    // Verify dropdown menu appears
    const dropdownMenu = page.locator('.filter-dropdown-menu');
    await expect(dropdownMenu).toBeVisible();
    
    // Verify sort options exist
    const sortOptions = page.locator('.filter-dropdown-item');
    const optionCount = await sortOptions.count();
    expect(optionCount).toBeGreaterThan(0);
    
    // Check for expected sort options
    const expectedOptions = ['Relevance', 'Newest First', 'Most Popular', 'Trending Now', 'Most Liked', 'Most Viewed'];
    
    for (let i = 0; i < Math.min(optionCount, expectedOptions.length); i++) {
      const optionText = await sortOptions.nth(i).textContent();
      console.log(`Sort option ${i + 1}: ${optionText}`);
    }
    
    // Select a sort option
    await sortOptions.nth(1).click();
    
    // Verify dropdown closes
    await expect(dropdownMenu).not.toBeVisible();
  });

  // Clear Filters Tests
  test('Clear filters functionality', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    
    // Add search term to trigger clear filters button
    await searchInput.fill('test search');
    await page.waitForTimeout(500);
    
    // Wait for clear button to appear
    const clearButton = page.locator('.filter-clear-button');
    await expect(clearButton).toBeVisible();
    
    // Click clear filters
    await clearButton.click();
    
    // Verify search input is cleared
    await expect(searchInput).toHaveValue('');
    
    // Clear button should disappear
    await expect(clearButton).not.toBeVisible();
  });

  // Combined Filters Test
  test('Combined filters - Search + Category', async ({ page }) => {
    // Apply search filter
    const searchInput = page.locator('#apps-search');
    await searchInput.fill('AI');
    
    // Apply category filter
    const categoryDropdown = page.locator('#apps-category-dropdown button');
    await categoryDropdown.click();
    
    const categoryOptions = page.locator('.multi-select-item');
    const optionCount = await categoryOptions.count();
    
    if (optionCount > 1) {
      await categoryOptions.nth(1).click();
    }
    
    // Verify clear filters button appears
    const clearButton = page.locator('.filter-clear-button');
    await expect(clearButton).toBeVisible();
    
    // Submit search
    const searchButton = page.locator('.universal-search-submit');
    await searchButton.click();
    await page.waitForTimeout(1000);
    
    // Verify search results appear
    const searchResults = page.locator('#sites-search-results');
    await expect(searchResults).toBeVisible();
  });

  // Dropdown Behavior Tests
  test('Dropdown behavior - Click outside to close', async ({ page }) => {
    // Open category dropdown
    const categoryDropdown = page.locator('#apps-category-dropdown button');
    await categoryDropdown.click();
    
    let dropdownMenu = page.locator('.filter-dropdown-menu');
    await expect(dropdownMenu).toBeVisible();
    
    // Click outside dropdown
    await page.click('body', { position: { x: 100, y: 100 } });
    
    // Dropdown should close
    await expect(dropdownMenu).not.toBeVisible();
    
    // Test with sort dropdown
    const sortDropdown = page.locator('#apps-sort-dropdown button');
    await sortDropdown.click();
    
    dropdownMenu = page.locator('.filter-dropdown-menu');
    await expect(dropdownMenu).toBeVisible();
    
    // Click outside
    await page.click('body', { position: { x: 100, y: 100 } });
    await expect(dropdownMenu).not.toBeVisible();
  });

  test('Dropdown behavior - One dropdown closes other', async ({ page }) => {
    // Open category dropdown
    const categoryDropdown = page.locator('#apps-category-dropdown button');
    await categoryDropdown.click();
    
    let categoryMenu = page.locator('#apps-category-dropdown .filter-dropdown-menu');
    await expect(categoryMenu).toBeVisible();
    
    // Open sort dropdown
    const sortDropdown = page.locator('#apps-sort-dropdown button');
    await sortDropdown.click();
    
    let sortMenu = page.locator('#apps-sort-dropdown .filter-dropdown-menu');
    await expect(sortMenu).toBeVisible();
    
    // Category dropdown should be closed
    await expect(categoryMenu).not.toBeVisible();
  });

  // Performance Tests
  test('Search performance - Response time', async ({ page }) => {
    const searchInput = page.locator('#apps-search');
    const searchButton = page.locator('.universal-search-submit');
    
    const startTime = Date.now();
    
    await searchInput.fill('code');
    await searchButton.click();
    
    // Wait for results to appear
    await page.waitForSelector('#sites-search-results', { timeout: 5000 });
    
    const responseTime = Date.now() - startTime;
    console.log(`Search response time: ${responseTime}ms`);
    
    // Search should respond within 2 seconds
    expect(responseTime).toBeLessThan(2000);
  });

  // URL State Management (if applicable)
  test('URL state - Search parameters', async ({ page }) => {
    // This test checks if search state is reflected in URL
    // Note: Implementation may not include URL params, so this is exploratory
    
    const searchInput = page.locator('#apps-search');
    await searchInput.fill('AI assistant');
    
    const searchButton = page.locator('.universal-search-submit');
    await searchButton.click();
    
    await page.waitForTimeout(1000);
    
    const currentUrl = page.url();
    console.log(`URL after search: ${currentUrl}`);
    
    // Check if URL contains search parameters (implementation dependent)
    // This is informational rather than a strict requirement
  });

});