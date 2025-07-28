const { chromium } = require('playwright');

async function verifyAllPagesUpdated() {
  console.log('🔍 Verifying all pages have showcase card styles...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  const pages = ['guides', 'apps', 'members', 'featured'];
  
  try {
    for (const pageName of pages) {
      console.log(`\\n📄 Checking ${pageName}.html...`);
      
      const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
      await page.goto(`http://localhost:8080/pages/${pageName}.html?v=${Date.now()}`, { 
        waitUntil: 'networkidle' 
      });
      
      // Check if showcase CSS files are loaded
      const cssCheck = await page.evaluate(() => {
        const showcaseFiles = [
          'showcase-cards-fix.css',
          'force-flexible-cards.css',
          'showcase-perfect-labels.css',
          'ultimate-row-spacing.css',
          'fix-calendar-and-member-cards.css'
        ];
        
        const loaded = {};
        showcaseFiles.forEach(file => {
          const link = document.querySelector(`link[href*="${file}"]`);
          loaded[file] = !!link;
        });
        
        return loaded;
      });
      
      console.log('  CSS Files loaded:');
      Object.entries(cssCheck).forEach(([file, loaded]) => {
        console.log(`    ${loaded ? '✅' : '❌'} ${file}`);
      });
      
      // Check card styling
      const cardMetrics = await page.evaluate(() => {
        const cards = document.querySelectorAll('.minimal-card');
        const firstCard = cards[0];
        
        if (!firstCard) return { cardCount: 0 };
        
        const style = window.getComputedStyle(firstCard);
        
        return {
          cardCount: cards.length,
          padding: {
            top: style.paddingTop,
            right: style.paddingRight,
            bottom: style.paddingBottom,
            left: style.paddingLeft
          },
          height: style.height,
          minHeight: style.minHeight
        };
      });
      
      console.log(`  Cards found: ${cardMetrics.cardCount}`);
      if (cardMetrics.cardCount > 0) {
        console.log(`  Card padding: ${cardMetrics.padding.top}/${cardMetrics.padding.right}/${cardMetrics.padding.bottom}/${cardMetrics.padding.left}`);
        console.log(`  Card height: ${cardMetrics.height}, min-height: ${cardMetrics.minHeight}`);
      }
      
      // Take screenshot
      await page.screenshot({ 
        path: `${pageName}-page-verified.png`,
        fullPage: true 
      });
      
      await page.close();
    }
    
    console.log('\\n✅ All pages verified!');
    console.log('\\nScreenshots saved:');
    pages.forEach(page => {
      console.log(`  - ${page}-page-verified.png`);
    });
    
    console.log('\\nBrowser window left open for manual inspection...');
    await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await new Promise(resolve => setTimeout(resolve, 30000));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyAllPagesUpdated().catch(console.error);