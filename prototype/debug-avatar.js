const { chromium } = require('playwright');

async function debugAvatar() {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newPage();
  
  // Load the members page
  await page.goto('file:///home/happy/Projects/vybecoding/prototype/index.html');
  await page.waitForTimeout(1000);
  
  // Click on Members nav
  await page.click('text=Members');
  await page.waitForTimeout(2000);
  
  // Get the avatar structure for alexchen
  const avatarStructure = await page.evaluate(() => {
    const card = Array.from(document.querySelectorAll('.minimal-card')).find(card => 
      card.textContent.includes('@alexchen')
    );
    
    if (!card) return 'Card not found';
    
    // Find the avatar container
    const avatarContainer = card.querySelector('.avatar-ring.mentor');
    const avatarInner = card.querySelector('.w-10.h-10.bg-gradient-to-br');
    
    return {
      avatarContainerHTML: avatarContainer ? avatarContainer.outerHTML : 'No avatar container',
      avatarContainerStyles: avatarContainer ? window.getComputedStyle(avatarContainer).cssText : 'No styles',
      avatarInnerHTML: avatarInner ? avatarInner.outerHTML : 'No inner avatar',
      avatarInnerStyles: avatarInner ? window.getComputedStyle(avatarInner).cssText : 'No styles',
      avatarText: avatarInner ? avatarInner.textContent.trim() : 'No text'
    };
  });
  
  console.log('Avatar Structure:', avatarStructure);
  
  // Check if avatar-ring styles are loaded
  const avatarRingStyles = await page.evaluate(() => {
    const testEl = document.createElement('div');
    testEl.className = 'avatar-ring mentor';
    document.body.appendChild(testEl);
    const computed = window.getComputedStyle(testEl);
    const styles = {
      display: computed.display,
      position: computed.position,
      width: computed.width,
      height: computed.height,
      background: computed.background,
      border: computed.border,
      borderRadius: computed.borderRadius
    };
    document.body.removeChild(testEl);
    return styles;
  });
  
  console.log('Avatar Ring Styles:', avatarRingStyles);
  
  // Take screenshot of the avatar
  const card = await page.$('.minimal-card:has-text("@alexchen")');
  if (card) {
    await card.screenshot({ path: 'alexchen-card.png' });
    console.log('Screenshot saved as alexchen-card.png');
  }
  
  console.log('Browser will stay open for debugging. Press Ctrl+C to close.');
}

debugAvatar().catch(console.error);