import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  // Open both pages
  const showcasePage = await context.newPage();
  await showcasePage.goto('http://localhost:8080/design-system-showcase.html');
  await showcasePage.waitForTimeout(2000);
  
  const appsPage = await context.newPage();
  await appsPage.goto('http://localhost:8080/#apps');
  await appsPage.waitForTimeout(2000);
  
  // Get the exact styles from showcase APP label
  const showcaseAPP = await showcasePage.evaluate(() => {
    // Find APP label in showcase (not MEMBER labels)
    const labels = Array.from(document.querySelectorAll('span[style*="position: absolute"]'));
    const appLabel = labels.find(label => label.textContent.trim() === 'APP');
    
    if (!appLabel) return null;
    
    const computed = window.getComputedStyle(appLabel);
    const inlineStyle = appLabel.getAttribute('style');
    
    return {
      inlineStyle: inlineStyle,
      computedBackground: computed.backgroundColor,
      computedBackgroundImage: computed.backgroundImage,
      textContent: appLabel.textContent,
      // Extract background from inline style
      inlineBackground: inlineStyle.match(/background:\s*([^;]+);/)?.[1]
    };
  });
  
  // Get the exact styles from apps page APP label
  const appsAPP = await appsPage.evaluate(() => {
    const labels = Array.from(document.querySelectorAll('span[style*="position: absolute"]'));
    const appLabel = labels.find(label => label.textContent.trim() === 'APP');
    
    if (!appLabel) return null;
    
    const computed = window.getComputedStyle(appLabel);
    const inlineStyle = appLabel.getAttribute('style');
    
    return {
      inlineStyle: inlineStyle,
      computedBackground: computed.backgroundColor,
      computedBackgroundImage: computed.backgroundImage,
      textContent: appLabel.textContent,
      inlineBackground: inlineStyle.match(/background:\s*([^;]+);/)?.[1]
    };
  });
  
  console.log('\n=== SHOWCASE APP LABEL ===');
  console.log('Inline Background:', showcaseAPP?.inlineBackground);
  console.log('Computed Background:', showcaseAPP?.computedBackground);
  console.log('Full Inline Style:', showcaseAPP?.inlineStyle);
  
  console.log('\n=== APPS PAGE APP LABEL ===');
  console.log('Inline Background:', appsAPP?.inlineBackground);
  console.log('Computed Background:', appsAPP?.computedBackground);
  console.log('Full Inline Style:', appsAPP?.inlineStyle);
  
  // Check for CSS overrides on apps page
  const appsPageOverrides = await appsPage.evaluate(() => {
    const appLabel = Array.from(document.querySelectorAll('span[style*="position: absolute"]'))
      .find(label => label.textContent.trim() === 'APP');
    
    if (!appLabel) return null;
    
    // Get all stylesheets
    const stylesheets = Array.from(document.styleSheets);
    const matchingRules = [];
    
    stylesheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules);
        rules.forEach(rule => {
          if (rule.selectorText && appLabel.matches(rule.selectorText)) {
            matchingRules.push({
              selector: rule.selectorText,
              style: rule.style.cssText
            });
          }
        });
      } catch (e) {
        // Cross-origin stylesheets
      }
    });
    
    return matchingRules;
  });
  
  console.log('\n=== CSS RULES AFFECTING APPS PAGE APP LABEL ===');
  console.log(appsPageOverrides);
  
  // Take screenshots
  const showcaseCard = await showcasePage.$('div.minimal-card:has(span:text("APP"))');
  if (showcaseCard) {
    await showcaseCard.screenshot({ path: 'showcase-app-card.png' });
  }
  
  const appsCard = await appsPage.$('div.minimal-card:has(span:text("APP"))');
  if (appsCard) {
    await appsCard.screenshot({ path: 'apps-app-card.png' });
  }
  
  await browser.close();
})();