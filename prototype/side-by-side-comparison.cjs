const { chromium } = require('playwright');

async function sideBySideComparison() {
  console.log('🔍 Side-by-side comparison of guides vs apps badge spacing...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    // Open two pages
    const context = await browser.newContext();
    const guidesPage = await context.newPage({ viewport: { width: 960, height: 1080 } });
    const appsPage = await context.newPage({ viewport: { width: 960, height: 1080 } });
    
    // Load both pages
    console.log('📄 Loading both pages...');
    await Promise.all([
      guidesPage.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' }),
      appsPage.goto('http://localhost:8080/#apps', { waitUntil: 'networkidle' })
    ]);
    
    await guidesPage.waitForTimeout(2000);
    await appsPage.waitForTimeout(2000);
    
    // Get measurements from both
    const [guidesData, appsData] = await Promise.all([
      guidesPage.evaluate(() => {
        const card = document.querySelector('.minimal-card');
        const container = card.querySelector('.flex.flex-wrap.gap-2');
        const badges = container.querySelectorAll('span');
        const style = window.getComputedStyle(container);
        
        // Get visual gaps
        const gaps = [];
        for (let i = 1; i < badges.length; i++) {
          const rect1 = badges[i-1].getBoundingClientRect();
          const rect2 = badges[i].getBoundingClientRect();
          gaps.push(rect2.left - rect1.right);
        }
        
        return {
          page: 'GUIDES',
          cssGap: style.gap,
          visualGaps: gaps,
          avgGap: gaps.reduce((a,b) => a+b) / gaps.length,
          badgeCount: badges.length,
          containerWidth: container.getBoundingClientRect().width
        };
      }),
      
      appsPage.evaluate(() => {
        const card = document.querySelector('.minimal-card');
        const container = card.querySelector('.flex.flex-wrap.gap-2');
        const badges = container.querySelectorAll('span');
        const style = window.getComputedStyle(container);
        
        // Get visual gaps
        const gaps = [];
        for (let i = 1; i < badges.length; i++) {
          const rect1 = badges[i-1].getBoundingClientRect();
          const rect2 = badges[i].getBoundingClientRect();
          gaps.push(rect2.left - rect1.right);
        }
        
        return {
          page: 'APPS',
          cssGap: style.gap,
          visualGaps: gaps,
          avgGap: gaps.reduce((a,b) => a+b) / gaps.length,
          badgeCount: badges.length,
          containerWidth: container.getBoundingClientRect().width
        };
      })
    ]);
    
    // Display results
    console.log('GUIDES PAGE:');
    console.log('  CSS gap:', guidesData.cssGap);
    console.log('  Visual gaps:', guidesData.visualGaps.map(g => g.toFixed(1)).join(', '), 'px');
    console.log('  Average:', guidesData.avgGap.toFixed(1), 'px');
    console.log('  Badge count:', guidesData.badgeCount);
    
    console.log('\nAPPS PAGE:');
    console.log('  CSS gap:', appsData.cssGap);
    console.log('  Visual gaps:', appsData.visualGaps.map(g => g.toFixed(1)).join(', '), 'px');
    console.log('  Average:', appsData.avgGap.toFixed(1), 'px');
    console.log('  Badge count:', appsData.badgeCount);
    
    console.log('\n🔬 COMPARISON:');
    if (Math.abs(guidesData.avgGap - appsData.avgGap) < 0.5) {
      console.log('✅ Badge gaps match! Both are ~' + guidesData.avgGap.toFixed(1) + 'px');
    } else {
      console.log('❌ Badge gaps differ:');
      console.log(`  Guides: ${guidesData.avgGap.toFixed(1)}px`);
      console.log(`  Apps: ${appsData.avgGap.toFixed(1)}px`);
      console.log(`  Difference: ${Math.abs(guidesData.avgGap - appsData.avgGap).toFixed(1)}px`);
    }
    
    // If you're seeing 8px on apps and 4px on guides, let's debug why
    if (appsData.avgGap > guidesData.avgGap) {
      console.log('\n🐛 DEBUGGING: Apps gap is larger. Checking for issues...');
      
      // Check if Tailwind is overriding our CSS
      const debugData = await appsPage.evaluate(() => {
        const container = document.querySelector('.minimal-card .flex.flex-wrap.gap-2');
        
        // Create a test element with gap-2 class
        const test = document.createElement('div');
        test.className = 'gap-2';
        document.body.appendChild(test);
        const defaultGap2 = window.getComputedStyle(test).gap;
        document.body.removeChild(test);
        
        // Get all stylesheets
        const sheets = Array.from(document.styleSheets);
        let rulesApplied = [];
        
        sheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || []);
            rules.forEach(rule => {
              if (rule.selectorText && rule.selectorText.includes('gap-2')) {
                rulesApplied.push({
                  selector: rule.selectorText,
                  gap: rule.style.gap
                });
              }
            });
          } catch(e) {}
        });
        
        return {
          defaultGap2Value: defaultGap2,
          appliedRules: rulesApplied
        };
      });
      
      console.log('  Default gap-2 value:', debugData.defaultGap2Value);
      console.log('  CSS rules containing gap-2:');
      debugData.appliedRules.forEach(rule => {
        console.log(`    ${rule.selector} → gap: ${rule.gap}`);
      });
    }
    
    console.log('\nBrowser windows left open for inspection...');
    await guidesPage.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

sideBySideComparison().catch(console.error);