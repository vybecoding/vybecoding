const { chromium } = require('playwright');

async function verifyFinalGap() {
  console.log('🔍 Final verification of badge gap with hard refresh...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const context = await browser.newContext();
    const page = await context.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Clear cache and go to apps page
    console.log('📄 Loading apps page with cleared cache...');
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle',
      // Force reload
    });
    
    // Hard refresh
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check the gap
    const result = await page.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      const container = card.querySelector('.flex.flex-wrap.gap-2');
      const badges = container.querySelectorAll('span');
      
      const computedStyle = window.getComputedStyle(container);
      
      // Visual measurement
      const gaps = [];
      for (let i = 1; i < badges.length; i++) {
        const rect1 = badges[i-1].getBoundingClientRect();
        const rect2 = badges[i].getBoundingClientRect();
        gaps.push(rect2.left - rect1.right);
      }
      
      // Check which CSS files loaded
      const loadedCSS = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => link.href)
        .filter(href => href.includes('badge-gap') || href.includes('force-4px'));
      
      return {
        computedGap: computedStyle.gap,
        columnGap: computedStyle.columnGap,
        rowGap: computedStyle.rowGap,
        visualGaps: gaps,
        avgGap: gaps.reduce((a,b) => a+b) / gaps.length,
        loadedCSS: loadedCSS
      };
    });
    
    console.log('Computed gap:', result.computedGap);
    console.log('Column gap:', result.columnGap);
    console.log('Row gap:', result.rowGap);
    console.log('Visual gaps:', result.visualGaps.map(g => g.toFixed(1)).join(', '), 'px');
    console.log('Average gap:', result.avgGap.toFixed(1), 'px');
    console.log('\nLoaded CSS files:');
    result.loadedCSS.forEach(css => {
      console.log('  -', css.split('/').pop());
    });
    
    if (result.avgGap === 4) {
      console.log('\n✅ Badge gap is correctly set to 4px!');
    } else {
      console.log(`\n❌ Badge gap is ${result.avgGap.toFixed(1)}px, should be 4px`);
    }
    
    // Take final screenshot
    await page.screenshot({ path: 'apps-final-badge-gap.png', fullPage: false });
    console.log('\n📸 Screenshot saved: apps-final-badge-gap.png');
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyFinalGap().catch(console.error);