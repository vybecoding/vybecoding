import { chromium } from 'playwright';

async function testMembersDirect() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Load members.html directly
  await page.goto('file:///home/happy/Projects/vybecoding/prototype/pages/members.html');
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'members-direct.png', fullPage: true });
  console.log('Screenshot saved as members-direct.png');
  
  // Check grid layout
  const gridInfo = await page.evaluate(() => {
    const grid = document.querySelector('.grid');
    const cards = document.querySelectorAll('.minimal-card');
    
    if (!grid) return { error: 'No grid found' };
    
    const computed = window.getComputedStyle(grid);
    const firstCard = cards[0];
    
    return {
      gridFound: true,
      cardCount: cards.length,
      gridDisplay: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap,
      gridWidth: grid.offsetWidth,
      cardWidth: firstCard ? firstCard.offsetWidth : 0,
      cardsPerRow: firstCard ? Math.round(grid.offsetWidth / firstCard.offsetWidth) : 0
    };
  });
  
  console.log('Grid Info:', gridInfo);
  
  // Check if 3 columns are displayed
  const isThreeColumns = await page.evaluate(() => {
    const cards = document.querySelectorAll('.minimal-card');
    if (cards.length < 3) return false;
    
    const firstCardRect = cards[0].getBoundingClientRect();
    const secondCardRect = cards[1].getBoundingClientRect();
    const thirdCardRect = cards[2].getBoundingClientRect();
    
    // Check if cards are in the same row
    return Math.abs(firstCardRect.top - secondCardRect.top) < 5 && 
           Math.abs(secondCardRect.top - thirdCardRect.top) < 5;
  });
  
  console.log('Three columns displayed:', isThreeColumns);
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

testMembersDirect().catch(console.error);