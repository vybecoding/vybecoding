import { chromium } from 'playwright';

async function finalContainerTest() {
  console.log('🎯 Final container size verification...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 1
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Testing at 375px width...');
    
    // Go to guides page
    await page.goto('http://localhost:3000/guides', { 
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // Wait for React hydration
    await page.waitForTimeout(3000);
    
    // Wait for the heading to appear
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Get page scroll info
    const scrollInfo = await page.evaluate(() => ({
      hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth
    }));
    
    // Get heading info
    const headingInfo = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return null;
      
      const rect = h1.getBoundingClientRect();
      return {
        text: h1.textContent,
        width: rect.width,
        right: rect.right,
        overflowsViewport: rect.right > window.innerWidth
      };
    });
    
    // Get container info
    const containerInfo = await page.evaluate(() => {
      // Look for various container classes
      const selectors = ['.max-w-6xl', '.container', '[class*="max-w"]'];
      
      for (const selector of selectors) {
        const container = document.querySelector(selector);
        if (container) {
          const rect = container.getBoundingClientRect();
          return {
            selector,
            width: rect.width,
            right: rect.right,
            overflowsViewport: rect.right > window.innerWidth
          };
        }
      }
      
      return null;
    });
    
    console.log('\n📊 Results:');
    console.log(`  Viewport: 375px`);
    console.log(`  Page scroll width: ${scrollInfo.scrollWidth}px`);
    console.log(`  Page client width: ${scrollInfo.clientWidth}px`);
    console.log(`  Has horizontal scroll: ${scrollInfo.hasHorizontalScroll}`);
    
    if (headingInfo) {
      console.log(`  Heading text: "${headingInfo.text}"`);
      console.log(`  Heading width: ${headingInfo.width}px`);
      console.log(`  Heading right edge: ${headingInfo.right}px`);
      console.log(`  Heading overflows: ${headingInfo.overflowsViewport}`);
    } else {
      console.log('  ❌ No heading found');
    }
    
    if (containerInfo) {
      console.log(`  Container (${containerInfo.selector}): ${containerInfo.width}px`);
      console.log(`  Container right edge: ${containerInfo.right}px`);
      console.log(`  Container overflows: ${containerInfo.overflowsViewport}`);
    } else {
      console.log('  ❌ No container found');
    }
    
    // Take final screenshot
    await page.screenshot({ path: '/tmp/final-test-mobile.png', fullPage: false });
    
    // Test desktop too
    console.log('\n🖥️  Testing at 1440px width...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(1000);
    
    const desktopScrollInfo = await page.evaluate(() => ({
      hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    
    console.log(`  Desktop scroll width: ${desktopScrollInfo.scrollWidth}px`);
    console.log(`  Desktop client width: ${desktopScrollInfo.clientWidth}px`);
    console.log(`  Desktop has horizontal scroll: ${desktopScrollInfo.hasHorizontalScroll}`);
    
    await page.screenshot({ path: '/tmp/final-test-desktop.png', fullPage: false });
    
    // Determine success
    const success = !scrollInfo.hasHorizontalScroll && 
                   !desktopScrollInfo.hasHorizontalScroll &&
                   (!headingInfo || !headingInfo.overflowsViewport) &&
                   (!containerInfo || !containerInfo.overflowsViewport);
    
    if (success) {
      console.log('\n✅ SUCCESS: No horizontal overflow detected!');
      console.log('Screenshots: /tmp/final-test-mobile.png, /tmp/final-test-desktop.png');
    } else {
      console.log('\n❌ ISSUE: Horizontal overflow detected');
    }
    
    return success;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  } finally {
    await browser.close();
  }
}

finalContainerTest().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('💥 Test execution failed:', error);
  process.exit(1);
});