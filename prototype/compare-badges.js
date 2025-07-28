const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  // Open both pages
  const showcasePage = await context.newPage();
  await showcasePage.goto('http://localhost:8080/design-system-showcase.html');
  await showcasePage.waitForTimeout(2000);
  
  const appsPage = await context.newPage();
  await appsPage.goto('http://localhost:8080/pages/apps.html');
  await appsPage.waitForTimeout(2000);
  
  // Get computed styles for showcase APP badge
  const showcaseStyles = await showcasePage.evaluate(() => {
    const appBadge = document.querySelector('span[style*="APP"]:not([style*="MEMBER"])');
    if (!appBadge) return null;
    
    const computed = window.getComputedStyle(appBadge);
    const rect = appBadge.getBoundingClientRect();
    
    return {
      backgroundColor: computed.backgroundColor,
      backgroundImage: computed.backgroundImage,
      color: computed.color,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      padding: computed.padding,
      paddingTop: computed.paddingTop,
      borderRadius: computed.borderRadius,
      boxShadow: computed.boxShadow,
      letterSpacing: computed.letterSpacing,
      lineHeight: computed.lineHeight,
      textTransform: computed.textTransform,
      opacity: computed.opacity,
      width: rect.width,
      height: rect.height,
      inlineStyle: appBadge.getAttribute('style')
    };
  });
  
  // Get computed styles for apps page APP badge
  const appsStyles = await appsPage.evaluate(() => {
    const appBadge = document.querySelector('span[style*="APP"]');
    if (!appBadge) return null;
    
    const computed = window.getComputedStyle(appBadge);
    const rect = appBadge.getBoundingClientRect();
    
    return {
      backgroundColor: computed.backgroundColor,
      backgroundImage: computed.backgroundImage,
      color: computed.color,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      padding: computed.padding,
      paddingTop: computed.paddingTop,
      borderRadius: computed.borderRadius,
      boxShadow: computed.boxShadow,
      letterSpacing: computed.letterSpacing,
      lineHeight: computed.lineHeight,
      textTransform: computed.textTransform,
      opacity: computed.opacity,
      width: rect.width,
      height: rect.height,
      inlineStyle: appBadge.getAttribute('style')
    };
  });
  
  console.log('\n=== SHOWCASE APP BADGE ===');
  console.log(JSON.stringify(showcaseStyles, null, 2));
  
  console.log('\n=== APPS PAGE APP BADGE ===');
  console.log(JSON.stringify(appsStyles, null, 2));
  
  console.log('\n=== DIFFERENCES ===');
  if (showcaseStyles && appsStyles) {
    for (const key in showcaseStyles) {
      if (showcaseStyles[key] !== appsStyles[key]) {
        console.log(`${key}: "${appsStyles[key]}" → should be "${showcaseStyles[key]}"`);
      }
    }
  }
  
  // Take screenshots for visual comparison
  await showcasePage.screenshot({ path: 'showcase-badge.png', clip: { x: 0, y: 0, width: 300, height: 200 } });
  await appsPage.screenshot({ path: 'apps-badge.png', clip: { x: 0, y: 0, width: 300, height: 200 } });
  
  // Extract the exact inline style from showcase
  console.log('\n=== EXACT INLINE STYLE TO USE ===');
  console.log(showcaseStyles?.inlineStyle);
  
  await browser.close();
})();