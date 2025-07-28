const { chromium } = require('playwright');

async function fixRowSpacingDirect() {
  console.log('🔧 Fixing row spacing directly...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`http://localhost:8080/design-system-showcase.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Scroll to specialized cards section
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(500);
    
    // Apply direct spacing fixes
    await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      
      cards.forEach((card, cardIndex) => {
        const title = card.querySelector('h3');
        const cardTitle = title ? title.textContent.trim() : '';
        
        console.log(`Fixing card: ${cardTitle}`);
        
        // Get all flex rows (author, stats, etc.)
        const flexRows = card.querySelectorAll('.flex.items-center.gap-2:not(.justify-between)');
        const description = card.querySelector('p.text-sm.text-vybe-gray-400');
        const tags = card.querySelector('.flex.flex-wrap.gap-2');
        
        // Fix title spacing
        if (title) {
          title.style.marginBottom = '0.5rem'; // Reduce title to member spacing
        }
        
        // Handle flex rows (member info, stats)
        flexRows.forEach((row, rowIndex) => {
          const rowText = row.textContent.trim();
          
          if (rowIndex === 0) {
            // First flex row (member info like @alexchen PRO)
            row.style.marginBottom = '0.5rem'; // Keep perfect member to guides/apps spacing
          } else if (rowIndex === 1 || rowText.includes('guides') || rowText.includes('apps')) {
            // Stats row (8 guides • 3 apps)
            row.style.marginBottom = '0.75rem'; // Increase guides/apps to description spacing
          }
        });
        
        // Ensure description has proper spacing
        if (description) {
          description.style.marginBottom = '0.75rem';
        }
        
        // Ensure tags have proper spacing
        if (tags) {
          tags.style.marginBottom = '0.75rem';
        }
      });
    });
    
    await page.waitForTimeout(1000);
    
    // Measure the results
    const finalSpacing = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      cards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const flexRows = card.querySelectorAll('.flex.items-center.gap-2:not(.justify-between)');
        const description = card.querySelector('p.text-sm.text-vybe-gray-400');
        
        const cardTitle = title ? title.textContent.trim() : `Card ${index}`;
        
        let spacing = {};
        
        if (title && flexRows[0]) {
          const titleRect = title.getBoundingClientRect();
          const firstRowRect = flexRows[0].getBoundingClientRect();
          spacing.titleToMember = Math.round(firstRowRect.top - titleRect.bottom);
        }
        
        if (flexRows[0] && flexRows[1]) {
          const firstRowRect = flexRows[0].getBoundingClientRect();
          const secondRowRect = flexRows[1].getBoundingClientRect();
          spacing.memberToStats = Math.round(secondRowRect.top - firstRowRect.bottom);
        }
        
        if (flexRows[1] && description) {
          const statsRect = flexRows[1].getBoundingClientRect();
          const descRect = description.getBoundingClientRect();
          spacing.statsToDescription = Math.round(descRect.top - statsRect.bottom);
        } else if (flexRows[0] && description && !flexRows[1]) {
          const memberRect = flexRows[0].getBoundingClientRect();
          const descRect = description.getBoundingClientRect();
          spacing.memberToDescription = Math.round(descRect.top - memberRect.bottom);
        }
        
        results.push({
          title: cardTitle,
          spacing: spacing,
          hasStats: !!flexRows[1]
        });
      });
      
      return results;
    });
    
    console.log('\\n📏 Fixed Row Spacing:');
    finalSpacing.forEach(card => {
      console.log(`\\n${card.title}:`);
      if (card.spacing.titleToMember !== undefined) {
        const status = card.spacing.titleToMember <= 10 ? '✅' : '❌';
        console.log(`  Title → Member: ${card.spacing.titleToMember}px ${status}`);
      }
      if (card.spacing.memberToStats !== undefined) {
        const status = card.spacing.memberToStats >= 6 && card.spacing.memberToStats <= 10 ? '✅' : '❌';
        console.log(`  Member → Stats: ${card.spacing.memberToStats}px ${status}`);
      }
      if (card.spacing.statsToDescription !== undefined) {
        const status = card.spacing.statsToDescription >= 10 ? '✅' : '❌';
        console.log(`  Stats → Description: ${card.spacing.statsToDescription}px ${status}`);
      }
      if (card.spacing.memberToDescription !== undefined) {
        const status = card.spacing.memberToDescription >= 6 && card.spacing.memberToDescription <= 10 ? '✅' : '❌';
        console.log(`  Member → Description: ${card.spacing.memberToDescription}px ${status}`);
      }
    });
    
    // Take screenshot
    await page.screenshot({ path: 'fixed-row-spacing.png', fullPage: true });
    
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ path: 'fixed-row-spacing-cards.png' });
    
    console.log('\\n📸 Screenshots saved:');
    console.log('  - fixed-row-spacing.png');
    console.log('  - fixed-row-spacing-cards.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

fixRowSpacingDirect().catch(console.error);