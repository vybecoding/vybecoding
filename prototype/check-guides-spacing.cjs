const { chromium } = require('playwright');

async function checkGuidesSpacing() {
  console.log('🔍 Checking guides page badge spacing...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`http://localhost:8080/pages/guides.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Wait for CSS to load
    await page.waitForTimeout(2000);
    
    // Check badge/tags spacing on first card
    const spacingInfo = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      
      if (!firstCard) return { error: 'No cards found' };
      
      const tags = firstCard.querySelector('.flex.flex-wrap.gap-2');
      const bottomStats = firstCard.querySelector('.flex.items-center.justify-between.pt-3');
      
      // Get computed styles
      const tagsStyle = tags ? window.getComputedStyle(tags) : null;
      const cardStyle = window.getComputedStyle(firstCard);
      
      // Get all children to understand structure
      const children = Array.from(firstCard.children);
      const childInfo = children.map((child, i) => ({
        index: i,
        class: child.className,
        tag: child.tagName,
        text: child.textContent.substring(0, 50)
      }));
      
      let spacing = null;
      if (tags && bottomStats) {
        const tagsRect = tags.getBoundingClientRect();
        const statsRect = bottomStats.getBoundingClientRect();
        spacing = Math.round(statsRect.top - tagsRect.bottom);
      }
      
      return {
        hasTags: !!tags,
        hasStats: !!bottomStats,
        tagsMarginBottom: tagsStyle ? tagsStyle.marginBottom : null,
        tagsPaddingBottom: tagsStyle ? tagsStyle.paddingBottom : null,
        actualSpacing: spacing,
        cardPadding: cardStyle.padding,
        cardStructure: childInfo
      };
    });
    
    console.log('\\n📋 Guides Page Analysis:');
    console.log('Card structure:', spacingInfo.cardStructure);
    console.log('\\nSpacing info:');
    console.log(`  Tags margin-bottom: ${spacingInfo.tagsMarginBottom}`);
    console.log(`  Tags padding-bottom: ${spacingInfo.tagsPaddingBottom}`);
    console.log(`  Actual spacing: ${spacingInfo.actualSpacing}px`);
    console.log(`  Card padding: ${spacingInfo.cardPadding}`);
    
    // Take screenshots
    await page.screenshot({ path: 'guides-page-spacing.png', fullPage: false });
    
    // Zoom in on first card
    const firstCard = page.locator('.minimal-card').first();
    await firstCard.screenshot({ path: 'guides-first-card.png' });
    
    console.log('\\n📸 Screenshots saved:');
    console.log('  - guides-page-spacing.png');
    console.log('  - guides-first-card.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkGuidesSpacing().catch(console.error);