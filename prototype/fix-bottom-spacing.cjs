const { chromium } = require('playwright');

async function fixBottomSpacing() {
  console.log('🔧 Fixing bottom spacing to be truly equal...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`http://localhost:8080/design-system-showcase.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Apply perfect spacing
    await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      
      cards.forEach(card => {
        // Optimize card padding (16px sides and top, 16px bottom for equal spacing)
        card.style.padding = '1rem';
        card.style.paddingBottom = '1rem'; // Ensure bottom padding matches stats padding
        
        // Find stats section and make spacing equal
        const statsSection = card.querySelector('.flex.items-center.justify-between.pt-3');
        if (statsSection) {
          // Set equal padding top and no padding bottom (card handles bottom)
          statsSection.style.paddingTop = '0.75rem';
          statsSection.style.paddingBottom = '0';
          statsSection.style.marginBottom = '0';
          
          // Remove any inline margin-top: auto style
          statsSection.style.marginTop = 'auto';
        }
        
        // Optimize other content spacing for better space usage
        const title = card.querySelector('h3');
        if (title) {
          title.style.marginBottom = '0.5rem';
        }
        
        const author = card.querySelector('.flex.items-center.gap-2:not(.justify-between)');
        if (author) {
          author.style.marginBottom = '0.5rem';
        }
        
        const description = card.querySelector('p.text-sm.text-vybe-gray-400');
        if (description) {
          description.style.marginBottom = '0.75rem';
        }
        
        const tags = card.querySelector('.flex.flex-wrap.gap-2');
        if (tags) {
          tags.style.marginBottom = '0.75rem';
        }
      });
    });
    
    await page.waitForTimeout(1000);
    
    // Scroll to specialized cards section
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(500);
    
    // Measure final spacing to verify equal spacing
    const finalCheck = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardStyle = window.getComputedStyle(card);
        
        const stats = card.querySelector('.flex.items-center.justify-between.pt-3');
        const statsRect = stats ? stats.getBoundingClientRect() : null;
        const statsStyle = stats ? window.getComputedStyle(stats) : null;
        
        // Find the border line within stats
        const borderTop = stats ? parseFloat(statsStyle.borderTopWidth || 0) : 0;
        
        const title = card.querySelector('h3');
        const cardTitle = title ? title.textContent.trim() : `Card ${index}`;
        
        let spacingAboveBorder = 0;
        let spacingBelowBorder = 0;
        
        if (statsRect && cardRect && statsStyle) {
          spacingAboveBorder = parseFloat(statsStyle.paddingTop);
          spacingBelowBorder = cardRect.bottom - statsRect.bottom + parseFloat(cardStyle.paddingBottom);
        }
        
        results.push({
          title: cardTitle,
          spacingAboveBorder: Math.round(spacingAboveBorder),
          spacingBelowBorder: Math.round(spacingBelowBorder),
          isEqual: Math.abs(spacingAboveBorder - spacingBelowBorder) <= 1,
          cardPaddingBottom: parseFloat(cardStyle.paddingBottom),
          statsPaddingTop: statsStyle ? parseFloat(statsStyle.paddingTop) : 0
        });
      });
      
      return results;
    });
    
    console.log('\\n📏 Final Equal Spacing Check:');
    finalCheck.forEach(card => {
      console.log(`\\n${card.title}:`);
      console.log(`  Above border line: ${card.spacingAboveBorder}px`);
      console.log(`  Below border line: ${card.spacingBelowBorder}px`);
      console.log(`  Equal spacing: ${card.isEqual ? '✅' : '❌'}`);
      console.log(`  Card bottom padding: ${card.cardPaddingBottom}px`);
      console.log(`  Stats top padding: ${card.statsPaddingTop}px`);
    });
    
    const allEqual = finalCheck.every(card => card.isEqual);
    console.log(`\\n🎯 Overall result: ${allEqual ? '✅ All spacing is now equal!' : '⚠️ Some spacing still needs adjustment'}`);
    
    // Take final screenshots
    await page.screenshot({ path: 'final-equal-spacing.png', fullPage: true });
    
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ path: 'final-specialized-equal.png' });
    
    console.log('\\n📸 Final screenshots saved:');
    console.log('  - final-equal-spacing.png');
    console.log('  - final-specialized-equal.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

fixBottomSpacing().catch(console.error);