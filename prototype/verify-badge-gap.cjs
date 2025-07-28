const { chromium } = require('playwright');

async function verifyBadgeGap() {
  console.log('🔍 Verifying badge gap has been reduced by 50%...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Check apps page
    console.log('📄 Checking apps page badge gaps...');
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const appsGap = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      if (!firstCard) return { error: 'No card found' };
      
      const badgeContainer = firstCard.querySelector('.flex.flex-wrap.gap-2');
      if (!badgeContainer) return { error: 'No badge container found' };
      
      const containerStyle = window.getComputedStyle(badgeContainer);
      const badges = badgeContainer.querySelectorAll('span');
      
      return {
        gap: containerStyle.gap,
        badgeCount: badges.length,
        containerClasses: badgeContainer.className
      };
    });
    
    console.log(`Apps page badge gap: ${appsGap.gap}`);
    console.log(`Number of badges: ${appsGap.badgeCount}`);
    
    // Check guides page for comparison
    console.log('\n📄 Checking guides page badge gaps...');
    await page.goto('http://localhost:8080/#guides', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const guidesGap = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      if (!firstCard) return { error: 'No card found' };
      
      const badgeContainer = firstCard.querySelector('.flex.flex-wrap.gap-2');
      if (!badgeContainer) return { error: 'No badge container found' };
      
      const containerStyle = window.getComputedStyle(badgeContainer);
      
      return {
        gap: containerStyle.gap
      };
    });
    
    console.log(`Guides page badge gap: ${guidesGap.gap}`);
    
    // Take screenshots
    await page.goto('http://localhost:8080/#apps');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'apps-badge-gap-fixed.png', fullPage: false });
    
    console.log('\n📸 Screenshot saved: apps-badge-gap-fixed.png');
    
    if (appsGap.gap === '4px' || appsGap.gap === '0.25rem') {
      console.log('\n✅ Badge gap successfully reduced to 4px (50% of original 8px)');
    } else {
      console.log('\n❌ Badge gap not properly reduced. Current gap:', appsGap.gap);
    }
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyBadgeGap().catch(console.error);