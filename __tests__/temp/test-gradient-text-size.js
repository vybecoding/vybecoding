import { chromium } from 'playwright';

async function checkGradientTextSize() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    // Find the gradient text
    const gradientText = await page.locator('h3:has-text("Learn from") span:has-text("Featured Mentors")').first();
    
    // Get computed styles
    const styles = await gradientText.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        lineHeight: computed.lineHeight,
        display: computed.display,
        transform: computed.transform,
        scale: computed.scale,
        zoom: computed.zoom,
        className: el.className,
        inlineStyle: el.getAttribute('style')
      };
    });
    
    console.log('Gradient Text Computed Styles:');
    console.log(JSON.stringify(styles, null, 2));
    
    // Check parent h3 styles
    const h3Styles = await page.locator('h3:has-text("Learn from")').first().evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight
      };
    });
    
    console.log('\nParent H3 Styles:');
    console.log(JSON.stringify(h3Styles, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkGradientTextSize();