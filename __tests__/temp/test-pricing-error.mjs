import { chromium } from 'playwright';

(async () => {
  console.log('🔍 Checking for errors on pricing page...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newContext().then(ctx => ctx.newPage());
  
  // Capture console messages
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });
  
  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.toString());
  });
  
  try {
    console.log('📍 Navigating to Next.js pricing page...');
    const response = await page.goto('http://localhost:3000/pricing', {
      waitUntil: 'networkidle'
    });
    
    console.log(`Response status: ${response.status()}`);
    
    // Wait a bit for any delayed errors
    await page.waitForTimeout(2000);
    
    // Check page content
    const pageContent = await page.evaluate(() => {
      return {
        title: document.title,
        bodyText: document.body.innerText.substring(0, 100),
        hasContent: document.body.children.length > 0,
        rootElement: document.getElementById('__next') ? 'Found #__next' : 'No #__next',
        mainElement: document.querySelector('main') ? 'Found main' : 'No main',
        errorElements: document.querySelectorAll('[class*="error"], [id*="error"]').length
      };
    });
    
    console.log('\n📊 Page Analysis:');
    console.log('Title:', pageContent.title);
    console.log('Has content:', pageContent.hasContent);
    console.log('Root element:', pageContent.rootElement);
    console.log('Main element:', pageContent.mainElement);
    console.log('Error elements:', pageContent.errorElements);
    console.log('Body preview:', pageContent.bodyText || '[Empty]');
    
    console.log('\n🔴 Console Errors:');
    const errors = consoleLogs.filter(log => log.type === 'error');
    if (errors.length === 0) {
      console.log('No console errors found');
    } else {
      errors.forEach(err => {
        console.log(`- ${err.text}`);
        if (err.location.url) {
          console.log(`  at ${err.location.url}:${err.location.lineNumber}`);
        }
      });
    }
    
    console.log('\n⚠️ Console Warnings:');
    const warnings = consoleLogs.filter(log => log.type === 'warning');
    if (warnings.length === 0) {
      console.log('No warnings found');
    } else {
      warnings.forEach(warn => {
        console.log(`- ${warn.text}`);
      });
    }
    
    console.log('\n💥 Page Errors:');
    if (pageErrors.length === 0) {
      console.log('No page errors found');
    } else {
      pageErrors.forEach(err => {
        console.log(`- ${err}`);
      });
    }
    
    // Check if specific components are rendered
    const componentCheck = await page.evaluate(() => {
      const checks = {
        glassCards: document.querySelectorAll('.glass-card, [class*="glass"]').length,
        gradientText: document.querySelectorAll('.text-gradient-brand, [class*="gradient"]').length,
        pricingCards: document.querySelectorAll('[class*="card"]').length,
        buttons: document.querySelectorAll('button, a[href*="sign"]').length
      };
      return checks;
    });
    
    console.log('\n🧩 Component Check:');
    console.log('Glass cards:', componentCheck.glassCards);
    console.log('Gradient text:', componentCheck.gradientText);
    console.log('Pricing cards:', componentCheck.pricingCards);
    console.log('Buttons:', componentCheck.buttons);
    
    console.log('\n✅ Check complete. Browser remains open for inspection.');
    console.log('📍 Use DevTools to investigate further.\n');
    
    // Keep browser open
    await page.waitForTimeout(300000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
})();