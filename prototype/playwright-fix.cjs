const { chromium } = require('playwright-core');

async function fixGuidesPage() {
  console.log('🔗 Connecting to Chrome DevTools on port 9224...');
  
  try {
    // Connect to existing Chrome instance
    const browser = await chromium.connectOverCDP('http://localhost:9224');
    const contexts = browser.contexts();
    
    if (contexts.length === 0) {
      console.log('❌ No browser contexts found. Opening new page...');
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('http://localhost:8080/#guides');
    } else {
      console.log('✅ Found existing context');
    }
    
    // Get all pages and find the guides page
    const pages = [];
    for (const context of contexts) {
      pages.push(...context.pages());
    }
    
    let guidesPage = pages.find(page => page.url().includes('#guides') || page.url().includes('guides'));
    
    if (!guidesPage) {
      console.log('🔄 No guides page found, navigating to guides...');
      const context = contexts[0] || await browser.newContext();
      guidesPage = await context.newPage();
      await guidesPage.goto('http://localhost:8080/#guides');
    }
    
    console.log(`📄 Working with page: ${guidesPage.url()}`);
    
    // Wait for page to load
    await guidesPage.waitForLoadState('networkidle');
    await guidesPage.waitForTimeout(2000);
    
    console.log('🎨 Applying showcase styling...');
    
    // Inject the showcase styles directly
    await guidesPage.addStyleTag({
      content: `
        /* SHOWCASE DESIGN OVERRIDE - Applied via Playwright */
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
        
        .minimal-card h3 {
          line-height: 1.75rem !important;
          margin-top: 2rem !important;
          margin-bottom: 0.75rem !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
        }
        
        /* Grid layout to match showcase */
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
        
        /* Fix content spacing */
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
    
    // Take screenshot to verify changes
    await guidesPage.screenshot({ 
      path: '/home/happy/Projects/vybecoding/prototype/guides-fixed.png',
      fullPage: true 
    });
    
    console.log('✅ Styling applied successfully!');
    console.log('📸 Screenshot saved: guides-fixed.png');
    console.log('🔍 Page is now updated with showcase styling');
    
    // Count cards to verify they're styled
    const cardCount = await guidesPage.locator('.minimal-card').count();
    console.log(`🃏 Found ${cardCount} cards with updated styling`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

// Run the fix
fixGuidesPage().then(success => {
  if (success) {
    console.log('🎉 Guides page successfully updated to match showcase!');
  } else {
    console.log('💥 Failed to update guides page');
  }
});