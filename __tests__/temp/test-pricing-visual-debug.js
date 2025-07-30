import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPARISON_DIR = path.join(__dirname, '../../visual-snapshots/comparison/pricing');

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}

async function debugVisualComparison() {
  console.log('Starting visual comparison debug...\n');
  
  await ensureDir(COMPARISON_DIR);
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    
    // Test Next.js page
    console.log('Opening Next.js page...');
    const nextPage = await context.newPage();
    
    await nextPage.goto('http://localhost:3000/pricing', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });
    
    console.log('Waiting for content to load...');
    await nextPage.waitForTimeout(3000);
    
    // Check if content is visible
    const pageContent = await nextPage.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      
      return {
        bodyBg: window.getComputedStyle(body).backgroundColor,
        htmlBg: window.getComputedStyle(html).backgroundColor,
        bodyColor: window.getComputedStyle(body).color,
        bodyInnerHTML: body.innerHTML.substring(0, 500),
        h1Text: document.querySelector('h1')?.textContent || 'No h1 found',
        visibleText: document.body.innerText.substring(0, 200),
        hasContent: body.innerHTML.length > 100,
        cardCount: document.querySelectorAll('[class*="card"]').length,
        elementCount: document.querySelectorAll('*').length
      };
    });
    
    console.log('\nNext.js Page Analysis:');
    console.log('- Body background:', pageContent.bodyBg);
    console.log('- Body color:', pageContent.bodyColor);
    console.log('- H1 text:', pageContent.h1Text);
    console.log('- Has content:', pageContent.hasContent);
    console.log('- Card count:', pageContent.cardCount);
    console.log('- Total elements:', pageContent.elementCount);
    console.log('- Visible text preview:', pageContent.visibleText);
    
    // Try to wait for specific elements
    try {
      console.log('\nWaiting for pricing cards...');
      await nextPage.waitForSelector('[class*="card"]', { timeout: 5000 });
      console.log('✓ Cards found');
    } catch (e) {
      console.log('✗ No cards found within 5 seconds');
    }
    
    // Check for errors
    const errors = [];
    nextPage.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Take screenshot
    const screenshotPath = path.join(COMPARISON_DIR, 'debug-nextjs.png');
    await nextPage.screenshot({ 
      path: screenshotPath,
      fullPage: true
    });
    console.log(`\nScreenshot saved to: ${screenshotPath}`);
    
    // Try scrolling
    console.log('\nTrying to scroll...');
    await nextPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await nextPage.waitForTimeout(1000);
    
    // Check for Clerk authentication issues
    const clerkStatus = await nextPage.evaluate(() => {
      return {
        hasClerk: typeof window.Clerk !== 'undefined',
        clerkLoaded: window.Clerk?.loaded,
        pathname: window.location.pathname,
        isSignedIn: window.Clerk?.user ? true : false
      };
    });
    
    console.log('\nClerk Status:');
    console.log('- Clerk present:', clerkStatus.hasClerk);
    console.log('- Clerk loaded:', clerkStatus.clerkLoaded);
    console.log('- Current path:', clerkStatus.pathname);
    console.log('- Signed in:', clerkStatus.isSignedIn);
    
    if (errors.length > 0) {
      console.log('\nConsole errors:', errors);
    }
    
    // Open demo page for comparison
    console.log('\n\nOpening demo page...');
    const demoPage = await context.newPage();
    
    await demoPage.goto('http://localhost:8080/pages/pricing.html', { 
      waitUntil: 'networkidle' 
    });
    
    console.log('Demo page loaded');
    
    const demoContent = await demoPage.evaluate(() => {
      return {
        h1Text: document.querySelector('h1')?.textContent || 'No h1 found',
        cardCount: document.querySelectorAll('.card, .glass-card, .price-card').length,
        visibleText: document.body.innerText.substring(0, 200)
      };
    });
    
    console.log('\nDemo Page Analysis:');
    console.log('- H1 text:', demoContent.h1Text);
    console.log('- Card count:', demoContent.cardCount);
    console.log('- Visible text preview:', demoContent.visibleText);
    
    console.log('\n\nKeeping browser open for manual inspection...');
    console.log('Press Ctrl+C to close');
    
    // Keep browser open
    await new Promise(() => {});
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the debug
debugVisualComparison().catch(console.error);