const { chromium } = require('playwright');

async function verifyContainers() {
  console.log('🔍 Verifying container fixes...');
  
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
    
    // Force reload CSS with cache busting
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(2000);
    
    // Get element dimensions for verification
    const dateContainer = await page.locator('.minimal-card .flex.items-center.gap-1.text-sm.text-vybe-gray-500').first();
    const dateBox = await dateContainer.boundingBox();
    console.log('\n📏 Date container dimensions:', dateBox);
    
    const advancedBadge = await page.locator('.minimal-card span.bg-red-500\\/10').first();
    const badgeBox = await advancedBadge.boundingBox();
    console.log('📏 Advanced badge dimensions:', badgeBox);
    
    // Take focused screenshots
    await dateContainer.screenshot({ path: 'containers-date.png' });
    await advancedBadge.screenshot({ path: 'containers-badge.png' });
    
    // Take full card screenshot
    const firstCard = await page.locator('.minimal-card').first();
    await firstCard.screenshot({ path: 'containers-full-card.png' });
    
    console.log('\n📸 Screenshots saved:');
    console.log('  - containers-date.png');
    console.log('  - containers-badge.png');
    console.log('  - containers-full-card.png');
    console.log('\n✅ Container dimensions logged above');
    console.log('🔍 Browser left open for inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

verifyContainers().catch(console.error);