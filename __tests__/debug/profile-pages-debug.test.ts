import { test, expect } from '@playwright/test';

test.describe('Profile Pages Debug', () => {
  test('debug profile page rendering', async ({ page }) => {
    // Enable console logging
    page.on('console', msg => {
      console.log(`Browser console [${msg.type()}]:`, msg.text());
    });

    // Enable network logging
    page.on('response', response => {
      if (response.url().includes('convex') || response.url().includes('api')) {
        console.log(`Network response: ${response.url()} - ${response.status()}`);
      }
    });

    // Navigate to a test profile
    console.log('Navigating to profile page...');
    await page.goto('http://localhost:3000/profile/testuser', {
      waitUntil: 'networkidle'
    });

    // Wait a bit to see what loads
    await page.waitForTimeout(3000);

    // Take screenshot of current state
    await page.screenshot({ 
      path: '__tests__/debug/screenshots/profile-page-state.png',
      fullPage: true 
    });

    // Check what's actually rendered
    const pageContent = await page.content();
    console.log('Page title:', await page.title());
    
    // Check if we're seeing the loading skeleton
    const hasLoadingSkeleton = await page.locator('.animate-pulse').count() > 0;
    console.log('Has loading skeleton:', hasLoadingSkeleton);

    // Check for error states
    const hasNotFound = await page.locator('text=Profile Not Found').count() > 0;
    console.log('Has not found error:', hasNotFound);

    // Check for profile tabs
    const hasTabs = await page.locator('.profile-tab').count() > 0;
    console.log('Has profile tabs:', hasTabs);

    // Check what username is being used
    const usernameFromUrl = page.url().split('/').pop();
    console.log('Username from URL:', usernameFromUrl);

    // Check Convex query state
    await page.evaluate(() => {
      console.log('Window object keys:', Object.keys(window));
      // Log any React or Convex related data
      const reactRoot = document.querySelector('#__next');
      console.log('React root exists:', !!reactRoot);
    });

    // Try different test users
    const testUsernames = ['alexchen', 'sarahtech', 'mikecreative'];
    
    for (const username of testUsernames) {
      console.log(`\nTesting username: ${username}`);
      await page.goto(`http://localhost:3000/profile/${username}`, {
        waitUntil: 'networkidle'
      });
      
      await page.waitForTimeout(2000);
      
      const hasContent = await page.locator('.profile-tab').count() > 0;
      console.log(`Profile ${username} has content:`, hasContent);
      
      await page.screenshot({ 
        path: `__tests__/debug/screenshots/profile-${username}.png`,
        fullPage: true 
      });
    }
  });

  test('check members page profiles', async ({ page }) => {
    // Navigate to members page
    await page.goto('http://localhost:3000/members');
    await page.waitForTimeout(2000);

    // Click on first member card
    const firstMemberCard = page.locator('[class*="DemoMemberCard"]').first();
    const memberExists = await firstMemberCard.count() > 0;
    
    if (memberExists) {
      // Get the username from the card
      const usernameText = await firstMemberCard.locator('text=@').textContent();
      console.log('First member username:', usernameText);
      
      // Click the card
      await firstMemberCard.click();
      
      // Wait for navigation
      await page.waitForTimeout(2000);
      
      // Check where we ended up
      console.log('Current URL after click:', page.url());
      
      // Take screenshot
      await page.screenshot({ 
        path: '__tests__/debug/screenshots/profile-from-members.png',
        fullPage: true 
      });
    }
  });
});