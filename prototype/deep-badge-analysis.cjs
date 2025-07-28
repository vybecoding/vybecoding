const { chromium } = require('playwright');

async function deepBadgeAnalysis() {
  console.log('🔍 Deep analysis of badge spacing and padding...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    devtools: true
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Analyze both pages
    const pages = ['guides', 'apps'];
    const results = {};
    
    for (const pageName of pages) {
      console.log(`📄 Analyzing ${pageName.toUpperCase()} page...`);
      await page.goto(`http://localhost:8080/#${pageName}`, { 
        waitUntil: 'networkidle' 
      });
      await page.waitForTimeout(2000);
      
      const data = await page.evaluate(() => {
        const firstCard = document.querySelector('.minimal-card');
        if (!firstCard) return { error: 'No card found' };
        
        const badgeContainer = firstCard.querySelector('.flex.flex-wrap.gap-2') || 
                              firstCard.querySelector('.flex.flex-wrap');
        if (!badgeContainer) return { error: 'No badge container found' };
        
        const badges = badgeContainer.querySelectorAll('span');
        const firstBadge = badges[0];
        
        if (!firstBadge) return { error: 'No badges found' };
        
        const containerStyle = window.getComputedStyle(badgeContainer);
        const badgeStyle = window.getComputedStyle(firstBadge);
        
        // Get visual measurements
        const measurements = [];
        for (let i = 0; i < Math.min(3, badges.length); i++) {
          const badge = badges[i];
          const rect = badge.getBoundingClientRect();
          const style = window.getComputedStyle(badge);
          measurements.push({
            text: badge.textContent,
            width: rect.width,
            height: rect.height,
            padding: style.padding,
            paddingLeft: style.paddingLeft,
            paddingRight: style.paddingRight,
            margin: style.margin,
            fontSize: style.fontSize,
            border: style.border
          });
        }
        
        // Calculate actual gaps
        const gaps = [];
        for (let i = 0; i < badges.length - 1; i++) {
          const rect1 = badges[i].getBoundingClientRect();
          const rect2 = badges[i + 1].getBoundingClientRect();
          gaps.push(Math.round(rect2.left - rect1.right));
        }
        
        return {
          container: {
            gap: containerStyle.gap,
            columnGap: containerStyle.columnGap,
            rowGap: containerStyle.rowGap,
            display: containerStyle.display,
            flexWrap: containerStyle.flexWrap,
            alignItems: containerStyle.alignItems,
            justifyContent: containerStyle.justifyContent
          },
          badges: measurements,
          visualGaps: gaps,
          averageGap: gaps.length > 0 ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null
        };
      });
      
      results[pageName] = data;
      
      console.log(`  Container gap: ${data.container.gap}`);
      console.log(`  Visual gaps between badges: ${data.visualGaps.join(', ')}px`);
      console.log(`  Average visual gap: ${data.averageGap}px`);
      console.log(`  First badge padding: ${data.badges[0]?.padding}`);
      console.log(`  Badge font size: ${data.badges[0]?.fontSize}`);
      
      // Take detailed screenshot
      await page.screenshot({ path: `${pageName}-badge-detail.png`, fullPage: false });
    }
    
    // Compare results
    console.log('\n🔬 COMPARISON:');
    console.log('==============');
    
    // Compare gaps
    if (results.guides.averageGap !== results.apps.averageGap) {
      console.log(`❌ Average visual gap differs:`);
      console.log(`   Guides: ${results.guides.averageGap}px`);
      console.log(`   Apps: ${results.apps.averageGap}px`);
    } else {
      console.log(`✅ Average visual gap matches: ${results.guides.averageGap}px`);
    }
    
    // Compare badge padding
    const guidesPadding = results.guides.badges[0]?.padding;
    const appsPadding = results.apps.badges[0]?.padding;
    if (guidesPadding !== appsPadding) {
      console.log(`\n❌ Badge padding differs:`);
      console.log(`   Guides: ${guidesPadding}`);
      console.log(`   Apps: ${appsPadding}`);
    }
    
    // Check if the issue might be font size
    const guidesFontSize = results.guides.badges[0]?.fontSize;
    const appsFontSize = results.apps.badges[0]?.fontSize;
    if (guidesFontSize !== appsFontSize) {
      console.log(`\n❌ Badge font size differs:`);
      console.log(`   Guides: ${guidesFontSize}`);
      console.log(`   Apps: ${appsFontSize}`);
    }
    
    console.log('\n📊 Full badge measurements:');
    console.log('Guides badges:', JSON.stringify(results.guides.badges, null, 2));
    console.log('Apps badges:', JSON.stringify(results.apps.badges, null, 2));
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

deepBadgeAnalysis().catch(console.error);