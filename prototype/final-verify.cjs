const { chromium } = require('playwright');

async function finalVerify() {
  console.log('🔍 Final verification of all fixes...');
  
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
    
    // Take screenshots of key areas
    const firstCard = await page.locator('.minimal-card').first();
    await firstCard.screenshot({ path: 'final-card-complete.png' });
    
    // Focus on date area
    const dateArea = await page.locator('.minimal-card .flex.items-center.gap-1.text-sm.text-vybe-gray-500').first();
    await dateArea.screenshot({ path: 'final-date-area.png' });
    
    // Focus on Advanced badge
    const advancedBadge = await page.locator('.minimal-card span.bg-red-500\\/10').first();
    await advancedBadge.screenshot({ path: 'final-advanced-badge.png' });
    
    console.log('\n📸 Screenshots saved:');
    console.log('  - final-card-complete.png (full card)');
    console.log('  - final-date-area.png (date with calendar icon)');
    console.log('  - final-advanced-badge.png (Advanced badge)');
    console.log('\n✅ Please verify:');
    console.log('  1. No line between calendar icon and date');
    console.log('  2. Date shows as "01/16/25" without "d" prefix');
    console.log('  3. Advanced badge text is complete and not cut off');
    console.log('  4. Advanced badge has increased height');
    console.log('\n🔍 Browser left open for manual inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

finalVerify().catch(console.error);