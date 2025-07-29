import { chromium } from 'playwright';

async function checkMembersNav() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true,
    timeout: 60000
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('1. Loading index.html...');
  await page.goto('file:///home/happy/Projects/vybecoding/prototype/index.html');
  await page.waitForTimeout(2000);
  
  console.log('2. Clicking Members link...');
  await page.click('a[data-navigate="members"]');
  await page.waitForTimeout(3000);
  
  console.log('3. Checking for CSS files...');
  const cssFiles = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    return links.map(link => link.href);
  });
  console.log('CSS files loaded:', cssFiles.filter(f => f.includes('members')));
  
  console.log('4. Checking grid structure...');
  const gridInfo = await page.evaluate(() => {
    const grid = document.querySelector('.grid');
    const cards = document.querySelectorAll('.minimal-card');
    
    if (!grid) return { error: 'No grid found' };
    
    const computed = window.getComputedStyle(grid);
    
    return {
      gridFound: true,
      cardCount: cards.length,
      gridDisplay: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap,
      gridWidth: grid.offsetWidth,
      cardVisibility: Array.from(cards).map(card => ({
        visible: card.offsetWidth > 0,
        width: card.offsetWidth,
        display: window.getComputedStyle(card).display
      }))
    };
  });
  
  console.log('Grid Info:', JSON.stringify(gridInfo, null, 2));
  
  // Take screenshot
  await page.screenshot({ path: 'members-nav-debug.png', fullPage: true });
  console.log('Screenshot saved as members-nav-debug.png');
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

checkMembersNav().catch(console.error);