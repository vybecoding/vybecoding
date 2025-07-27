const { chromium } = require('playwright');

async function verifyCentering() {
  console.log('🔍 Verifying vertical centering fixes...');
  
  const browser = await chromium.launch({
    headless: true
  });
  
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(1000);
    
    // Take full card screenshot
    const firstCard = await page.locator('.minimal-card').first();
    await firstCard.screenshot({ path: 'centering-full-card.png' });
    
    // Take focused screenshots
    const guideBadge = await page.locator('.minimal-card').first();
    const guideBadgeBox = await guideBadge.boundingBox();
    await page.screenshot({
      path: 'centering-guide-label.png',
      clip: {
        x: guideBadgeBox.x,
        y: guideBadgeBox.y,
        width: 100,
        height: 40
      }
    });
    
    const bottomSection = await page.locator('.minimal-card .flex.items-center.justify-between.pt-3.border-t').first();
    await bottomSection.screenshot({ path: 'centering-bottom.png' });
    
    console.log('✅ Screenshots saved:');
    console.log('  - centering-full-card.png');
    console.log('  - centering-guide-label.png');
    console.log('  - centering-bottom.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyCentering().catch(console.error);