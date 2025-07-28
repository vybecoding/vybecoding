import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  const showcasePage = await context.newPage();
  await showcasePage.goto('http://localhost:8080/design-system-showcase.html');
  await showcasePage.waitForTimeout(2000);
  
  const appsPage = await context.newPage();
  await appsPage.goto('http://localhost:8080/#apps');
  await appsPage.waitForTimeout(2000);
  
  // Deep dive into all possible style differences
  const showcaseAnalysis = await showcasePage.evaluate(() => {
    const appLabel = Array.from(document.querySelectorAll('span[style*="position: absolute"]'))
      .find(label => label.textContent.trim() === 'APP');
    
    if (!appLabel) return null;
    
    const computed = window.getComputedStyle(appLabel);
    const parentComputed = window.getComputedStyle(appLabel.parentElement);
    
    // Check for any filters, transforms, or effects
    return {
      label: {
        filter: computed.filter,
        opacity: computed.opacity,
        mixBlendMode: computed.mixBlendMode,
        transform: computed.transform,
        backdropFilter: computed.backdropFilter
      },
      parent: {
        filter: parentComputed.filter,
        opacity: parentComputed.opacity,
        mixBlendMode: parentComputed.mixBlendMode,
        transform: parentComputed.transform,
        backdropFilter: parentComputed.backdropFilter,
        background: parentComputed.background,
        backgroundColor: parentComputed.backgroundColor
      },
      // Check body and page background
      pageBackground: {
        body: window.getComputedStyle(document.body).backgroundColor,
        container: document.querySelector('.page-container') ? 
          window.getComputedStyle(document.querySelector('.page-container')).backgroundColor : null
      }
    };
  });
  
  const appsAnalysis = await appsPage.evaluate(() => {
    const appLabel = Array.from(document.querySelectorAll('span[style*="position: absolute"]'))
      .find(label => label.textContent.trim() === 'APP');
    
    if (!appLabel) return null;
    
    const computed = window.getComputedStyle(appLabel);
    const parentComputed = window.getComputedStyle(appLabel.parentElement);
    
    return {
      label: {
        filter: computed.filter,
        opacity: computed.opacity,
        mixBlendMode: computed.mixBlendMode,
        transform: computed.transform,
        backdropFilter: computed.backdropFilter
      },
      parent: {
        filter: parentComputed.filter,
        opacity: parentComputed.opacity,
        mixBlendMode: parentComputed.mixBlendMode,
        transform: parentComputed.transform,
        backdropFilter: parentComputed.backdropFilter,
        background: parentComputed.background,
        backgroundColor: parentComputed.backgroundColor
      },
      pageBackground: {
        body: window.getComputedStyle(document.body).backgroundColor,
        container: document.querySelector('.page-container') ? 
          window.getComputedStyle(document.querySelector('.page-container')).backgroundColor : null,
        nebula: document.querySelector('.nebula-background') ? 
          window.getComputedStyle(document.querySelector('.nebula-background')).background : null
      }
    };
  });
  
  console.log('\n=== SHOWCASE ANALYSIS ===');
  console.log(JSON.stringify(showcaseAnalysis, null, 2));
  
  console.log('\n=== APPS PAGE ANALYSIS ===');
  console.log(JSON.stringify(appsAnalysis, null, 2));
  
  // Check if showcase-cards-fix.css is still being loaded
  const cssFiles = await appsPage.evaluate(() => {
    return Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(link => link.href);
  });
  
  console.log('\n=== CSS FILES LOADED ON APPS PAGE ===');
  cssFiles.forEach(file => {
    if (file.includes('showcase-cards-fix')) {
      console.log('❌ FOUND: ' + file);
    }
  });
  
  await browser.close();
})();