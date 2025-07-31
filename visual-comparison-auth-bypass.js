import { chromium } from 'playwright';
import fs from 'fs';

async function compareWithAuthBypass() {
  console.log('🚀 Starting visual comparison with auth bypass...');
  
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
    
    // Next.js page with auth bypass
    console.log('📸 Setting up Next.js page with mock auth...');
    const nextjsPage = await context.newPage();
    
    // Set up mock authentication by injecting localStorage
    await nextjsPage.goto('http://localhost:3002/guides/submit');
    
    // Try to bypass auth by setting mock user data in localStorage
    await nextjsPage.evaluate(() => {
      // Mock Clerk auth state
      window.localStorage.setItem('__clerk_user', JSON.stringify({
        id: 'mock_user_123',
        firstName: 'Test',
        lastName: 'User',
        emailAddresses: [{ emailAddress: 'test@example.com' }]
      }));
      
      // Mock signed in state
      window.localStorage.setItem('__clerk_session', 'mock_session');
    });
    
    // Refresh to apply mock auth
    await nextjsPage.reload();
    await nextjsPage.waitForLoadState('networkidle');
    
    // Check if we're still getting redirected
    const currentUrl = nextjsPage.url();
    console.log('Current Next.js URL:', currentUrl);
    
    if (currentUrl.includes('sign-in')) {
      console.log('⚠️  Still redirected to sign-in. Attempting direct content injection...');
      
      // If still redirected, let's try to get the rendered component by temporarily modifying auth check
      await nextjsPage.evaluate(() => {
        // Override the useUser hook to return signed in state
        if (window.React) {
          const originalCreateElement = window.React.createElement;
          window.React.createElement = function(type, props, ...children) {
            if (typeof type === 'function' && type.name === 'GuideSubmitPage') {
              // Mock the useUser hook
              const mockUser = { isSignedIn: true, user: { id: 'test' } };
              return originalCreateElement(type, { ...props, mockAuth: mockUser }, ...children);
            }
            return originalCreateElement(type, props, ...children);
          };
        }
      });
    }
    
    // Take screenshots of current state
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
        heading: document.querySelector('h1')?.textContent?.trim() || '',
        progressSteps: Array.from(document.querySelectorAll('[id*="step-indicator"], .step, .step-number')).length,
        stepLabels: Array.from(document.querySelectorAll('[id*="step-indicator"] span, .step-label')).map(el => el.textContent?.trim()),
        formElements: Array.from(document.querySelectorAll('input, textarea, select, button')).length,
        hasProgressBar: !!document.querySelector('.absolute.top-5.left-0.right-0'),
        mainContent: document.querySelector('#guides-submit-content, .guides-tab-content') ? 'guides-submit-form' : 'other',
        stepNumbers: Array.from(document.querySelectorAll('.w-10.h-10.rounded-full')).map(el => el.textContent?.trim())
      };
    });
    
    const nextjsContent = await nextjsPage.evaluate(() => {
      return {
        title: document.title,
        heading: document.querySelector('h1')?.textContent?.trim() || '',
        progressSteps: Array.from(document.querySelectorAll('[id*="step"], .step, .step-number')).length,
        stepLabels: Array.from(document.querySelectorAll('.step span, .step-label')).map(el => el.textContent?.trim()),
        formElements: Array.from(document.querySelectorAll('input, textarea, select, button')).length,
        hasProgressBar: !!document.querySelector('.absolute.top-5.left-0.right-0'),
        mainContent: nextjsPage.url().includes('sign-in') ? 'sign-in-page' : 'guides-submit-form',
        stepNumbers: Array.from(document.querySelectorAll('.w-10.h-10.rounded-full')).map(el => el.textContent?.trim()),
        isSignInPage: nextjsPage.url().includes('sign-in'),
        currentUrl: nextjsPage.url()
      };
    });
    
    // Generate comprehensive report
    const issues = [];
    
    if (nextjsContent.isSignInPage) {
      issues.push({
        type: 'authentication',
        severity: 'critical',
        description: 'Next.js redirects to sign-in page instead of showing guides submit form'
      });
    } else {
      // Compare actual content
      if (demoContent.progressSteps !== nextjsContent.progressSteps) {
        issues.push({
          type: 'structure',
          severity: 'high',
          description: `Progress steps mismatch: Demo=${demoContent.progressSteps} vs Next.js=${nextjsContent.progressSteps}`
        });
      }
      
      if (!nextjsContent.hasProgressBar && demoContent.hasProgressBar) {
        issues.push({
          type: 'visual',
          severity: 'high',
          description: 'Missing progress bar in Next.js version'
        });
      }
      
      if (demoContent.heading !== nextjsContent.heading) {
        issues.push({
          type: 'content',
          severity: 'medium',
          description: `Heading mismatch: Demo="${demoContent.heading}" vs Next.js="${nextjsContent.heading}"`
        });
      }
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
      `${outputDir}/auth-bypass-comparison.json`,
      JSON.stringify(report, null, 2)
    );
    
    // Generate markdown report
    const markdownReport = `# Guides Submit Visual Comparison (Auth Bypass)

## Generated: ${new Date().toLocaleString()}

## Summary
- **Total Issues**: ${report.summary.totalIssues}
- **Critical**: ${report.summary.criticalIssues}
- **High**: ${report.summary.highIssues}  
- **Medium**: ${report.summary.mediumIssues}

## Key Findings

### Demo Page Analysis
- **Title**: ${demoContent.title}
- **Main Heading**: "${demoContent.heading}"
- **Progress Steps**: ${demoContent.progressSteps}
- **Step Labels**: ${demoContent.stepLabels.join(', ')}
- **Form Elements**: ${demoContent.formElements}
- **Has Progress Bar**: ${demoContent.hasProgressBar ? '✅' : '❌'}
- **Content Type**: ${demoContent.mainContent}

### Next.js Page Analysis  
- **Title**: ${nextjsContent.title}
- **Main Heading**: "${nextjsContent.heading}"
- **Progress Steps**: ${nextjsContent.progressSteps}  
- **Step Labels**: ${nextjsContent.stepLabels.join(', ')}
- **Form Elements**: ${nextjsContent.formElements}
- **Has Progress Bar**: ${nextjsContent.hasProgressBar ? '✅' : '❌'}
- **Content Type**: ${nextjsContent.mainContent}
- **Is Sign-in Page**: ${nextjsContent.isSignInPage ? '⚠️ YES' : '✅ NO'}
- **Current URL**: ${nextjsContent.currentUrl}

## Issues Found
${issues.length === 0 ? 'No issues detected! 🎉' : 
  issues.map(issue => `- **${issue.severity.toUpperCase()}**: ${issue.description}`).join('\n')
}

## Recommendations

${nextjsContent.isSignInPage ? `
### Critical: Authentication Blocking Access
The Next.js version is redirecting to sign-in instead of showing the guides submit form. 

**Fix Required:**
1. Implement proper mock authentication for development
2. Add development environment bypass for testing
3. Ensure authenticated users can access the submit form

` : ''}

## Visual Comparison
Screenshots have been captured at:
- Desktop (1440x900)
- Tablet (768x1024)  
- Mobile (375x667)

Check the \`${outputDir}\` directory for visual comparisons.
`;
    
    fs.writeFileSync(`${outputDir}/auth-bypass-report.md`, markdownReport);
    
    console.log('✅ Auth bypass comparison complete!');
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
compareWithAuthBypass()
  .then(report => {
    console.log('\n🎯 Summary:');
    console.log(`- Total issues: ${report.summary.totalIssues}`);
    console.log(`- Critical: ${report.summary.criticalIssues}`);
    console.log(`- High severity: ${report.summary.highIssues}`);
    console.log(`- Medium severity: ${report.summary.mediumIssues}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Comparison failed:', error);
    process.exit(1);
  });