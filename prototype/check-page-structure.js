import { chromium } from 'playwright';

async function checkPageStructure() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Loading members page...');
  await page.goto('http://localhost:8080/#members');
  await page.waitForTimeout(3000);
  
  // Check page structure
  const structure = await page.evaluate(() => {
    const grid = document.querySelector('.members-grid');
    if (!grid) return { error: 'No grid found' };
    
    // Walk up the DOM tree to find any interfering containers
    let current = grid;
    const ancestors = [];
    
    while (current && current !== document.body) {
      const styles = window.getComputedStyle(current);
      const rect = current.getBoundingClientRect();
      
      ancestors.push({
        tag: current.tagName,
        className: current.className,
        id: current.id,
        display: styles.display,
        position: styles.position,
        width: rect.width,
        height: rect.height,
        padding: styles.padding,
        margin: styles.margin,
        overflow: styles.overflow,
        transform: styles.transform,
        zIndex: styles.zIndex
      });
      
      current = current.parentElement;
    }
    
    // Check if there are any other containers between page-container and members-grid
    const pageContainer = document.querySelector('.page-container');
    const containersInBetween = [];
    
    if (pageContainer) {
      const allDescendants = pageContainer.querySelectorAll('*');
      let foundGrid = false;
      
      for (let el of allDescendants) {
        if (el === grid) {
          foundGrid = true;
          break;
        }
        if (el.contains(grid) && el !== pageContainer) {
          const styles = window.getComputedStyle(el);
          containersInBetween.push({
            tag: el.tagName,
            className: el.className,
            position: styles.position,
            width: el.offsetWidth,
            transform: styles.transform
          });
        }
      }
    }
    
    return {
      ancestors,
      containersInBetween,
      gridFound: true
    };
  });
  
  console.log('Page Structure:', JSON.stringify(structure, null, 2));
  
  console.log('Browser will stay open. Press Ctrl+C to close.');
}

checkPageStructure().catch(console.error);