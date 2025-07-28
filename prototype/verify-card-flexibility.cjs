const { chromium } = require('playwright');

async function verifyCardFlexibility() {
  console.log('🔍 Verifying card flexibility and spacing fixes...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('http://localhost:8080/design-system-showcase.html', { waitUntil: 'networkidle' });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(1000);
    
    // Scroll to specialized cards section
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(500);
    
    // Check card heights and spacing
    const cardMetrics = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(card);
        const statsSection = card.querySelector('.flex.items-center.justify-between.pt-3');
        const titleElement = card.querySelector('h3');
        
        let statsSpacing = null;
        if (statsSection) {
          const statsRect = statsSection.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          statsSpacing = {
            paddingTop: parseFloat(computedStyle.paddingTop) || 0,
            paddingBottom: parseFloat(computedStyle.paddingBottom) || 0,
            distanceFromBottom: cardRect.bottom - statsRect.bottom
          };
        }
        
        results.push({
          cardIndex: index,
          title: titleElement ? titleElement.textContent.trim() : '',
          height: rect.height,
          minHeight: computedStyle.minHeight,
          computedHeight: computedStyle.height,
          hasFixedHeight: computedStyle.height !== 'auto' && computedStyle.height !== '0px',
          paddingBottom: parseFloat(computedStyle.paddingBottom) || 0,
          statsSpacing: statsSpacing
        });
      });
      
      return results;
    });
    
    console.log('\\n📊 Card Metrics:');
    cardMetrics.forEach(metric => {
      console.log(`\\nCard ${metric.cardIndex}: ${metric.title}`);
      console.log(`  Height: ${Math.round(metric.height)}px`);
      console.log(`  Min-height: ${metric.minHeight}`);
      console.log(`  Computed height: ${metric.computedHeight}`);
      console.log(`  Has fixed height: ${metric.hasFixedHeight}`);
      console.log(`  Padding bottom: ${metric.paddingBottom}px`);
      if (metric.statsSpacing) {
        console.log(`  Stats distance from bottom: ${Math.round(metric.statsSpacing.distanceFromBottom)}px`);
      }
    });
    
    // Check if cards are flexible (no fixed heights)
    const flexibleCards = cardMetrics.filter(m => !m.hasFixedHeight && m.minHeight === '0px');
    const fixedCards = cardMetrics.filter(m => m.hasFixedHeight || m.minHeight !== '0px');
    
    console.log(`\\n✅ Flexible cards: ${flexibleCards.length}/${cardMetrics.length}`);
    if (fixedCards.length > 0) {
      console.log(`⚠️ Cards still with fixed heights:`);
      fixedCards.forEach(card => {
        console.log(`  - ${card.title}: height=${card.computedHeight}, min-height=${card.minHeight}`);
      });
    }
    
    // Check padding consistency
    const paddingValues = cardMetrics.map(m => m.paddingBottom);
    const consistentPadding = paddingValues.every(p => p === paddingValues[0]);
    
    console.log(`\\n📏 Padding consistency: ${consistentPadding ? '✅' : '⚠️'}`);
    if (!consistentPadding) {
      console.log('Padding values:', paddingValues);
    }
    
    // Take screenshots
    await page.screenshot({ path: 'showcase-flexible-cards.png', fullPage: true });
    console.log('\\n📸 Screenshot saved: showcase-flexible-cards.png');
    
    // Take specific screenshot of specialized cards section
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ path: 'specialized-cards-fixed.png' });
    console.log('📸 Specialized cards screenshot: specialized-cards-fixed.png');
    
    console.log('\\nBrowser window left open for 30 seconds for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyCardFlexibility().catch(console.error);