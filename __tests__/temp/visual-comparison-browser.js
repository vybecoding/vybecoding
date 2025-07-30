import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function openVisualComparison() {
  console.log('🎨 Opening Visual Comparison Browser...\n');
  
  // Launch browser with specific window size
  const browser = await chromium.launch({
    headless: false,
    devtools: true,
    args: ['--window-size=1920,1080']
  });
  
  // Create two contexts for side-by-side comparison
  const demoContext = await browser.newContext({
    viewport: { width: 960, height: 1080 }
  });
  
  const nextContext = await browser.newContext({
    viewport: { width: 960, height: 1080 }
  });
  
  // Open demo page
  const demoPage = await demoContext.newPage();
  console.log('📸 Opening Demo site...');
  await demoPage.goto('http://localhost:8080/pages/home.html', {
    waitUntil: 'domcontentloaded'
  });
  
  // Open Next.js page
  const nextPage = await nextContext.newPage();
  console.log('📸 Opening Next.js site...');
  await nextPage.goto('http://localhost:3000', {
    waitUntil: 'domcontentloaded'
  });
  
  // Position windows side by side
  console.log('\n🔍 Visual Comparison Ready!');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('LEFT WINDOW: Demo (localhost:8080)');
  console.log('RIGHT WINDOW: Next.js (localhost:3000)');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Extract and compare key visual elements
  console.log('📊 Key Visual Differences:\n');
  
  // Compare gradients
  const demoGradients = await demoPage.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const gradients = new Set();
    elements.forEach(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg.includes('gradient')) {
        gradients.add(bg);
      }
    });
    return Array.from(gradients);
  });
  
  const nextGradients = await nextPage.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const gradients = new Set();
    elements.forEach(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg.includes('gradient')) {
        gradients.add(bg);
      }
    });
    return Array.from(gradients);
  });
  
  console.log(`📐 Gradients:`);
  console.log(`   Demo: ${demoGradients.length} unique gradients found`);
  console.log(`   Next.js: ${nextGradients.length} unique gradients found`);
  
  // Compare colors
  const demoColors = await demoPage.evaluate(() => {
    const hero = document.querySelector('.hero, [class*="hero"]');
    if (!hero) return {};
    const styles = window.getComputedStyle(hero);
    return {
      background: styles.backgroundColor,
      text: styles.color
    };
  });
  
  const nextColors = await nextPage.evaluate(() => {
    const hero = document.querySelector('.hero, [class*="hero"], main');
    if (!hero) return {};
    const styles = window.getComputedStyle(hero);
    return {
      background: styles.backgroundColor,
      text: styles.color
    };
  });
  
  console.log(`\n🎨 Hero Section Colors:`);
  console.log(`   Demo: ${JSON.stringify(demoColors, null, 2)}`);
  console.log(`   Next.js: ${JSON.stringify(nextColors, null, 2)}`);
  
  // Navigation suggestions
  console.log('\n📋 Visual Inspection Checklist:');
  console.log('1. ✓ Check gradient angles and color stops');
  console.log('2. ✓ Compare purple/pink/orange brand colors');
  console.log('3. ✓ Verify glassmorphism effects on navigation');
  console.log('4. ✓ Check shadow/glow effects on cards');
  console.log('5. ✓ Compare typography (Inter vs system fonts)');
  console.log('6. ✓ Verify spacing and layout alignment');
  console.log('7. ✓ Check animations and hover states');
  
  console.log('\n🔧 DevTools Tips:');
  console.log('- Use Elements panel to inspect computed styles');
  console.log('- Use Color Picker to compare exact color values');
  console.log('- Use Device Mode to test responsive breakpoints');
  console.log('- Take screenshots for documentation');
  
  console.log('\n⏸️  Windows will remain open for manual inspection.');
  console.log('❌ Close browser windows when done.\n');
  
  // Keep browser open
  await new Promise(() => {}); // Infinite wait
}

// Run the comparison
openVisualComparison().catch(console.error);