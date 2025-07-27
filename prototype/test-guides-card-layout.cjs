const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testGuidesCardLayout() {
  console.log('🔍 Testing guides card layout fix...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportDir = `card-layout-test-${timestamp}`;
  
  // Create test directory
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Navigate to guides page
    console.log('📄 Navigating to guides page...');
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Take screenshot of the fixed layout
    await page.screenshot({ 
      path: path.join(reportDir, '01-guides-card-layout.png'),
      fullPage: true 
    });
    
    // Analyze card layout
    console.log('📐 Analyzing card layout...');
    
    const cardAnalysis = await page.evaluate(() => {
      const results = {
        gridFound: false,
        gridProperties: {},
        cards: [],
        layoutIssues: []
      };
      
      // Check if grid container exists
      const gridContainer = document.querySelector('#guides-results-grid');
      if (gridContainer) {
        results.gridFound = true;
        const styles = window.getComputedStyle(gridContainer);
        results.gridProperties = {
          display: styles.display,
          gridTemplateColumns: styles.gridTemplateColumns,
          gap: styles.gap,
          width: gridContainer.offsetWidth,
          overflow: styles.overflow
        };
        
        // Check if it's actually using grid layout
        if (styles.display !== 'grid') {
          results.layoutIssues.push('Grid container not using grid display');
        }
      }
      
      // Analyze individual cards
      const cards = document.querySelectorAll('#guides-results-grid .minimal-card');
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const styles = window.getComputedStyle(card);
        
        results.cards.push({
          index: index,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          display: styles.display,
          position: styles.position,
          background: styles.background,
          border: styles.border,
          borderRadius: styles.borderRadius
        });
      });
      
      // Check if cards are in proper grid layout
      if (cards.length > 1) {
        const firstCardTop = cards[0].getBoundingClientRect().top;
        const secondCardTop = cards[1].getBoundingClientRect().top;
        const thirdCardTop = cards[2] ? cards[2].getBoundingClientRect().top : null;
        
        // Check if cards are in same row
        if (Math.abs(firstCardTop - secondCardTop) < 5) {
          results.cardsInRow = true;
        } else {
          results.cardsInRow = false;
          results.layoutIssues.push('Cards not aligned in rows');
        }
        
        // Check if third card wraps to next row properly
        if (thirdCardTop && Math.abs(firstCardTop - thirdCardTop) < 5) {
          // All three in same row
          results.threePerRow = true;
        }
      }
      
      // Check for overflow
      if (document.documentElement.scrollWidth > window.innerWidth) {
        results.layoutIssues.push('Horizontal overflow detected');
      }
      
      return results;
    });
    
    console.log('\n📊 Card Layout Analysis:');
    console.log(`- Grid Found: ${cardAnalysis.gridFound ? '✅' : '❌'}`);
    
    if (cardAnalysis.gridFound) {
      console.log(`- Grid Display: ${cardAnalysis.gridProperties.display}`);
      console.log(`- Grid Columns: ${cardAnalysis.gridProperties.gridTemplateColumns}`);
      console.log(`- Grid Gap: ${cardAnalysis.gridProperties.gap}`);
      console.log(`- Grid Width: ${cardAnalysis.gridProperties.width}px`);
    }
    
    console.log(`\n- Total Cards: ${cardAnalysis.cards.length}`);
    if (cardAnalysis.cards.length > 0) {
      console.log(`- First Card Width: ${cardAnalysis.cards[0].width}px`);
      console.log(`- First Card Height: ${cardAnalysis.cards[0].height}px`);
      console.log(`- Cards in Row: ${cardAnalysis.cardsInRow ? '✅' : '❌'}`);
    }
    
    if (cardAnalysis.layoutIssues.length > 0) {
      console.log('\n⚠️ Layout Issues:');
      cardAnalysis.layoutIssues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('\n✅ No layout issues detected!');
    }
    
    // Test hover effect
    console.log('\n🖱️ Testing hover effects...');
    if (cardAnalysis.cards.length > 0) {
      await page.hover('#guides-results-grid .minimal-card:first-child');
      await page.waitForTimeout(500);
      
      await page.screenshot({ 
        path: path.join(reportDir, '02-card-hover-state.png'),
        fullPage: false 
      });
    }
    
    // Test responsive layout
    console.log('\n📱 Testing responsive layout...');
    
    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(reportDir, '03-tablet-layout.png'),
      fullPage: true 
    });
    
    // Mobile view
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(reportDir, '04-mobile-layout.png'),
      fullPage: true 
    });
    
    // Generate report
    const report = `# Guides Card Layout Test Report

**Date:** ${new Date().toISOString()}

## Layout Analysis

### Grid Container
- **Found:** ${cardAnalysis.gridFound ? 'Yes' : 'No'}
- **Display:** ${cardAnalysis.gridProperties.display || 'N/A'}
- **Columns:** ${cardAnalysis.gridProperties.gridTemplateColumns || 'N/A'}
- **Gap:** ${cardAnalysis.gridProperties.gap || 'N/A'}
- **Width:** ${cardAnalysis.gridProperties.width || 'N/A'}px

### Cards
- **Total Cards:** ${cardAnalysis.cards.length}
- **Cards Properly Aligned:** ${cardAnalysis.cardsInRow ? 'Yes' : 'No'}
- **Three Per Row (Desktop):** ${cardAnalysis.threePerRow ? 'Yes' : 'No/Less than 3 cards'}

### First Card Properties
${cardAnalysis.cards.length > 0 ? `
- **Width:** ${cardAnalysis.cards[0].width}px
- **Height:** ${cardAnalysis.cards[0].height}px
- **Display:** ${cardAnalysis.cards[0].display}
- **Border Radius:** ${cardAnalysis.cards[0].borderRadius}
` : 'No cards found'}

## Issues
${cardAnalysis.layoutIssues.length > 0 ? cardAnalysis.layoutIssues.map(issue => `- ${issue}`).join('\n') : 'No issues detected ✅'}

## Screenshots
- \`01-guides-card-layout.png\` - Main desktop layout
- \`02-card-hover-state.png\` - Card hover effect
- \`03-tablet-layout.png\` - Tablet responsive view
- \`04-mobile-layout.png\` - Mobile responsive view

## Summary
The guides cards should now be displayed in individual containers with proper grid layout, similar to the specialized cards design.
`;
    
    fs.writeFileSync(
      path.join(reportDir, 'LAYOUT-TEST-REPORT.md'),
      report
    );
    
    console.log(`\n✅ Test complete!`);
    console.log(`📁 Report saved to: ${reportDir}/`);
    console.log(`📄 View report: ${reportDir}/LAYOUT-TEST-REPORT.md`);
    
    console.log('\n🔍 Browser left open for manual inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

testGuidesCardLayout().catch(console.error);