const { chromium } = require('playwright');

async function verifyAppsNewsSpacing() {
  console.log('🔍 Verifying apps and news cards badge spacing...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Check apps page
    console.log('\\n📄 Checking apps page...');
    await page.goto('http://localhost:8080/pages/apps.html', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const appsSpacing = await page.evaluate(() => {
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
    
    console.log(`Apps page spacing: ${appsSpacing.spacing}px`);
    console.log(`Tags margin-bottom: ${appsSpacing.marginBottom}`);
    
    // Check featured page (contains news cards)
    console.log('\\n📄 Checking featured page (news cards)...');
    await page.goto('http://localhost:8080/pages/featured.html', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    // Find a news card specifically
    const newsSpacing = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      let newsCard = null;
      
      // Find a card with NEWS label or news-related content
      for (const card of cards) {
        const label = card.querySelector('span[style*="NEWS"]');
        const newsTag = Array.from(card.querySelectorAll('span')).find(span => span.textContent.includes('AI News'));
        if (label || newsTag || card.textContent.includes('OpenAI') || card.textContent.includes('Claude 4.0')) {
          newsCard = card;
          break;
        }
      }
      
      if (!newsCard) return { error: 'No news card found' };
      
      const tags = newsCard.querySelector('.flex.flex-wrap.gap-2');
      const bottomStats = newsCard.querySelector('.flex.items-center.justify-between');
      
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
    
    console.log(`News card spacing: ${newsSpacing.spacing}px`);
    console.log(`Tags margin-bottom: ${newsSpacing.marginBottom}`);
    
    // Take screenshots
    await page.screenshot({ path: 'apps-page-badge-spacing.png', fullPage: false });
    
    await page.goto('http://localhost:8080/pages/featured.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'news-cards-badge-spacing.png', fullPage: false });
    
    console.log('\\n📸 Screenshots saved:');
    console.log('  - apps-page-badge-spacing.png');
    console.log('  - news-cards-badge-spacing.png');
    
    const appsGood = appsSpacing.spacing >= 10 && appsSpacing.spacing <= 14;
    const newsGood = newsSpacing.spacing >= 10 && newsSpacing.spacing <= 14;
    
    console.log(`\\n${appsGood ? '✅' : '❌'} Apps cards badge spacing: ${appsGood ? 'Fixed!' : 'Needs adjustment'}`);
    console.log(`${newsGood ? '✅' : '❌'} News cards badge spacing: ${newsGood ? 'Fixed!' : 'Needs adjustment'}`);
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyAppsNewsSpacing().catch(console.error);