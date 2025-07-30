const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the home page
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Wait for navigation to be visible
    await page.waitForSelector('nav', { timeout: 5000 });
    
    // Take a screenshot of the full page
    await page.screenshot({ 
      path: 'navigation-desktop.png', 
      fullPage: false 
    });
    
    console.log('Desktop navigation screenshot saved as navigation-desktop.png');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ 
      path: 'navigation-mobile.png', 
      fullPage: false 
    });
    
    console.log('Mobile navigation screenshot saved as navigation-mobile.png');
    
    // Test mobile menu
    const menuButton = await page.$('button[aria-label*="menu"]');
    if (menuButton) {
      await menuButton.click();
      await page.waitForTimeout(500); // Wait for animation
      await page.screenshot({ 
        path: 'navigation-mobile-menu-open.png', 
        fullPage: true 
      });
      console.log('Mobile menu screenshot saved as navigation-mobile-menu-open.png');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();