const { chromium } = require('playwright');

async function verifyIconAlignment() {
  console.log('🔍 Verifying calendar icon alignment...');
  
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
    
    // Take close-up of date area
    const dateArea = await page.locator('.minimal-card .flex.items-center.gap-1.text-sm.text-vybe-gray-500').first();
    await dateArea.screenshot({ path: 'icon-alignment.png' });
    
    console.log('✅ Screenshot saved: icon-alignment.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyIconAlignment().catch(console.error);