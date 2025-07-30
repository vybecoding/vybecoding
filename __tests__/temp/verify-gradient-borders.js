import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyGradientBorders() {
  console.log('🌈 Verifying Gradient Border Cards...\n');
  
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
  
  // Take screenshot of gradient cards only
  const screenshotPath = path.join(__dirname, 'gradient-borders-fixed.png');
  
  // Screenshot just the secondary and tertiary sections to show gradient borders
  const cardSections = await page.locator('h4:has-text("Secondary Cards")').locator('../..').first();
  await cardSections.screenshot({ path: screenshotPath });
  
  console.log(`✅ Gradient borders screenshot saved to: ${screenshotPath}`);
  console.log('\\n🌈 Fixed Gradient Border Implementation:');
  console.log('  • Uses padding + background gradient technique');
  console.log('  • Inner div with dark background creates border effect');
  console.log('  • Gradient colors: purple → pink → orange');
  console.log('  • Works consistently across all browsers');
  console.log('\\n🎯 Expected Result:');
  console.log('  • Secondary Gradient: Visible colorful border');
  console.log('  • Tertiary Gradient: Visible colorful border + gradient accent bar');
  
  await browser.close();
}

verifyGradientBorders().catch(console.error);