const { chromium } = require('playwright');

async function verifyContainerFix() {
  console.log('🔍 Verifying guides container fix...');
  
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
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check for horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    
    console.log(`✅ Desktop (1920x1080): ${hasOverflow ? '❌ Still has overflow' : '✅ No overflow'}`);
    
    // Test mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);
    
    const mobileOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    
    console.log(`📱 Mobile (390x844): ${mobileOverflow ? '❌ Still has overflow' : '✅ No overflow'}`);
    
    // Check container constraints
    const containerCheck = await page.evaluate(() => {
      const results = [];
      
      // Check main content
      const mainContent = document.querySelector('#main-content');
      if (mainContent) {
        const rect = mainContent.getBoundingClientRect();
        results.push({
          element: 'main-content',
          width: rect.width,
          viewportWidth: window.innerWidth,
          constrained: rect.width <= window.innerWidth
        });
      }
      
      // Check guides grid
      const guidesGrid = document.querySelector('#guides-results-grid, .grid');
      if (guidesGrid) {
        const rect = guidesGrid.getBoundingClientRect();
        results.push({
          element: 'guides-grid',
          width: rect.width,
          viewportWidth: window.innerWidth,
          constrained: rect.width <= window.innerWidth
        });
      }
      
      return results;
    });
    
    console.log('\n📐 Container Constraints:');
    containerCheck.forEach(check => {
      console.log(`- ${check.element}: ${check.width}px (viewport: ${check.viewportWidth}px) - ${check.constrained ? '✅' : '❌'}`);
    });
    
    console.log('\n🎯 Fix verification complete! Browser will remain open for manual inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

verifyContainerFix().catch(console.error);