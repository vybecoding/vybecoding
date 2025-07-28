const { chromium } = require('playwright');

async function finalBadgeDiagnosis() {
  console.log('🔍 Final comprehensive badge spacing diagnosis...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    devtools: true
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Go to apps page and highlight the issue
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    // Add visual debugging
    await page.addStyleTag({
      content: `
        /* Highlight badge containers */
        .minimal-card .flex.flex-wrap {
          outline: 2px dashed red !important;
        }
        
        /* Highlight individual badges */
        .minimal-card .flex.flex-wrap span {
          outline: 1px solid cyan !important;
        }
      `
    });
    
    // Get comprehensive measurements
    const measurements = await page.evaluate(() => {
      const card = document.querySelector('.minimal-card:has(.bg-vybe-pink\\/10)');
      if (!card) return null;
      
      const container = card.querySelector('.flex.flex-wrap');
      const badges = container.querySelectorAll('span');
      
      // Check for any margin on badges
      const badgeStyles = Array.from(badges).map(badge => {
        const style = window.getComputedStyle(badge);
        return {
          text: badge.textContent,
          margin: style.margin,
          marginLeft: style.marginLeft,
          marginRight: style.marginRight,
          padding: style.padding,
          display: style.display
        };
      });
      
      // Check container for any additional spacing
      const containerStyle = window.getComputedStyle(container);
      
      // Check if gap-2 class is being overridden somewhere
      const computedGap = parseFloat(containerStyle.gap);
      const expectedGap = 4; // We expect 4px
      
      return {
        containerGap: containerStyle.gap,
        gapInPixels: computedGap,
        isGapCorrect: computedGap === expectedGap,
        containerPadding: containerStyle.padding,
        containerMargin: containerStyle.margin,
        badges: badgeStyles,
        suggestion: computedGap > expectedGap ? 
          `Gap is ${computedGap}px but should be ${expectedGap}px. Need to reduce by ${computedGap - expectedGap}px.` :
          'Gap appears correct at 4px'
      };
    });
    
    console.log('Container gap:', measurements.containerGap);
    console.log('Gap in pixels:', measurements.gapInPixels);
    console.log('Is gap correct?', measurements.isGapCorrect);
    console.log('\nBadge margins:');
    measurements.badges.forEach(badge => {
      console.log(`  "${badge.text}": margin=${badge.margin}`);
    });
    console.log('\n💡 Suggestion:', measurements.suggestion);
    
    // If gap is wrong, force fix it
    if (!measurements.isGapCorrect) {
      console.log('\n🔧 Applying force fix...');
      
      await page.addStyleTag({
        content: `
          /* FORCE 4px gap */
          .minimal-card .flex.flex-wrap.gap-2,
          .minimal-card .flex.flex-wrap {
            gap: 4px !important;
          }
          
          /* Remove any margins on badges */
          .minimal-card .flex.flex-wrap span {
            margin: 0 !important;
          }
        `
      });
      
      await page.waitForTimeout(500);
      
      // Verify fix
      const afterFix = await page.evaluate(() => {
        const container = document.querySelector('.minimal-card:has(.bg-vybe-pink\\/10) .flex.flex-wrap');
        return window.getComputedStyle(container).gap;
      });
      
      console.log('After fix, gap is:', afterFix);
    }
    
    // Take annotated screenshot
    await page.screenshot({ path: 'badge-spacing-annotated.png', fullPage: false });
    console.log('\n📸 Annotated screenshot saved: badge-spacing-annotated.png');
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

finalBadgeDiagnosis().catch(console.error);