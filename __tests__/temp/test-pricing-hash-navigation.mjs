import { chromium } from 'playwright';

(async () => {
  console.log('🔍 Starting Pricing Page Visual Verification with Hash Navigation...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    // Navigate to demo home page first, then to pricing section
    console.log('📍 Navigating to demo pricing section...');
    await page.goto('http://localhost:8080/#pricing', {
      waitUntil: 'networkidle'
    });
    
    // Wait for pricing section to be visible
    await page.waitForSelector('#pricing', { state: 'visible' });
    await page.waitForSelector('.glass-card', { state: 'visible' });
    
    console.log('✅ Demo pricing page loaded successfully');
    
    // Page is already loaded, no need to scroll
    await page.waitForTimeout(1000);
    
    // Extract pricing information
    const pricingData = await page.evaluate(() => {
      const plans = [];
      const pricingCards = document.querySelectorAll('#pricing .glass-card');
      
      pricingCards.forEach(card => {
        // Extract tier name from badge
        const badge = card.querySelector('.badge');
        const tierName = badge ? badge.textContent.trim() : '';
        
        // Extract price
        const priceElement = card.querySelector('.price');
        const price = priceElement ? priceElement.textContent.trim() : '';
        
        // Extract features
        const features = Array.from(card.querySelectorAll('li')).map(li => li.textContent.trim());
        
        // Extract button text
        const button = card.querySelector('.btn, a[href*="sign"]');
        const buttonText = button ? button.textContent.trim() : '';
        
        // Check if this is the featured plan
        const isFeatured = card.classList.contains('featured') || 
                          (badge && badge.classList.contains('badge-primary'));
        
        plans.push({
          name: tierName,
          price: price,
          features: features,
          buttonText: buttonText,
          highlighted: isFeatured
        });
      });
      
      // Also get page title and subtitle
      const title = document.querySelector('h1')?.textContent || document.querySelector('h2')?.textContent || '';
      const subtitle = document.querySelector('.tagline')?.textContent || document.querySelector('main > p')?.textContent || '';
      
      return {
        title,
        subtitle,
        plans
      };
    });
    
    console.log('\n📄 Page Content:');
    console.log(`Title: "${pricingData.title}"`);
    console.log(`Subtitle: "${pricingData.subtitle}"`);
    
    console.log('\n💰 Pricing Plans Found:');
    pricingData.plans.forEach((plan, index) => {
      console.log(`\n${plan.highlighted ? '⭐ ' : ''}Plan ${index + 1}: ${plan.name}`);
      console.log(`   Price: ${plan.price}`);
      console.log(`   Features: ${plan.features.length} items`);
      plan.features.forEach(feature => {
        console.log(`     - ${feature}`);
      });
      console.log(`   CTA: "${plan.buttonText}"`);
    });
    
    // Test visual elements
    console.log('\n🎨 Visual Elements Check:');
    
    const visualElements = await page.evaluate(() => {
      const section = document.querySelector('#pricing');
      const cards = section ? section.querySelectorAll('.glass-card') : [];
      
      // Check for gradients
      const gradients = [];
      cards.forEach(card => {
        const styles = window.getComputedStyle(card);
        if (styles.backgroundImage.includes('gradient')) {
          gradients.push('Card gradient background');
        }
      });
      
      // Check for glassmorphism effects
      const hasGlassEffect = Array.from(cards).some(card => {
        const styles = window.getComputedStyle(card);
        return styles.backdropFilter !== 'none' || styles.webkitBackdropFilter !== 'none';
      });
      
      // Check for hover states
      const buttons = section ? section.querySelectorAll('.btn, a[href*="sign"]') : [];
      
      return {
        cardCount: cards.length,
        hasGradients: gradients.length > 0,
        gradientCount: gradients.length,
        hasGlassEffect,
        buttonCount: buttons.length
      };
    });
    
    console.log(`Cards found: ${visualElements.cardCount}`);
    console.log(`Gradient effects: ${visualElements.hasGradients ? 'Yes' : 'No'} (${visualElements.gradientCount} gradients)`);
    console.log(`Glass morphism effect: ${visualElements.hasGlassEffect ? 'Yes' : 'No'}`);
    console.log(`Interactive buttons: ${visualElements.buttonCount}`);
    
    // Take screenshots at different viewports
    console.log('\n📸 Taking screenshots at different viewports...');
    
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1440, height: 900, name: 'desktop' }
    ];
    
    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(500); // Allow layout to adjust
      
      // Take full page screenshot for pricing page
      await page.screenshot({
        path: `visual-snapshots/pricing-demo-${vp.name}.png`,
        fullPage: true
      });
      
      console.log(`✓ Captured ${vp.name} screenshot (${vp.width}x${vp.height})`);
    }
    
    // Compare with Next.js version
    console.log('\n🔄 Opening Next.js pricing page for comparison...');
    
    const nextPage = await context.newPage();
    await nextPage.goto('http://localhost:3000/pricing', {
      waitUntil: 'networkidle'
    });
    
    console.log('✅ Next.js pricing page loaded');
    
    // Keep both pages open for manual comparison
    console.log('\n👀 Both pages are now open for side-by-side comparison:');
    console.log('   - Demo: http://localhost:8080/#pricing');
    console.log('   - Next.js: http://localhost:3000/pricing');
    console.log('\n📍 Close the browser windows when done.\n');
    
    // Wait for user to close browser
    await page.waitForTimeout(300000); // 5 minutes timeout
    
  } catch (error) {
    console.error('❌ Error during visual verification:', error);
    await browser.close();
    process.exit(1);
  }
})();