const { chromium } = require('playwright');

async function debugCardHeights() {
  console.log('🔍 Debugging card height constraints...');
  
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
    
    // Debug CSS rules affecting height
    const cssDebug = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const firstCard = cards[0];
      
      if (!firstCard) return { error: 'No cards found' };
      
      const computedStyle = window.getComputedStyle(firstCard);
      const gridContainer = firstCard.parentElement;
      const gridStyle = window.getComputedStyle(gridContainer);
      
      // Get all CSS rules affecting this element
      const allStyleSheets = Array.from(document.styleSheets);
      const matchingRules = [];
      
      allStyleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.selectorText && firstCard.matches(rule.selectorText)) {
              const heightProps = {};
              if (rule.style.height) heightProps.height = rule.style.height;
              if (rule.style.minHeight) heightProps.minHeight = rule.style.minHeight;
              if (rule.style.maxHeight) heightProps.maxHeight = rule.style.maxHeight;
              
              if (Object.keys(heightProps).length > 0) {
                matchingRules.push({
                  selector: rule.selectorText,
                  properties: heightProps,
                  important: rule.style.getPropertyPriority('height') === 'important'
                });
              }
            }
          });
        } catch (e) {
          // Skip CORS-blocked stylesheets
        }
      });
      
      return {
        cardComputedStyle: {
          height: computedStyle.height,
          minHeight: computedStyle.minHeight,
          maxHeight: computedStyle.maxHeight,
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection
        },
        gridComputedStyle: {
          display: gridStyle.display,
          gridTemplateColumns: gridStyle.gridTemplateColumns,
          alignItems: gridStyle.alignItems,
          height: gridStyle.height
        },
        matchingRules: matchingRules,
        parentClasses: gridContainer.className,
        cardClasses: firstCard.className
      };
    });
    
    console.log('\\n🎯 CSS Debug Info:');
    console.log('Card computed style:', cssDebug.cardComputedStyle);
    console.log('Grid computed style:', cssDebug.gridComputedStyle);
    console.log('Parent classes:', cssDebug.parentClasses);
    console.log('Card classes:', cssDebug.cardClasses);
    console.log('\\nMatching CSS rules with height properties:');
    cssDebug.matchingRules.forEach(rule => {
      console.log(`  ${rule.selector}:`, rule.properties);
    });
    
    // Try temporarily removing constraints
    await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      cards.forEach(card => {
        card.style.height = 'auto';
        card.style.minHeight = '0';
        card.style.maxHeight = 'none';
      });
    });
    
    console.log('\\n🔧 Temporarily removed height constraints...');
    await page.waitForTimeout(1000);
    
    // Take screenshot after removal
    await page.screenshot({ path: 'cards-after-height-removal.png', fullPage: true });
    console.log('📸 Screenshot after height removal: cards-after-height-removal.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugCardHeights().catch(console.error);