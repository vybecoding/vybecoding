const { chromium } = require('playwright');

async function finalVerification() {
  console.log('🔍 Final verification with cache busting...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080', '--disable-web-security', '--disable-features=VizDisplayCompositor']
  });
  
  try {
    const page = await browser.newPage({ 
      viewport: { width: 1920, height: 1080 }
    });
    
    // Hard reload with cache disabled
    await page.goto(`http://localhost:8080/design-system-showcase.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Force aggressive CSS reload
    await page.evaluate(() => {
      // Remove all existing stylesheets
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        const href = link.href.split('?')[0];
        link.href = href + '?bust=' + Date.now() + Math.random();
      });
      
      // Wait for styles to reload
      return new Promise(resolve => setTimeout(resolve, 2000));
    });
    
    await page.waitForTimeout(3000);
    
    // Scroll to specialized cards section
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(1000);
    
    // Check final state
    const finalResults = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const grid = document.querySelector('div[style*="display: grid"]');
      
      const results = {
        gridHeight: grid ? window.getComputedStyle(grid).height : 'not found',
        cards: []
      };
      
      cards.forEach((card, index) => {
        const computedStyle = window.getComputedStyle(card);
        const rect = card.getBoundingClientRect();
        const titleElement = card.querySelector('h3');
        
        results.cards.push({
          index,
          title: titleElement ? titleElement.textContent.trim() : '',
          computedHeight: computedStyle.height,
          actualHeight: Math.round(rect.height),
          minHeight: computedStyle.minHeight,
          isFlexible: computedStyle.height === 'auto' && computedStyle.minHeight === '0px'
        });
      });
      
      return results;
    });
    
    console.log('\\n🎯 Final Results:');
    console.log(`Grid container height: ${finalResults.gridHeight}`);
    console.log('\\nCard flexibility:');
    
    let flexibleCount = 0;
    finalResults.cards.forEach(card => {
      const status = card.isFlexible ? '✅ FLEXIBLE' : '❌ FIXED';
      console.log(`${status} - ${card.title}: ${card.actualHeight}px (computed: ${card.computedHeight})`);
      if (card.isFlexible) flexibleCount++;
    });
    
    console.log(`\\n📊 Summary: ${flexibleCount}/${finalResults.cards.length} cards are now flexible`);
    
    // Take final screenshots
    await page.screenshot({ 
      path: 'final-flexible-cards.png', 
      fullPage: true 
    });
    
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ 
      path: 'final-specialized-cards.png' 
    });
    
    console.log('\\n📸 Final screenshots saved:');
    console.log('  - final-flexible-cards.png');
    console.log('  - final-specialized-cards.png');
    
    if (flexibleCount === finalResults.cards.length) {
      console.log('\\n🎉 SUCCESS: All cards are now flexible!');
    } else {
      console.log('\\n⚠️ Some cards still need work');
    }
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

finalVerification().catch(console.error);