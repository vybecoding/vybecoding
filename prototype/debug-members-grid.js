import { chromium } from 'playwright';

async function debugMembersGrid() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Loading members page...');
  await page.goto('http://localhost:8080/#members');
  await page.waitForTimeout(3000);
  
  // Debug grid and cards
  const debugInfo = await page.evaluate(() => {
    const grid = document.querySelector('.members-grid');
    const cards = Array.from(document.querySelectorAll('.members-grid .minimal-card'));
    
    if (!grid) return { error: 'No grid found' };
    
    const gridStyles = window.getComputedStyle(grid);
    const gridRect = grid.getBoundingClientRect();
    
    const cardInfo = cards.slice(0, 3).map((card, i) => {
      const rect = card.getBoundingClientRect();
      const styles = window.getComputedStyle(card);
      return {
        index: i,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        display: styles.display,
        position: styles.position,
        gridColumn: styles.gridColumn,
        gridRow: styles.gridRow,
        marginLeft: styles.marginLeft,
        marginRight: styles.marginRight
      };
    });
    
    // Check if parent has any weird styles
    const parent = grid.parentElement;
    const parentStyles = window.getComputedStyle(parent);
    
    return {
      grid: {
        display: gridStyles.display,
        gridTemplateColumns: gridStyles.gridTemplateColumns,
        gap: gridStyles.gap,
        width: gridRect.width,
        height: gridRect.height,
        padding: gridStyles.padding,
        margin: gridStyles.margin
      },
      parent: {
        width: parentStyles.width,
        maxWidth: parentStyles.maxWidth,
        padding: parentStyles.padding,
        margin: parentStyles.margin
      },
      cards: cardInfo,
      cardsInSameRow: cardInfo.length >= 3 && 
        Math.abs(cardInfo[0].top - cardInfo[1].top) < 5 &&
        Math.abs(cardInfo[1].top - cardInfo[2].top) < 5
    };
  });
  
  console.log('Debug Info:', JSON.stringify(debugInfo, null, 2));
  
  // Take screenshot
  await page.screenshot({ path: 'members-debug.png', fullPage: true });
  
  // Take grid-only screenshot
  const gridEl = await page.$('.members-grid');
  if (gridEl) {
    await gridEl.screenshot({ path: 'members-grid-only.png' });
  }
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

debugMembersGrid().catch(console.error);