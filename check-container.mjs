import { chromium } from 'playwright';

async function checkContainerSize() {
  console.log('🔍 Checking guides page container sizing...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/guides', { waitUntil: 'domcontentloaded' });
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Check if page has horizontal scrollbar
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    // Get container width
    const containerInfo = await page.evaluate(() => {
      const container = document.querySelector('.max-w-6xl');
      if (!container) return null;
      
      const rect = container.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(container);
      
      return {
        width: rect.width,
        right: rect.right,
        maxWidth: computedStyle.maxWidth,
        marginLeft: computedStyle.marginLeft,
        marginRight: computedStyle.marginRight,
        paddingLeft: computedStyle.paddingLeft,
        paddingRight: computedStyle.paddingRight
      };
    });
    
    // Get viewport info
    const viewportWidth = page.viewportSize().width;
    
    console.log('📱 Mobile (375px) Analysis:');
    console.log(`  Viewport width: ${viewportWidth}px`);
    console.log(`  Has horizontal scroll: ${hasHorizontalScroll}`);
    
    if (containerInfo) {
      console.log(`  Container width: ${containerInfo.width}px`);
      console.log(`  Container right edge: ${containerInfo.right}px`);
      console.log(`  Container max-width: ${containerInfo.maxWidth}`);
      console.log(`  Container margins: ${containerInfo.marginLeft} / ${containerInfo.marginRight}`);
      console.log(`  Container padding: ${containerInfo.paddingLeft} / ${containerInfo.paddingRight}`);
      
      const overflows = containerInfo.right > viewportWidth;
      console.log(`  Container overflows: ${overflows}`);
      
      if (hasHorizontalScroll || overflows) {
        console.log('❌ ISSUE: Container causes horizontal scroll on mobile');
        return false;
      } else {
        console.log('✅ Container fits properly on mobile');
      }
    } else {
      console.log('❌ ISSUE: Container not found');
      return false;
    }
    
    // Test desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    
    const desktopHasScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    console.log('\n🖥️  Desktop (1440px) Analysis:');
    console.log(`  Has horizontal scroll: ${desktopHasScroll}`);
    
    if (desktopHasScroll) {
      console.log('❌ ISSUE: Horizontal scroll on desktop');
      return false;
    } else {
      console.log('✅ No horizontal scroll on desktop');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  } finally {
    await browser.close();
  }
}

checkContainerSize().then(success => {
  if (success) {
    console.log('\n🎉 Container sizing is correct!');
    process.exit(0);
  } else {
    console.log('\n💥 Container sizing needs fixing');
    process.exit(1);
  }
}).catch(error => {
  console.error('💥 Test execution failed:', error);
  process.exit(1);
});