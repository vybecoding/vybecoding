import { chromium } from 'playwright';

async function compareShowcaseMembers() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  // Load showcase page
  const showcasePage = await context.newPage();
  console.log('Loading showcase...');
  await showcasePage.goto('file:///home/happy/Projects/vybecoding/prototype/design-system-showcase.html');
  await showcasePage.waitForTimeout(2000);
  
  // Load members page
  const membersPage = await context.newPage();
  console.log('Loading members...');
  await membersPage.goto('http://localhost:8080/#members');
  await membersPage.waitForTimeout(2000);
  
  // Get showcase member card details
  console.log('\n=== SHOWCASE MEMBER CARD ANALYSIS ===');
  const showcaseCard = await showcasePage.evaluate(() => {
    // Find the Machine Learning Expert card
    const cards = Array.from(document.querySelectorAll('.minimal-card'));
    const card = cards.find(c => c.textContent.includes('Machine Learning Expert'));
    if (!card) return null;
    
    const styles = window.getComputedStyle(card);
    const title = card.querySelector('h3');
    const label = card.querySelector('span[style*="MEMBER"]');
    
    // Get inner content area (where actual content is)
    const hasInnerPadding = card.querySelector('.p-5, .p-4, [class*="p-"]');
    
    return {
      card: {
        padding: styles.padding,
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
        paddingRight: styles.paddingRight,
        className: card.className,
        height: card.offsetHeight,
        width: card.offsetWidth
      },
      title: title ? {
        marginTop: window.getComputedStyle(title).marginTop,
        marginBottom: window.getComputedStyle(title).marginBottom,
        fontSize: window.getComputedStyle(title).fontSize
      } : null,
      label: label ? {
        padding: window.getComputedStyle(label).padding,
        paddingTop: window.getComputedStyle(label).paddingTop
      } : null,
      hasInnerPaddingDiv: !!hasInnerPadding
    };
  });
  
  console.log('Showcase card:', JSON.stringify(showcaseCard, null, 2));
  
  // Get members card details
  console.log('\n=== MEMBERS CARD ANALYSIS ===');
  const membersCard = await membersPage.evaluate(() => {
    const card = document.querySelector('.minimal-card.mentor-card');
    if (!card) return null;
    
    const outerStyles = window.getComputedStyle(card);
    const innerDiv = card.querySelector('.p-5.pt-4');
    const innerStyles = innerDiv ? window.getComputedStyle(innerDiv) : null;
    const title = card.querySelector('h3');
    const label = card.querySelector('span[style*="MEMBER"]');
    
    return {
      outer: {
        padding: outerStyles.padding,
        paddingTop: outerStyles.paddingTop,
        paddingBottom: outerStyles.paddingBottom,
        paddingLeft: outerStyles.paddingLeft,
        paddingRight: outerStyles.paddingRight,
        className: card.className,
        height: card.offsetHeight,
        width: card.offsetWidth
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
        inlineStyle: title.getAttribute('style')
      } : null,
      label: label ? {
        padding: window.getComputedStyle(label).padding,
        paddingTop: window.getComputedStyle(label).paddingTop
      } : null
    };
  });
  
  console.log('Members card:', JSON.stringify(membersCard, null, 2));
  
  // Take screenshots
  const showcaseCardEl = await showcasePage.evaluateHandle(() => {
    const cards = Array.from(document.querySelectorAll('.minimal-card'));
    return cards.find(c => c.textContent.includes('Machine Learning Expert'));
  });
  if (showcaseCardEl) {
    await showcaseCardEl.screenshot({ path: 'showcase-member-card.png' });
    console.log('\nScreenshot saved: showcase-member-card.png');
  }
  
  const membersCardEl = await membersPage.$('.minimal-card.mentor-card');
  if (membersCardEl) {
    await membersCardEl.screenshot({ path: 'members-card-actual.png' });
    console.log('Screenshot saved: members-card-actual.png');
  }
  
  console.log('\nBrowsers will stay open. Press Ctrl+C to close.');
}

compareShowcaseMembers().catch(console.error);