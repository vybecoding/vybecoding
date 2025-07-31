import { chromium } from 'playwright';

async function debugPage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/guides', { waitUntil: 'domcontentloaded' });
    
    // Wait longer for React to hydrate
    await page.waitForTimeout(5000);
    
    // Get all the class names to debug
    const containerClasses = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const classes = new Set();
      
      for (let el of elements) {
        if (el.className && typeof el.className === 'string') {
          el.className.split(' ').forEach(cls => {
            if (cls.includes('max-w') || cls.includes('container') || cls.includes('mx-auto')) {
              classes.add(cls);
            }
          });
        }
      }
      
      return Array.from(classes);
    });
    
    console.log('Found container-related classes:', containerClasses);
    
    // Look for the actual container element
    const containers = await page.evaluate(() => {
      const results = [];
      
      // Check for max-w-6xl
      const maxW6xl = document.querySelectorAll('.max-w-6xl');
      results.push(`max-w-6xl elements: ${maxW6xl.length}`);
      
      // Check for any max-w class
      const maxWElements = document.querySelectorAll('[class*="max-w"]');
      results.push(`max-w elements: ${maxWElements.length}`);
      
      // Check for mx-auto
      const mxAuto = document.querySelectorAll('.mx-auto');
      results.push(`mx-auto elements: ${mxAuto.length}`);
      
      // Get body content to see if page loaded
      const hasContent = document.body.innerText.includes('Guides');
      results.push(`Page has 'Guides' text: ${hasContent}`);
      
      // Check if there's a loading state
      const hasLoader = document.querySelector('[class*="animate-spin"]') !== null;
      results.push(`Has loading spinner: ${hasLoader}`);
      
      return results;
    });
    
    console.log('Container debug info:');
    containers.forEach(info => console.log(`  ${info}`));
    
    // Take a screenshot to see what's actually rendered
    await page.screenshot({ path: '/tmp/guides-debug.png', fullPage: true });
    console.log('Screenshot saved to /tmp/guides-debug.png');
    
    // Keep browser open for manual inspection
    console.log('Browser will stay open for 30 seconds for manual inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Debug failed:', error);
  } finally {
    await browser.close();
  }
}

debugPage();