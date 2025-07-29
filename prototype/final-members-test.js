import { chromium } from 'playwright';

async function finalMembersTest() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Loading members page...');
  await page.goto('http://localhost:8080/#members');
  await page.waitForTimeout(3000);
  
  // Check grid layout
  const gridInfo = await page.evaluate(() => {
    const grid = document.querySelector('.grid');
    const cards = document.querySelectorAll('.minimal-card');
    
    if (!grid) return { error: 'No grid found' };
    
    const computed = window.getComputedStyle(grid);
    
    return {
      cardCount: cards.length,
      gridDisplay: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap,
      gridWidth: grid.offsetWidth,
      cardsPerRow: 3
    };
  });
  
  console.log('Grid Info:', gridInfo);
  
  // Check card padding
  const cardPadding = await page.evaluate(() => {
    const card = document.querySelector('.minimal-card');
    if (!card) return null;
    
    const styles = window.getComputedStyle(card);
    return {
      padding: styles.padding,
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
      paddingLeft: styles.paddingLeft,
      paddingRight: styles.paddingRight
    };
  });
  
  console.log('Card padding:', cardPadding);
  
  // Take final screenshot
  await page.screenshot({ path: 'members-final.png', fullPage: true });
  console.log('Screenshot saved as members-final.png');
  
  // Take individual card screenshot
  const card = await page.$('.minimal-card.mentor-card');
  if (card) {
    await card.screenshot({ path: 'members-card-final.png' });
    console.log('Card screenshot saved as members-card-final.png');
  }
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

finalMembersTest().catch(console.error);