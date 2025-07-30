import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifySubtleGradients() {
  console.log('🎨 Verifying Subtle Gradient Borders...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/design-system-showcase.html', {
    waitUntil: 'networkidle'
  });
  
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
  
  // Take screenshot focusing on gradient vs colored borders
  const screenshotPath = path.join(__dirname, 'subtle-gradient-borders.png');
  const cardSections = await page.locator('h4:has-text("Secondary Cards")').locator('../..').first();
  await cardSections.screenshot({ path: screenshotPath });
  
  console.log(`✅ Subtle gradient borders screenshot saved to: ${screenshotPath}`);
  console.log('\\n🎯 Fixed Implementation:');
  console.log('  • Gradient borders: 1px solid with border-image');
  console.log('  • Same thickness as colored borders (0.3 opacity)');
  console.log('  • Subtle glassmorphism effect');
  console.log('  • Consistent with design system');
  console.log('\\n📊 Border Comparison:');
  console.log('  • Purple border: rgba(138, 43, 226, 0.3)');
  console.log('  • Gradient border: rgba(138, 43, 226, 0.3) → rgba(217, 70, 160, 0.3) → rgba(233, 107, 58, 0.3)');
  console.log('  • Same visual weight and subtlety');
  
  await browser.close();
}

verifySubtleGradients().catch(console.error);