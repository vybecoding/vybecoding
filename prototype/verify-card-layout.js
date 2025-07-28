import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/#apps');
  await page.waitForTimeout(2000);
  
  // Check card layout properties
  const cardAnalysis = await page.evaluate(() => {
    const card = document.querySelector('.minimal-card[onclick*="showAppDetail"]');
    if (!card) return null;
    
    const computed = window.getComputedStyle(card);
    const statsDiv = card.querySelector('.flex.items-center.justify-between.pt-3.border-t');
    const statsComputed = statsDiv ? window.getComputedStyle(statsDiv) : null;
    
    return {
      card: {
        display: computed.display,
        flexDirection: computed.flexDirection,
        padding: computed.padding,
        paddingBottom: computed.paddingBottom,
        height: computed.height
      },
      stats: statsComputed ? {
        marginTop: statsComputed.marginTop,
        paddingTop: statsComputed.paddingTop,
        paddingBottom: statsComputed.paddingBottom,
        hasMtAutoClass: statsDiv.classList.contains('mt-auto')
      } : null
    };
  });
  
  console.log('\n=== APPS CARD LAYOUT ANALYSIS ===');
  console.log('Card properties:', cardAnalysis?.card);
  console.log('Stats section:', cardAnalysis?.stats);
  
  // Compare with guides page
  await page.goto('http://localhost:8080/#guides');
  await page.waitForTimeout(3000); // Give more time for guides to load
  
  const guideCardAnalysis = await page.evaluate(() => {
    const card = document.querySelector('.minimal-card');
    if (!card) return null;
    
    const computed = window.getComputedStyle(card);
    const statsDiv = card.querySelector('.flex.items-center.justify-between.pt-3.border-t');
    const statsComputed = statsDiv ? window.getComputedStyle(statsDiv) : null;
    
    return {
      card: {
        display: computed.display,
        flexDirection: computed.flexDirection,
        padding: computed.padding,
        paddingBottom: computed.paddingBottom
      },
      stats: statsComputed ? {
        marginTop: statsComputed.marginTop,
        paddingTop: statsComputed.paddingTop,
        hasMtAutoClass: statsDiv.classList.contains('mt-auto')
      } : null
    };
  });
  
  console.log('\n=== GUIDES CARD LAYOUT ANALYSIS ===');
  console.log('Card properties:', guideCardAnalysis?.card);
  console.log('Stats section:', guideCardAnalysis?.stats);
  
  await browser.close();
})();