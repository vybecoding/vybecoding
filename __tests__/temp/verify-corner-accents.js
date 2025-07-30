import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyCornerAccents() {
  console.log('🎨 Verifying Secondary Cards Corner Accent Design...\n');
  
  const browser = await chromium.launch({
    headless: false,
    devtools: true
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  console.log('📸 Navigating to design system showcase...');
  await page.goto('http://localhost:8080/design-system-showcase.html', {
    waitUntil: 'networkidle'
  });
  
  // Scroll to secondary cards section
  await page.evaluate(() => {
    const secondaryCardsHeader = Array.from(document.querySelectorAll('h4')).find(
      el => el.textContent.includes('Secondary Cards')
    );
    if (secondaryCardsHeader) {
      secondaryCardsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot of secondary cards
  const secondaryCardsSection = await page.locator('h4:has-text("Secondary Cards")').locator('..').first();
  const screenshotPath = path.join(__dirname, 'secondary-cards-corner-accents.png');
  await secondaryCardsSection.screenshot({
    path: screenshotPath
  });
  
  console.log(`✅ Screenshot saved to: ${screenshotPath}`);
  
  // Verify corner accents are present
  const cornerAccents = await page.evaluate(() => {
    const cards = document.querySelectorAll('.vybe-card');
    const results = [];
    
    // Check secondary cards (should be cards 5-8 based on the page structure)
    let cardIndex = 0;
    cards.forEach((card) => {
      const parentSection = card.closest('div').previousElementSibling;
      if (parentSection && parentSection.textContent && parentSection.textContent.includes('Secondary Cards')) {
        const cornerElements = card.querySelectorAll('div[style*="gradient"][style*="135deg"], div[style*="gradient"][style*="-45deg"]');
        results.push({
          index: cardIndex,
          hasCornerAccents: cornerElements.length > 0,
          cornerCount: cornerElements.length,
          hasBorder: card.style.border.includes('solid')
        });
      }
      cardIndex++;
    });
    
    return results;
  });
  
  console.log('\n📊 Verification Results:');
  console.log('Secondary cards with corner accents:', cornerAccents.filter(c => c.hasCornerAccents).length);
  
  cornerAccents.forEach((card, i) => {
    if (card.hasCornerAccents) {
      console.log(`  Card ${i + 1}: ✅ Has ${card.cornerCount} corner accents`);
    }
  });
  
  console.log('\n🔍 Visual Inspection Checklist:');
  console.log('1. Each secondary card should have colored borders');
  console.log('2. Top-left corner: gradient accent (60% opacity)');
  console.log('3. Bottom-right corner: gradient accent (30% opacity)');
  console.log('4. Corner gradients should fade from color to transparent');
  console.log('5. Visual hierarchy: Primary (headers) > Secondary (corners) > Tertiary (minimal)');
  
  console.log('\n⏸️  Browser window open for manual inspection.');
  console.log('❌ Close when done.\n');
  
  await page.waitForTimeout(300000);
  await context.close();
  await browser.close();
}

verifyCornerAccents().catch(console.error);