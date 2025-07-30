import { chromium } from 'playwright';

(async () => {
  console.log('🔍 Starting Apps Browse Page Visual Verification...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  try {
    // Open demo apps browse page
    console.log('📍 Opening demo apps browse page...');
    const demoPage = await context.newPage();
    await demoPage.goto('http://localhost:8080/pages/apps/browse.html', {
      waitUntil: 'networkidle'
    });
    
    // Open Next.js apps browse page
    console.log('📍 Opening Next.js apps browse page...');
    const nextPage = await context.newPage();
    await nextPage.goto('http://localhost:3000/apps/browse', {
      waitUntil: 'networkidle'
    });
    
    // Wait for content to load
    await demoPage.waitForSelector('.minimal-card', { state: 'visible' });
    await nextPage.waitForTimeout(2000); // Give Next.js time to load data
    
    console.log('✅ Both pages loaded successfully\n');
    
    // Extract demo page data
    const demoData = await demoPage.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const filters = document.querySelectorAll('button[data-category]');
      const searchInput = document.querySelector('input[type="search"]');
      
      return {
        cardCount: cards.length,
        hasFilters: filters.length > 0,
        filterCount: filters.length,
        hasSearch: !!searchInput,
        pageTitle: document.querySelector('h1')?.textContent || '',
        pageSubtitle: document.querySelector('.text-vybe-gray-300')?.textContent || '',
        // Check for specific UI elements
        hasTypeLabels: document.querySelectorAll('[style*="background: rgba(236, 72, 153"]').length > 0,
        hasStats: document.querySelectorAll('.flex.items-center.justify-between.pt-3').length > 0,
        hasBadges: document.querySelectorAll('[style*="rounded-full"]').length > 0
      };
    });
    
    // Extract Next.js page data
    const nextData = await nextPage.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const filters = document.querySelectorAll('button[data-category], .filter-button');
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
      
      return {
        cardCount: cards.length,
        hasFilters: filters.length > 0,
        filterCount: filters.length,
        hasSearch: !!searchInput,
        pageTitle: document.querySelector('h1')?.textContent || '',
        pageSubtitle: document.querySelector('.text-gray-300, .text-vybe-gray-300')?.textContent || '',
        // Check for specific UI elements
        hasTypeLabels: document.querySelectorAll('[style*="background: rgba(236, 72, 153"]').length > 0,
        hasStats: document.querySelectorAll('.flex.items-center.justify-between.pt-3').length > 0,
        hasBadges: document.querySelectorAll('[style*="rounded-full"]').length > 0
      };
    });
    
    console.log('📊 Page Comparison:');
    console.log('\n🎯 Demo Page:');
    console.log(`   Title: "${demoData.pageTitle}"`);
    console.log(`   Subtitle: "${demoData.pageSubtitle}"`);
    console.log(`   App cards: ${demoData.cardCount}`);
    console.log(`   Filters: ${demoData.hasFilters ? `Yes (${demoData.filterCount})` : 'No'}`);
    console.log(`   Search: ${demoData.hasSearch ? 'Yes' : 'No'}`);
    console.log(`   Type labels: ${demoData.hasTypeLabels ? 'Yes' : 'No'}`);
    console.log(`   Stats row: ${demoData.hasStats ? 'Yes' : 'No'}`);
    console.log(`   Badges: ${demoData.hasBadges ? 'Yes' : 'No'}`);
    
    console.log('\n🚀 Next.js Page:');
    console.log(`   Title: "${nextData.pageTitle}"`);
    console.log(`   Subtitle: "${nextData.pageSubtitle}"`);
    console.log(`   App cards: ${nextData.cardCount}`);
    console.log(`   Filters: ${nextData.hasFilters ? `Yes (${nextData.filterCount})` : 'No'}`);
    console.log(`   Search: ${nextData.hasSearch ? 'Yes' : 'No'}`);
    console.log(`   Type labels: ${nextData.hasTypeLabels ? 'Yes' : 'No'}`);
    console.log(`   Stats row: ${nextData.hasStats ? 'Yes' : 'No'}`);
    console.log(`   Badges: ${nextData.hasBadges ? 'Yes' : 'No'}`);
    
    // Visual style comparison
    console.log('\n🎨 Visual Style Analysis:');
    
    const demoStyles = await demoPage.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      const typeLabel = document.querySelector('[style*="background: rgba(236, 72, 153"]');
      
      return {
        cardBackground: card ? window.getComputedStyle(card).background : '',
        cardBorder: card ? window.getComputedStyle(card).border : '',
        hasGlassmorphism: card ? window.getComputedStyle(card).backdropFilter !== 'none' : false,
        typeLabelColor: typeLabel ? window.getComputedStyle(typeLabel).backgroundColor : ''
      };
    });
    
    const nextStyles = await nextPage.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      const typeLabel = document.querySelector('[style*="background: rgba(236, 72, 153"]');
      
      return {
        cardBackground: card ? window.getComputedStyle(card).background : '',
        cardBorder: card ? window.getComputedStyle(card).border : '',
        hasGlassmorphism: card ? window.getComputedStyle(card).backdropFilter !== 'none' : false,
        typeLabelColor: typeLabel ? window.getComputedStyle(typeLabel).backgroundColor : ''
      };
    });
    
    console.log('\n   Demo styles:');
    console.log(`     Glass effect: ${demoStyles.hasGlassmorphism ? 'Yes' : 'No'}`);
    console.log(`     Type label color: ${demoStyles.typeLabelColor}`);
    
    console.log('\n   Next.js styles:');
    console.log(`     Glass effect: ${nextStyles.hasGlassmorphism ? 'Yes' : 'No'}`);
    console.log(`     Type label color: ${nextStyles.typeLabelColor}`);
    
    // Take screenshots at different viewports
    console.log('\n📸 Taking screenshots at different viewports...');
    
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1440, height: 900, name: 'desktop' }
    ];
    
    for (const vp of viewports) {
      await demoPage.setViewportSize(vp);
      await nextPage.setViewportSize(vp);
      await demoPage.waitForTimeout(500);
      await nextPage.waitForTimeout(500);
      
      await demoPage.screenshot({
        path: `visual-snapshots/apps-browse-demo-${vp.name}.png`,
        fullPage: false
      });
      
      await nextPage.screenshot({
        path: `visual-snapshots/apps-browse-nextjs-${vp.name}.png`,
        fullPage: false
      });
      
      console.log(`✓ Captured ${vp.name} screenshots`);
    }
    
    // Visual differences summary
    console.log('\n📋 Visual Verification Summary:');
    
    const matches = {
      title: demoData.pageTitle === nextData.pageTitle,
      cardCount: Math.abs(demoData.cardCount - nextData.cardCount) <= 2, // Allow small difference due to dynamic data
      filters: demoData.hasFilters === nextData.hasFilters,
      search: demoData.hasSearch === nextData.hasSearch,
      typeLabels: demoData.hasTypeLabels === nextData.hasTypeLabels,
      stats: demoData.hasStats === nextData.hasStats,
      glassmorphism: demoStyles.hasGlassmorphism === nextStyles.hasGlassmorphism
    };
    
    const score = Object.values(matches).filter(m => m).length / Object.keys(matches).length * 100;
    
    console.log(`\n   Visual Fidelity Score: ${score.toFixed(0)}%`);
    
    Object.entries(matches).forEach(([key, value]) => {
      console.log(`   ${key}: ${value ? '✅' : '❌'}`);
    });
    
    console.log('\n👀 Both pages remain open for manual comparison.');
    console.log('📍 Close the browser windows when done.\n');
    
    // Keep browser open for manual inspection
    await demoPage.waitForTimeout(300000); // 5 minutes timeout
    
  } catch (error) {
    console.error('❌ Error during visual verification:', error);
    await browser.close();
    process.exit(1);
  }
})();