const { chromium } = require('playwright');

async function applyOptimizedSpacing() {
  console.log('🔧 Applying optimized spacing directly via JavaScript...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`http://localhost:8080/design-system-showcase.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Apply optimized spacing directly
    await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      
      cards.forEach(card => {
        // Optimize card padding (16px all around, 0 bottom)
        card.style.padding = '1rem 1rem 0 1rem';
        
        // Find stats section
        const statsSection = card.querySelector('.flex.items-center.justify-between.pt-3');
        if (statsSection) {
          // Equal padding above and below border line
          statsSection.style.paddingTop = '0.75rem';
          statsSection.style.paddingBottom = '0.75rem';
          statsSection.style.marginBottom = '0';
        }
        
        // Optimize content spacing
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
    
    // Measure final spacing
    const finalMeasurements = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardStyle = window.getComputedStyle(card);
        
        const stats = card.querySelector('.flex.items-center.justify-between.pt-3');
        const statsRect = stats ? stats.getBoundingClientRect() : null;
        const statsStyle = stats ? window.getComputedStyle(stats) : null;
        
        const title = card.querySelector('h3');
        const cardTitle = title ? title.textContent.trim() : `Card ${index}`;
        
        let statsToBottom = 0;
        if (statsRect && cardRect) {
          statsToBottom = cardRect.bottom - statsRect.bottom;
        }
        
        results.push({
          title: cardTitle,
          cardPadding: {
            top: parseFloat(cardStyle.paddingTop),
            right: parseFloat(cardStyle.paddingRight),
            bottom: parseFloat(cardStyle.paddingBottom),
            left: parseFloat(cardStyle.paddingLeft)
          },
          statsPadding: statsStyle ? {
            top: parseFloat(statsStyle.paddingTop),
            bottom: parseFloat(statsStyle.paddingBottom)
          } : null,
          statsToBottom: Math.round(statsToBottom)
        });
      });
      
      return results;
    });
    
    console.log('\\n📏 Optimized Spacing Results:');
    finalMeasurements.forEach(card => {
      console.log(`\\n${card.title}:`);
      console.log(`  Card padding: ${card.cardPadding.top}/${card.cardPadding.right}/${card.cardPadding.bottom}/${card.cardPadding.left}`);
      if (card.statsPadding) {
        console.log(`  Stats padding: top=${card.statsPadding.top}px, bottom=${card.statsPadding.bottom}px`);
        console.log(`  Stats to bottom: ${card.statsToBottom}px`);
        const isEqual = Math.abs(card.statsPadding.top - card.statsToBottom) <= 1;
        console.log(`  Equal spacing: ${isEqual ? '✅' : '❌'} (${card.statsPadding.top}px top vs ${card.statsToBottom}px bottom)`);
      }
    });
    
    // Take screenshot
    await page.screenshot({ path: 'optimized-spacing-cards.png', fullPage: true });
    
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ path: 'optimized-specialized-cards.png' });
    
    console.log('\\n📸 Optimized screenshots saved:');
    console.log('  - optimized-spacing-cards.png');
    console.log('  - optimized-specialized-cards.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

applyOptimizedSpacing().catch(console.error);