import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  // Check apps page
  const appsPage = await context.newPage();
  await appsPage.goto('http://localhost:8080/#apps');
  await appsPage.waitForTimeout(2000);
  
  const appsSpacing = await appsPage.evaluate(() => {
    const card = document.querySelector('.minimal-card[onclick*="showAppDetail"]');
    if (!card) return null;
    
    const title = card.querySelector('h3');
    const label = card.querySelector('span[style*="position: absolute"]');
    
    if (!title || !label) return null;
    
    const titleStyle = window.getComputedStyle(title);
    const labelRect = label.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    
    return {
      titleMarginTop: titleStyle.marginTop,
      labelHeight: labelRect.height,
      labelBottom: labelRect.bottom,
      titleTop: titleRect.top,
      actualGap: titleRect.top - labelRect.bottom
    };
  });
  
  // Check guides page
  const guidesPage = await context.newPage();
  await guidesPage.goto('http://localhost:8080/#guides');
  await guidesPage.waitForTimeout(2000);
  
  const guidesSpacing = await guidesPage.evaluate(() => {
    const card = document.querySelector('.minimal-card');
    if (!card) return null;
    
    const title = card.querySelector('h3');
    const label = card.querySelector('span[style*="position: absolute"]');
    
    if (!title || !label) return null;
    
    const titleStyle = window.getComputedStyle(title);
    const labelRect = label.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    
    return {
      titleMarginTop: titleStyle.marginTop,
      labelHeight: labelRect.height,
      labelBottom: labelRect.bottom,
      titleTop: titleRect.top,
      actualGap: titleRect.top - labelRect.bottom
    };
  });
  
  console.log('\n=== APPS PAGE TITLE SPACING ===');
  console.log(appsSpacing);
  
  console.log('\n=== GUIDES PAGE TITLE SPACING ===');
  console.log(guidesSpacing);
  
  await browser.close();
})();