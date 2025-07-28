const { chromium } = require('playwright');

async function checkPinkBadges() {
  console.log('🔍 Checking pink badge spacing specifically...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    devtools: true
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Go to apps page
    console.log('📄 Navigating to apps page...');
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    // Find the card with pink badges (productivity, developer-tools, TypeScript)
    const cardData = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      
      for (const card of cards) {
        // Look for a card with pink badges
        const pinkBadges = card.querySelectorAll('span.bg-vybe-pink\\/10');
        if (pinkBadges.length > 0) {
          const badgeContainer = card.querySelector('.flex.flex-wrap.gap-2') || 
                                card.querySelector('.flex.flex-wrap');
          
          if (!badgeContainer) continue;
          
          const containerStyle = window.getComputedStyle(badgeContainer);
          const badges = badgeContainer.querySelectorAll('span');
          
          // Get visual measurements
          const badgeData = [];
          const gaps = [];
          
          for (let i = 0; i < badges.length; i++) {
            const badge = badges[i];
            const rect = badge.getBoundingClientRect();
            const style = window.getComputedStyle(badge);
            
            badgeData.push({
              text: badge.textContent,
              classes: badge.className,
              backgroundColor: style.backgroundColor,
              width: rect.width,
              left: rect.left,
              right: rect.right
            });
            
            if (i > 0) {
              const prevRect = badges[i-1].getBoundingClientRect();
              const gap = Math.round(rect.left - prevRect.right);
              gaps.push(gap);
            }
          }
          
          return {
            found: true,
            cardTitle: card.querySelector('h3')?.textContent,
            container: {
              gap: containerStyle.gap,
              columnGap: containerStyle.columnGap,
              classes: badgeContainer.className
            },
            badges: badgeData,
            visualGaps: gaps,
            averageGap: gaps.length > 0 ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null
          };
        }
      }
      
      return { found: false };
    });
    
    if (cardData.found) {
      console.log(`Found card with pink badges: "${cardData.cardTitle}"`);
      console.log(`Container CSS gap: ${cardData.container.gap}`);
      console.log(`Visual gaps between badges: ${cardData.visualGaps.join(', ')}px`);
      console.log(`Average visual gap: ${cardData.averageGap}px`);
      console.log('\nBadge details:');
      cardData.badges.forEach((badge, i) => {
        console.log(`  ${i + 1}. "${badge.text}" - ${badge.classes}`);
      });
      
      // If gap is not 4px, we need to fix it
      if (cardData.averageGap !== 4) {
        console.log('\n❌ Gap is not 4px! Creating targeted fix...');
        
        // Inject a fix directly to test
        await page.addStyleTag({
          content: `
            /* Force 4px gap on pink badge containers */
            .minimal-card .flex.flex-wrap.gap-2:has(.bg-vybe-pink\\/10) {
              gap: 4px !important;
              column-gap: 4px !important;
              row-gap: 4px !important;
            }
            
            /* Alternative selector */
            .flex.flex-wrap.gap-2:has(span.text-vybe-pink) {
              gap: 4px !important;
            }
          `
        });
        
        await page.waitForTimeout(500);
        
        // Re-check after fix
        const afterFix = await page.evaluate(() => {
          const card = Array.from(document.querySelectorAll('.minimal-card'))
            .find(c => c.querySelector('.bg-vybe-pink\\/10'));
          
          if (!card) return null;
          
          const badgeContainer = card.querySelector('.flex.flex-wrap');
          const badges = badgeContainer.querySelectorAll('span');
          const gaps = [];
          
          for (let i = 1; i < badges.length; i++) {
            const rect1 = badges[i-1].getBoundingClientRect();
            const rect2 = badges[i].getBoundingClientRect();
            gaps.push(Math.round(rect2.left - rect1.right));
          }
          
          return {
            gaps: gaps,
            average: gaps.length > 0 ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null
          };
        });
        
        console.log('\nAfter fix injection:');
        console.log(`  Visual gaps: ${afterFix.gaps.join(', ')}px`);
        console.log(`  Average: ${afterFix.average}px`);
      }
    } else {
      console.log('❌ Could not find card with pink badges');
    }
    
    // Take screenshot
    await page.screenshot({ path: 'apps-pink-badges.png', fullPage: false });
    console.log('\n📸 Screenshot saved: apps-pink-badges.png');
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkPinkBadges().catch(console.error);