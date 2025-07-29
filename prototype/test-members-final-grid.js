import { chromium } from 'playwright';

async function testMembersFinalGrid() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Loading members page...');
  await page.goto('http://localhost:8080/#members');
  await page.waitForTimeout(3000);
  
  // Force refresh CSS
  await page.evaluate(() => {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        link.setAttribute('href', href.split('?')[0] + '?v=' + Date.now());
      }
    });
  });
  
  await page.waitForTimeout(2000);
  
  // Check grid layout
  const gridInfo = await page.evaluate(() => {
    const grid = document.querySelector('.members-grid');
    const cards = document.querySelectorAll('.minimal-card');
    
    if (!grid) return { error: 'No grid found' };
    
    const computed = window.getComputedStyle(grid);
    
    // Check card positions
    const cardPositions = Array.from(cards).slice(0, 3).map((card, i) => {
      const rect = card.getBoundingClientRect();
      return {
        index: i,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      };
    });
    
    // Check if cards are in same row
    const inSameRow = cardPositions.length >= 3 && 
      Math.abs(cardPositions[0].top - cardPositions[1].top) < 5 &&
      Math.abs(cardPositions[1].top - cardPositions[2].top) < 5;
    
    return {
      cardCount: cards.length,
      gridDisplay: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap,
      gridWidth: grid.offsetWidth,
      cardPositions,
      inSameRow,
      classNames: grid.className
    };
  });
  
  console.log('Grid Info:', JSON.stringify(gridInfo, null, 2));
  
  // Take screenshot
  await page.screenshot({ path: 'members-grid-test.png', fullPage: true });
  console.log('Screenshot saved as members-grid-test.png');
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

testMembersFinalGrid().catch(console.error);