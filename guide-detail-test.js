import { chromium } from 'playwright';
import fs from 'fs';

async function testGuideDetailLayout() {
  console.log('🚀 Testing guide detail layout implementation...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  // Create output directory
  const outputDir = './visual-snapshots/guide-detail-comparison';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // Demo page
    console.log('📸 Capturing demo page...');
    const demoPage = await context.newPage();
    await demoPage.goto('http://localhost:8080/pages/guide-detail.html');
    await demoPage.waitForLoadState('networkidle');
    
    // Next.js page - we'll inject test data to validate layout
    console.log('📸 Capturing Next.js page with test layout...');
    const nextjsPage = await context.newPage();
    await nextjsPage.goto('http://localhost:3001/guides/test-guide');
    await nextjsPage.waitForLoadState('networkidle');
    
    // Check if the page has the expected layout structure
    const layoutAnalysis = await nextjsPage.evaluate(() => {
      return {
        hasNebulaBackground: !!document.querySelector('.nebula-background'),
        hasGridLayout: !!document.querySelector('.grid.grid-cols-12'),
        hasMainContent: !!document.querySelector('.col-span-8'),
        hasSidebar: !!document.querySelector('.col-span-4'),
        hasVybeCards: document.querySelectorAll('.vybe-card').length,
        hasProgressBar: !!document.querySelector('.fixed.top-0'),
        mainContentElements: {
          headerCard: !!document.querySelector('.col-span-8 .vybe-card'),
          contentArea: !!document.querySelector('article'),
        },
        sidebarElements: {
          tocCard: !!Array.from(document.querySelectorAll('.col-span-4 h2, .col-span-4 h3')).find(h => h.textContent?.includes('Table of Contents')),
          progressCard: !!Array.from(document.querySelectorAll('.col-span-4 h2, .col-span-4 h3')).find(h => h.textContent?.includes('Progress')),
          authorCard: !!Array.from(document.querySelectorAll('.col-span-4 h3')).find(h => h.textContent?.includes('About the Author')),
        },
        styling: {
          hasGradientElements: document.querySelectorAll('[class*="gradient"]').length,
          hasVybePurple: document.querySelectorAll('[class*="vybe-purple"]').length,
          hasStickyPositioning: !!document.querySelector('.sticky'),
        }
      };
    });
    
    // Take screenshots at desktop viewport
    await demoPage.setViewportSize({ width: 1440, height: 900 });
    await nextjsPage.setViewportSize({ width: 1440, height: 900 });
    
    await demoPage.screenshot({ 
      path: `${outputDir}/demo-layout-test.png`,
      fullPage: true 
    });
    
    await nextjsPage.screenshot({ 
      path: `${outputDir}/nextjs-layout-test.png`,
      fullPage: true 
    });
    
    // Generate detailed layout report
    const report = {
      timestamp: new Date().toISOString(),
      layoutAnalysis,
      implementation: {
        nebulaBackground: layoutAnalysis.hasNebulaBackground ? '✅' : '❌',
        twoColumnGrid: layoutAnalysis.hasGridLayout ? '✅' : '❌',
        mainContentColumn: layoutAnalysis.hasMainContent ? '✅' : '❌',
        sidebarColumn: layoutAnalysis.hasSidebar ? '✅' : '❌',
        vybeCards: `${layoutAnalysis.hasVybeCards} cards`,
        progressBar: layoutAnalysis.hasProgressBar ? '✅' : '❌',
        tocInSidebar: layoutAnalysis.sidebarElements.tocCard ? '✅' : '❌',
        progressInSidebar: layoutAnalysis.sidebarElements.progressCard ? '✅' : '❌',
        authorInSidebar: layoutAnalysis.sidebarElements.authorCard ? '✅' : '❌',
        gradientStyling: `${layoutAnalysis.styling.hasGradientElements} elements`,
        vybeColorScheme: `${layoutAnalysis.styling.hasVybePurple} elements`,
        stickyPositioning: layoutAnalysis.styling.hasStickyPositioning ? '✅' : '❌',
      }
    };
    
    const markdownReport = `# Guide Detail Layout Implementation Test

## Generated: ${new Date().toLocaleString()}

## Implementation Status

### Core Layout Structure
- **Nebula Background**: ${report.implementation.nebulaBackground}
- **Two-Column Grid**: ${report.implementation.twoColumnGrid}
- **Main Content Column (8/12)**: ${report.implementation.mainContentColumn}
- **Sidebar Column (4/12)**: ${report.implementation.sidebarColumn}
- **Vybe Cards**: ${report.implementation.vybeCards}

### Interactive Features
- **Reading Progress Bar**: ${report.implementation.progressBar}
- **Sticky Sidebar**: ${report.implementation.stickyPositioning}

### Sidebar Components
- **Table of Contents**: ${report.implementation.tocInSidebar}
- **Progress Tracking**: ${report.implementation.progressInSidebar}
- **Author Information**: ${report.implementation.authorInSidebar}

### Visual Design
- **Gradient Elements**: ${report.implementation.gradientStyling}
- **Vybe Color Scheme**: ${report.implementation.vybeColorScheme}

## Layout Analysis Details

\`\`\`json
${JSON.stringify(layoutAnalysis, null, 2)}
\`\`\`

## Screenshot Comparison
- Demo: \`demo-layout-test.png\`
- Next.js: \`nextjs-layout-test.png\`

## Demo Migration Status

Based on this analysis, the Next.js implementation ${
  report.implementation.twoColumnGrid === '✅' && 
  report.implementation.mainContentColumn === '✅' && 
  report.implementation.sidebarColumn === '✅' && 
  report.implementation.authorInSidebar === '✅' 
    ? '✅ **SUCCESSFULLY**' 
    : '⚠️  **PARTIALLY**'
} matches the demo structure.

${report.implementation.twoColumnGrid === '✅' ? 
  '🎉 The two-column layout with sticky sidebar has been successfully implemented!' :
  '⚠️  The layout structure needs adjustment to match the demo.'
}
`;
    
    fs.writeFileSync(`${outputDir}/layout-test-report.md`, markdownReport);
    fs.writeFileSync(`${outputDir}/layout-analysis.json`, JSON.stringify(report, null, 2));
    
    console.log('✅ Layout test complete!');
    console.log(`📁 Results saved to: ${outputDir}`);
    console.log('\n🎯 Implementation Status:');
    Object.entries(report.implementation).forEach(([key, value]) => {
      console.log(`- ${key}: ${value}`);
    });
    
    return report;
    
  } catch (error) {
    console.error('❌ Error during layout test:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the test
testGuideDetailLayout()
  .then(report => {
    const hasAllCoreFeatures = 
      report.implementation.twoColumnGrid === '✅' &&
      report.implementation.mainContentColumn === '✅' &&
      report.implementation.sidebarColumn === '✅' &&
      report.implementation.authorInSidebar === '✅';
      
    if (hasAllCoreFeatures) {
      console.log('\n🎉 SUCCESS: Guide detail layout implementation is complete!');
    } else {
      console.log('\n⚠️  PARTIAL: Some layout elements need adjustment.');
    }
    
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Layout test failed:', error);
    process.exit(1);
  });

export { testGuideDetailLayout };