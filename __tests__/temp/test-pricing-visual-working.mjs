import { chromium } from 'playwright';

(async () => {
  console.log('🔍 Starting Pricing Page Visual Verification...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    // Navigate to demo pricing page using hash
    console.log('📍 Navigating to demo pricing page...');
    await page.goto('http://localhost:8080/#pricing', {
      waitUntil: 'networkidle'
    });
    
    // Wait for pricing cards to be visible
    await page.waitForSelector('.vybe-card', { state: 'visible' });
    
    console.log('✅ Demo pricing page loaded successfully');
    
    // Extract pricing information
    const pricingData = await page.evaluate(() => {
      const plans = [];
      const pricingCards = document.querySelectorAll('.vybe-card');
      
      pricingCards.forEach(card => {
        // Extract tier name from badge
        const badge = card.querySelector('[style*="rounded-full"]');
        const tierName = badge ? badge.textContent.trim() : '';
        
        // Extract price
        const priceElement = card.querySelector('.text-3xl');
        const price = priceElement ? priceElement.textContent.trim() : '';
        
        // Extract features
        const features = Array.from(card.querySelectorAll('.vybe-feature-item')).map(li => li.textContent.trim());
        
        // Extract button text
        const button = card.querySelector('.btn');
        const buttonText = button ? button.textContent.trim() : '';
        
        plans.push({
          name: tierName,
          price: price,
          features: features,
          buttonText: buttonText
        });
      });
      
      // Also get page title and subtitle
      const title = document.querySelector('.text-gradient-brand')?.textContent || '';
      const subtitle = document.querySelector('.text-vybe-gray-300')?.textContent || '';
      
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
      console.log(`\nPlan ${index + 1}: ${plan.name}`);
      console.log(`   Price: ${plan.price}`);
      console.log(`   Features: ${plan.features.length} items`);
      console.log(`   CTA: "${plan.buttonText}"`);
    });
    
    // Test visual elements
    console.log('\n🎨 Visual Elements Check:');
    
    const visualElements = await page.evaluate(() => {
      const cards = document.querySelectorAll('.vybe-card');
      
      // Check for hover effects
      const hasHoverEffects = Array.from(cards).some(card => {
        return card.getAttribute('onmouseover') !== null;
      });
      
      // Check for buttons
      const buttons = document.querySelectorAll('.btn');
      
      // Check for gradients
      const gradientElements = document.querySelectorAll('.text-gradient-brand, [class*="gradient"]');
      
      return {
        cardCount: cards.length,
        hasHoverEffects,
        buttonCount: buttons.length,
        gradientCount: gradientElements.length
      };
    });
    
    console.log(`Cards found: ${visualElements.cardCount}`);
    console.log(`Hover effects: ${visualElements.hasHoverEffects ? 'Yes' : 'No'}`);
    console.log(`Interactive buttons: ${visualElements.buttonCount}`);
    console.log(`Gradient elements: ${visualElements.gradientCount}`);
    
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
    
    // Extract Next.js pricing data for comparison
    const nextjsData = await nextPage.evaluate(() => {
      const cards = document.querySelectorAll('[class*="glass-card"], [class*="border"]');
      return {
        cardCount: cards.length,
        hasGlassEffect: Array.from(cards).some(c => 
          window.getComputedStyle(c).backdropFilter !== 'none'
        ),
        buttons: document.querySelectorAll('a[href*="sign"]').length
      };
    });
    
    console.log('\n🔍 Next.js Implementation:');
    console.log(`Cards: ${nextjsData.cardCount}`);
    console.log(`Glass morphism: ${nextjsData.hasGlassEffect ? 'Yes' : 'No'}`);
    console.log(`CTA buttons: ${nextjsData.buttons}`);
    
    // Keep both pages open for manual comparison
    console.log('\n👀 Both pages are now open for side-by-side comparison:');
    console.log('   - Demo: http://localhost:8080/#pricing');
    console.log('   - Next.js: http://localhost:3000/pricing');
    console.log('\n✨ Visual differences to check:');
    console.log('   - Card styling (borders, shadows, hover effects)');
    console.log('   - Typography and gradients');
    console.log('   - Button styles and interactions');
    console.log('   - Responsive layout at different breakpoints');
    console.log('\n📍 Close the browser windows when done.\n');
    
    // Wait for user to close browser
    await page.waitForTimeout(300000); // 5 minutes timeout
    
  } catch (error) {
    console.error('❌ Error during visual verification:', error);
    await browser.close();
    process.exit(1);
  }
})();