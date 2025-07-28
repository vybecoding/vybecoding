const { chromium } = require('playwright');

async function verifyShowcase() {
  console.log('🔍 Verifying showcase cards...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('http://localhost:8080/design-system-showcase.html', { waitUntil: 'networkidle' });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(1000);
    
    // Scroll to specialized cards section
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(500);
    
    // Take screenshot of specialized cards
    const cardsSection = await page.locator('.showcase-section:has(#specialized-cards-heading)');
    await cardsSection.screenshot({ path: 'showcase-cards-fixed.png' });
    
    console.log('✅ Screenshot saved: showcase-cards-fixed.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyShowcase().catch(console.error);