import { chromium } from 'playwright';
import fs from 'fs';

async function compareGuideDetailPages() {
  console.log('🚀 Starting guide detail page visual comparison...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  // Create output directory
  const outputDir = './visual-snapshots/guide-detail-comparison';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // Demo page
    console.log('📸 Capturing demo page screenshots...');
    const demoPage = await context.newPage();
    await demoPage.goto('http://localhost:8080/pages/guide-detail.html');
    await demoPage.waitForLoadState('networkidle');
    
    // Next.js page (we'll need to create a test guide)
    console.log('📸 Capturing Next.js page screenshots...');
    const nextjsPage = await context.newPage();
    await nextjsPage.goto('http://localhost:3001/guides/test-guide');
    await nextjsPage.waitForLoadState('networkidle');
    
    // Take screenshots at different viewports
    const viewports = [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];
    
    for (const viewport of viewports) {
      console.log(`📱 Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
      
      // Set viewport for both pages
      await demoPage.setViewportSize({ width: viewport.width, height: viewport.height });
      await nextjsPage.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Wait a bit for responsive adjustments
      await demoPage.waitForTimeout(500);
      await nextjsPage.waitForTimeout(500);
      
      // Take full page screenshots
      await demoPage.screenshot({ 
        path: `${outputDir}/demo-${viewport.name}.png`,
        fullPage: true 
      });
      
      await nextjsPage.screenshot({ 
        path: `${outputDir}/nextjs-${viewport.name}.png`,
        fullPage: true 
      });
    }
    
    // Analyze content structure
    console.log('🔍 Analyzing page structure...');
    
    const demoContent = await demoPage.evaluate(() => {
      return {
        title: document.title,
        mainHeading: document.querySelector('h1')?.textContent?.trim() || '',
        hasProgressBar: !!document.querySelector('.fixed.top-0'),
        hasSidebar: !!document.querySelector('.col-span-4'),
        hasAuthorSection: !!Array.from(document.querySelectorAll('h3')).find(h => h.textContent?.includes('About the Author')),
        hasToc: !!Array.from(document.querySelectorAll('h2, h3')).find(h => h.textContent?.includes('Table of Contents')),
        sidebarElements: Array.from(document.querySelectorAll('.col-span-4 .vybe-card h2, .col-span-4 .vybe-card h3')).map(el => el.textContent?.trim()),
        layout: document.querySelector('.grid.grid-cols-12') ? 'two-column' : 'single-column'
      };
    });
    
    const nextjsContent = await nextjsPage.evaluate(() => {
      return {
        title: document.title,
        mainHeading: document.querySelector('h1')?.textContent?.trim() || '',
        hasProgressBar: !!document.querySelector('.fixed.top-0'),
        hasSidebar: !!document.querySelector('.col-span-4'),
        hasAuthorSection: !!Array.from(document.querySelectorAll('h3')).find(h => h.textContent?.includes('About the Author')),
        hasToc: !!Array.from(document.querySelectorAll('h2, h3')).find(h => h.textContent?.includes('Table of Contents')),
        sidebarElements: Array.from(document.querySelectorAll('.col-span-4 .vybe-card h2, .col-span-4 .vybe-card h3')).map(el => el.textContent?.trim()),
        layout: document.querySelector('.grid.grid-cols-12') ? 'two-column' : 'single-column',
        currentUrl: window.location.href
      };
    });
    
    // Generate comparison report
    const issues = [];
    
    if (demoContent.layout !== nextjsContent.layout) {
      issues.push({
        type: 'structure',
        severity: 'high',
        description: `Layout mismatch: Demo=${demoContent.layout} vs Next.js=${nextjsContent.layout}`
      });
    }
    
    if (demoContent.hasProgressBar !== nextjsContent.hasProgressBar) {
      issues.push({
        type: 'feature',
        severity: 'medium',
        description: `Progress bar mismatch: Demo=${demoContent.hasProgressBar} vs Next.js=${nextjsContent.hasProgressBar}`
      });
    }
    
    if (demoContent.hasSidebar !== nextjsContent.hasSidebar) {
      issues.push({
        type: 'structure',
        severity: 'high',
        description: `Sidebar presence mismatch: Demo=${demoContent.hasSidebar} vs Next.js=${nextjsContent.hasSidebar}`
      });
    }
    
    if (demoContent.hasAuthorSection !== nextjsContent.hasAuthorSection) {
      issues.push({
        type: 'content',
        severity: 'medium',
        description: `Author section mismatch: Demo=${demoContent.hasAuthorSection} vs Next.js=${nextjsContent.hasAuthorSection}`
      });
    }
    
    const report = {
      timestamp: new Date().toISOString(),
      demoContent,
      nextjsContent,
      issues,
      summary: {
        totalIssues: issues.length,
        criticalIssues: issues.filter(i => i.severity === 'critical').length,
        highIssues: issues.filter(i => i.severity === 'high').length,
        mediumIssues: issues.filter(i => i.severity === 'medium').length
      }
    };
    
    // Save detailed report
    fs.writeFileSync(
      `${outputDir}/comparison-report.json`,
      JSON.stringify(report, null, 2)
    );
    
    // Generate markdown report
    const markdownReport = `# Guide Detail Page Visual Comparison Report

## Generated: ${new Date().toLocaleString()}

## Summary
- **Total Issues**: ${report.summary.totalIssues}
- **Critical**: ${report.summary.criticalIssues}
- **High**: ${report.summary.highIssues}  
- **Medium**: ${report.summary.mediumIssues}

## Layout Comparison

### Demo Page Analysis
- **Main Heading**: "${demoContent.mainHeading}"
- **Layout**: ${demoContent.layout}
- **Has Progress Bar**: ${demoContent.hasProgressBar ? '✅' : '❌'}
- **Has Sidebar**: ${demoContent.hasSidebar ? '✅' : '❌'}
- **Has Author Section**: ${demoContent.hasAuthorSection ? '✅' : '❌'}
- **Has Table of Contents**: ${demoContent.hasToc ? '✅' : '❌'}
- **Sidebar Elements**: ${demoContent.sidebarElements.join(', ')}

### Next.js Page Analysis  
- **Main Heading**: "${nextjsContent.mainHeading}"
- **Layout**: ${nextjsContent.layout}
- **Has Progress Bar**: ${nextjsContent.hasProgressBar ? '✅' : '❌'}
- **Has Sidebar**: ${nextjsContent.hasSidebar ? '✅' : '❌'}
- **Has Author Section**: ${nextjsContent.hasAuthorSection ? '✅' : '❌'}
- **Has Table of Contents**: ${nextjsContent.hasToc ? '✅' : '❌'}
- **Sidebar Elements**: ${nextjsContent.sidebarElements.join(', ')}
- **Current URL**: ${nextjsContent.currentUrl}

## Issues Found
${issues.length === 0 ? 'No issues detected! 🎉' : 
  issues.map(issue => `- **${issue.severity.toUpperCase()}**: ${issue.description}`).join('\n')
}

## Visual Comparison
Screenshots have been captured at:
- Desktop (1440x900)
- Tablet (768x1024)  
- Mobile (375x667)

Check the \`${outputDir}\` directory for visual comparisons.

## Next Steps
1. Review screenshots for visual fidelity
2. Address any structural issues
3. Verify interactive elements work correctly
4. Test responsive behavior
`;
    
    fs.writeFileSync(`${outputDir}/comparison-report.md`, markdownReport);
    
    console.log('✅ Guide detail comparison complete!');
    console.log(`📁 Results saved to: ${outputDir}`);
    console.log(`🔍 Issues found: ${report.summary.totalIssues}`);
    
    return report;
    
  } catch (error) {
    console.error('❌ Error during comparison:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the comparison
compareGuideDetailPages()
  .then(report => {
    console.log('\n🎯 Summary:');
    console.log(`- Total issues: ${report.summary.totalIssues}`);
    console.log(`- High severity: ${report.summary.highIssues}`);
    console.log(`- Medium severity: ${report.summary.mediumIssues}`);
    
    if (report.summary.totalIssues === 0) {
      console.log('🎉 Perfect match! Guide detail page implementation successful.');
    }
    
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Comparison failed:', error);
    process.exit(1);
  });

export { compareGuideDetailPages };