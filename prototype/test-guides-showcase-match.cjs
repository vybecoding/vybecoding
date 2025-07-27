const { chromium } = require('playwright');

async function testGuidesShowcaseMatch() {
  console.log('🔍 Testing guides cards showcase match...');
  
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
    console.log('📄 Navigating to guides page...');
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Take screenshot of updated design
    await page.screenshot({ 
      path: 'guides-showcase-match.png',
      fullPage: false 
    });
    
    // Analyze card styling
    const cardAnalysis = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const firstCard = cards[0];
      
      if (!firstCard) return { cardsFound: false };
      
      const styles = window.getComputedStyle(firstCard);
      const beforeStyles = window.getComputedStyle(firstCard, '::before');
      
      return {
        cardsFound: true,
        cardCount: cards.length,
        styling: {
          background: styles.background,
          border: styles.border,
          borderRadius: styles.borderRadius,
          minHeight: styles.minHeight,
          padding: styles.padding,
          overflow: styles.overflow
        },
        hasTypeLabel: beforeStyles.content === '"GUIDE"',
        grid: {
          display: window.getComputedStyle(document.querySelector('#guides-browse-content > .grid')).display,
          gridTemplateColumns: window.getComputedStyle(document.querySelector('#guides-browse-content > .grid')).gridTemplateColumns
        }
      };
    });
    
    console.log('\n📊 Card Analysis:');
    console.log(`- Cards Found: ${cardAnalysis.cardsFound ? '✅' : '❌'}`);
    
    if (cardAnalysis.cardsFound) {
      console.log(`- Card Count: ${cardAnalysis.cardCount}`);
      console.log(`- Has Type Label: ${cardAnalysis.hasTypeLabel ? '✅' : '❌'}`);
      console.log(`- Grid Display: ${cardAnalysis.grid.display}`);
      console.log(`- Border Radius: ${cardAnalysis.styling.borderRadius}`);
      console.log(`- Min Height: ${cardAnalysis.styling.minHeight}`);
    }
    
    // Test hover effect
    console.log('\n🖱️ Testing hover effect...');
    await page.hover('.minimal-card:first-child');
    await page.waitForTimeout(500);
    
    const hoverStyles = await page.evaluate(() => {
      const card = document.querySelector('.minimal-card:first-child');
      const styles = window.getComputedStyle(card);
      return {
        transform: styles.transform,
        boxShadow: styles.boxShadow
      };
    });
    
    console.log(`- Transform on hover: ${hoverStyles.transform}`);
    console.log(`- Box shadow on hover: ${hoverStyles.boxShadow ? 'Applied' : 'None'}`);
    
    console.log('\n✅ Test complete! Check guides-showcase-match.png');
    console.log('🔍 Browser left open for manual inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

testGuidesShowcaseMatch().catch(console.error);