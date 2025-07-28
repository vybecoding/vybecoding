const { chromium } = require('playwright');

async function verifyEqualRowSpacing() {
  console.log('🔍 Verifying equal spacing between content rows...');
  
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
    
    // Check row spacing specifically
    const rowSpacing = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      cards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const memberRow = card.querySelector('.flex.items-center.gap-2:not(.justify-between)');
        const statsRow = card.querySelector('.flex.items-center.gap-2:nth-of-type(2)');
        const description = card.querySelector('p.text-sm.text-vybe-gray-400');
        const tags = card.querySelector('.flex.flex-wrap.gap-2');
        const bottomStats = card.querySelector('.flex.items-center.justify-between.pt-3');
        
        const cardTitle = title ? title.textContent.trim() : `Card ${index}`;
        
        let spacing = {};
        
        // Get actual spacing between elements
        if (title && memberRow) {
          const titleRect = title.getBoundingClientRect();
          const memberRect = memberRow.getBoundingClientRect();
          spacing.titleToMember = Math.round(memberRect.top - titleRect.bottom);
        }
        
        if (memberRow && description) {
          const memberRect = memberRow.getBoundingClientRect();
          const descRect = description.getBoundingClientRect();
          
          // Check if there's a stats row in between
          if (statsRow) {
            const statsRect = statsRow.getBoundingClientRect();
            spacing.memberToStats = Math.round(statsRect.top - memberRect.bottom);
            spacing.statsToDescription = Math.round(descRect.top - statsRect.bottom);
          } else {
            spacing.memberToDescription = Math.round(descRect.top - memberRect.bottom);
          }
        }
        
        if (description && tags) {
          const descRect = description.getBoundingClientRect();
          const tagsRect = tags.getBoundingClientRect();
          spacing.descriptionToTags = Math.round(tagsRect.top - descRect.bottom);
        }
        
        if (tags && bottomStats) {
          const tagsRect = tags.getBoundingClientRect();
          const bottomRect = bottomStats.getBoundingClientRect();
          spacing.tagsToBottom = Math.round(bottomRect.top - tagsRect.bottom);
        }
        
        results.push({
          title: cardTitle,
          spacing: spacing,
          hasStatsRow: !!statsRow
        });
      });
      
      return results;
    });
    
    console.log('\\n📏 Row Spacing Analysis:');
    
    rowSpacing.forEach(card => {
      console.log(`\\n${card.title}:`);
      if (card.spacing.titleToMember !== undefined) {
        console.log(`  Title → Member: ${card.spacing.titleToMember}px`);
      }
      if (card.spacing.memberToStats !== undefined) {
        console.log(`  Member → Stats: ${card.spacing.memberToStats}px`);
      }
      if (card.spacing.statsToDescription !== undefined) {
        console.log(`  Stats → Description: ${card.spacing.statsToDescription}px`);
      }
      if (card.spacing.memberToDescription !== undefined) {
        console.log(`  Member → Description: ${card.spacing.memberToDescription}px`);
      }
      if (card.spacing.descriptionToTags !== undefined) {
        console.log(`  Description → Tags: ${card.spacing.descriptionToTags}px`);
      }
      if (card.spacing.tagsToBottom !== undefined) {
        console.log(`  Tags → Bottom: ${card.spacing.tagsToBottom}px`);
      }
      
      // Check if spacing follows the desired pattern:
      // Title → Member: reduced (should be ~8px)
      // Member → Stats: perfect (should stay ~8px) 
      // Stats → Description: increased (should be ~12px)
      // Other spacing: consistent
      
      if (card.hasStatsRow) {
        const titleToMemberGood = card.spacing.titleToMember <= 10;
        const memberToStatsGood = card.spacing.memberToStats >= 6 && card.spacing.memberToStats <= 10;
        const statsToDescGood = card.spacing.statsToDescription >= 10;
        
        console.log(`  Status: Title→Member ${titleToMemberGood ? '✅' : '❌'}, Member→Stats ${memberToStatsGood ? '✅' : '❌'}, Stats→Desc ${statsToDescGood ? '✅' : '❌'}`);
      }
    });
    
    // Take screenshot
    await page.screenshot({ path: 'equal-row-spacing.png', fullPage: true });
    
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ path: 'equal-row-spacing-cards.png' });
    
    console.log('\\n📸 Screenshots saved:');
    console.log('  - equal-row-spacing.png');
    console.log('  - equal-row-spacing-cards.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyEqualRowSpacing().catch(console.error);