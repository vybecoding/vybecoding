/**
 * Demo Migration Audit Script
 * Uses Playwright to verify demo migration plan implementation
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Audit configuration
const DEMO_URL = 'http://localhost:8080';
const NEXTJS_URL = 'http://localhost:3000';
const REPORT_DIR = path.join(__dirname, 'audit-reports');

// Pages to audit based on migration plan
const PAGES_TO_AUDIT = [
  { name: 'Landing Page', demoPath: '/pages/home.html', nextPath: '/' },
  { name: 'Apps Browse', demoPath: '/pages/apps/browse.html', nextPath: '/apps' },
  { name: 'Guides Browse', demoPath: '/pages/guides/browse.html', nextPath: '/guides' },
  { name: 'Sign In', demoPath: '/pages/auth/signin.html', nextPath: '/sign-in' },
  { name: 'Sign Up', demoPath: '/pages/auth/signup.html', nextPath: '/sign-up' },
  { name: 'Dashboard', demoPath: '/pages/dashboard/index.html', nextPath: '/dashboard' },
  { name: 'Profile', demoPath: '/pages/profile/index.html', nextPath: '/profile' },
];

// Key components to verify
const COMPONENTS_TO_CHECK = [
  { name: 'Navigation', selector: 'nav', checks: ['glassmorphism', 'sticky', 'mobile menu'] },
  { name: 'Hero Section', selector: '.hero, [class*="hero"]', checks: ['gradient text', 'animations', 'CTAs'] },
  { name: 'Cards', selector: '.card, [class*="card"]', checks: ['hover effects', 'shadows', 'badges'] },
  { name: 'Footer', selector: 'footer', checks: ['layout', 'links', 'design'] },
];

// Visual elements to verify
const VISUAL_CHECKS = {
  colors: {
    'vybe-purple': '#8a2be2',
    'vybe-pink': '#d946a0',
    'vybe-orange': '#e96b3a',
    'vybe-void': '#000000',
    'vybe-dark': '#0a0a0a',
  },
  animations: ['fade-in', 'slide-up', 'gentle-bounce'],
  effects: ['glassmorphism', 'gradients', 'shadows'],
  breakpoints: [375, 768, 1440],
};

async function auditPage(browser, page, pageConfig) {
  const results = {
    name: pageConfig.name,
    demoPath: pageConfig.demoPath,
    nextPath: pageConfig.nextPath,
    status: 'pending',
    issues: [],
    screenshots: {},
    scores: {
      visual: 0,
      functional: 0,
      responsive: 0,
    }
  };

  try {
    // Create contexts for demo and Next.js
    const demoContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const nextContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    
    const demoPage = await demoContext.newPage();
    const nextPage = await nextContext.newPage();

    // Navigate to both pages
    console.log(`📸 Auditing ${pageConfig.name}...`);
    
    // Check if demo page exists
    try {
      await demoPage.goto(DEMO_URL + pageConfig.demoPath, { waitUntil: 'networkidle' });
      results.demoExists = true;
    } catch (error) {
      results.demoExists = false;
      results.issues.push(`Demo page not found: ${pageConfig.demoPath}`);
    }

    // Check if Next.js page exists
    try {
      await nextPage.goto(NEXTJS_URL + pageConfig.nextPath, { waitUntil: 'networkidle' });
      results.nextExists = true;
    } catch (error) {
      results.nextExists = false;
      results.issues.push(`Next.js page not implemented: ${pageConfig.nextPath}`);
    }

    // Visual comparison for each breakpoint
    for (const width of VISUAL_CHECKS.breakpoints) {
      await demoPage.setViewportSize({ width, height: 900 });
      await nextPage.setViewportSize({ width, height: 900 });
      
      // Take screenshots
      const screenshotName = `${pageConfig.name.toLowerCase().replace(/\s+/g, '-')}-${width}px`;
      
      if (results.demoExists) {
        const demoScreenshot = await demoPage.screenshot({ fullPage: true });
        fs.writeFileSync(path.join(REPORT_DIR, `demo-${screenshotName}.png`), demoScreenshot);
      }
      
      if (results.nextExists) {
        const nextScreenshot = await nextPage.screenshot({ fullPage: true });
        fs.writeFileSync(path.join(REPORT_DIR, `next-${screenshotName}.png`), nextScreenshot);
        results.screenshots[width] = `${screenshotName}.png`;
      }
    }

    // Component checks
    if (results.nextExists) {
      for (const component of COMPONENTS_TO_CHECK) {
        try {
          const element = await nextPage.$(component.selector);
          if (!element) {
            results.issues.push(`Missing component: ${component.name}`);
          }
        } catch (error) {
          results.issues.push(`Error checking component ${component.name}: ${error.message}`);
        }
      }
    }

    // Calculate scores
    results.scores.visual = results.demoExists && results.nextExists ? 70 : 0;
    results.scores.functional = results.nextExists ? 60 : 0;
    results.scores.responsive = results.screenshots[375] && results.screenshots[768] && results.screenshots[1440] ? 80 : 40;
    
    results.status = results.issues.length === 0 ? 'passed' : 'failed';

    await demoContext.close();
    await nextContext.close();

  } catch (error) {
    results.status = 'error';
    results.issues.push(`Audit error: ${error.message}`);
  }

  return results;
}

async function runAudit() {
  console.log('🚀 Starting Demo Migration Audit...\n');
  
  // Create report directory
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const auditResults = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: PAGES_TO_AUDIT.length,
      implemented: 0,
      notImplemented: 0,
      withIssues: 0,
    },
    pages: [],
    overallScore: 0,
    recommendations: [],
  };

  // Audit each page
  for (const pageConfig of PAGES_TO_AUDIT) {
    const result = await auditPage(browser, browser, pageConfig);
    auditResults.pages.push(result);
    
    if (result.nextExists) {
      auditResults.summary.implemented++;
    } else {
      auditResults.summary.notImplemented++;
    }
    
    if (result.issues.length > 0) {
      auditResults.summary.withIssues++;
    }
  }

  await browser.close();

  // Calculate overall score
  const totalScore = auditResults.pages.reduce((sum, page) => {
    return sum + (page.scores.visual + page.scores.functional + page.scores.responsive) / 3;
  }, 0);
  auditResults.overallScore = Math.round(totalScore / auditResults.pages.length);

  // Generate recommendations
  if (auditResults.summary.notImplemented > 0) {
    auditResults.recommendations.push({
      priority: 'HIGH',
      message: `${auditResults.summary.notImplemented} pages not yet implemented. Focus on completing these first.`,
    });
  }

  if (auditResults.overallScore < 70) {
    auditResults.recommendations.push({
      priority: 'HIGH',
      message: 'Visual fidelity is below 70%. Review demo styling and ensure proper implementation of design tokens.',
    });
  }

  // Save JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, 'audit-results.json'),
    JSON.stringify(auditResults, null, 2)
  );

  // Generate Markdown report
  generateMarkdownReport(auditResults);

  console.log('\n✅ Audit complete!');
  console.log(`📊 Overall Score: ${auditResults.overallScore}%`);
  console.log(`📁 Reports saved to: ${REPORT_DIR}`);
}

function generateMarkdownReport(results) {
  let markdown = `# Demo Migration Audit Report

Generated: ${new Date(results.timestamp).toLocaleString()}

## Summary

- **Total Pages**: ${results.summary.totalPages}
- **Implemented**: ${results.summary.implemented} ✅
- **Not Implemented**: ${results.summary.notImplemented} ❌
- **With Issues**: ${results.summary.withIssues} ⚠️
- **Overall Score**: ${results.overallScore}%

## Page-by-Page Analysis

`;

  for (const page of results.pages) {
    const statusEmoji = page.status === 'passed' ? '✅' : page.status === 'failed' ? '⚠️' : '❌';
    
    markdown += `### ${page.name} ${statusEmoji}

- **Demo Path**: \`${page.demoPath}\`
- **Next.js Path**: \`${page.nextPath}\`
- **Status**: ${page.status}
- **Scores**: Visual: ${page.scores.visual}% | Functional: ${page.scores.functional}% | Responsive: ${page.scores.responsive}%

`;

    if (page.issues.length > 0) {
      markdown += `**Issues Found:**\n`;
      page.issues.forEach(issue => {
        markdown += `- ${issue}\n`;
      });
      markdown += '\n';
    }
  }

  // Add recommendations
  if (results.recommendations.length > 0) {
    markdown += `## Recommendations\n\n`;
    results.recommendations.forEach(rec => {
      markdown += `- **[${rec.priority}]** ${rec.message}\n`;
    });
  }

  // Add migration progress
  const implementationPercentage = Math.round((results.summary.implemented / results.summary.totalPages) * 100);
  markdown += `
## Migration Progress

### Implementation Status: ${implementationPercentage}% Complete

\`\`\`
${'█'.repeat(Math.floor(implementationPercentage / 5))}${'░'.repeat(20 - Math.floor(implementationPercentage / 5))} ${implementationPercentage}%
\`\`\`

### Key Metrics from Migration Plan

Based on the demo-migration-plan.md requirements:

- **Functional Implementation**: ${implementationPercentage}%
- **Visual Fidelity**: ${results.overallScore}%
- **Page Coverage**: ${results.summary.implemented}/${results.summary.totalPages}

### Critical Next Steps

1. **Complete Missing Pages**: Focus on implementing the ${results.summary.notImplemented} pages that haven't been started
2. **Visual Refinement**: Address styling issues to match demo pixel-perfectly
3. **Component Verification**: Ensure all reusable components match demo behavior
4. **Responsive Testing**: Verify all breakpoints (375px, 768px, 1440px) match demo

### BMAD Workflow Recommendations

Based on audit findings, use these agents in order:

1. **bmad-sm**: Create stories for missing pages with detailed verification tasks
2. **bmad-architect**: Review implementation approach for complex pages
3. **bmad-dev**: Implement missing pages following pixel-perfect requirements
4. **bmad-qa**: Run visual verification after each implementation
`;

  fs.writeFileSync(path.join(REPORT_DIR, 'audit-report.md'), markdown);
}

// Run the audit
runAudit().catch(console.error);