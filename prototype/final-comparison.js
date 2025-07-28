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
  await appsPage.waitForTimeout(3000);
  
  // Get APP label colors from both pages
  const getAppLabelColor = async (page) => {
    return await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll('span'));
      const appLabel = spans.find(span => 
        span.textContent.trim() === 'APP' && 
        span.style.position === 'absolute'
      );
      
      if (!appLabel) return null;
      
      const computed = window.getComputedStyle(appLabel);
      return {
        computedBackground: computed.backgroundColor,
        inlineBackground: appLabel.style.background,
        opacity: computed.opacity,
        zIndex: computed.zIndex
      };
    });
  };
  
  const showcaseColor = await getAppLabelColor(showcasePage);
  const appsColor = await getAppLabelColor(appsPage);
  
  console.log('\n=== COLOR COMPARISON ===');
  console.log('Showcase APP label:', showcaseColor);
  console.log('Apps page APP label:', appsColor);
  
  if (showcaseColor?.computedBackground === appsColor?.computedBackground) {
    console.log('\n✅ Colors match!');
  } else {
    console.log('\n❌ Colors do not match');
  }
  
  // Take side-by-side screenshots
  const showcaseCard = await showcasePage.$('.minimal-card:has-text("AI Code Review Assistant")');
  const appsCard = await appsPage.$('.minimal-card:has-text("AI Code Review Assistant")');
  
  if (showcaseCard) {
    await showcaseCard.screenshot({ path: 'final-showcase-card.png' });
  }
  
  if (appsCard) {
    await appsCard.screenshot({ path: 'final-apps-card.png' });
  }
  
  await browser.close();
})();