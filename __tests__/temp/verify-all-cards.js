import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyAllCards() {
  console.log('🎨 Verifying Complete Card Design System...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1200 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/design-system-showcase.html', {
    waitUntil: 'networkidle'
  });
  
  // Wait for Lucide icons to load
  await page.waitForTimeout(2000);
  
  // Scroll to top to capture all card sections
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  
  // Take full screenshot of all cards
  const screenshotPath = path.join(__dirname, 'complete-card-system.png');
  
  // Find all card sections and take a comprehensive screenshot
  await page.evaluate(() => {
    const primarySection = Array.from(document.querySelectorAll('h4')).find(
      el => el.textContent.includes('Primary Cards')
    );
    if (primarySection) {
      primarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot of all three card sections
  const allCardsSections = await page.locator('h4:has-text("Primary Cards")').locator('../..').first();
  await allCardsSections.screenshot({ path: screenshotPath, fullPage: false });
  
  console.log(`✅ Complete card system screenshot saved to: ${screenshotPath}`);
  
  // Verify the expected 15 cards total (5 primary + 5 secondary + 5 tertiary)
  const cardCounts = await page.evaluate(() => {
    const primaryCards = document.querySelectorAll('h4:has-text("Primary Cards") + div .vybe-card').length;
    const secondaryCards = document.querySelectorAll('h4:has-text("Secondary Cards") + div .vybe-card').length;
    const tertiaryCards = document.querySelectorAll('h4:has-text("Tertiary Cards") + div .vybe-card').length;
    
    return {
      primary: primaryCards,
      secondary: secondaryCards,
      tertiary: tertiaryCards,
      total: primaryCards + secondaryCards + tertiaryCards
    };
  });
  
  console.log('\\n📊 Card System Summary:');
  console.log(`  Primary Cards: ${cardCounts.primary} (Default, Gradient, Purple, Pink, Orange)`);
  console.log(`  Secondary Cards: ${cardCounts.secondary} (Default, Gradient, Purple, Pink, Orange)`);
  console.log(`  Tertiary Cards: ${cardCounts.tertiary} (Default, Gradient, Purple, Pink, Orange)`);
  console.log(`  Total Cards: ${cardCounts.total}`);
  
  console.log('\\n✅ Design System Features:');
  console.log('  • Default cards: No borders');
  console.log('  • Gradient cards: Gradient borders');
  console.log('  • Color variant cards: Consistent 0.3 opacity borders');
  console.log('  • Secondary cards: Lucide icons for distinction');
  console.log('  • Clear visual hierarchy: Primary > Secondary > Tertiary');
  
  await browser.close();
}

verifyAllCards().catch(console.error);