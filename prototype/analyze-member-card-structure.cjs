const { chromium } = require('playwright');

async function analyzeMemberCardStructure() {
  console.log('🔍 Analyzing member card HTML structure...');
  
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
    
    // Analyze member card structure
    const memberCardStructure = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const memberCards = [];
      
      cards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const cardTitle = title ? title.textContent.trim() : '';
        
        // Look for member cards (have guides/apps text)
        if (cardTitle.includes('Machine Learning Expert') || cardTitle.includes('Senior AI Developer')) {
          const allElements = Array.from(card.children);
          const elementInfo = allElements.map((el, i) => {
            return {
              index: i,
              tagName: el.tagName,
              classes: el.className,
              textContent: el.textContent.trim().substring(0, 50),
              hasGuides: el.textContent.includes('guides'),
              hasApps: el.textContent.includes('apps'),
              isFlexRow: el.classList.contains('flex') && el.classList.contains('items-center')
            };
          });
          
          memberCards.push({
            cardTitle,
            elements: elementInfo
          });
        }
      });
      
      return memberCards;
    });
    
    console.log('\\n📋 Member Card Structure Analysis:');
    memberCardStructure.forEach(card => {
      console.log(`\\n${card.cardTitle}:`);
      card.elements.forEach(el => {
        console.log(`  ${el.index}: ${el.tagName}.${el.classes}`);
        console.log(`     Text: "${el.textContent}"`);
        if (el.hasGuides || el.hasApps) {
          console.log(`     ⭐ Contains guides/apps stats`);
        }
        if (el.isFlexRow) {
          console.log(`     📐 Flex row element`);
        }
      });
    });
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

analyzeMemberCardStructure().catch(console.error);