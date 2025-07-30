import { chromium } from 'playwright';

(async () => {
  console.log('🔍 Debugging Pricing Page Navigation...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const page = await browser.newContext().then(ctx => ctx.newPage());
  
  try {
    // First, let's check what happens when we navigate directly to the hash
    console.log('1️⃣ Navigating to http://localhost:8080/#pricing...');
    await page.goto('http://localhost:8080/#pricing', {
      waitUntil: 'domcontentloaded'
    });
    
    // Wait a bit for any JavaScript to run
    await page.waitForTimeout(2000);
    
    // Check what's visible
    const checkResults = await page.evaluate(() => {
      const results = {
        url: window.location.href,
        hash: window.location.hash,
        pricingSection: document.querySelector('#pricing') !== null,
        glassCards: document.querySelectorAll('.glass-card').length,
        vybeCards: document.querySelectorAll('.vybe-card').length,
        allSections: Array.from(document.querySelectorAll('section[id]')).map(s => s.id),
        visibleContent: document.body.innerText.substring(0, 200)
      };
      
      // Try to find pricing content
      const pricingHeadings = Array.from(document.querySelectorAll('h1, h2, h3')).filter(h => 
        h.textContent.toLowerCase().includes('pricing')
      );
      results.pricingHeadings = pricingHeadings.map(h => ({
        tag: h.tagName,
        text: h.textContent.trim(),
        visible: h.offsetParent !== null
      }));
      
      return results;
    });
    
    console.log('\n📊 Page Analysis:');
    console.log('URL:', checkResults.url);
    console.log('Hash:', checkResults.hash);
    console.log('Has #pricing section:', checkResults.pricingSection);
    console.log('Glass cards found:', checkResults.glassCards);
    console.log('Vybe cards found:', checkResults.vybeCards);
    console.log('All sections:', checkResults.allSections);
    console.log('\nPricing headings found:');
    checkResults.pricingHeadings.forEach(h => {
      console.log(`  ${h.tag}: "${h.text}" (visible: ${h.visible})`);
    });
    
    // Now let's try navigating to home first, then clicking on pricing
    console.log('\n2️⃣ Alternative: Navigate to home, then look for pricing link...');
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
    
    // Look for pricing navigation
    const navLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a')).filter(a => 
        a.textContent.toLowerCase().includes('pricing') ||
        a.href.includes('pricing') ||
        a.getAttribute('data-navigate') === 'pricing'
      );
      return links.map(a => ({
        text: a.textContent.trim(),
        href: a.href,
        dataNavigate: a.getAttribute('data-navigate'),
        onclick: a.onclick ? 'has onclick' : 'no onclick'
      }));
    });
    
    console.log('\nPricing links found:');
    navLinks.forEach(link => {
      console.log(`  Text: "${link.text}"`);
      console.log(`  Href: ${link.href}`);
      console.log(`  Data-navigate: ${link.dataNavigate}`);
      console.log(`  Onclick: ${link.onclick}`);
    });
    
    // If we found a pricing link, try clicking it
    if (navLinks.length > 0) {
      console.log('\n3️⃣ Clicking on pricing link...');
      const pricingLink = await page.locator('a[data-navigate="pricing"], a:has-text("Pricing")').first();
      await pricingLink.click();
      await page.waitForTimeout(2000);
      
      // Check what happened after click
      const afterClick = await page.evaluate(() => ({
        url: window.location.href,
        hash: window.location.hash,
        pricingVisible: document.querySelector('#pricing') !== null,
        glassCards: document.querySelectorAll('.glass-card').length
      }));
      
      console.log('\nAfter clicking pricing:');
      console.log('URL:', afterClick.url);
      console.log('Hash:', afterClick.hash);
      console.log('Pricing section visible:', afterClick.pricingVisible);
      console.log('Glass cards:', afterClick.glassCards);
    }
    
    console.log('\n✅ Debug complete. Browser remains open for inspection.');
    console.log('📍 Close the browser when done.\n');
    
    // Keep browser open
    await page.waitForTimeout(300000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
})();