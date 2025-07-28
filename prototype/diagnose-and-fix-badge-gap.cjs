const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function diagnoseAndFixBadgeGap() {
  console.log('🔍 Diagnosing badge gap issue with Playwright...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    devtools: true
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // First, check the guides page to see what the correct spacing should be
    console.log('📄 Analyzing GUIDES page (reference)...');
    await page.goto('http://localhost:8080/#guides', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const guidesData = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      if (!firstCard) return { error: 'No card found' };
      
      const badgeContainer = firstCard.querySelector('.flex.flex-wrap.gap-2');
      if (!badgeContainer) return { error: 'No badge container found' };
      
      // Get computed styles
      const containerStyle = window.getComputedStyle(badgeContainer);
      
      // Get actual visual spacing between badges
      const badges = badgeContainer.querySelectorAll('span');
      let visualGap = null;
      if (badges.length >= 2) {
        const firstBadgeRect = badges[0].getBoundingClientRect();
        const secondBadgeRect = badges[1].getBoundingClientRect();
        visualGap = Math.round(secondBadgeRect.left - firstBadgeRect.right);
      }
      
      return {
        cssGap: containerStyle.gap,
        columnGap: containerStyle.columnGap,
        rowGap: containerStyle.rowGap,
        visualGap: visualGap,
        badgeCount: badges.length,
        computedStyles: {
          gap: containerStyle.gap,
          columnGap: containerStyle.columnGap,
          rowGap: containerStyle.rowGap,
          display: containerStyle.display,
          flexWrap: containerStyle.flexWrap
        }
      };
    });
    
    console.log('Guides page (reference):');
    console.log(`  CSS gap: ${guidesData.cssGap}`);
    console.log(`  Visual gap between badges: ${guidesData.visualGap}px`);
    console.log(`  Computed styles:`, guidesData.computedStyles);
    
    // Take screenshot of guides page
    await page.screenshot({ path: 'guides-badge-reference.png', fullPage: false });
    
    // Now check the apps page
    console.log('\n📄 Analyzing APPS page (to fix)...');
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const appsData = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      if (!firstCard) return { error: 'No card found' };
      
      const badgeContainer = firstCard.querySelector('.flex.flex-wrap.gap-2');
      if (!badgeContainer) return { error: 'No badge container found' };
      
      // Get computed styles
      const containerStyle = window.getComputedStyle(badgeContainer);
      
      // Get actual visual spacing between badges
      const badges = badgeContainer.querySelectorAll('span');
      let visualGap = null;
      if (badges.length >= 2) {
        const firstBadgeRect = badges[0].getBoundingClientRect();
        const secondBadgeRect = badges[1].getBoundingClientRect();
        visualGap = Math.round(secondBadgeRect.left - firstBadgeRect.right);
      }
      
      // Get all applied CSS rules
      const sheets = Array.from(document.styleSheets);
      const appliedRules = [];
      
      sheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.selectorText && badgeContainer.matches(rule.selectorText)) {
              appliedRules.push({
                selector: rule.selectorText,
                gap: rule.style.gap
              });
            }
          });
        } catch (e) {
          // Cross-origin stylesheets might throw
        }
      });
      
      return {
        cssGap: containerStyle.gap,
        columnGap: containerStyle.columnGap,
        rowGap: containerStyle.rowGap,
        visualGap: visualGap,
        badgeCount: badges.length,
        computedStyles: {
          gap: containerStyle.gap,
          columnGap: containerStyle.columnGap,
          rowGap: containerStyle.rowGap,
          display: containerStyle.display,
          flexWrap: containerStyle.flexWrap
        },
        appliedRules: appliedRules
      };
    });
    
    console.log('Apps page (current):');
    console.log(`  CSS gap: ${appsData.cssGap}`);
    console.log(`  Visual gap between badges: ${appsData.visualGap}px`);
    console.log(`  Computed styles:`, appsData.computedStyles);
    
    // Take screenshot of apps page before fix
    await page.screenshot({ path: 'apps-badge-before-fix.png', fullPage: false });
    
    // Diagnosis
    console.log('\n🔬 DIAGNOSIS:');
    console.log('=============');
    if (guidesData.visualGap !== appsData.visualGap) {
      console.log(`❌ Visual gap differs:`);
      console.log(`   Guides: ${guidesData.visualGap}px`);
      console.log(`   Apps: ${appsData.visualGap}px`);
      console.log(`   Apps gap is ${Math.round((appsData.visualGap / guidesData.visualGap) * 100)}% of guides gap`);
    } else {
      console.log(`✅ Visual gap matches: ${guidesData.visualGap}px`);
    }
    
    // If gaps don't match, create a more aggressive CSS fix
    if (guidesData.visualGap !== appsData.visualGap) {
      console.log('\n🛠️ Creating aggressive CSS fix...');
      
      const targetGap = guidesData.visualGap || 4;
      const cssContent = `/* AGGRESSIVE BADGE GAP FIX - Force ${targetGap}px gap */

/* Remove all gaps first */
.minimal-card .flex.flex-wrap.gap-2 {
  gap: 0 !important;
}

/* Then apply the correct gap */
.minimal-card .flex.flex-wrap {
  gap: ${targetGap}px !important;
  column-gap: ${targetGap}px !important;
  row-gap: ${targetGap}px !important;
}

/* Ultra specific selectors for apps page */
#apps .minimal-card .flex.flex-wrap,
#apps-browse-content .minimal-card .flex.flex-wrap,
.page-container .minimal-card .flex.flex-wrap {
  gap: ${targetGap}px !important;
  column-gap: ${targetGap}px !important;
  row-gap: ${targetGap}px !important;
}

/* Override gap-2 class completely */
.gap-2 {
  gap: ${targetGap}px !important;
}

/* Force on badge containers specifically */
div.flex.flex-wrap.gap-2:has(> span.px-2.py-1) {
  gap: ${targetGap}px !important;
  column-gap: ${targetGap}px !important;
  row-gap: ${targetGap}px !important;
}`;
      
      // Write the aggressive fix
      const fixPath = path.join(__dirname, 'css', 'aggressive-badge-gap-fix.css');
      fs.writeFileSync(fixPath, cssContent);
      console.log(`✅ Created aggressive fix: css/aggressive-badge-gap-fix.css`);
      
      // Test the fix by injecting it directly
      console.log('\n🧪 Testing fix by injecting CSS...');
      await page.addStyleTag({ content: cssContent });
      await page.waitForTimeout(500);
      
      // Re-check the gap
      const afterFix = await page.evaluate(() => {
        const firstCard = document.querySelector('.minimal-card');
        const badgeContainer = firstCard.querySelector('.flex.flex-wrap');
        const badges = badgeContainer.querySelectorAll('span');
        
        let visualGap = null;
        if (badges.length >= 2) {
          const firstBadgeRect = badges[0].getBoundingClientRect();
          const secondBadgeRect = badges[1].getBoundingClientRect();
          visualGap = Math.round(secondBadgeRect.left - firstBadgeRect.right);
        }
        
        return {
          visualGap: visualGap,
          cssGap: window.getComputedStyle(badgeContainer).gap
        };
      });
      
      console.log(`After fix injection:`);
      console.log(`  Visual gap: ${afterFix.visualGap}px`);
      console.log(`  CSS gap: ${afterFix.cssGap}`);
      
      // Take screenshot after fix
      await page.screenshot({ path: 'apps-badge-after-fix.png', fullPage: false });
    }
    
    console.log('\n📸 Screenshots saved:');
    console.log('  - guides-badge-reference.png');
    console.log('  - apps-badge-before-fix.png');
    console.log('  - apps-badge-after-fix.png');
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

diagnoseAndFixBadgeGap().catch(console.error);