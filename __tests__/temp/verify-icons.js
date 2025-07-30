import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyIcons() {
  console.log('🎨 Verifying Secondary Cards with Icons...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/design-system-showcase.html', {
    waitUntil: 'networkidle'
  });
  
  // Wait for Lucide icons to load
  await page.waitForTimeout(2000);
  
  // Scroll to secondary cards
  await page.evaluate(() => {
    const secondaryCardsHeader = Array.from(document.querySelectorAll('h4')).find(
      el => el.textContent.includes('Secondary Cards')
    );
    if (secondaryCardsHeader) {
      secondaryCardsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Check if icons are rendered
  const iconsFound = await page.evaluate(() => {
    const cards = document.querySelectorAll('.vybe-card');
    const results = [];
    
    cards.forEach((card, index) => {
      const title = card.querySelector('h3');
      const icon = card.querySelector('[data-lucide]');
      if (title && title.textContent.includes('Secondary')) {
        results.push({
          title: title.textContent.trim(),
          hasIcon: !!icon,
          iconType: icon ? icon.getAttribute('data-lucide') : null
        });
      }
    });
    
    return results;
  });
  
  console.log('🔍 Icon Status:');
  iconsFound.forEach(card => {
    console.log(`  ${card.title}: ${card.hasIcon ? '✅' : '❌'} ${card.iconType || 'No icon'}`);
  });
  
  // Take screenshot
  const secondaryCardsSection = await page.locator('h4:has-text("Secondary Cards")').locator('..').first();
  const screenshotPath = path.join(__dirname, 'secondary-cards-with-icons.png');
  await secondaryCardsSection.screenshot({ path: screenshotPath });
  
  console.log(`\n✅ Screenshot saved to: ${screenshotPath}`);
  
  await browser.close();
}

verifyIcons().catch(console.error);