const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function diagnoseGuidesContainer() {
  console.log('🔍 Starting Guides Page Container Diagnosis...');
  
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
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  const issues = [];
  const measurements = {};
  
  // Navigate to guides page
  console.log('📄 Navigating to guides page...');
  await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Take initial screenshot
  await page.screenshot({ 
    path: path.join(reportDir, '01-initial-view.png'),
    fullPage: true 
  });
  
  // Analyze container structure
  console.log('📐 Analyzing container structure...');
  
  const containerAnalysis = await page.evaluate(() => {
    const results = {
      mainContainer: null,
      guidesWrapper: null,
      gridContainer: null,
      issues: []
    };
    
    // Check main app container
    const appElement = document.getElementById('app');
    if (appElement) {
      const styles = window.getComputedStyle(appElement);
      results.mainContainer = {
        width: appElement.offsetWidth,
        height: appElement.offsetHeight,
        padding: styles.padding,
        margin: styles.margin,
        overflow: styles.overflow,
        position: styles.position
      };
    }
    
    // Check guides specific containers
    const guidesSection = document.querySelector('.guides-section, .guides-container, [data-section="guides"]');
    if (guidesSection) {
      const styles = window.getComputedStyle(guidesSection);
      results.guidesWrapper = {
        width: guidesSection.offsetWidth,
        height: guidesSection.offsetHeight,
        padding: styles.padding,
        margin: styles.margin,
        display: styles.display,
        overflow: styles.overflow
      };
    }
    
    // Check grid container
    const gridContainer = document.querySelector('.guides-grid, .grid-container, .card-grid');
    if (gridContainer) {
      const styles = window.getComputedStyle(gridContainer);
      results.gridContainer = {
        width: gridContainer.offsetWidth,
        height: gridContainer.offsetHeight,
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns,
        gap: styles.gap,
        padding: styles.padding,
        overflow: styles.overflow
      };
      
      // Check if grid is properly constrained
      if (gridContainer.offsetWidth > window.innerWidth) {
        results.issues.push('Grid container wider than viewport');
      }
    }
    
    // Check for overflow issues
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.offsetWidth > window.innerWidth) {
        results.issues.push({
          element: el.tagName + (el.className ? '.' + el.className : ''),
          width: el.offsetWidth,
          viewportWidth: window.innerWidth
        });
      }
    });
    
    // Check for container nesting issues
    const containers = document.querySelectorAll('[class*="container"], [class*="wrapper"]');
    containers.forEach(container => {
      const parent = container.parentElement;
      if (parent && parent.classList.toString().match(/container|wrapper/)) {
        results.issues.push({
          type: 'nested-containers',
          child: container.className,
          parent: parent.className
        });
      }
    });
    
    return results;
  });
  
  console.log('📊 Container Analysis:', JSON.stringify(containerAnalysis, null, 2));
  
  // Check responsive behavior
  console.log('📱 Testing responsive behavior...');
  
  const viewports = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
    { name: '2k', width: 2560, height: 1440 }
  ];
  
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: path.join(reportDir, `02-${viewport.name}-view.png`),
      fullPage: true
    });
    
    const viewportAnalysis = await page.evaluate((vp) => {
      const issues = [];
      const guidesGrid = document.querySelector('.guides-grid, .grid-container, .card-grid');
      
      if (guidesGrid) {
        const rect = guidesGrid.getBoundingClientRect();
        if (rect.width > vp.width) {
          issues.push(`Grid width (${rect.width}px) exceeds viewport (${vp.width}px)`);
        }
        
        // Check for horizontal scroll
        if (document.documentElement.scrollWidth > vp.width) {
          issues.push(`Horizontal scroll detected: ${document.documentElement.scrollWidth}px > ${vp.width}px`);
        }
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
  
  // Generate CSS fix suggestions
  console.log('💡 Generating fix suggestions...');
  
  const fixSuggestions = [];
  
  if (containerAnalysis.issues.length > 0) {
    fixSuggestions.push({
      issue: 'Container overflow',
      fix: `
/* Add to guides container */
.guides-container,
.guides-section {
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Ensure grid doesn't overflow */
.guides-grid,
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  max-width: 100%;
  margin: 0 auto;
}

/* Prevent any element from causing overflow */
* {
  max-width: 100%;
  box-sizing: border-box;
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
  
  // Generate markdown report
  const markdownReport = `# Guides Page Container Diagnosis Report

**Date:** ${new Date().toISOString()}

## Container Analysis

### Main Container
${containerAnalysis.mainContainer ? `
- Width: ${containerAnalysis.mainContainer.width}px
- Height: ${containerAnalysis.mainContainer.height}px
- Padding: ${containerAnalysis.mainContainer.padding}
- Overflow: ${containerAnalysis.mainContainer.overflow}
` : 'No main container found'}

### Guides Wrapper
${containerAnalysis.guidesWrapper ? `
- Width: ${containerAnalysis.guidesWrapper.width}px
- Height: ${containerAnalysis.guidesWrapper.height}px
- Display: ${containerAnalysis.guidesWrapper.display}
- Padding: ${containerAnalysis.guidesWrapper.padding}
- Overflow: ${containerAnalysis.guidesWrapper.overflow}
` : 'No guides wrapper found'}

### Grid Container
${containerAnalysis.gridContainer ? `
- Width: ${containerAnalysis.gridContainer.width}px
- Display: ${containerAnalysis.gridContainer.display}
- Grid Columns: ${containerAnalysis.gridContainer.gridTemplateColumns}
- Gap: ${containerAnalysis.gridContainer.gap}
- Overflow: ${containerAnalysis.gridContainer.overflow}
` : 'No grid container found'}

## Issues Found

${containerAnalysis.issues.length > 0 ? containerAnalysis.issues.map(issue => 
  typeof issue === 'string' ? `- ${issue}` : `- ${JSON.stringify(issue)}`
).join('\n') : 'No container issues detected'}

## Responsive Issues

${issues.length > 0 ? issues.map(issue => 
  `### ${issue.viewport}\n${issue.issues.map(i => `- ${i}`).join('\n')}`
).join('\n\n') : 'No responsive issues detected'}

## Recommended Fixes

${fixSuggestions.map(suggestion => 
  `### ${suggestion.issue}\n\`\`\`css${suggestion.fix}\`\`\``
).join('\n\n')}

## Screenshots

- \`01-initial-view.png\` - Initial page load
- \`02-mobile-view.png\` - Mobile viewport (390x844)
- \`02-tablet-view.png\` - Tablet viewport (768x1024)
- \`02-desktop-view.png\` - Desktop viewport (1920x1080)
- \`02-2k-view.png\` - 2K viewport (2560x1440)
`;
  
  fs.writeFileSync(
    path.join(reportDir, 'CONTAINER-DIAGNOSIS.md'),
    markdownReport
  );
  
  console.log('✅ Diagnosis complete!');
  console.log(`📁 Report saved to: ${reportDir}/`);
  console.log(`📄 View detailed report: ${reportDir}/CONTAINER-DIAGNOSIS.md`);
  
  // Keep browser open for manual inspection
  console.log('\n🔍 Browser left open for manual inspection. Close when done.');
  
  return report;
}

// Run diagnosis
diagnoseGuidesContainer().catch(console.error);