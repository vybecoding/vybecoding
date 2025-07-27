const { chromium } = require('playwright');

async function testAvatarFix() {
  console.log('🔍 Testing avatar/username/date fix...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Navigate to guides page
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Take focused screenshot of first card
    const firstCard = await page.locator('.minimal-card').first();
    await firstCard.screenshot({ 
      path: 'guides-avatar-fix.png'
    });
    
    // Analyze avatar section
    const avatarAnalysis = await page.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      const avatarSection = card.querySelector('.flex.items-center.gap-2');
      const avatar = card.querySelector('.w-6.h-6.bg-gradient-to-br');
      const username = avatarSection.querySelector('span.text-sm');
      const dateSection = card.querySelector('.flex.items-center.gap-1');
      
      return {
        avatarSection: {
          found: !!avatarSection,
          display: avatarSection ? window.getComputedStyle(avatarSection).display : null,
          padding: avatarSection ? window.getComputedStyle(avatarSection).padding : null
        },
        avatar: {
          found: !!avatar,
          width: avatar ? window.getComputedStyle(avatar).width : null,
          height: avatar ? window.getComputedStyle(avatar).height : null
        },
        username: {
          found: !!username,
          text: username ? username.textContent.trim() : null,
          color: username ? window.getComputedStyle(username).color : null
        },
        date: {
          found: !!dateSection,
          text: dateSection ? dateSection.textContent.trim() : null
        }
      };
    });
    
    console.log('\n📊 Avatar Section Analysis:');
    console.log(`- Avatar section found: ${avatarAnalysis.avatarSection.found ? '✅' : '❌'}`);
    console.log(`- Avatar found: ${avatarAnalysis.avatar.found ? '✅' : '❌'}`);
    console.log(`- Username: ${avatarAnalysis.username.text || 'Not found'}`);
    console.log(`- Date: ${avatarAnalysis.date.text || 'Not found'}`);
    
    if (avatarAnalysis.avatar.found) {
      console.log(`- Avatar size: ${avatarAnalysis.avatar.width} x ${avatarAnalysis.avatar.height}`);
    }
    
    console.log('\n✅ Test complete! Check guides-avatar-fix.png');
    console.log('🔍 Browser left open for inspection.');
    
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

testAvatarFix().catch(console.error);