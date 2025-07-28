const { chromium } = require('playwright');

async function viewGuidesSection() {
  console.log('🔍 Viewing guides section at localhost:8080/#guides...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('http://localhost:8080/#guides', { 
      waitUntil: 'networkidle' 
    });
    
    // Wait for the guides section to be visible
    await page.waitForTimeout(2000);
    
    // Check the card structure and spacing
    const cardInfo = await page.evaluate(() => {
      const guidesSection = document.querySelector('#guides');
      const cards = guidesSection ? guidesSection.querySelectorAll('.minimal-card') : [];
      
      if (cards.length === 0) return { error: 'No guide cards found' };
      
      const firstCard = cards[0];
      const tags = firstCard.querySelector('.flex.flex-wrap.gap-2');
      const bottomStats = firstCard.querySelector('.flex.items-center.justify-between');
      
      let spacing = null;
      if (tags && bottomStats) {
        const tagsRect = tags.getBoundingClientRect();
        const statsRect = bottomStats.getBoundingClientRect();
        spacing = Math.round(statsRect.top - tagsRect.bottom);
      }
      
      const tagsStyle = tags ? window.getComputedStyle(tags) : null;
      
      return {
        cardCount: cards.length,
        tagsMarginBottom: tagsStyle ? tagsStyle.marginBottom : null,
        actualSpacing: spacing,
        hasInlineStyles: tags ? tags.hasAttribute('style') : false,
        tagsHTML: tags ? tags.outerHTML.substring(0, 200) : null
      };
    });
    
    console.log('\\n📋 Guides Section Analysis:');
    console.log(`Cards found: ${cardInfo.cardCount}`);
    console.log(`Tags margin-bottom: ${cardInfo.tagsMarginBottom}`);
    console.log(`Actual spacing: ${cardInfo.actualSpacing}px`);
    console.log(`Has inline styles: ${cardInfo.hasInlineStyles}`);
    
    // Apply fix directly
    console.log('\\n🔧 Applying spacing fix...');
    await page.evaluate(() => {
      const guidesSection = document.querySelector('#guides');
      const tagsSections = guidesSection ? guidesSection.querySelectorAll('.flex.flex-wrap.gap-2') : [];
      
      tagsSections.forEach(tags => {
        tags.style.marginBottom = '1.5rem';
      });
    });
    
    // Measure again
    const afterFix = await page.evaluate(() => {
      const guidesSection = document.querySelector('#guides');
      const firstCard = guidesSection ? guidesSection.querySelector('.minimal-card') : null;
      
      if (!firstCard) return { error: 'No card found' };
      
      const tags = firstCard.querySelector('.flex.flex-wrap.gap-2');
      const bottomStats = firstCard.querySelector('.flex.items-center.justify-between');
      
      let spacing = null;
      if (tags && bottomStats) {
        const tagsRect = tags.getBoundingClientRect();
        const statsRect = bottomStats.getBoundingClientRect();
        spacing = Math.round(statsRect.top - tagsRect.bottom);
      }
      
      return { spacing };
    });
    
    console.log(`\\n✅ After fix - spacing: ${afterFix.spacing}px`);
    
    // Take screenshot
    await page.screenshot({ path: 'guides-section-view.png', fullPage: false });
    
    console.log('\\n📸 Screenshot saved: guides-section-view.png');
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

viewGuidesSection().catch(console.error);