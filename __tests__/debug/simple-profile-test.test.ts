import { test, expect } from '@playwright/test';

test.describe('Simple Profile Test', () => {
  test('check profile page basic loading', async ({ page }) => {
    // Log network activity
    page.on('response', response => {
      if (response.url().includes('convex') || response.url().includes('api')) {
        console.log(`API call: ${response.url()} - Status: ${response.status()}`);
      }
    });

    // Navigate to profile
    await page.goto('http://localhost:3000/profile/alexchen');
    
    // Wait for page to settle
    await page.waitForTimeout(3000);
    
    // Check current URL
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    // Take screenshot
    await page.screenshot({ 
      path: '__tests__/debug/screenshots/simple-profile-test.png',
      fullPage: true 
    });
    
    // Check for various states
    const pageContent = await page.content();
    const hasSignIn = pageContent.includes('Sign In') || pageContent.includes('sign-in');
    const hasProfile = pageContent.includes('Profile') || pageContent.includes('profile');
    const hasError = pageContent.includes('Not Found') || pageContent.includes('error');
    
    console.log('Page state:', {
      url: currentUrl,
      hasSignIn,
      hasProfile,
      hasError,
      title: await page.title()
    });
    
    // Check if we have the profile tabs
    const profileInfoTab = await page.locator('text=Profile Info').count();
    const bookSessionTab = await page.locator('text=Book Session').count();
    
    console.log('Tabs found:', {
      profileInfo: profileInfoTab,
      bookSession: bookSessionTab
    });
    
    // Check page structure
    const mainContent = await page.locator('main').count();
    const nebulaBg = await page.locator('.nebula-background').count();
    
    console.log('Page structure:', {
      hasMainContent: mainContent > 0,
      hasNebulaBg: nebulaBg > 0
    });
  });
});