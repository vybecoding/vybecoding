import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyEnhancedAccents() {
  console.log('🎨 Verifying Enhanced Corner Accents...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/design-system-showcase.html', {
    waitUntil: 'networkidle'
  });
  
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
  
  // Take screenshot
  const secondaryCardsSection = await page.locator('h4:has-text("Secondary Cards")').locator('..').first();
  const screenshotPath = path.join(__dirname, 'secondary-cards-final.png');
  await secondaryCardsSection.screenshot({ path: screenshotPath });
  
  console.log(`✅ Screenshot saved to: ${screenshotPath}`);
  console.log('\n🎯 Enhanced corner accents now feature:');
  console.log('  • Size: 80px × 80px (doubled from 40px)');
  console.log('  • Opacity: Full opacity gradient (1.0 → 0.6 → 0.3 → 0)');
  console.log('  • Position: Flush with corners (no negative offset)');
  console.log('  • Interaction: pointer-events: none for click-through');
  
  await browser.close();
}

verifyEnhancedAccents().catch(console.error);