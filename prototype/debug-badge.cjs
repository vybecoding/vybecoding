const { chromium } = require('playwright');

async function debugBadge() {
  console.log('🔍 Debugging badge centering...');
  
  const browser = await chromium.launch({
    headless: false,
    devtools: true
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
    
    // Get computed styles
    const badgeStyles = await page.evaluate(() => {
      const badge = document.querySelector('.minimal-card span.bg-red-500\\/10');
      if (!badge) return null;
      
      const computed = window.getComputedStyle(badge);
      const rect = badge.getBoundingClientRect();
      
      return {
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        lineHeight: computed.lineHeight,
        fontSize: computed.fontSize,
        height: computed.height,
        display: computed.display,
        alignItems: computed.alignItems,
        boxSizing: computed.boxSizing,
        textContent: badge.textContent.trim(),
        boundingBox: {
          height: rect.height,
          width: rect.width
        }
      };
    });
    
    console.log('\n📏 Badge computed styles:', badgeStyles);
    
    // Take close-up screenshot
    const badge = await page.locator('.minimal-card span.bg-red-500\\/10').first();
    await badge.screenshot({ path: 'badge-debug.png' });
    
    console.log('\n📸 Screenshot saved: badge-debug.png');
    console.log('\n🔍 DevTools opened - inspect the badge element');
    
    // Keep browser open for inspection
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugBadge().catch(console.error);