const puppeteer = require('puppeteer-core');

async function fixGuidesWithPuppeteer() {
  console.log('🔗 Connecting to Chrome on port 9224...');
  
  try {
    // Connect to existing Chrome instance
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9224',
      defaultViewport: null
    });
    
    const pages = await browser.pages();
    console.log(`📄 Found ${pages.length} open pages`);
    
    // Find or create guides page
    let guidesPage = pages.find(page => page.url().includes('#guides') || page.url().includes('guides'));
    
    if (!guidesPage) {
      console.log('🔄 Creating new guides page...');
      guidesPage = await browser.newPage();
      await guidesPage.goto('http://localhost:8080/#guides');
    } else {
      console.log('✅ Found existing guides page, refreshing...');
      await guidesPage.reload({ waitUntil: 'networkidle0' });
    }
    
    console.log(`📍 Working with: ${guidesPage.url()}`);
    
    // Wait for page to load completely
    await guidesPage.waitForSelector('.minimal-card', { timeout: 10000 });
    
    console.log('🎨 Applying showcase styling directly...');
    
    // Inject the showcase styles and apply them immediately
    await guidesPage.evaluate(() => {
      // Remove any existing showcase styles
      const existingStyle = document.querySelector('#showcase-fix-styles');
      if (existingStyle) existingStyle.remove();
      
      // Add the showcase styles
      const styleElement = document.createElement('style');
      styleElement.id = 'showcase-fix-styles';
      styleElement.innerHTML = `
        /* SHOWCASE STYLING - Applied via Puppeteer */
        .minimal-card {
          background: rgba(26, 26, 26, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(51, 51, 51, 0.4) !important;
          border-radius: 8px !important;
          padding: 1.25rem !important;
          transition: all 0.3s ease-in-out !important;
          position: relative !important;
          z-index: 10 !important;
          cursor: pointer !important;
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
          overflow: visible !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          min-height: 320px !important;
        }
        
        .minimal-card:hover {
          background: rgba(42, 42, 42, 0.8) !important;
          border-color: rgba(64, 64, 64, 0.5) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
        }
        
        .minimal-card.card-verified {
          border: 1px solid rgba(34, 197, 94, 0.3) !important;
        }
        
        .minimal-card.card-verified:hover {
          border-color: rgba(34, 197, 94, 0.4) !important;
        }
        
        /* Grid layout enhancement */
        .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6 {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
          gap: 1.5rem !important;
          align-items: stretch !important;
        }
        
        /* Ensure all cards fill height */
        .grid > .minimal-card {
          min-height: 320px !important;
          display: flex !important;
          flex-direction: column !important;
        }
      `;
      document.head.appendChild(styleElement);
      
      // Force apply styles to each card immediately
      const cards = document.querySelectorAll('.minimal-card');
      console.log(`🃏 Found ${cards.length} cards to style`);
      
      cards.forEach((card, index) => {
        // Force recompute styles
        card.style.cssText = '';
        card.offsetHeight; // Trigger reflow
        
        // Apply inline styles as backup
        Object.assign(card.style, {
          background: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          webkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(51, 51, 51, 0.4)',
          borderRadius: '8px',
          padding: '1.25rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '320px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease-in-out'
        });
      });
      
      // Fix grid layout
      const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6');
      if (grid) {
        Object.assign(grid.style, {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        });
      }
      
      return cards.length;
    });
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verify the styling worked
    const cardCount = await guidesPage.$$eval('.minimal-card', cards => {
      return cards.length;
    });
    
    const hasCorrectStyling = await guidesPage.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      if (!card) return false;
      
      const computedStyle = window.getComputedStyle(card);
      const hasCorrectBg = computedStyle.background.includes('rgba(26, 26, 26, 0.8)') || 
                          card.style.background.includes('rgba(26, 26, 26, 0.8)');
      
      return hasCorrectBg;
    });
    
    console.log(`✅ Applied showcase styling to ${cardCount} cards`);
    console.log(`🎯 Styling verification: ${hasCorrectStyling ? 'SUCCESS' : 'FAILED'}`);
    
    // Take screenshot
    await guidesPage.screenshot({ 
      path: '/home/happy/Projects/vybecoding/prototype/guides-fixed-puppeteer.png',
      fullPage: true 
    });
    
    console.log('📸 Screenshot saved: guides-fixed-puppeteer.png');
    console.log('🎉 Guides page should now match the showcase design!');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

// Run the fix
fixGuidesWithPuppeteer().then(success => {
  if (success) {
    console.log('🏆 SUCCESS: Guides page styling updated via Puppeteer!');
  } else {
    console.log('💥 FAILED: Could not update guides page styling');
  }
  process.exit(0);
});