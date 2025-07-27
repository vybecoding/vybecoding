import { chromium } from 'playwright';

async function debugGuidesPage() {
  console.log('Connecting to Chrome on port 9224...');
  
  try {
    // Connect to the existing Chrome instance
    const browser = await chromium.connectOverCDP('http://localhost:9224');
    const context = browser.contexts()[0];
    const page = await context.newPage();
    
    console.log('Navigating to guides page...');
    await page.goto('http://localhost:8080/pages/guides.html');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of current state
    await page.screenshot({ 
      path: '/home/happy/Projects/vybecoding/prototype/debug-guides-before.png',
      fullPage: true 
    });
    
    console.log('Analyzing current card structure...');
    
    // Get all guide cards
    const cards = await page.locator('.minimal-card').all();
    console.log(`Found ${cards.length} cards to update`);
    
    // Inject the proper styles for specialized cards
    await page.addStyleTag({
      content: `
        .minimal-card {
          background: rgba(17, 24, 39, 0.8) !important;
          border: 1px solid rgba(75, 85, 99, 0.3) !important;
          backdrop-filter: blur(8px) !important;
          padding: 1.5rem !important;
          min-height: 280px !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .minimal-card .type-label {
          background: rgba(138, 43, 226, 0.9) !important;
          padding: 0.375rem 0.75rem !important;
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          border-radius: 0 0 0.5rem 0 !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
        }
        
        .minimal-card h3 {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          line-height: 1.4 !important;
          margin-bottom: 0.75rem !important;
          margin-top: 2.5rem !important;
        }
        
        .minimal-card .card-content {
          flex-grow: 1 !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .minimal-card .card-stats {
          margin-top: auto !important;
          padding-top: 1rem !important;
          border-top: 1px solid rgba(75, 85, 99, 0.3) !important;
        }
      `
    });
    
    // Update each card structure using JavaScript
    await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      
      cards.forEach((card, index) => {
        // Ensure proper structure
        if (!card.querySelector('.type-label')) {
          const label = document.createElement('span');
          label.className = 'type-label';
          label.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(138, 43, 226, 0.9);
            color: white;
            padding: 0.375rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            border-radius: 0 0 0.5rem 0;
            z-index: 10;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          `;
          label.textContent = 'GUIDE';
          card.style.position = 'relative';
          card.insertBefore(label, card.firstChild);
        }
        
        // Wrap content if needed
        const content = card.querySelector('.card-content') || (() => {
          const wrapper = document.createElement('div');
          wrapper.className = 'card-content';
          while (card.children.length > 1) {
            wrapper.appendChild(card.children[1]);
          }
          card.appendChild(wrapper);
          return wrapper;
        })();
        
        // Ensure proper spacing and layout
        card.style.cssText += `
          background: rgba(17, 24, 39, 0.8);
          border: 1px solid rgba(75, 85, 99, 0.3);
          backdrop-filter: blur(8px);
          padding: 1.5rem;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        `;
      });
    });
    
    // Wait for changes to take effect
    await page.waitForTimeout(1000);
    
    // Take screenshot of updated state
    await page.screenshot({ 
      path: '/home/happy/Projects/vybecoding/prototype/debug-guides-after.png',
      fullPage: true 
    });
    
    console.log('✅ Successfully updated guides page styling');
    console.log('📸 Screenshots saved:');
    console.log('   - Before: debug-guides-before.png');
    console.log('   - After: debug-guides-after.png');
    
    // Keep page open for inspection
    console.log('🔍 Page is now ready for inspection at Chrome dev tools');
    console.log('   Connect to: http://localhost:9224');
    
  } catch (error) {
    console.error('❌ Error during debugging:', error);
  }
}

// Run the debug script
debugGuidesPage();