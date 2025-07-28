const { chromium } = require('playwright');

async function debugShowcaseLabels() {
  console.log('🔍 Debugging showcase card labels...');
  
  const browser = await chromium.launch({
    headless: false, // Run with UI to see what's happening
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
    
    // Check if labels are present in DOM but potentially hidden
    const labelsInfo = await page.evaluate(() => {
      const memberCards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      memberCards.forEach((card, index) => {
        const titleElement = card.querySelector('h3');
        const title = titleElement ? titleElement.textContent : '';
        
        if (title.includes('Machine Learning Expert') || title.includes('Senior AI Developer')) {
          const allSpans = Array.from(card.querySelectorAll('span'));
          const spanTexts = allSpans.map(s => s.textContent.trim()).filter(t => t);
          
          results.push({
            cardIndex: index,
            title: title,
            allSpanTexts: spanTexts,
            hasGuides: spanTexts.includes('guides'),
            hasApps: spanTexts.includes('apps'),
            numberSpans: allSpans.filter(s => s.textContent.match(/^\d+$/)).map(s => s.textContent)
          });
        }
      });
      
      return results;
    });
    
    console.log('Labels debug info:', JSON.stringify(labelsInfo, null, 2));
    
    // Take screenshot of member cards specifically
    const memberCards = await page.locator('.minimal-card').filter({ hasText: 'MEMBER' });
    await memberCards.screenshot({ path: 'debug-member-cards.png' });
    
    console.log('✅ Debug screenshot saved: debug-member-cards.png');
    console.log('Browser window left open for inspection...');
    
    // Keep browser open for 30 seconds to inspect
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugShowcaseLabels().catch(console.error);