// Quick visual check for DEMO-001
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  
  try {
    // Open both pages side by side
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    
    // Demo page
    const demoPage = await context.newPage();
    await demoPage.goto('http://localhost:8080');
    
    // Next.js page
    const nextPage = await context.newPage();
    await nextPage.goto('http://localhost:3000');
    
    console.log('✅ Both pages loaded successfully');
    console.log('Please compare visually:');
    console.log('- Hero section height (down arrow should be visible)');
    console.log('- Featured Mentors section');
    console.log('- All content sections match demo');
    
    // Keep browser open for manual comparison
    await new Promise(resolve => setTimeout(resolve, 30000));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();