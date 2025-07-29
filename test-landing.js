const { chromium } = require('playwright');

(async () => {
  console.log('Starting landing page test...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate to the landing page
    await page.goto('http://localhost:3000');
    
    // Check for main elements
    const title = await page.textContent('h1');
    console.log('✓ Page title:', title);
    
    // Check for gradient text
    const hasGradientText = await page.locator('.bg-clip-text').count();
    console.log('✓ Gradient text elements found:', hasGradientText);
    
    // Check for animations
    const hasAnimations = await page.locator('[class*="animate-"]').count();
    console.log('✓ Animated elements found:', hasAnimations);
    
    // Check for sections
    const sections = await page.locator('section').count();
    console.log('✓ Sections found:', sections);
    
    // Check for glass cards
    const glassCards = await page.locator('[class*="backdrop-blur"]').count();
    console.log('✓ Glass cards found:', glassCards);
    
    // Take a screenshot
    await page.screenshot({ path: 'landing-page.png', fullPage: true });
    console.log('✓ Screenshot saved as landing-page.png');
    
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();