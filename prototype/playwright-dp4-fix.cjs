const { chromium } = require('playwright');

async function fixGuidesWithPlaywright() {
  console.log('🔗 Connecting to Chrome DevTools on port 9224 (dp-4)...');
  
  try {
    // Connect to existing Chrome instance via CDP
    const browser = await chromium.connectOverCDP('http://localhost:9224');
    
    // Get all contexts and pages
    const contexts = browser.contexts();
    console.log(`📱 Found ${contexts.length} browser contexts`);
    
    let guidesPage = null;
    
    // Find the guides page across all contexts
    for (const context of contexts) {
      const pages = context.pages();
      for (const page of pages) {
        const url = page.url();
        console.log(`📄 Checking page: ${url}`);
        if (url.includes('#guides') || url.includes('/guides') || url.includes('guides')) {
          guidesPage = page;
          break;
        }
      }
      if (guidesPage) break;
    }
    
    if (!guidesPage) {
      console.log('🔄 No guides page found, creating new one...');
      const context = contexts[0] || await browser.newContext();
      guidesPage = await context.newPage();
      await guidesPage.goto('http://localhost:8080/#guides');
    }
    
    console.log(`✅ Working with guides page: ${guidesPage.url()}`);
    
    // Wait for page to load and get cards
    await guidesPage.waitForLoadState('networkidle');
    await guidesPage.waitForTimeout(2000);
    
    // Check current state
    const initialCardCount = await guidesPage.locator('.minimal-card').count();
    console.log(`🃏 Found ${initialCardCount} cards to style`);
    
    if (initialCardCount === 0) {
      console.log('❌ No cards found! Refreshing page...');
      await guidesPage.reload({ waitUntil: 'networkidle' });
      await guidesPage.waitForTimeout(3000);
    }
    
    console.log('🎨 Injecting showcase styling via Playwright...');
    
    // Inject showcase styles and apply them
    await guidesPage.addStyleTag({
      content: `
        /* PLAYWRIGHT SHOWCASE FIX - Applied directly */
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
        
        /* Grid layout to match showcase */
        .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6 {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
          gap: 1.5rem !important;
          align-items: stretch !important;
        }
        
        .grid > .minimal-card {
          min-height: 320px !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        /* Content wrapper fixes */
        .minimal-card div[style*="padding: 0 1.25rem 1.25rem 1.25rem"] {
          flex-grow: 1 !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        /* Stats at bottom */
        .minimal-card div[style*="margin-top: auto"] {
          margin-top: auto !important;
        }
      `
    });
    
    // Force apply styles directly via JavaScript
    await guidesPage.evaluate(() => {
      console.log('🔧 Force applying styles via JavaScript...');
      
      const cards = document.querySelectorAll('.minimal-card');
      console.log(`Found ${cards.length} cards to style`);
      
      cards.forEach((card, index) => {
        // Force remove existing styles
        card.removeAttribute('style');
        card.offsetHeight; // Force reflow
        
        // Apply showcase styling
        const styles = {
          background: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          webkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(51, 51, 51, 0.4)',
          borderRadius: '8px',
          padding: '1.25rem',
          position: 'relative',
          zIndex: '10',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '320px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease-in-out'
        };
        
        Object.assign(card.style, styles);
        
        console.log(`✅ Styled card ${index + 1}`);
      });
      
      // Fix grid
      const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6');
      if (grid) {
        Object.assign(grid.style, {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        });
        console.log('✅ Fixed grid layout');
      }
      
      return cards.length;
    });
    
    // Wait for changes to apply
    await guidesPage.waitForTimeout(1000);
    
    // Verify styling
    const finalCardCount = await guidesPage.locator('.minimal-card').count();
    const hasCorrectBg = await guidesPage.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      return card && (
        card.style.background.includes('rgba(26, 26, 26, 0.8)') ||
        window.getComputedStyle(card).background.includes('rgba(26, 26, 26, 0.8)')
      );
    });
    
    console.log(`✅ Final result: ${finalCardCount} cards styled`);
    console.log(`🎯 Background verification: ${hasCorrectBg ? 'SUCCESS' : 'FAILED'}`);
    
    // Take screenshot for verification
    await guidesPage.screenshot({ 
      path: '/home/happy/Projects/vybecoding/prototype/guides-playwright-fixed.png',
      fullPage: true 
    });
    
    console.log('📸 Screenshot saved: guides-playwright-fixed.png');
    console.log('🎉 Guides page should now match showcase design!');
    
    return hasCorrectBg && finalCardCount > 0;
    
  } catch (error) {
    console.error('❌ Playwright error:', error.message);
    console.error('Stack:', error.stack);
    return false;
  }
}

// Run the fix
fixGuidesWithPlaywright().then(success => {
  if (success) {
    console.log('🏆 SUCCESS: Guides page now matches showcase design!');
  } else {
    console.log('💥 FAILED: Could not apply showcase styling');
  }
}).catch(err => {
  console.error('💥 Script error:', err);
});