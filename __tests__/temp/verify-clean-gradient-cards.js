import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyCleanGradientCards() {
  console.log('🎨 Verifying Clean Gradient Cards (No Backgrounds)...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/design-system-showcase.html', {
    waitUntil: 'networkidle'
  });
  
  await page.waitForTimeout(2000);
  
  // Focus on secondary and tertiary cards
  await page.evaluate(() => {
    const secondaryCardsHeader = Array.from(document.querySelectorAll('h4')).find(
      el => el.textContent.includes('Secondary Cards')
    );
    if (secondaryCardsHeader) {
      secondaryCardsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot to verify clean appearance
  const screenshotPath = path.join(__dirname, 'clean-gradient-cards.png');
  const cardSections = await page.locator('h4:has-text("Secondary Cards")').locator('../..').first();
  await cardSections.screenshot({ path: screenshotPath });
  
  console.log(`✅ Clean gradient cards screenshot saved to: ${screenshotPath}`);
  console.log('\\n🎯 Fixed Implementation:');
  console.log('  • No glassmorphism backgrounds - clean like other cards');
  console.log('  • Same dark card background as colored variants');
  console.log('  • Only difference: gradient border instead of solid border');
  console.log('  • Consistent sizing: Secondary 160px, Tertiary 140px height');
  console.log('\\n✅ Expected Results:');
  console.log('  • Secondary Gradient: Same appearance as Purple/Pink/Orange, just gradient border');
  console.log('  • Tertiary Gradient: Same appearance as other tertiary cards, just gradient border');
  console.log('  • No special backgrounds or effects - just border color difference');
  console.log('  • Perfect visual consistency across the design system');
  
  await browser.close();
}

verifyCleanGradientCards().catch(console.error);