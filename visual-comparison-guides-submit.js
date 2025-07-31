import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function compareGuidesSubmitPages() {
  console.log('🚀 Starting visual comparison for guides submit page...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  // Create output directory
  const outputDir = './visual-snapshots/guides-submit-comparison';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // Demo page
    console.log('📸 Capturing demo page screenshots...');
    const demoPage = await context.newPage();
    await demoPage.goto('http://localhost:8080/pages/guides/submit.html');
    await demoPage.waitForLoadState('networkidle');
    
    // Next.js page
    console.log('📸 Capturing Next.js page screenshots...');
    const nextjsPage = await context.newPage();
    await nextjsPage.goto('http://localhost:3002/guides/submit');
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
    
    // Analyze page structure and content
    console.log('🔍 Analyzing page structure...');
    
    const demoContent = await demoPage.evaluate(() => {
      return {
        title: document.title,
        heading: document.querySelector('h1')?.textContent || '',
        stepLabels: Array.from(document.querySelectorAll('.step-label, .step-number')).map(el => el.textContent?.trim()),
        formFields: Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
          type: el.type || el.tagName.toLowerCase(),
          placeholder: el.placeholder || '',
          name: el.name || '',
          id: el.id || ''
        })),
        buttons: Array.from(document.querySelectorAll('button')).map(btn => btn.textContent?.trim()),
        progressSteps: Array.from(document.querySelectorAll('.progress-step, .step')).length
      };
    });
    
    const nextjsContent = await nextjsPage.evaluate(() => {
      return {
        title: document.title,
        heading: document.querySelector('h1')?.textContent || '',
        stepLabels: Array.from(document.querySelectorAll('.step-label, .step-number')).map(el => el.textContent?.trim()),
        formFields: Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
          type: el.type || el.tagName.toLowerCase(),
          placeholder: el.placeholder || '',
          name: el.name || '',
          id: el.id || ''
        })),
        buttons: Array.from(document.querySelectorAll('button')).map(btn => btn.textContent?.trim()),
        progressSteps: Array.from(document.querySelectorAll('.progress-step, .step')).length
      };
    });
    
    // Compare content structure
    const contentComparison = {
      titleMatch: demoContent.title === nextjsContent.title,
      headingMatch: demoContent.heading === nextjsContent.heading,
      stepCountMatch: demoContent.progressSteps === nextjsContent.progressSteps,
      formFieldsCount: {
        demo: demoContent.formFields.length,
        nextjs: nextjsContent.formFields.length,
        match: demoContent.formFields.length === nextjsContent.formFields.length
      },
      buttonsCount: {
        demo: demoContent.buttons.length,
        nextjs: nextjsContent.buttons.length,
        match: demoContent.buttons.length === nextjsContent.buttons.length
      }
    };
    
    // Generate comparison report
    const report = {
      timestamp: new Date().toISOString(),
      comparison: contentComparison,
      demoContent,
      nextjsContent,
      issues: []
    };
    
    // Identify issues
    if (!contentComparison.titleMatch) {
      report.issues.push({
        type: 'content',
        severity: 'medium',
        description: `Title mismatch: Demo="${demoContent.title}" vs Next.js="${nextjsContent.title}"`
      });
    }
    
    if (!contentComparison.headingMatch) {
      report.issues.push({
        type: 'content',
        severity: 'medium',
        description: `Heading mismatch: Demo="${demoContent.heading}" vs Next.js="${nextjsContent.heading}"`
      });
    }
    
    if (!contentComparison.stepCountMatch) {
      report.issues.push({
        type: 'structure',
        severity: 'high',
        description: `Step count mismatch: Demo=${demoContent.progressSteps} vs Next.js=${nextjsContent.progressSteps}`
      });
    }
    
    if (!contentComparison.formFieldsCount.match) {
      report.issues.push({
        type: 'structure',
        severity: 'high',
        description: `Form fields count mismatch: Demo=${demoContent.formFields.length} vs Next.js=${nextjsContent.formFields.length}`
      });
    }
    
    // Save report
    fs.writeFileSync(
      `${outputDir}/comparison-report.json`,
      JSON.stringify(report, null, 2)
    );
    
    // Generate human-readable report
    const readableReport = `# Guides Submit Page Visual Comparison Report

## Generated: ${new Date().toLocaleString()}

## Overview
- **Title Match**: ${contentComparison.titleMatch ? '✅' : '❌'}
- **Heading Match**: ${contentComparison.headingMatch ? '✅' : '❌'}
- **Step Count Match**: ${contentComparison.stepCountMatch ? '✅' : '❌'} (Demo: ${demoContent.progressSteps}, Next.js: ${nextjsContent.progressSteps})
- **Form Fields Match**: ${contentComparison.formFieldsCount.match ? '✅' : '❌'} (Demo: ${demoContent.formFields.length}, Next.js: ${nextjsContent.formFields.length})
- **Buttons Match**: ${contentComparison.buttonsCount.match ? '✅' : '❌'} (Demo: ${demoContent.buttons.length}, Next.js: ${nextjsContent.buttons.length})

## Issues Found
${report.issues.length === 0 ? 'No issues detected! 🎉' : 
  report.issues.map(issue => `- **${issue.severity.toUpperCase()}**: ${issue.description}`).join('\n')
}

## Screenshots Captured
- Desktop (1440x900): ✅
- Tablet (768x1024): ✅  
- Mobile (375x667): ✅

## Content Analysis

### Demo Page
- **Title**: ${demoContent.title}
- **Heading**: ${demoContent.heading}
- **Progress Steps**: ${demoContent.progressSteps}
- **Form Fields**: ${demoContent.formFields.length}
- **Buttons**: ${demoContent.buttons.join(', ')}

### Next.js Page
- **Title**: ${nextjsContent.title}
- **Heading**: ${nextjsContent.heading}
- **Progress Steps**: ${nextjsContent.progressSteps}
- **Form Fields**: ${nextjsContent.formFields.length}
- **Buttons**: ${nextjsContent.buttons.join(', ')}

## Next Steps
1. Review screenshots in \`${outputDir}\`
2. Address any high-severity issues
3. Verify visual consistency across all viewports
4. Test interactive functionality matches
`;
    
    fs.writeFileSync(`${outputDir}/comparison-report.md`, readableReport);
    
    console.log('✅ Visual comparison complete!');
    console.log(`📁 Results saved to: ${outputDir}`);
    console.log(`🔍 Issues found: ${report.issues.length}`);
    
    return report;
    
  } catch (error) {
    console.error('❌ Error during comparison:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the comparison
compareGuidesSubmitPages()
  .then(report => {
    console.log('\n🎯 Summary:');
    console.log(`- Issues found: ${report.issues.length}`);
    console.log(`- High severity: ${report.issues.filter(i => i.severity === 'high').length}`);
    console.log(`- Medium severity: ${report.issues.filter(i => i.severity === 'medium').length}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Comparison failed:', error);
    process.exit(1);
  });

export { compareGuidesSubmitPages };