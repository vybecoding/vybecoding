const { chromium } = require('playwright');

async function diagnoseBadgeSpacing() {
  console.log('🔍 Diagnosing badge spacing differences between guides and apps pages...\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    // Check guides page
    console.log('📄 Analyzing GUIDES page...');
    await page.goto('http://localhost:8080/#guides', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const guidesData = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      if (!firstCard) return { error: 'No card found' };
      
      const cardStyles = window.getComputedStyle(firstCard);
      const tags = firstCard.querySelector('.flex.flex-wrap.gap-2');
      const bottomStats = firstCard.querySelector('.flex.items-center.justify-between');
      
      let tagSpacing = null;
      if (tags && bottomStats) {
        const tagsRect = tags.getBoundingClientRect();
        const statsRect = bottomStats.getBoundingClientRect();
        tagSpacing = Math.round(statsRect.top - tagsRect.bottom);
      }
      
      const tagsStyle = tags ? window.getComputedStyle(tags) : null;
      
      // Get all spacing measurements
      return {
        cardPadding: cardStyles.padding,
        cardPaddingTop: cardStyles.paddingTop,
        cardPaddingBottom: cardStyles.paddingBottom,
        cardPaddingLeft: cardStyles.paddingLeft,
        cardPaddingRight: cardStyles.paddingRight,
        tagSpacing: tagSpacing,
        tagMarginBottom: tagsStyle ? tagsStyle.marginBottom : null,
        statsElement: bottomStats ? {
          paddingTop: window.getComputedStyle(bottomStats).paddingTop,
          borderTop: window.getComputedStyle(bottomStats).borderTop
        } : null
      };
    });
    
    console.log('Guides Card Measurements:');
    console.log(`  Card Padding: ${guidesData.cardPadding}`);
    console.log(`  - Top: ${guidesData.cardPaddingTop}`);
    console.log(`  - Bottom: ${guidesData.cardPaddingBottom}`);
    console.log(`  - Left: ${guidesData.cardPaddingLeft}`);
    console.log(`  - Right: ${guidesData.cardPaddingRight}`);
    console.log(`  Tag spacing to bottom: ${guidesData.tagSpacing}px`);
    console.log(`  Tag margin-bottom: ${guidesData.tagMarginBottom}`);
    if (guidesData.statsElement) {
      console.log(`  Stats padding-top: ${guidesData.statsElement.paddingTop}`);
      console.log(`  Stats border-top: ${guidesData.statsElement.borderTop}`);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'guides-badge-spacing-diagnosis.png', fullPage: false });
    
    // Check apps page
    console.log('\n📄 Analyzing APPS page...');
    await page.goto('http://localhost:8080/#apps', { 
      waitUntil: 'networkidle' 
    });
    await page.waitForTimeout(2000);
    
    const appsData = await page.evaluate(() => {
      const firstCard = document.querySelector('.minimal-card');
      if (!firstCard) return { error: 'No card found' };
      
      const cardStyles = window.getComputedStyle(firstCard);
      const tags = firstCard.querySelector('.flex.flex-wrap.gap-2');
      const bottomStats = firstCard.querySelector('.flex.items-center.justify-between');
      
      let tagSpacing = null;
      if (tags && bottomStats) {
        const tagsRect = tags.getBoundingClientRect();
        const statsRect = bottomStats.getBoundingClientRect();
        tagSpacing = Math.round(statsRect.top - tagsRect.bottom);
      }
      
      const tagsStyle = tags ? window.getComputedStyle(tags) : null;
      
      // Get all spacing measurements
      return {
        cardPadding: cardStyles.padding,
        cardPaddingTop: cardStyles.paddingTop,
        cardPaddingBottom: cardStyles.paddingBottom,
        cardPaddingLeft: cardStyles.paddingLeft,
        cardPaddingRight: cardStyles.paddingRight,
        tagSpacing: tagSpacing,
        tagMarginBottom: tagsStyle ? tagsStyle.marginBottom : null,
        statsElement: bottomStats ? {
          paddingTop: window.getComputedStyle(bottomStats).paddingTop,
          borderTop: window.getComputedStyle(bottomStats).borderTop
        } : null
      };
    });
    
    console.log('Apps Card Measurements:');
    console.log(`  Card Padding: ${appsData.cardPadding}`);
    console.log(`  - Top: ${appsData.cardPaddingTop}`);
    console.log(`  - Bottom: ${appsData.cardPaddingBottom}`);
    console.log(`  - Left: ${appsData.cardPaddingLeft}`);
    console.log(`  - Right: ${appsData.cardPaddingRight}`);
    console.log(`  Tag spacing to bottom: ${appsData.tagSpacing}px`);
    console.log(`  Tag margin-bottom: ${appsData.tagMarginBottom}`);
    if (appsData.statsElement) {
      console.log(`  Stats padding-top: ${appsData.statsElement.paddingTop}`);
      console.log(`  Stats border-top: ${appsData.statsElement.borderTop}`);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'apps-badge-spacing-diagnosis.png', fullPage: false });
    
    // Compare and diagnose
    console.log('\n🔬 DIAGNOSIS:');
    console.log('=============');
    
    // Compare card padding
    if (guidesData.cardPadding !== appsData.cardPadding) {
      console.log(`❌ Card padding differs:`);
      console.log(`   Guides: ${guidesData.cardPadding}`);
      console.log(`   Apps: ${appsData.cardPadding}`);
    } else {
      console.log(`✅ Card padding matches: ${guidesData.cardPadding}`);
    }
    
    // Compare tag spacing
    if (guidesData.tagSpacing !== appsData.tagSpacing) {
      console.log(`❌ Tag spacing differs:`);
      console.log(`   Guides: ${guidesData.tagSpacing}px`);
      console.log(`   Apps: ${appsData.tagSpacing}px`);
    } else {
      console.log(`✅ Tag spacing matches: ${guidesData.tagSpacing}px`);
    }
    
    // Compare tag margin-bottom
    if (guidesData.tagMarginBottom !== appsData.tagMarginBottom) {
      console.log(`❌ Tag margin-bottom differs:`);
      console.log(`   Guides: ${guidesData.tagMarginBottom}`);
      console.log(`   Apps: ${appsData.tagMarginBottom}`);
    } else {
      console.log(`✅ Tag margin-bottom matches: ${guidesData.tagMarginBottom}`);
    }
    
    // Check all pages
    console.log('\n📊 Checking all prototype pages...');
    const pages = ['guides', 'apps', 'members', 'featured'];
    const results = {};
    
    for (const pageName of pages) {
      await page.goto(`http://localhost:8080/#${pageName}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      const data = await page.evaluate(() => {
        const card = document.querySelector('.minimal-card');
        if (!card) return null;
        
        const styles = window.getComputedStyle(card);
        const tags = card.querySelector('.flex.flex-wrap.gap-2');
        const tagsStyle = tags ? window.getComputedStyle(tags) : null;
        
        return {
          padding: styles.padding,
          tagMarginBottom: tagsStyle ? tagsStyle.marginBottom : null
        };
      });
      
      if (data) {
        results[pageName] = data;
        console.log(`${pageName}: padding=${data.padding}, tag margin-bottom=${data.tagMarginBottom}`);
      }
    }
    
    console.log('\n🛠️ RECOMMENDATIONS:');
    console.log('To make all specialized cards have the same padding:');
    console.log('1. Ensure all cards use: padding: 1rem (16px)');
    console.log('2. Ensure all tag containers use: margin-bottom: 0.75rem (12px)');
    console.log('3. Apply consistent CSS across all page types');
    
    console.log('\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

diagnoseBadgeSpacing().catch(console.error);