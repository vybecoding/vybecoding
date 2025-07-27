const { chromium } = require('playwright');

async function verifyGrid() {
  console.log('🔍 Verifying grid layout...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(1000);
    
    // Take screenshot of grid
    const grid = await page.locator('#guides-browse-content > .grid').first();
    await grid.screenshot({ path: 'grid-layout.png' });
    
    console.log('✅ Screenshot saved: grid-layout.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyGrid().catch(console.error);