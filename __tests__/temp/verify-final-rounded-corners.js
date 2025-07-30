import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyFinalRoundedCorners() {
  console.log('🎨 Verifying Final Rounded Corners Fix...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/design-system-showcase.html', {
    waitUntil: 'networkidle'
  });
  
  await page.waitForTimeout(2000);
  
  // Focus on gradient cards specifically
  await page.evaluate(() => {
    const secondaryCardsHeader = Array.from(document.querySelectorAll('h4')).find(
      el => el.textContent.includes('Secondary Cards')
    );
    if (secondaryCardsHeader) {
      secondaryCardsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot of gradient cards to verify rounded corners
  const screenshotPath = path.join(__dirname, 'gradient-cards-rounded-final.png');
  const cardSections = await page.locator('h4:has-text("Secondary Cards")').locator('../..').first();
  await cardSections.screenshot({ path: screenshotPath });
  
  console.log(`✅ Final gradient cards screenshot saved to: ${screenshotPath}`);
  console.log('\\n🔧 Fixed Implementation:');
  console.log('  • Technique: padding + background gradient (compatible with border-radius)');
  console.log('  • Outer div: 1px padding + gradient background + 8px border-radius');
  console.log('  • Inner div: 7px border-radius to match outer curve');
  console.log('  • Works with rounded corners unlike border-image');
  console.log('\\n✅ Expected Result:');
  console.log('  • Secondary Gradient: Rounded corners + subtle gradient border');
  console.log('  • Tertiary Gradient: Rounded corners + gradient border + gradient accent bar');
  console.log('  • Same visual weight as other colored borders');
  
  await browser.close();
}

verifyFinalRoundedCorners().catch(console.error);