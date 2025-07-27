const { chromium } = require('playwright');

async function verifyLineFix() {
  console.log('🔍 Verifying the line fix...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      bypassCSP: true
    });
    
    const page = await context.newPage();
    
    // Navigate and force CSS reload
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Force reload CSS
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(1000);
    
    // Take screenshots
    const dateArea = await page.locator('.minimal-card .flex.items-center.gap-1.text-sm.text-vybe-gray-500').first();
    await dateArea.screenshot({ path: 'date-line-fixed.png' });
    
    const firstCard = await page.locator('.minimal-card').first();
    await firstCard.screenshot({ path: 'card-final.png' });
    
    console.log('\n📸 Screenshots saved:');
    console.log('  - date-line-fixed.png');
    console.log('  - card-final.png');
    console.log('\n✅ Please check if the line is gone!');
    console.log('🔍 Browser left open for inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

verifyLineFix().catch(console.error);