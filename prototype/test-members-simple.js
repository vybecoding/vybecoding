import { chromium } from 'playwright';

async function testMembersSimple() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Loading members page...');
  await page.goto('http://localhost:8080/#members');
  await page.waitForTimeout(3000);
  
  // Try to find the grid
  const hasGrid = await page.evaluate(() => {
    const grids = document.querySelectorAll('.members-grid');
    const cards = document.querySelectorAll('.minimal-card');
    
    return {
      gridCount: grids.length,
      cardCount: cards.length,
      firstGridDisplay: grids[0] ? window.getComputedStyle(grids[0]).display : 'none',
      bodyContent: document.body.innerHTML.includes('members-grid')
    };
  });
  
  console.log('Grid check:', hasGrid);
  
  // Take a simple screenshot
  await page.screenshot({ path: 'members-simple-test.png' });
  console.log('Screenshot saved');
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

testMembersSimple().catch(console.error);