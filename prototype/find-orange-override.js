import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/#apps');
  await page.waitForTimeout(3000);
  
  // Find all CSS rules that might affect APP labels
  const cssAnalysis = await page.evaluate(() => {
    const appLabel = Array.from(document.querySelectorAll('span'))
      .find(span => span.textContent.trim() === 'APP' && span.style.position === 'absolute');
    
    if (!appLabel) return { error: 'No APP label found' };
    
    const matchingRules = [];
    const sheets = Array.from(document.styleSheets);
    
    // Function to check if a selector matches our element
    const checkRule = (rule, sheetHref) => {
      try {
        if (rule.selectorText && appLabel.matches(rule.selectorText)) {
          const bg = rule.style.background || rule.style.backgroundColor;
          if (bg) {
            matchingRules.push({
              selector: rule.selectorText,
              background: bg,
              important: rule.style.cssText.includes('!important'),
              sheet: sheetHref || 'inline',
              fullText: rule.cssText
            });
          }
        }
      } catch (e) {
        // Ignore errors from complex selectors
      }
    };
    
    // Check all stylesheets
    sheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        rules.forEach(rule => {
          if (rule.type === CSSRule.STYLE_RULE) {
            checkRule(rule, sheet.href);
          } else if (rule.type === CSSRule.MEDIA_RULE) {
            Array.from(rule.cssRules).forEach(innerRule => {
              checkRule(innerRule, sheet.href);
            });
          }
        });
      } catch (e) {
        console.log('Could not access sheet:', sheet.href);
      }
    });
    
    // Also check for any parent selectors that might contain orange
    const parentRules = [];
    sheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        rules.forEach(rule => {
          if (rule.cssText && rule.cssText.includes('251, 146, 60')) {
            parentRules.push({
              selector: rule.selectorText,
              cssText: rule.cssText,
              sheet: sheet.href || 'inline'
            });
          }
        });
      } catch (e) {
        // Ignore
      }
    });
    
    return {
      appLabelFound: true,
      inlineStyle: appLabel.getAttribute('style'),
      computedBackground: window.getComputedStyle(appLabel).backgroundColor,
      matchingRules: matchingRules,
      orangeRules: parentRules,
      allStylesheets: sheets.map(s => s.href).filter(Boolean)
    };
  });
  
  console.log('\n=== CSS ANALYSIS ===');
  console.log(JSON.stringify(cssAnalysis, null, 2));
  
  // Check if the color is actually different visually
  const screenshot = await page.screenshot({ 
    path: 'apps-page-full.png',
    fullPage: false 
  });
  
  await browser.close();
})();