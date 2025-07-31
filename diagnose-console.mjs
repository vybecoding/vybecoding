import { chromium } from 'playwright';

async function diagnoseConsole() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Listen to console messages
  page.on('console', msg => {
    console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, msg.text());
  });
  
  // Listen to page errors
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR]:`, error.message);
  });
  
  // Listen to request failures
  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED]:`, request.url(), request.failure().errorText);
  });
  
  try {
    console.log('🔍 Loading guides page with console monitoring...');
    
    await page.goto('http://localhost:3000/guides', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    console.log('✅ Page loaded, waiting for hydration...');
    
    // Wait for some time to see console messages
    await page.waitForTimeout(10000);
    
    // Check what's actually in the DOM
    const bodyContent = await page.evaluate(() => {
      return {
        hasH1: document.querySelector('h1') !== null,
        hasGuidesText: document.body.innerText.includes('Guides'),
        bodyLength: document.body.innerText.length,
        hasMaxW6xl: document.querySelector('.max-w-6xl') !== null,
        hasReactRoot: document.querySelector('#__next') !== null,
        scripts: Array.from(document.scripts).map(s => s.src || 'inline').slice(0, 5)
      };
    });
    
    console.log('\n📊 DOM Analysis:');
    console.log(`  Has h1 element: ${bodyContent.hasH1}`);
    console.log(`  Contains 'Guides' text: ${bodyContent.hasGuidesText}`);
    console.log(`  Body text length: ${bodyContent.bodyLength}`);
    console.log(`  Has .max-w-6xl: ${bodyContent.hasMaxW6xl}`);
    console.log(`  Has React root: ${bodyContent.hasReactRoot}`);
    console.log(`  First 5 scripts: ${bodyContent.scripts.join(', ')}`);
    
    // Take screenshot of what we have
    await page.screenshot({ path: '/tmp/console-debug.png', fullPage: true });
    console.log('\n📸 Screenshot saved to /tmp/console-debug.png');
    
    // Keep browser open to inspect manually
    console.log('\n⏳ Keeping browser open for 30 seconds for manual inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('❌ Diagnosis failed:', error);
  } finally {
    await browser.close();
  }
}

diagnoseConsole();