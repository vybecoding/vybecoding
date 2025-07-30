import { chromium } from 'playwright';

async function testNavigation() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Testing Navigation component...');
    
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the home page
    console.log('Navigating to http://localhost:3002...');
    await page.goto('http://localhost:3002', { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    // Wait for navigation to be visible
    console.log('Waiting for navigation...');
    await page.waitForSelector('nav', { timeout: 5000 });
    
    // Take a screenshot of the full page
    await page.screenshot({ 
      path: 'navigation-desktop.png', 
      fullPage: false 
    });
    
    console.log('✓ Desktop navigation screenshot saved as navigation-desktop.png');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ 
      path: 'navigation-mobile.png', 
      fullPage: false 
    });
    
    console.log('✓ Mobile navigation screenshot saved as navigation-mobile.png');
    
    // Test mobile menu
    const menuButton = await page.$('button[aria-label*="menu"]');
    if (menuButton) {
      await menuButton.click();
      await page.waitForTimeout(500); // Wait for animation
      await page.screenshot({ 
        path: 'navigation-mobile-menu-open.png', 
        fullPage: true 
      });
      console.log('✓ Mobile menu screenshot saved as navigation-mobile-menu-open.png');
    }
    
    console.log('\n✅ Navigation component test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testNavigation();