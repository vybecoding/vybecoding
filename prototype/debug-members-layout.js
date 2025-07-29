const { chromium } = require('playwright');

async function debugMembersLayout() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  
  // Load the members page
  await page.goto('file:///home/happy/Projects/vybecoding/prototype/index.html');
  await page.waitForTimeout(1000);
  
  // Click on Members nav
  await page.click('text=Members');
  await page.waitForTimeout(2000);
  
  // Get computed styles for the grid container
  const gridStyles = await page.evaluate(() => {
    const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    if (!grid) return 'Grid not found';
    
    const computed = window.getComputedStyle(grid);
    return {
      display: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap,
      width: computed.width,
      maxWidth: computed.maxWidth
    };
  });
  
  console.log('Grid Container Styles:', gridStyles);
  
  // Get styles for member cards
  const cardStyles = await page.evaluate(() => {
    const cards = document.querySelectorAll('.minimal-card');
    const styles = [];
    
    cards.forEach((card, index) => {
      const computed = window.getComputedStyle(card);
      styles.push({
        cardIndex: index,
        width: computed.width,
        padding: computed.padding,
        display: computed.display,
        flexDirection: computed.flexDirection,
        background: computed.background,
        border: computed.border
      });
    });
    
    return styles;
  });
  
  console.log('Card Styles:', cardStyles);
  
  // Check for conflicting CSS files
  const cssFiles = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    return links.map(link => link.href);
  });
  
  console.log('Loaded CSS Files:', cssFiles);
  
  // Check if Tailwind utilities are working
  const tailwindCheck = await page.evaluate(() => {
    const testEl = document.createElement('div');
    testEl.className = 'grid grid-cols-3';
    document.body.appendChild(testEl);
    const computed = window.getComputedStyle(testEl);
    document.body.removeChild(testEl);
    return {
      display: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns
    };
  });
  
  console.log('Tailwind Grid Test:', tailwindCheck);
  
  // Take screenshots
  await page.screenshot({ path: 'members-layout-debug.png', fullPage: true });
  
  // Keep browser open for inspection
  console.log('Browser will stay open for debugging. Press Ctrl+C to close.');
}

debugMembersLayout().catch(console.error);