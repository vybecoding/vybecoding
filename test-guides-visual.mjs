import { chromium } from 'playwright';

async function testGuidesPage() {
  console.log('🎭 Starting Playwright visual test for guides page...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-fullscreen']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Testing guides page at different viewport sizes...');
    
    // Test desktop size first
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/guides');
    await page.waitForLoadState('networkidle');
    
    console.log('🖥️  Desktop (1440px): Checking heading overflow...');
    
    // Get the heading element
    const heading = await page.locator('h1').first();
    const headingBox = await heading.boundingBox();
    const viewportSize = page.viewportSize();
    
    console.log(`Heading bounding box: width=${headingBox.width}, right=${headingBox.x + headingBox.width}`);
    console.log(`Viewport width: ${viewportSize.width}`);
    
    if (headingBox.x + headingBox.width > viewportSize.width) {
      console.log('❌ DESKTOP: Heading overflows viewport!');
    } else {
      console.log('✅ DESKTOP: Heading fits within viewport');
    }
    
    // Take screenshot for desktop
    await page.screenshot({ path: '/tmp/guides-desktop-1440.png', fullPage: false });
    
    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    console.log('📱 Tablet (768px): Checking heading overflow...');
    
    const headingTablet = await page.locator('h1').first();
    const headingBoxTablet = await headingTablet.boundingBox();
    const viewportTablet = page.viewportSize();
    
    console.log(`Heading bounding box: width=${headingBoxTablet.width}, right=${headingBoxTablet.x + headingBoxTablet.width}`);
    console.log(`Viewport width: ${viewportTablet.width}`);
    
    if (headingBoxTablet.x + headingBoxTablet.width > viewportTablet.width) {
      console.log('❌ TABLET: Heading overflows viewport!');
    } else {
      console.log('✅ TABLET: Heading fits within viewport');
    }
    
    // Take screenshot for tablet
    await page.screenshot({ path: '/tmp/guides-tablet-768.png', fullPage: false });
    
    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    console.log('📱 Mobile (375px): Checking heading overflow...');
    
    const headingMobile = await page.locator('h1').first();
    const headingBoxMobile = await headingMobile.boundingBox();
    const viewportMobile = page.viewportSize();
    
    console.log(`Heading bounding box: width=${headingBoxMobile.width}, right=${headingBoxMobile.x + headingBoxMobile.width}`);
    console.log(`Viewport width: ${viewportMobile.width}`);
    
    if (headingBoxMobile.x + headingBoxMobile.width > viewportMobile.width) {
      console.log('❌ MOBILE: Heading overflows viewport!');
    } else {
      console.log('✅ MOBILE: Heading fits within viewport');
    }
    
    // Take screenshot for mobile
    await page.screenshot({ path: '/tmp/guides-mobile-375.png', fullPage: false });
    
    // Check overall container width
    const container = await page.locator('.max-w-6xl').first();
    const containerBox = await container.boundingBox();
    
    console.log(`Container bounding box: width=${containerBox.width}, right=${containerBox.x + containerBox.width}`);
    
    if (containerBox.x + containerBox.width > viewportMobile.width) {
      console.log('❌ MOBILE: Container overflows viewport!');
      return false;
    } else {
      console.log('✅ MOBILE: Container fits within viewport');
      return true;
    }
    
  } catch (error) {
    console.error('❌ Error during visual test:', error);
    return false;
  } finally {
    await browser.close();
  }
}

testGuidesPage().then(success => {
  if (success) {
    console.log('🎉 All visual tests passed!');
    process.exit(0);
  } else {
    console.log('💥 Visual tests failed - container sizing needs fixing');
    process.exit(1);
  }
}).catch(error => {
  console.error('💥 Test execution failed:', error);
  process.exit(1);
});