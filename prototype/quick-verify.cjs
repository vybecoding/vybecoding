const { chromium } = require('playwright');

async function quickVerify() {
  console.log('🔍 Quick verification...');
  
  const browser = await chromium.launch({
    headless: true // Run headless for speed
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
    await page.waitForTimeout(500);
    
    // Take screenshots
    const firstCard = await page.locator('.minimal-card').first();
    await firstCard.screenshot({ path: 'final-result.png' });
    
    console.log('✅ Screenshot saved: final-result.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

quickVerify().catch(console.error);