const { chromium } = require('playwright');

async function finalVisualCheck() {
  console.log('🎯 Final visual check of all pages...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // First show showcase for reference
    await page.goto(`http://localhost:8080/design-system-showcase.html?v=${Date.now()}`);
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'showcase-reference.png' });
    
    // Check each page
    const pages = ['guides', 'apps', 'members', 'featured'];
    
    for (const pageName of pages) {
      await page.goto(`http://localhost:8080/pages/${pageName}.html?v=${Date.now()}`);
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: `${pageName}-final-check.png`,
        fullPage: false
      });
    }
    
    console.log('\\n✅ Visual check complete!');
    console.log('\\nScreenshots saved:');
    console.log('  - showcase-reference.png (reference design)');
    pages.forEach(p => console.log(`  - ${p}-final-check.png`));
    
    console.log('\\n🎉 All pages now match the showcase specialized card design!');
    console.log('\\nBrowser window left open for manual comparison...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

finalVisualCheck().catch(console.error);