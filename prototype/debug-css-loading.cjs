const { chromium } = require('playwright');

async function debugCSSLoading() {
  console.log('🔍 Debugging CSS loading...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    devtools: true
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Add console logging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console error:', msg.text());
      }
    });
    
    await page.goto(`http://localhost:8080/pages/guides.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Wait a bit for scripts to run
    await page.waitForTimeout(2000);
    
    // Check what CSS files are loaded
    const cssInfo = await page.evaluate(() => {
      const allLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      const scriptTags = Array.from(document.querySelectorAll('script'));
      
      return {
        cssLinks: allLinks.map(link => ({
          href: link.href,
          loaded: link.sheet !== null
        })),
        scripts: scriptTags.map(script => script.src || 'inline'),
        loaderExecuted: window.guidesLoaderExecuted || false
      };
    });
    
    console.log('\\n📋 CSS Links found:');
    cssInfo.cssLinks.forEach(link => {
      console.log(`  ${link.loaded ? '✅' : '❌'} ${link.href}`);
    });
    
    console.log('\\n📋 Scripts found:');
    cssInfo.scripts.forEach(script => {
      console.log(`  - ${script}`);
    });
    
    // Try to manually run the loader
    console.log('\\n🔧 Manually executing CSS loader...');
    await page.evaluate(() => {
      const cssFiles = [
        'css/showcase-cards-fix.css',
        'css/force-flexible-cards.css',
        'css/showcase-perfect-labels.css',
        'css/ultimate-row-spacing.css',
        'css/fix-calendar-and-member-cards.css'
      ];
      
      cssFiles.forEach(file => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../' + file + '?v=' + Date.now();
        document.head.appendChild(link);
        console.log('Added:', link.href);
      });
    });
    
    await page.waitForTimeout(2000);
    
    // Check again
    const afterManual = await page.evaluate(() => {
      const allLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return allLinks.map(link => link.href);
    });
    
    console.log('\\n📋 CSS Links after manual load:');
    afterManual.forEach(href => {
      console.log(`  - ${href}`);
    });
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugCSSLoading().catch(console.error);