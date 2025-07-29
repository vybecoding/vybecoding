import { chromium } from 'playwright';

async function checkMembers() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Load the members page directly
  await page.goto('file:///home/happy/Projects/vybecoding/prototype/index.html');
  await page.waitForTimeout(2000);
  
  // Try to click Members
  try {
    await page.click('nav >> text=Members');
    console.log('Clicked Members nav');
  } catch (e) {
    console.log('Could not find Members nav, trying alternative selector');
    await page.click('text=Members');
  }
  
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'members-page-check.png', fullPage: true });
  console.log('Screenshot saved as members-page-check.png');
  
  // Check if we can find the grid
  const hasGrid = await page.evaluate(() => {
    const grids = document.querySelectorAll('.grid');
    const memberCards = document.querySelectorAll('.minimal-card');
    const membersPage = document.querySelector('#members-page');
    
    return {
      gridCount: grids.length,
      memberCardCount: memberCards.length,
      hasMembersPage: !!membersPage,
      visibleText: document.body.innerText.substring(0, 200)
    };
  });
  
  console.log('Page Info:', hasGrid);
  
  // Check grid styles
  const gridStyles = await page.evaluate(() => {
    const grid = document.querySelector('.grid.grid-cols-1');
    if (!grid) return null;
    
    const computed = window.getComputedStyle(grid);
    return {
      display: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      width: grid.offsetWidth,
      parentWidth: grid.parentElement?.offsetWidth
    };
  });
  
  console.log('Grid Styles:', gridStyles);
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

checkMembers().catch(console.error);