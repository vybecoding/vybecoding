import { test, expect } from '@playwright/test';

test.describe('Complete Profile Flow', () => {
  test('navigate from members page to profile and verify content', async ({ page }) => {
    // Navigate to members page
    await page.goto('http://localhost:3000/members');
    
    // Wait for member cards
    await page.waitForSelector('[class*="cursor-pointer"]', {
      timeout: 10000
    });
    
    // Find Alex Chen's card
    const alexCard = page.locator('text=Alex Chen').first();
    const cardExists = await alexCard.count() > 0;
    
    console.log('Alex Chen card found:', cardExists);
    
    if (cardExists) {
      // Get the parent card element and click it
      const parentCard = alexCard.locator('xpath=ancestor::div[contains(@class, "cursor-pointer")]').first();
      await parentCard.click();
      
      // Wait for navigation
      await page.waitForURL('**/profile/**', { timeout: 5000 });
      
      // Verify we're on the profile page
      const currentUrl = page.url();
      console.log('Navigated to:', currentUrl);
      expect(currentUrl).toContain('/profile/alexchen');
      
      // Wait for profile content to load
      await page.waitForSelector('.profile-tab', { timeout: 5000 });
      
      // Verify profile elements
      const hasProfileInfo = await page.locator('text=Profile Info').count() > 0;
      const hasBookSession = await page.locator('text=Book Session').count() > 0;
      const hasAboutMe = await page.locator('text=About Me').count() > 0;
      
      console.log('Profile elements:', {
        hasProfileInfo,
        hasBookSession,
        hasAboutMe
      });
      
      // Take final screenshot
      await page.screenshot({ 
        path: '__tests__/debug/screenshots/complete-flow-profile.png',
        fullPage: true 
      });
      
      // Verify we have profile content
      expect(hasProfileInfo).toBe(true);
      expect(hasBookSession).toBe(true);
    }
  });
});