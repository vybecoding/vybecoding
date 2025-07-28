const { chromium } = require('playwright');

async function verifyPerfectLabels() {
  console.log('🔍 Verifying perfect label positioning and padding...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`http://localhost:8080/design-system-showcase.html?v=${Date.now()}`, { 
      waitUntil: 'networkidle' 
    });
    
    // Force CSS reload
    await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        link.href = link.href.split('?')[0] + '?t=' + Date.now();
      });
    });
    await page.waitForTimeout(2000);
    
    // Scroll to specialized cards section
    await page.evaluate(() => {
      const section = document.querySelector('#specialized-cards-heading');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(500);
    
    // Check label positioning and card measurements
    const measurements = await page.evaluate(() => {
      const cards = document.querySelectorAll('.minimal-card');
      const results = [];
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardStyle = window.getComputedStyle(card);
        const cardBorderRadius = cardStyle.borderRadius;
        
        // Find the label (absolute positioned span)
        const label = card.querySelector('span[style*="position: absolute"][style*="top: 0"]');
        const labelRect = label ? label.getBoundingClientRect() : null;
        const labelStyle = label ? window.getComputedStyle(label) : null;
        
        // Check if label extends past card
        let labelOverflow = null;
        if (labelRect && cardRect) {
          labelOverflow = {
            top: labelRect.top < cardRect.top,
            left: labelRect.left < cardRect.left,
            right: labelRect.right > cardRect.right,
            bottom: labelRect.bottom > cardRect.bottom
          };
        }
        
        // Get title element
        const title = card.querySelector('h3');
        const titleRect = title ? title.getBoundingClientRect() : null;
        const titleStyle = title ? window.getComputedStyle(title) : null;
        
        // Get author section
        const author = card.querySelector('.flex.items-center.gap-2:not(.justify-between)');
        const authorRect = author ? author.getBoundingClientRect() : null;
        
        // Get description
        const description = card.querySelector('p.text-sm.text-vybe-gray-400');
        const descriptionRect = description ? description.getBoundingClientRect() : null;
        
        // Get tags section
        const tags = card.querySelector('.flex.flex-wrap.gap-2');
        const tagsRect = tags ? tags.getBoundingClientRect() : null;
        
        // Get bottom stats section
        const stats = card.querySelector('.flex.items-center.justify-between.pt-3');
        const statsRect = stats ? stats.getBoundingClientRect() : null;
        const statsStyle = stats ? window.getComputedStyle(stats) : null;
        
        // Calculate spacing
        let spacing = {};
        if (titleRect && authorRect) {
          spacing.titleToAuthor = authorRect.top - titleRect.bottom;
        }
        if (authorRect && descriptionRect) {
          spacing.authorToDescription = descriptionRect.top - authorRect.bottom;
        }
        if (descriptionRect && tagsRect) {
          spacing.descriptionToTags = tagsRect.top - descriptionRect.bottom;
        }
        if (tagsRect && statsRect) {
          spacing.tagsToStats = statsRect.top - tagsRect.bottom;
        }
        if (statsRect && cardRect) {
          spacing.statsToBottom = cardRect.bottom - statsRect.bottom;
        }
        
        const cardTitle = title ? title.textContent.trim() : `Card ${index}`;
        
        results.push({
          index,
          title: cardTitle,
          cardBorderRadius,
          labelOverflow,
          spacing,
          labelBorderRadius: labelStyle ? labelStyle.borderRadius : null,
          cardPadding: {
            top: parseFloat(cardStyle.paddingTop),
            right: parseFloat(cardStyle.paddingRight),
            bottom: parseFloat(cardStyle.paddingBottom),
            left: parseFloat(cardStyle.paddingLeft)
          },
          statsPadding: statsStyle ? {
            top: parseFloat(statsStyle.paddingTop),
            bottom: parseFloat(statsStyle.paddingBottom)
          } : null
        });
      });
      
      return results;
    });
    
    console.log('\\n📏 Label and Padding Analysis:');
    
    measurements.forEach(card => {
      console.log(`\\n${card.title}:`);
      console.log(`  Card border radius: ${card.cardBorderRadius}`);
      console.log(`  Label border radius: ${card.labelBorderRadius}`);
      
      if (card.labelOverflow) {
        const overflows = Object.entries(card.labelOverflow)
          .filter(([_, overflows]) => overflows)
          .map(([direction]) => direction);
        
        if (overflows.length > 0) {
          console.log(`  ⚠️ Label overflows: ${overflows.join(', ')}`);
        } else {
          console.log(`  ✅ Label within bounds`);
        }
      }
      
      console.log(`  Card padding: ${card.cardPadding.top}/${card.cardPadding.right}/${card.cardPadding.bottom}/${card.cardPadding.left}`);
      
      if (card.statsPadding) {
        console.log(`  Stats padding: top=${card.statsPadding.top}px, bottom=${card.statsPadding.bottom}px`);
      }
      
      console.log(`  Spacing (px):`);
      Object.entries(card.spacing).forEach(([key, value]) => {
        console.log(`    ${key}: ${Math.round(value)}`);
      });
    });
    
    // Check consistency
    const paddingConsistent = measurements.every(card => 
      card.cardPadding.top === measurements[0].cardPadding.top &&
      card.cardPadding.left === measurements[0].cardPadding.left &&
      card.cardPadding.right === measurements[0].cardPadding.right
    );
    
    console.log(`\\n📊 Padding consistency: ${paddingConsistent ? '✅' : '⚠️'}`);
    
    // Take screenshots
    await page.screenshot({ path: 'perfect-labels-verification.png', fullPage: true });
    
    const specializedSection = page.locator('#specialized-cards-heading').locator('..').locator('..');
    await specializedSection.screenshot({ path: 'perfect-specialized-cards.png' });
    
    console.log('\\n📸 Screenshots saved:');
    console.log('  - perfect-labels-verification.png');
    console.log('  - perfect-specialized-cards.png');
    
    console.log('\\nBrowser window left open for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyPerfectLabels().catch(console.error);