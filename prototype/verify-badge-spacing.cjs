const { chromium } = require('playwright');

async function verifyBadgeSpacing() {
  console.log('🔍 Verifying badge spacing fixes...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`http://localhost:8080/design-system-showcase.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(2000);
    
    // Scroll to specialized cards section
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(500);
    
    // Check badge/tags spacing
    const spacingMetrics = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      cards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const tags = card.querySelector('.flex.flex-wrap.gap-2');
        const bottomStats = card.querySelector('.flex.items-center.justify-between.pt-3');
        
        const cardTitle = title ? title.textContent.trim() : `Card ${index}`;
        
        let tagToStatsSpacing = null;
        if (tags && bottomStats) {
          const tagsRect = tags.getBoundingClientRect();
          const statsRect = bottomStats.getBoundingClientRect();
          tagToStatsSpacing = Math.round(statsRect.top - tagsRect.bottom);
        }
        
        results.push({
          title: cardTitle,
          hasTags: !!tags,
          hasStats: !!bottomStats,
          tagToStatsSpacing: tagToStatsSpacing
        });
      });
      
      return results;
    });
    
    console.log('\\n📏 Badge to Stats Line Spacing:');
    spacingMetrics.forEach(card => {
      if (card.hasTags && card.hasStats) {
        const isGood = card.tagToStatsSpacing >= 14; // Should be at least 14-16px
        console.log(`${isGood ? '✅' : '❌'} ${card.title}: ${card.tagToStatsSpacing}px`);
      }
    });
    
    // Take screenshot
    await page.screenshot({ path: 'badge-spacing-fixed.png', fullPage: true });
    
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ path: 'badge-spacing-showcase.png' });
    
    console.log('\\n📸 Screenshots saved:');
    console.log('  - badge-spacing-fixed.png');
    console.log('  - badge-spacing-showcase.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyBadgeSpacing().catch(console.error);