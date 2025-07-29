const { chromium } = require('playwright');

async function verifyMembersLayout() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true,
    slowMo: 500 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Load the members page
  await page.goto('file:///home/happy/Projects/vybecoding/prototype/index.html');
  await page.waitForTimeout(1000);
  
  // Click on Members nav
  await page.click('text=Members');
  await page.waitForTimeout(2000);
  
  // Verify grid layout
  const gridInfo = await page.evaluate(() => {
    const grid = document.querySelector('#members-page .grid');
    if (!grid) return { error: 'Grid not found' };
    
    const computed = window.getComputedStyle(grid);
    const cards = grid.querySelectorAll('.minimal-card');
    
    return {
      gridDisplay: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap,
      width: computed.width,
      cardCount: cards.length,
      containerWidth: grid.offsetWidth,
      cardsPerRow: Math.round(grid.offsetWidth / cards[0]?.offsetWidth || 1)
    };
  });
  
  console.log('Grid Layout Info:', gridInfo);
  
  // Get detailed card measurements
  const cardMeasurements = await page.evaluate(() => {
    const cards = document.querySelectorAll('#members-page .minimal-card');
    return Array.from(cards).map((card, index) => {
      const rect = card.getBoundingClientRect();
      const computed = window.getComputedStyle(card);
      const label = card.querySelector('span[style*="MEMBER"]');
      const title = card.querySelector('h3');
      const innerDiv = card.querySelector('.p-5.pt-4') || card.querySelector('[style*="p-5"]');
      
      return {
        cardIndex: index,
        width: rect.width,
        height: rect.height,
        padding: computed.padding,
        border: computed.border,
        borderRadius: computed.borderRadius,
        background: computed.background,
        labelText: label?.textContent,
        labelBackground: label ? window.getComputedStyle(label).background : null,
        titleText: title?.textContent,
        titleFontSize: title ? window.getComputedStyle(title).fontSize : null,
        titleFontWeight: title ? window.getComputedStyle(title).fontWeight : null,
        titleColor: title ? window.getComputedStyle(title).color : null,
        innerPadding: innerDiv ? window.getComputedStyle(innerDiv).padding : null
      };
    });
  });
  
  console.log('Card Measurements:', cardMeasurements);
  
  // Check spacing and alignment
  const spacingInfo = await page.evaluate(() => {
    const cards = document.querySelectorAll('#members-page .minimal-card');
    const positions = [];
    
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      positions.push({
        index,
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom
      });
    });
    
    // Calculate gaps between cards
    const gaps = [];
    if (positions.length >= 2) {
      // Horizontal gap between first two cards
      gaps.push({
        type: 'horizontal',
        gap: positions[1].left - positions[0].right
      });
    }
    
    return { positions, gaps };
  });
  
  console.log('Spacing Info:', spacingInfo);
  
  // Take screenshots
  await page.screenshot({ path: 'members-full-page.png', fullPage: true });
  
  // Screenshot just the grid
  const gridElement = await page.$('#members-page .grid');
  if (gridElement) {
    await gridElement.screenshot({ path: 'members-grid-only.png' });
  }
  
  // Verify specific elements match showcase
  const verificationResults = await page.evaluate(() => {
    const results = {
      grid3Columns: false,
      correctPadding: true,
      correctTypography: true,
      errors: []
    };
    
    // Check if grid has 3 columns
    const grid = document.querySelector('#members-page .grid');
    const gridColumns = window.getComputedStyle(grid).gridTemplateColumns;
    if (gridColumns.includes('1fr 1fr 1fr') || gridColumns.match(/\d+px \d+px \d+px/)) {
      results.grid3Columns = true;
    } else {
      results.errors.push(`Grid columns: ${gridColumns}`);
    }
    
    // Check card padding
    const cards = document.querySelectorAll('#members-page .minimal-card');
    cards.forEach((card, index) => {
      const innerDiv = card.querySelector('.p-5.pt-4') || card.querySelector('[style*="p-5"]');
      if (innerDiv) {
        const padding = window.getComputedStyle(innerDiv).padding;
        if (padding !== '20px' && padding !== '1.25rem') {
          results.correctPadding = false;
          results.errors.push(`Card ${index} inner padding: ${padding}`);
        }
      }
    });
    
    // Check typography
    const titles = document.querySelectorAll('#members-page .minimal-card h3');
    titles.forEach((title, index) => {
      const fontSize = window.getComputedStyle(title).fontSize;
      const fontWeight = window.getComputedStyle(title).fontWeight;
      if (fontSize !== '18px' || fontWeight !== '600') {
        results.correctTypography = false;
        results.errors.push(`Title ${index}: ${fontSize}, weight: ${fontWeight}`);
      }
    });
    
    return results;
  });
  
  console.log('Verification Results:', verificationResults);
  
  // Keep browser open for manual inspection
  console.log('\nBrowser will remain open for manual inspection.');
  console.log('Check members-full-page.png and members-grid-only.png for screenshots.');
  console.log('Press Ctrl+C to close.');
}

verifyMembersLayout().catch(console.error);