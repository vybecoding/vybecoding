import { test, expect } from '@playwright/test';

test.describe('Verify Profile Pages Fix', () => {
  test('profile pages should load without authentication', async ({ page }) => {
    // Test a specific profile
    await page.goto('http://localhost:3000/profile/alexchen');
    
    // Wait for either profile content or error state
    await page.waitForSelector('.profile-tab, text=Profile Not Found, .animate-pulse', {
      timeout: 10000
    });
    
    // Check if we're NOT on the sign-in page
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/sign-in');
    
    // Take screenshot
    await page.screenshot({ 
      path: '__tests__/debug/screenshots/profile-fixed-alexchen.png',
      fullPage: true 
    });
    
    // Log what we see
    const hasProfileTabs = await page.locator('.profile-tab').count() > 0;
    const hasNotFound = await page.locator('text=Profile Not Found').count() > 0;
    const hasLoading = await page.locator('.animate-pulse').count() > 0;
    
    console.log('Profile page state:', {
      hasProfileTabs,
      hasNotFound,
      hasLoading,
      url: currentUrl
    });
  });

  test('members page should work and link to profiles', async ({ page }) => {
    // Navigate to members page
    await page.goto('http://localhost:3000/members');
    
    // Wait for member cards to load
    await page.waitForSelector('[class*="DemoMemberCard"]', {
      timeout: 10000
    });
    
    // Get the first member card
    const firstCard = page.locator('[class*="DemoMemberCard"]').first();
    
    // Extract the username
    const usernameElement = await firstCard.locator('text=@').textContent();
    const username = usernameElement?.replace('@', '');
    console.log('Found member username:', username);
    
    // Click the card
    await firstCard.click();
    
    // Wait for navigation
    await page.waitForTimeout(2000);
    
    // Verify we're on a profile page
    const newUrl = page.url();
    expect(newUrl).toContain('/profile/');
    expect(newUrl).not.toContain('/sign-in');
    
    console.log('Navigated to:', newUrl);
    
    // Take screenshot
    await page.screenshot({ 
      path: '__tests__/debug/screenshots/profile-from-members-fixed.png',
      fullPage: true 
    });
  });
});