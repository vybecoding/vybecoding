import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/design-system-showcase.html');
  await page.waitForTimeout(2000);
  
  // Find all APP labels and their actual rendered colors
  const appLabels = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('span'));
    const appLabels = spans.filter(span => span.textContent.trim() === 'APP');
    
    return appLabels.map((label, index) => {
      const computed = window.getComputedStyle(label);
      const rect = label.getBoundingClientRect();
      const parent = label.parentElement;
      
      return {
        index: index,
        computedBackground: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        inlineStyle: label.getAttribute('style'),
        parentClass: parent.className,
        parentOnclick: parent.getAttribute('onclick'),
        visible: rect.width > 0 && rect.height > 0,
        position: {
          top: rect.top,
          left: rect.left
        }
      };
    });
  });
  
  console.log('\n=== SHOWCASE APP LABELS ===');
  appLabels.forEach((label, i) => {
    console.log(`\nLabel ${i + 1}:`);
    console.log('Computed Background:', label.computedBackground);
    console.log('Background Image:', label.backgroundImage);
    console.log('Visible:', label.visible);
    console.log('Parent:', label.parentClass);
    console.log('Inline Background:', label.inlineStyle?.match(/background:\s*([^;]+)/)?.[1]);
  });
  
  // Take a screenshot of the showcase
  await page.screenshot({ path: 'showcase-actual.png' });
  
  await browser.close();
})();