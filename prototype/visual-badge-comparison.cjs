const { chromium } = require('playwright');

async function visualBadgeComparison() {
  console.log('🔍 Visual comparison of badge spacing between guides and apps...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    devtools: true
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // First, capture guides page badges
    console.log('📄 Capturing GUIDES page badges...');
    await page.goto('http://localhost:8080/#guides', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    // Highlight and measure
    await page.addStyleTag({
      content: `
        .minimal-card .flex.flex-wrap {
          background: rgba(0, 255, 0, 0.1) !important;
        }
      `
    });
    
    const guidesData = await page.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      const container = card.querySelector('.flex.flex-wrap.gap-2');
      if (!container) return null;
      
      const badges = container.querySelectorAll('span');
      const containerRect = container.getBoundingClientRect();
      
      // Get all CSS classes and styles
      const containerClasses = container.className;
      const containerStyles = window.getComputedStyle(container);
      
      // Measure actual pixel gaps
      const gaps = [];
      for (let i = 1; i < badges.length; i++) {
        const prevBadge = badges[i-1].getBoundingClientRect();
        const currBadge = badges[i].getBoundingClientRect();
        gaps.push(currBadge.left - prevBadge.right);
      }
      
      return {
        containerClasses,
        cssGap: containerStyles.gap,
        actualGaps: gaps,
        avgGap: gaps.reduce((a,b) => a+b, 0) / gaps.length,
        badgeTexts: Array.from(badges).map(b => b.textContent)
      };
    });
    
    console.log('Guides badges:', guidesData.badgeTexts.join(', '));
    console.log('Guides CSS gap:', guidesData.cssGap);
    console.log('Guides actual gaps:', guidesData.actualGaps.map(g => g.toFixed(1)).join(', '), 'px');
    console.log('Guides average gap:', guidesData.avgGap.toFixed(1), 'px');
    
    await page.screenshot({ path: 'guides-badges-highlighted.png', clip: { x: 0, y: 200, width: 400, height: 300 } });
    
    // Now capture apps page badges
    console.log('\n📄 Capturing APPS page badges...');
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    // Highlight and measure
    await page.addStyleTag({
      content: `
        .minimal-card .flex.flex-wrap {
          background: rgba(255, 0, 0, 0.1) !important;
        }
      `
    });
    
    const appsData = await page.evaluate(() => {
      // Find the card with pink badges
      const cards = document.querySelectorAll('.minimal-card');
      for (const card of cards) {
        const container = card.querySelector('.flex.flex-wrap.gap-2');
        if (!container) continue;
        
        const badges = container.querySelectorAll('span');
        if (badges.length === 0) continue;
        
        // Check if this has pink badges
        const hasPinkBadges = Array.from(badges).some(b => 
          b.className.includes('bg-vybe-pink') || 
          b.className.includes('text-vybe-pink')
        );
        
        if (hasPinkBadges) {
          const containerClasses = container.className;
          const containerStyles = window.getComputedStyle(container);
          
          // Measure actual pixel gaps
          const gaps = [];
          for (let i = 1; i < badges.length; i++) {
            const prevBadge = badges[i-1].getBoundingClientRect();
            const currBadge = badges[i].getBoundingClientRect();
            gaps.push(currBadge.left - prevBadge.right);
          }
          
          return {
            containerClasses,
            cssGap: containerStyles.gap,
            actualGaps: gaps,
            avgGap: gaps.reduce((a,b) => a+b, 0) / gaps.length,
            badgeTexts: Array.from(badges).map(b => b.textContent)
          };
        }
      }
      return null;
    });
    
    console.log('Apps badges:', appsData.badgeTexts.join(', '));
    console.log('Apps CSS gap:', appsData.cssGap);
    console.log('Apps actual gaps:', appsData.actualGaps.map(g => g.toFixed(1)).join(', '), 'px');
    console.log('Apps average gap:', appsData.avgGap.toFixed(1), 'px');
    
    await page.screenshot({ path: 'apps-badges-highlighted.png', clip: { x: 0, y: 200, width: 400, height: 300 } });
    
    // Compare
    console.log('\n🔬 COMPARISON:');
    console.log('================');
    const guidesAvg = guidesData.avgGap;
    const appsAvg = appsData.avgGap;
    console.log(`Guides average gap: ${guidesAvg.toFixed(1)}px`);
    console.log(`Apps average gap: ${appsAvg.toFixed(1)}px`);
    
    if (appsAvg > guidesAvg) {
      const reduction = ((appsAvg - guidesAvg) / appsAvg) * 100;
      console.log(`\n❌ Apps gap is ${reduction.toFixed(0)}% larger than guides!`);
      console.log(`Apps gap needs to be reduced from ${appsAvg.toFixed(1)}px to ${guidesAvg.toFixed(1)}px`);
      
      // Create a fix
      const targetGap = guidesAvg;
      console.log(`\n🔧 Creating fix to set gap to ${targetGap}px...`);
      
      // Test the fix
      await page.addStyleTag({
        content: `
          /* FORCE apps badges to match guides gap */
          #apps .minimal-card .flex.flex-wrap.gap-2,
          #apps-browse-content .minimal-card .flex.flex-wrap.gap-2,
          .page-container .minimal-card .flex.flex-wrap.gap-2 {
            gap: ${targetGap}px !important;
            column-gap: ${targetGap}px !important;
            row-gap: ${targetGap}px !important;
          }
        `
      });
      
      await page.waitForTimeout(500);
      
      // Re-measure
      const afterFix = await page.evaluate(() => {
        const card = document.querySelector('.minimal-card:has(.bg-vybe-pink\\/10)');
        const container = card.querySelector('.flex.flex-wrap');
        const badges = container.querySelectorAll('span');
        
        const gaps = [];
        for (let i = 1; i < badges.length; i++) {
          const prevBadge = badges[i-1].getBoundingClientRect();
          const currBadge = badges[i].getBoundingClientRect();
          gaps.push(currBadge.left - prevBadge.right);
        }
        
        return {
          gaps: gaps,
          avg: gaps.reduce((a,b) => a+b, 0) / gaps.length
        };
      });
      
      console.log(`\nAfter fix: ${afterFix.avg.toFixed(1)}px (target was ${targetGap}px)`);
    } else {
      console.log('✅ Badge gaps appear to match');
    }
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

visualBadgeComparison().catch(console.error);