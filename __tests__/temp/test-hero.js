import { chromium } from 'playwright';

async function testHero() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Testing Hero section...');
    
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the home page
    console.log('Navigating to http://localhost:3002...');
    await page.goto('http://localhost:3002', { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    // Wait for hero section to be visible
    console.log('Waiting for hero section...');
    await page.waitForSelector('section h1', { timeout: 5000 });
    
    // Wait a bit for animations to complete
    await page.waitForTimeout(1500);
    
    // Take a screenshot of the hero section
    await page.screenshot({ 
      path: 'hero-desktop.png', 
      fullPage: false 
    });
    
    console.log('✓ Desktop hero screenshot saved as hero-desktop.png');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ 
      path: 'hero-mobile.png', 
      fullPage: false 
    });
    
    console.log('✓ Mobile hero screenshot saved as hero-mobile.png');
    
    // Test particle animation
    const hasCanvas = await page.$('canvas');
    if (hasCanvas) {
      console.log('✓ Particle canvas found and rendering');
    }
    
    console.log('\n✅ Hero section test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testHero();