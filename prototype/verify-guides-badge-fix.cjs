const { chromium } = require('playwright');

async function verifyGuidesBadgeFix() {
  console.log('🔍 Verifying guides badge spacing fix...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Check main page guides section
    console.log('\\n📄 Checking index.html#guides...');
    await page.goto('http://localhost:8080/#guides', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const mainPageSpacing = await page.evaluate(() => {
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
    
    console.log(`Main page guides section spacing: ${mainPageSpacing.spacing}px`);
    
    // Check standalone guides page
    console.log('\\n📄 Checking pages/guides.html...');
    await page.goto('http://localhost:8080/pages/guides.html', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const guidesPageSpacing = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      
      if (!firstCard) return { error: 'No card found' };
      
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
        spacing,
        marginBottom: tagsStyle ? tagsStyle.marginBottom : null
      };
    });
    
    console.log(`Guides page spacing: ${guidesPageSpacing.spacing}px`);
    console.log(`Tags margin-bottom: ${guidesPageSpacing.marginBottom}`);
    
    // Take screenshots
    await page.screenshot({ path: 'guides-badge-spacing-fixed.png', fullPage: false });
    
    console.log('\\n📸 Screenshot saved: guides-badge-spacing-fixed.png');
    console.log(`\\n${guidesPageSpacing.spacing >= 20 ? '✅' : '❌'} Badge spacing is ${guidesPageSpacing.spacing >= 20 ? 'fixed!' : 'still needs adjustment'}`);
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyGuidesBadgeFix().catch(console.error);