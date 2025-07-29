import { chromium } from 'playwright';

async function testMembersHttp() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('1. Loading http://localhost:8080/#members...');
  await page.goto('http://localhost:8080/#members');
  await page.waitForTimeout(3000);
  
  console.log('2. Checking for CSS files...');
  const cssFiles = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    return links.map(link => link.href);
  });
  console.log('CSS files loaded:', cssFiles.filter(f => f.includes('members') || f.includes('grid')));
  
  console.log('3. Checking grid structure...');
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
      cardsPerRow: firstCard ? Math.round(grid.offsetWidth / firstCard.offsetWidth) : 0,
      cardVisibility: Array.from(cards).slice(0, 3).map((card, i) => ({
        index: i,
        visible: card.offsetWidth > 0,
        width: card.offsetWidth,
        position: card.getBoundingClientRect()
      }))
    };
  });
  
  console.log('Grid Info:', JSON.stringify(gridInfo, null, 2));
  
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
  
  // Take screenshot
  await page.screenshot({ path: 'members-http-test.png', fullPage: true });
  console.log('Screenshot saved as members-http-test.png');
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

testMembersHttp().catch(console.error);