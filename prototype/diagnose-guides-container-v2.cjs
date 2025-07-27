const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function diagnoseGuidesContainer() {
  console.log('🔍 Starting Guides Page Container Diagnosis (1080p)...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportDir = `container-diagnosis-${timestamp}`;
  
  // Create diagnosis directory
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  
  const browser = await chromium.launch({
    headless: false,
    devtools: true,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    const issues = [];
    const measurements = {};
    
    // Navigate to guides page
    console.log('📄 Navigating to guides page...');
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    
    // Wait for content to load and any animations
    await page.waitForTimeout(3000);
    
    // Take initial screenshot
    await page.screenshot({ 
      path: path.join(reportDir, '01-initial-view.png'),
      fullPage: true 
    });
    
    // Enhanced container analysis with more selectors
    console.log('📐 Analyzing container structure...');
    
    const containerAnalysis = await page.evaluate(() => {
      const results = {
        mainContainer: null,
        guidesWrapper: null,
        gridContainer: null,
        pageStructure: [],
        issues: []
      };
      
      // Get all elements and their hierarchy
      const mainContent = document.querySelector('main, [role="main"], #main-content, .main-content');
      if (mainContent) {
        results.pageStructure.push({
          type: 'main-content',
          selector: mainContent.tagName.toLowerCase() + (mainContent.id ? '#' + mainContent.id : '') + (mainContent.className ? '.' + mainContent.className.split(' ').join('.') : ''),
          width: mainContent.offsetWidth,
          height: mainContent.offsetHeight
        });
      }
      
      // Check for app element
      const appElement = document.getElementById('app') || document.querySelector('.app, [data-app]');
      if (appElement) {
        const styles = window.getComputedStyle(appElement);
        results.mainContainer = {
          selector: '#app',
          width: appElement.offsetWidth,
          height: appElement.offsetHeight,
          padding: styles.padding,
          margin: styles.margin,
          overflow: styles.overflow,
          position: styles.position,
          display: styles.display
        };
      }
      
      // Look for guides containers with multiple possible selectors
      const guidesSelectors = [
        '.guides-section',
        '.guides-container', 
        '[data-section="guides"]',
        '.guides-wrapper',
        '.guides',
        'section.guides',
        '[id*="guides"]',
        '[class*="guides"]'
      ];
      
      for (const selector of guidesSelectors) {
        const element = document.querySelector(selector);
        if (element && element.offsetWidth > 0) {
          const styles = window.getComputedStyle(element);
          results.guidesWrapper = {
            selector: selector,
            width: element.offsetWidth,
            height: element.offsetHeight,
            padding: styles.padding,
            margin: styles.margin,
            display: styles.display,
            overflow: styles.overflow,
            position: styles.position,
            maxWidth: styles.maxWidth
          };
          break;
        }
      }
      
      // Look for grid containers
      const gridSelectors = [
        '.guides-grid',
        '.grid-container',
        '.card-grid',
        '.cards-grid',
        '.guides-cards',
        '[class*="grid"][class*="guide"]',
        '.row',
        '.flex-container',
        '[style*="display: grid"]',
        '[style*="display: flex"]'
      ];
      
      for (const selector of gridSelectors) {
        const element = document.querySelector(selector);
        if (element && element.offsetWidth > 0 && element.children.length > 0) {
          const styles = window.getComputedStyle(element);
          results.gridContainer = {
            selector: selector,
            width: element.offsetWidth,
            height: element.offsetHeight,
            display: styles.display,
            gridTemplateColumns: styles.gridTemplateColumns,
            flexWrap: styles.flexWrap,
            gap: styles.gap,
            padding: styles.padding,
            overflow: styles.overflow,
            childCount: element.children.length
          };
          break;
        }
      }
      
      // Find all cards/items
      const cardSelectors = [
        '.guide-card',
        '.card',
        '.guide-item',
        '[class*="guide"][class*="card"]',
        '.col',
        '.flex-item'
      ];
      
      let cards = [];
      for (const selector of cardSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          cards = Array.from(elements);
          results.cards = {
            selector: selector,
            count: elements.length,
            firstCardWidth: elements[0].offsetWidth,
            firstCardHeight: elements[0].offsetHeight
          };
          break;
        }
      }
      
      // Check viewport and document dimensions
      results.viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
        hasVerticalScroll: document.documentElement.scrollHeight > window.innerHeight
      };
      
      // Check for overflow issues
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth || rect.right > window.innerWidth) {
          results.issues.push({
            type: 'overflow',
            element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
            width: rect.width,
            right: rect.right,
            viewportWidth: window.innerWidth
          });
        }
      });
      
      // Get computed styles for debugging
      if (document.body) {
        const bodyStyles = window.getComputedStyle(document.body);
        results.bodyStyles = {
          margin: bodyStyles.margin,
          padding: bodyStyles.padding,
          overflow: bodyStyles.overflow
        };
      }
      
      return results;
    });
    
    console.log('📊 Container Analysis:', JSON.stringify(containerAnalysis, null, 2));
    
    // Check responsive behavior
    console.log('📱 Testing responsive behavior...');
    
    const viewports = [
      { name: 'desktop-1080p', width: 1920, height: 1080 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 390, height: 844 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(1500);
      
      await page.screenshot({
        path: path.join(reportDir, `02-${viewport.name}-view.png`),
        fullPage: true
      });
      
      const viewportAnalysis = await page.evaluate((vp) => {
        const issues = [];
        
        // Check document width vs viewport
        if (document.documentElement.scrollWidth > vp.width) {
          issues.push({
            type: 'horizontal-overflow',
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: vp.width,
            overflow: document.documentElement.scrollWidth - vp.width
          });
        }
        
        // Find elements causing overflow
        const overflowingElements = [];
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > vp.width || rect.right > vp.width) {
            overflowingElements.push({
              element: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ')[0] : ''),
              width: rect.width,
              right: rect.right
            });
          }
        });
        
        if (overflowingElements.length > 0) {
          issues.push({
            type: 'overflowing-elements',
            count: overflowingElements.length,
            elements: overflowingElements.slice(0, 5) // First 5 elements
          });
        }
        
        return issues;
      }, viewport);
      
      if (viewportAnalysis.length > 0) {
        issues.push({
          viewport: viewport.name,
          issues: viewportAnalysis
        });
      }
    }
    
    // Generate fix suggestions based on findings
    console.log('💡 Generating fix suggestions...');
    
    const fixSuggestions = [];
    
    // If no containers found, suggest structure
    if (!containerAnalysis.guidesWrapper || !containerAnalysis.gridContainer) {
      fixSuggestions.push({
        issue: 'Missing container structure',
        fix: `
/* Ensure proper container structure */
.guides-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

@media (max-width: 768px) {
  .guides-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .guides-container {
    padding: 1rem;
  }
}
        `
      });
    }
    
    // If overflow issues found
    if (containerAnalysis.viewport?.hasHorizontalScroll || issues.some(i => i.issues?.some(issue => issue.type === 'horizontal-overflow'))) {
      fixSuggestions.push({
        issue: 'Horizontal overflow detected',
        fix: `
/* Prevent horizontal overflow */
html, body {
  overflow-x: hidden;
  max-width: 100%;
}

* {
  box-sizing: border-box;
}

.guides-container,
.guides-section,
main {
  max-width: 100%;
  overflow-x: hidden;
}

/* Ensure images and cards don't overflow */
img, .card, .guide-card {
  max-width: 100%;
  height: auto;
}
        `
      });
    }
    
    // Save diagnosis report
    const report = {
      timestamp: new Date().toISOString(),
      containerAnalysis,
      responsiveIssues: issues,
      fixSuggestions,
      screenshotDirectory: reportDir
    };
    
    fs.writeFileSync(
      path.join(reportDir, 'diagnosis-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    // Generate enhanced markdown report
    const markdownReport = `# Guides Page Container Diagnosis Report

**Date:** ${new Date().toISOString()}
**Viewport:** 1920x1080 (1080p)

## Page Structure

${containerAnalysis.pageStructure.map(item => 
  `- **${item.type}**: ${item.selector} (${item.width}x${item.height}px)`
).join('\n')}

## Container Analysis

### Main Container (App)
${containerAnalysis.mainContainer ? `
- Selector: ${containerAnalysis.mainContainer.selector}
- Width: ${containerAnalysis.mainContainer.width}px
- Height: ${containerAnalysis.mainContainer.height}px
- Display: ${containerAnalysis.mainContainer.display}
- Padding: ${containerAnalysis.mainContainer.padding}
- Overflow: ${containerAnalysis.mainContainer.overflow}
` : '❌ No main app container found'}

### Guides Wrapper
${containerAnalysis.guidesWrapper ? `
- Selector: ${containerAnalysis.guidesWrapper.selector}
- Width: ${containerAnalysis.guidesWrapper.width}px
- Height: ${containerAnalysis.guidesWrapper.height}px
- Display: ${containerAnalysis.guidesWrapper.display}
- Padding: ${containerAnalysis.guidesWrapper.padding}
- Max Width: ${containerAnalysis.guidesWrapper.maxWidth}
- Overflow: ${containerAnalysis.guidesWrapper.overflow}
` : '❌ No guides wrapper found'}

### Grid Container
${containerAnalysis.gridContainer ? `
- Selector: ${containerAnalysis.gridContainer.selector}
- Width: ${containerAnalysis.gridContainer.width}px
- Display: ${containerAnalysis.gridContainer.display}
- Grid Columns: ${containerAnalysis.gridContainer.gridTemplateColumns || 'N/A'}
- Flex Wrap: ${containerAnalysis.gridContainer.flexWrap || 'N/A'}
- Gap: ${containerAnalysis.gridContainer.gap}
- Child Count: ${containerAnalysis.gridContainer.childCount}
- Overflow: ${containerAnalysis.gridContainer.overflow}
` : '❌ No grid container found'}

### Cards/Items
${containerAnalysis.cards ? `
- Selector: ${containerAnalysis.cards.selector}
- Count: ${containerAnalysis.cards.count}
- Card Size: ${containerAnalysis.cards.firstCardWidth}x${containerAnalysis.cards.firstCardHeight}px
` : '❌ No cards found'}

## Viewport Analysis

- Window: ${containerAnalysis.viewport?.width}x${containerAnalysis.viewport?.height}px
- Document: ${containerAnalysis.viewport?.documentWidth}x${containerAnalysis.viewport?.documentHeight}px
- **Horizontal Scroll:** ${containerAnalysis.viewport?.hasHorizontalScroll ? '⚠️ YES' : '✅ NO'}
- **Vertical Scroll:** ${containerAnalysis.viewport?.hasVerticalScroll ? 'YES' : 'NO'}

## Issues Found

${containerAnalysis.issues.length > 0 ? containerAnalysis.issues.map(issue => 
  `- **${issue.type}**: ${issue.element} (width: ${issue.width}px, extends to: ${issue.right}px)`
).join('\n') : '✅ No overflow issues detected'}

## Responsive Test Results

${issues.length > 0 ? issues.map(issue => 
  `### ${issue.viewport}
${issue.issues.map(i => {
  if (i.type === 'horizontal-overflow') {
    return `- ⚠️ Horizontal overflow: ${i.overflow}px extra width`;
  } else if (i.type === 'overflowing-elements') {
    return `- ⚠️ ${i.count} elements overflow:\n${i.elements.map(e => `  - ${e.element}: ${e.width}px wide`).join('\n')}`;
  }
  return `- ${JSON.stringify(i)}`;
}).join('\n')}`
).join('\n\n') : '✅ No responsive issues detected'}

## Recommended Fixes

${fixSuggestions.map((suggestion, idx) => 
  `### Fix ${idx + 1}: ${suggestion.issue}
\`\`\`css${suggestion.fix}\`\`\``
).join('\n\n')}

