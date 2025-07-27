const { chromium } = require('playwright');

async function measureBottomSection() {
  console.log('📏 Measuring bottom section...');
  
  const browser = await chromium.launch({
    headless: false,
    devtools: true
  });
  
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(1000);
    
    // Measure the bottom section
    const measurements = await page.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      const bottomSection = card.querySelector('.flex.items-center.justify-between.pt-3.border-t');
      
      if (!bottomSection) return null;
      
      const cardRect = card.getBoundingClientRect();
      const sectionRect = bottomSection.getBoundingClientRect();
      const computed = window.getComputedStyle(bottomSection);
      const cardComputed = window.getComputedStyle(card);
      
      return {
        card: {
          height: cardRect.height,
          paddingBottom: cardComputed.paddingBottom,
          bottom: cardRect.bottom
        },
        section: {
          height: sectionRect.height,
          top: sectionRect.top,
          bottom: sectionRect.bottom,
          paddingTop: computed.paddingTop,
          paddingBottom: computed.paddingBottom,
          marginTop: computed.marginTop,
          marginBottom: computed.marginBottom
        },
        distanceFromCardBottom: cardRect.bottom - sectionRect.bottom,
        distanceFromBorderTop: sectionRect.top - (sectionRect.top - parseFloat(computed.paddingTop))
      };
    });
    
    console.log('\n📊 Measurements:', JSON.stringify(measurements, null, 2));
    
    // Take screenshot
    const card = await page.locator('.minimal-card').first();
    await card.screenshot({ path: 'bottom-section-measure.png' });
    
    console.log('\n📸 Screenshot saved: bottom-section-measure.png');
    console.log('\n🔍 Browser open for inspection...');
    
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

measureBottomSection().catch(console.error);