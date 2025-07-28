const { chromium } = require('playwright');

async function verifyMembers() {
  console.log('🔍 Verifying members page...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('http://localhost:8080/pages/members.html', { waitUntil: 'networkidle' });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(1000);
    
    // Scroll to member cards section
    await page.evaluate(() => {
      const cardsSection = document.querySelector('.grid');
      if (cardsSection) cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(500);
    
    // Take screenshot of member cards
    const cardsGrid = await page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6');
    await cardsGrid.screenshot({ path: 'members-cards-fixed.png' });
    
    console.log('✅ Screenshot saved: members-cards-fixed.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyMembers().catch(console.error);