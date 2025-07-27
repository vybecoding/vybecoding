const { chromium } = require('playwright');

async function verifyGuidesGridFix() {
  console.log('🔍 Verifying guides grid layout fix...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Navigate to guides page
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'guides-grid-fix-verification.png',
      fullPage: false 
    });
    
    // Check grid layout
    const gridAnalysis = await page.evaluate(() => {
      const browseGrid = document.querySelector('#guides-browse-content > .grid');
      const cards = browseGrid ? browseGrid.querySelectorAll('.minimal-card') : [];
      
      const results = {
        gridFound: !!browseGrid,
        cardCount: cards.length,
        gridStyles: null,
        cardsInRow: false,
        individualContainers: true
      };
      
      if (browseGrid) {
        const styles = window.getComputedStyle(browseGrid);
        results.gridStyles = {
          display: styles.display,
          gridTemplateColumns: styles.gridTemplateColumns,
          gap: styles.gap,
          overflow: styles.overflow
        };
        
        // Check if cards are in grid layout (not horizontal scroll)
        if (cards.length > 1) {
          const firstCardRect = cards[0].getBoundingClientRect();
          const secondCardRect = cards[1].getBoundingClientRect();
          
          // If cards are side by side (not stacked), they're in a row
          results.cardsInRow = Math.abs(firstCardRect.top - secondCardRect.top) < 10;
          
          // Check if cards have proper individual styling
          results.firstCardStyles = {
            display: window.getComputedStyle(cards[0]).display,
            width: cards[0].offsetWidth,
            height: cards[0].offsetHeight,
            background: window.getComputedStyle(cards[0]).background
          };
        }
      }
      
      return results;
    });
    
    console.log('\n📊 Grid Analysis:');
    console.log(`- Grid Found: ${gridAnalysis.gridFound ? '✅' : '❌'}`);
    console.log(`- Card Count: ${gridAnalysis.cardCount}`);
    
    if (gridAnalysis.gridStyles) {
      console.log(`- Display: ${gridAnalysis.gridStyles.display}`);
      console.log(`- Grid Columns: ${gridAnalysis.gridStyles.gridTemplateColumns}`);
      console.log(`- Gap: ${gridAnalysis.gridStyles.gap}`);
      console.log(`- Cards in Row: ${gridAnalysis.cardsInRow ? '✅' : '❌'}`);
    }
    
    if (gridAnalysis.firstCardStyles) {
      console.log('\n📐 First Card Styles:');
      console.log(`- Display: ${gridAnalysis.firstCardStyles.display}`);
      console.log(`- Width: ${gridAnalysis.firstCardStyles.width}px`);
      console.log(`- Height: ${gridAnalysis.firstCardStyles.height}px`);
    }
    
    console.log('\n✅ Verification complete! Check guides-grid-fix-verification.png');
    console.log('🔍 Browser left open for manual inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

verifyGuidesGridFix().catch(console.error);