## Body Styles
${containerAnalysis.bodyStyles ? `
- Margin: ${containerAnalysis.bodyStyles.margin}
- Padding: ${containerAnalysis.bodyStyles.padding}
- Overflow: ${containerAnalysis.bodyStyles.overflow}
` : 'N/A'}

## Screenshots Generated

- \`01-initial-view.png\` - Initial page load at 1920x1080
- \`02-desktop-1080p-view.png\` - Desktop viewport (1920x1080)
- \`02-tablet-view.png\` - Tablet viewport (768x1024)
- \`02-mobile-view.png\` - Mobile viewport (390x844)

## Next Steps

1. Check the screenshots to visually confirm the issues
2. Apply the recommended CSS fixes
3. Test the container constraints at different viewport sizes
4. Ensure proper responsive grid behavior
`;
    
    fs.writeFileSync(
      path.join(reportDir, 'CONTAINER-DIAGNOSIS.md'),
      markdownReport
    );
    
    console.log('✅ Diagnosis complete!');
    console.log(`📁 Report saved to: ${reportDir}/`);
    console.log(`📄 View detailed report: ${reportDir}/CONTAINER-DIAGNOSIS.md`);
    
  } finally {
    // Always close the browser
    console.log('🔒 Closing browser...');
    await browser.close();
  }
}

// Run diagnosis
diagnoseGuidesContainer().catch(console.error);