// Test that the apps page renders correctly
import { test, expect } from '@playwright/test';

test.describe('Apps Page', () => {
  test('should render the apps listing page', async ({ page }) => {
    // Navigate to apps page
    await page.goto('http://localhost:3001/apps');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if the main elements are present
    await expect(page.locator('h1')).toContainText('Apps');
    await expect(page.locator('.universal-search')).toBeVisible();
    await expect(page.locator('.apps-tab')).toHaveCount(2);
    
    // Take a screenshot
    await page.screenshot({ path: 'apps-page.png', fullPage: true });
    
    console.log('Apps page loaded successfully');
  });
});