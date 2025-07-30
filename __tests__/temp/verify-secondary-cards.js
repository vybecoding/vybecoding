import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifySecondaryCards() {
  console.log('🎨 Verifying Secondary Cards with Gradient Title Bars...\n');
  
  // Start demo server if not running
  const demoRunning = await fetch('http://localhost:8080').then(() => true).catch(() => false);
  if (!demoRunning) {
    console.log('Starting demo server...');
    const { spawn } = await import('child_process');
    const demoProcess = spawn('python3', ['-m', 'http.server', '8080'], {
      cwd: path.join(__dirname, '../../demo'),
      detached: true,
      stdio: 'ignore'
    });
    demoProcess.unref();
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  const browser = await chromium.launch({
    headless: false, // Show browser for visual confirmation
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
  
  await page.waitForTimeout(1000); // Wait for smooth scroll
  
  // Find and capture the secondary cards section
  const secondaryCardsSection = await page.locator('h4:has-text("Secondary Cards")').locator('..').first();
  
  // Take screenshot of the section
  const screenshotPath = path.join(__dirname, 'secondary-cards-verification.png');
  await secondaryCardsSection.screenshot({
    path: screenshotPath
  });
  
  console.log(`✅ Screenshot saved to: ${screenshotPath}`);
  
  // Verify the gradient bars are present
  const gradientBars = await page.evaluate(() => {
    const cards = document.querySelectorAll('.vybe-card');
    const results = [];
    
    cards.forEach((card, index) => {
      const titleBar = card.querySelector('div[style*="height: 4px"]');
      if (titleBar) {
        const style = titleBar.getAttribute('style');
        const background = style.match(/background:\s*([^;]+)/)?.[1] || 'none';
        results.push({
          index,
          hasGradientBar: true,
          background,
          position: titleBar.className.includes('absolute') && style.includes('top-0')
        });
      }
    });
    
    return results;
  });
  
  console.log('\n📊 Verification Results:');
  console.log('Found gradient bars:', gradientBars.filter(g => g.hasGradientBar).length);
  
  gradientBars.forEach((bar, i) => {
    if (bar.hasGradientBar) {
      console.log(`  Card ${i + 1}: ✅ Has gradient bar - ${bar.background}`);
    }
  });
  
  console.log('\n🔍 Visual Inspection:');
  console.log('1. Check that each secondary card has a horizontal gradient bar at the top');
  console.log('2. Verify colors: Default (purple→pink→orange), Purple, Pink, Orange');
  console.log('3. Confirm bars are 4px height and span full width');
  console.log('4. No vertical side bars should be visible');
  
  console.log('\n⏸️  Browser window will remain open for manual inspection.');
  console.log('❌ Close the browser window when done.\n');
  
  // Keep browser open for manual inspection
  await page.waitForTimeout(300000); // 5 minutes
  
  await context.close();
  await browser.close();
}

// Run the verification
verifySecondaryCards().catch(console.error);