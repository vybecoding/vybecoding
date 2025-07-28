const { chromium } = require('playwright');

async function checkAppsGapIssue() {
  console.log('🔍 Checking apps page badge gap issue...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    devtools: true
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Go to apps page
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    // Check what's actually being applied
    const analysis = await page.evaluate(() => {
      // Find first card
      const firstCard = document.querySelector('.minimal-card');
      if (!firstCard) return { error: 'No card found' };
      
      // Find badge container
      const container = firstCard.querySelector('.flex.flex-wrap.gap-2');
      if (!container) return { error: 'No badge container found' };
      
      const badges = container.querySelectorAll('span');
      const styles = window.getComputedStyle(container);
      
      // Check what gap-2 class resolves to
      const tempDiv = document.createElement('div');
      tempDiv.className = 'gap-2';
      document.body.appendChild(tempDiv);
      const gap2Value = window.getComputedStyle(tempDiv).gap;
      document.body.removeChild(tempDiv);
      
      // Measure actual visual gaps
      const visualGaps = [];
      for (let i = 1; i < badges.length; i++) {
        const rect1 = badges[i-1].getBoundingClientRect();
        const rect2 = badges[i].getBoundingClientRect();
        visualGaps.push(rect2.left - rect1.right);
      }
      
      return {
        cardTitle: firstCard.querySelector('h3')?.textContent?.trim(),
        containerClasses: container.className,
        computedGap: styles.gap,
        gap2ClassValue: gap2Value,
        visualGaps: visualGaps,
        avgVisualGap: visualGaps.length > 0 ? visualGaps.reduce((a,b) => a+b) / visualGaps.length : 0,
        badgeCount: badges.length,
        firstBadgeText: badges[0]?.textContent,
        badgeColors: Array.from(badges).map(b => {
          const style = window.getComputedStyle(b);
          return {
            text: b.textContent,
            bgColor: style.backgroundColor,
            classes: b.className
          };
        })
      };
    });
    
    console.log('Card:', analysis.cardTitle);
    console.log('Container classes:', analysis.containerClasses);
    console.log('Computed gap:', analysis.computedGap);
    console.log('gap-2 class value:', analysis.gap2ClassValue);
    console.log('Visual gaps:', analysis.visualGaps.map(g => g.toFixed(1)).join(', '), 'px');
    console.log('Average visual gap:', analysis.avgVisualGap.toFixed(1), 'px');
    console.log('\nBadge details:');
    analysis.badgeColors.forEach((badge, i) => {
      console.log(`  ${i+1}. "${badge.text}" - ${badge.classes.includes('pink') ? 'PINK' : 'OTHER'}`);
    });
    
    // If gap is not 4px, we need to fix it
    if (analysis.avgVisualGap > 4) {
      console.log(`\n❌ Gap is ${analysis.avgVisualGap.toFixed(1)}px but should be 4px!`);
      console.log('Need to reduce by 50%');
      
      // Create an aggressive fix
      const cssContent = `
/* AGGRESSIVE FIX - Force 4px gap on apps page */
/* Override Tailwind's gap-2 class */
.gap-2 {
  gap: 0.25rem !important; /* 4px */
}

/* Specific to apps page */
#apps .flex.flex-wrap.gap-2,
#apps-browse-content .flex.flex-wrap.gap-2,
.page-container .flex.flex-wrap.gap-2 {
  gap: 4px !important;
  column-gap: 4px !important;
  row-gap: 4px !important;
}

/* Ultra specific */
#apps .minimal-card .flex.flex-wrap.gap-2 {
  gap: 4px !important;
}`;
      
      console.log('\n🔧 Applying fix...');
      await page.addStyleTag({ content: cssContent });
      await page.waitForTimeout(500);
      
      // Re-measure
      const afterFix = await page.evaluate(() => {
        const container = document.querySelector('.minimal-card .flex.flex-wrap.gap-2');
        const badges = container.querySelectorAll('span');
        
        const gaps = [];
        for (let i = 1; i < badges.length; i++) {
          const rect1 = badges[i-1].getBoundingClientRect();
          const rect2 = badges[i].getBoundingClientRect();
          gaps.push(rect2.left - rect1.right);
        }
        
        return {
          computedGap: window.getComputedStyle(container).gap,
          visualGaps: gaps,
          avg: gaps.length > 0 ? gaps.reduce((a,b) => a+b) / gaps.length : 0
        };
      });
      
      console.log('\nAfter fix:');
      console.log('  Computed gap:', afterFix.computedGap);
      console.log('  Visual gaps:', afterFix.visualGaps.map(g => g.toFixed(1)).join(', '), 'px');
      console.log('  Average:', afterFix.avg.toFixed(1), 'px');
      
      // Save the fix
      const fs = require('fs');
      const path = require('path');
      const fixPath = path.join(__dirname, 'css', 'force-4px-badge-gap.css');
      fs.writeFileSync(fixPath, cssContent);
      console.log('\n✅ Fix saved to: css/force-4px-badge-gap.css');
    }
    
    await page.screenshot({ path: 'apps-badge-gap-analysis.png', fullPage: false });
    console.log('\n📸 Screenshot saved: apps-badge-gap-analysis.png');
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkAppsGapIssue().catch(console.error);