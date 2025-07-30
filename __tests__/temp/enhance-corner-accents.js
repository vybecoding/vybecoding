import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function enhanceCornerAccents() {
  console.log('🎨 Enhancing Secondary Cards Corner Accents...\n');
  
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
  
  // Find and enhance secondary cards
  await page.evaluate(() => {
    // Find all secondary cards
    const secondaryCardsSection = Array.from(document.querySelectorAll('h4')).find(
      el => el.textContent.includes('Secondary Cards')
    );
    
    if (secondaryCardsSection) {
      const cardsContainer = secondaryCardsSection.nextElementSibling;
      const cards = cardsContainer.querySelectorAll('.vybe-card');
      
      cards.forEach((card, index) => {
        // Remove existing corner accents
        const existingAccents = card.querySelectorAll('div[style*="gradient"]');
        existingAccents.forEach(accent => accent.remove());
        
        // Get the border color to match accents
        const borderColor = window.getComputedStyle(card).borderColor;
        const colors = {
          0: 'rgba(138, 43, 226', // Default purple
          1: 'rgba(138, 43, 226', // Purple
          2: 'rgba(236, 72, 153', // Pink
          3: 'rgba(251, 146, 60'  // Orange
        };
        
        const baseColor = colors[index] || 'rgba(138, 43, 226';
        
        // Create more visible corner accents
        // Top-left corner
        const topLeft = document.createElement('div');
        topLeft.className = 'absolute';
        topLeft.style.cssText = `
          top: 0; 
          left: 0; 
          width: 80px; 
          height: 80px; 
          background: linear-gradient(135deg, ${baseColor}, 1) 0%, ${baseColor}, 0.6) 30%, ${baseColor}, 0.3) 60%, transparent 100%);
          pointer-events: none;
        `;
        
        // Bottom-right corner
        const bottomRight = document.createElement('div');
        bottomRight.className = 'absolute';
        bottomRight.style.cssText = `
          bottom: 0; 
          right: 0; 
          width: 80px; 
          height: 80px; 
          background: linear-gradient(-45deg, ${baseColor}, 0.8) 0%, ${baseColor}, 0.5) 30%, ${baseColor}, 0.2) 60%, transparent 100%);
          pointer-events: none;
        `;
        
        // Add enhanced accents
        card.insertBefore(topLeft, card.firstChild);
        card.insertBefore(bottomRight, card.firstChild);
      });
    }
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
  const screenshotPath = path.join(__dirname, 'secondary-cards-enhanced.png');
  await secondaryCardsSection.screenshot({
    path: screenshotPath
  });
  
  console.log(`✅ Screenshot saved to: ${screenshotPath}`);
  console.log('\n🔍 Enhanced corner accents with:');
  console.log('  - Larger size (80px instead of 40px)');
  console.log('  - More visible opacity (1.0 → 0.6 → 0.3 → transparent)');
  console.log('  - Better gradient progression');
  console.log('  - Matching colors for each variant');
  
  console.log('\n⏸️  Browser window open for inspection.');
  console.log('❌ Close when done.\n');
  
  await page.waitForTimeout(300000);
  await context.close();
  await browser.close();
}

enhanceCornerAccents().catch(console.error);