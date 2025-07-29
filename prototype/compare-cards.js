import { chromium } from 'playwright';

async function compareCards() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  // Open two pages side by side
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  // Load showcase page
  const showcasePage = await context.newPage();
  console.log('Loading showcase...');
  await showcasePage.goto('http://localhost:8080/');
  await showcasePage.waitForTimeout(2000);
  
  // Load members page
  const membersPage = await context.newPage();
  console.log('Loading members...');
  await membersPage.goto('http://localhost:8080/#members');
  await membersPage.waitForTimeout(2000);
  
  // Get showcase card details
  console.log('\n=== SHOWCASE CARD ANALYSIS ===');
  const showcaseCard = await showcasePage.evaluate(() => {
    const card = document.querySelector('.minimal-card.mentor-card');
    if (!card) return null;
    
    const outerDiv = card;
    const innerDiv = card.querySelector('.p-5.pt-4') || card.querySelector('[class*="p-5"]');
    const title = card.querySelector('h3');
    const label = card.querySelector('span[style*="MEMBER"]');
    
    const outerStyles = window.getComputedStyle(outerDiv);
    const innerStyles = innerDiv ? window.getComputedStyle(innerDiv) : null;
    
    return {
      outer: {
        padding: outerStyles.padding,
        border: outerStyles.border,
        borderRadius: outerStyles.borderRadius,
        background: outerStyles.background,
        height: outerDiv.offsetHeight,
        className: outerDiv.className
      },
      inner: innerDiv ? {
        padding: innerStyles.padding,
        paddingTop: innerStyles.paddingTop,
        paddingBottom: innerStyles.paddingBottom,
        paddingLeft: innerStyles.paddingLeft,
        paddingRight: innerStyles.paddingRight,
        className: innerDiv.className
      } : null,
      title: title ? {
        marginTop: window.getComputedStyle(title).marginTop,
        marginBottom: window.getComputedStyle(title).marginBottom,
        fontSize: window.getComputedStyle(title).fontSize,
        lineHeight: window.getComputedStyle(title).lineHeight
      } : null,
      label: label ? {
        padding: window.getComputedStyle(label).padding,
        paddingTop: window.getComputedStyle(label).paddingTop,
        position: window.getComputedStyle(label).position
      } : null
    };
  });
  
  console.log('Showcase card:', JSON.stringify(showcaseCard, null, 2));
  
  // Get members card details
  console.log('\n=== MEMBERS CARD ANALYSIS ===');
  const membersCard = await membersPage.evaluate(() => {
    const card = document.querySelector('.minimal-card.mentor-card');
    if (!card) return null;
    
    const outerDiv = card;
    const innerDiv = card.querySelector('.p-5.pt-4') || card.querySelector('[class*="p-5"]');
    const title = card.querySelector('h3');
    const label = card.querySelector('span[style*="MEMBER"]');
    
    const outerStyles = window.getComputedStyle(outerDiv);
    const innerStyles = innerDiv ? window.getComputedStyle(innerDiv) : null;
    
    return {
      outer: {
        padding: outerStyles.padding,
        border: outerStyles.border,
        borderRadius: outerStyles.borderRadius,
        background: outerStyles.background,
        height: outerDiv.offsetHeight,
        className: outerDiv.className
      },
      inner: innerDiv ? {
        padding: innerStyles.padding,
        paddingTop: innerStyles.paddingTop,
        paddingBottom: innerStyles.paddingBottom,
        paddingLeft: innerStyles.paddingLeft,
        paddingRight: innerStyles.paddingRight,
        className: innerDiv.className
      } : null,
      title: title ? {
        marginTop: window.getComputedStyle(title).marginTop,
        marginBottom: window.getComputedStyle(title).marginBottom,
        fontSize: window.getComputedStyle(title).fontSize,
        lineHeight: window.getComputedStyle(title).lineHeight
      } : null,
      label: label ? {
        padding: window.getComputedStyle(label).padding,
        paddingTop: window.getComputedStyle(label).paddingTop,
        position: window.getComputedStyle(label).position
      } : null
    };
  });
  
  console.log('Members card:', JSON.stringify(membersCard, null, 2));
  
  // Take screenshots of individual cards
  const showcaseCardEl = await showcasePage.$('.minimal-card.mentor-card');
  if (showcaseCardEl) {
    await showcaseCardEl.screenshot({ path: 'showcase-card.png' });
    console.log('\nScreenshot saved: showcase-card.png');
  }
  
  const membersCardEl = await membersPage.$('.minimal-card.mentor-card');
  if (membersCardEl) {
    await membersCardEl.screenshot({ path: 'members-card.png' });
    console.log('Screenshot saved: members-card.png');
  }
  
  // Compare differences
  console.log('\n=== DIFFERENCES ===');
  if (showcaseCard && membersCard) {
    if (showcaseCard.outer.padding !== membersCard.outer.padding) {
      console.log(`Outer padding: showcase="${showcaseCard.outer.padding}" vs members="${membersCard.outer.padding}"`);
    }
    if (showcaseCard.inner && membersCard.inner && showcaseCard.inner.padding !== membersCard.inner.padding) {
      console.log(`Inner padding: showcase="${showcaseCard.inner.padding}" vs members="${membersCard.inner.padding}"`);
    }
    if (showcaseCard.outer.height !== membersCard.outer.height) {
      console.log(`Card height: showcase="${showcaseCard.outer.height}" vs members="${membersCard.outer.height}"`);
    }
  }
  
  console.log('\nBrowsers will stay open. Press Ctrl+C to close.');
}

compareCards().catch(console.error);