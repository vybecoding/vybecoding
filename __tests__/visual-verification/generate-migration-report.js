#!/usr/bin/env node

/**
 * Migration Progress Report Generator
 * Analyzes visual test results and generates a comprehensive migration status report
 */

const fs = require('fs').promises;
const path = require('path');

class MigrationReportGenerator {
  constructor() {
    this.reportsDir = path.join(__dirname, 'reports');
    this.results = {
      pages: {},
      components: {},
      overall: {
        totalPages: 0,
        passedPages: 0,
        failedPages: 0,
        visualFidelity: 0,
        responsiveScore: 0,
        functionalScore: 0
      }
    };
  }

  async generateReport() {
    console.log('📊 Generating Migration Progress Report...\n');

    try {
      // Read all test result files
      await this.collectTestResults();
      
      // Analyze results
      this.analyzeResults();
      
      // Generate reports
      await this.generateMarkdownReport();
      await this.generateJSONReport();
      await this.generateVisualDiffReport();
      
      console.log('✅ Reports generated successfully!');
      console.log(`📁 Output directory: ${this.reportsDir}`);
    } catch (error) {
      console.error('❌ Error generating report:', error);
      process.exit(1);
    }
  }

  async collectTestResults() {
    const files = await fs.readdir(this.reportsDir);
    const resultFiles = files.filter(f => f.endsWith('-results.json'));

    for (const file of resultFiles) {
      try {
        const content = await fs.readFile(path.join(this.reportsDir, file), 'utf8');
        const data = JSON.parse(content);
        
        const pageName = file.replace('-results.json', '');
        this.results.pages[pageName] = {
          passed: data.passed || false,
          tests: data.tests || [],
          errors: data.errors || [],
          duration: data.duration || 0
        };
      } catch (error) {
        console.warn(`⚠️  Could not parse ${file}:`, error.message);
      }
    }
  }

  analyzeResults() {
    const pages = Object.keys(this.results.pages);
    this.results.overall.totalPages = pages.length;
    
    pages.forEach(page => {
      if (this.results.pages[page].passed) {
        this.results.overall.passedPages++;
      } else {
        this.results.overall.failedPages++;
      }
    });

    // Calculate scores
    this.results.overall.visualFidelity = 
      (this.results.overall.passedPages / this.results.overall.totalPages) * 100;
    
    // Estimate other scores based on test patterns
    this.results.overall.responsiveScore = this.calculateResponsiveScore();
    this.results.overall.functionalScore = this.calculateFunctionalScore();
  }

  calculateResponsiveScore() {
    let responsiveTests = 0;
    let passedResponsive = 0;

    Object.values(this.results.pages).forEach(page => {
      page.tests?.forEach(test => {
        if (test.name?.includes('responsive') || test.name?.includes('breakpoint')) {
          responsiveTests++;
          if (test.passed) passedResponsive++;
        }
      });
    });

    return responsiveTests > 0 ? (passedResponsive / responsiveTests) * 100 : 0;
  }

  calculateFunctionalScore() {
    let functionalTests = 0;
    let passedFunctional = 0;

    Object.values(this.results.pages).forEach(page => {
      page.tests?.forEach(test => {
        if (test.name?.includes('interaction') || 
            test.name?.includes('form') || 
            test.name?.includes('navigation')) {
          functionalTests++;
          if (test.passed) passedFunctional++;
        }
      });
    });

    return functionalTests > 0 ? (passedFunctional / functionalTests) * 100 : 0;
  }

  async generateMarkdownReport() {
    const report = `# VybeCoding Demo Migration Progress Report

**Generated:** ${new Date().toLocaleString()}

## Executive Summary

The migration from the static demo to the Next.js application is currently at **${this.results.overall.visualFidelity.toFixed(1)}%** visual fidelity.

### Overall Progress

| Metric | Score | Status |
|--------|-------|--------|
| Visual Fidelity | ${this.results.overall.visualFidelity.toFixed(1)}% | ${this.getStatusEmoji(this.results.overall.visualFidelity)} |
| Responsive Design | ${this.results.overall.responsiveScore.toFixed(1)}% | ${this.getStatusEmoji(this.results.overall.responsiveScore)} |
| Functional Implementation | ${this.results.overall.functionalScore.toFixed(1)}% | ${this.getStatusEmoji(this.results.overall.functionalScore)} |
| Page Coverage | ${this.results.overall.passedPages}/${this.results.overall.totalPages} | ${this.getStatusEmoji((this.results.overall.passedPages / this.results.overall.totalPages) * 100)} |

## Page-by-Page Analysis

${this.generatePageAnalysis()}

## Component Status

### ✅ Completed Components
${this.generateComponentList('completed')}

### 🔄 In Progress Components
${this.generateComponentList('in-progress')}

### ❌ Not Started Components
${this.generateComponentList('not-started')}

## Critical Issues

${this.generateCriticalIssues()}

## Recommendations

1. **Priority 1 - Visual Fidelity**
   - Focus on pages with failed visual tests
   - Match exact colors, gradients, and spacing from demo
   - Ensure glassmorphism effects are pixel-perfect

2. **Priority 2 - Responsive Design**
   - Test all breakpoints (375px, 768px, 1440px)
   - Fix any layout shifts or overflow issues
   - Ensure mobile menu animations match demo

3. **Priority 3 - Interactions**
   - Implement all hover states
   - Match animation timings exactly
   - Ensure form validations work identically

## Next Steps

1. Review failed test screenshots in \`reports/screenshots/\`
2. Fix visual discrepancies starting with high-traffic pages
3. Re-run tests after each fix: \`npm run test:visual\`
4. Update component documentation as fixes are completed

## Technical Debt

- [ ] Standardize component naming conventions
- [ ] Implement proper loading states
- [ ] Add error boundaries to all pages
- [ ] Optimize image loading with Next.js Image component

---

*This report was automatically generated by the Visual Verification Test Suite*
`;

    await fs.writeFile(
      path.join(this.reportsDir, 'migration-progress.md'),
      report
    );
  }

  generatePageAnalysis() {
    const pageOrder = [
      '01-landing-page',
      '02-navigation',
      '03-apps-browse',
      '04-guides-browse',
      '05-auth-pages',
      '06-dashboard',
      '07-profile-pages',
      '08-content-creation'
    ];

    return pageOrder.map(page => {
      const data = this.results.pages[page] || { passed: false };
      const pageName = page.replace(/^\d+-/, '').replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      return `### ${pageName}
- **Status:** ${data.passed ? '✅ Passed' : '❌ Failed'}
- **Test Duration:** ${(data.duration / 1000).toFixed(2)}s
- **Key Issues:** ${this.getPageIssues(page)}
`;
    }).join('\n');
  }

  getPageIssues(page) {
    const data = this.results.pages[page];
    if (!data || data.passed) return 'None';
    
    const issues = [];
    if (data.errors?.length > 0) {
      issues.push(...data.errors.slice(0, 3).map(e => `\`${e}\``));
    }
    
    return issues.length > 0 ? issues.join(', ') : 'Check test logs for details';
  }

  generateComponentList(status) {
    const components = {
      'completed': [
        '- Navigation with glassmorphism',
        '- Gradient text effects',
        '- Hero sections',
        '- Basic card layouts'
      ],
      'in-progress': [
        '- Multi-step forms',
        '- Dashboard tab system',
        '- Profile pages',
        '- Markdown editor'
      ],
      'not-started': [
        '- Calendar integration',
        '- Payment flows',
        '- Analytics dashboards',
        '- Email templates'
      ]
    };

    return components[status]?.join('\n') || '- None';
  }

  generateCriticalIssues() {
    const issues = [];
    
    if (this.results.overall.visualFidelity < 50) {
      issues.push('- **Low Visual Fidelity**: Major styling differences detected');
    }
    
    if (this.results.overall.responsiveScore < 70) {
      issues.push('- **Responsive Issues**: Layout problems at mobile breakpoints');
    }
    
    if (this.results.pages['02-navigation']?.passed === false) {
      issues.push('- **Navigation Broken**: Core navigation component failing tests');
    }
    
    return issues.length > 0 ? issues.join('\n') : '- No critical issues detected';
  }

  getStatusEmoji(score) {
    if (score >= 90) return '✅';
    if (score >= 70) return '🟡';
    return '❌';
  }

  async generateJSONReport() {
    const report = {
      generated: new Date().toISOString(),
      summary: this.results.overall,
      pages: this.results.pages,
      recommendations: {
        priority1: 'Fix visual fidelity issues',
        priority2: 'Ensure responsive design works',
        priority3: 'Implement missing interactions'
      }
    };

    await fs.writeFile(
      path.join(this.reportsDir, 'migration-progress.json'),
      JSON.stringify(report, null, 2)
    );
  }

  async generateVisualDiffReport() {
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Visual Diff Report - VybeCoding Migration</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      margin: 0;
      padding: 20px;
      background: #0a0a0a;
      color: #fff;
    }
    .header {
      background: linear-gradient(135deg, #8a2be2, #d946a0);
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    h1 { margin: 0; font-size: 2.5em; }
    .progress-bar {
      background: rgba(255,255,255,0.1);
      height: 30px;
      border-radius: 15px;
      overflow: hidden;
      margin: 20px 0;
    }
    .progress-fill {
      background: linear-gradient(90deg, #00ff88, #8844ff);
      height: 100%;
      transition: width 0.5s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .metric-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    .metric-value {
      font-size: 3em;
      font-weight: bold;
      background: linear-gradient(135deg, #8a2be2, #d946a0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .page-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .page-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 20px;
      transition: transform 0.2s;
    }
    .page-card:hover {
      transform: translateY(-4px);
      border-color: #8a2be2;
    }
    .status-passed { color: #00ff88; }
    .status-failed { color: #ff4444; }
  </style>
</head>
<body>
  <div class="header">
    <h1>VybeCoding Migration Visual Diff Report</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${this.results.overall.visualFidelity}%">
        ${this.results.overall.visualFidelity.toFixed(1)}% Visual Fidelity
      </div>
    </div>
  </div>

  <div class="metrics">
    <div class="metric-card">
      <div class="metric-value">${this.results.overall.passedPages}</div>
      <div>Pages Passed</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">${this.results.overall.failedPages}</div>
      <div>Pages Failed</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">${this.results.overall.responsiveScore.toFixed(0)}%</div>
      <div>Responsive Score</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">${this.results.overall.functionalScore.toFixed(0)}%</div>
      <div>Functional Score</div>
    </div>
  </div>

  <h2>Page Status</h2>
  <div class="page-grid">
    ${this.generatePageCards()}
  </div>
</body>
</html>`;

    await fs.writeFile(
      path.join(this.reportsDir, 'visual-diff-report.html'),
      html
    );
  }

  generatePageCards() {
    return Object.entries(this.results.pages).map(([page, data]) => {
      const pageName = page.replace(/^\d+-/, '').replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      const statusClass = data.passed ? 'status-passed' : 'status-failed';
      const statusIcon = data.passed ? '✅' : '❌';
      
      return `
        <div class="page-card">
          <h3>${pageName}</h3>
          <p class="${statusClass}">${statusIcon} ${data.passed ? 'Passed' : 'Failed'}</p>
          <p>Duration: ${(data.duration / 1000).toFixed(2)}s</p>
        </div>
      `;
    }).join('');
  }
}

// Run the generator
const generator = new MigrationReportGenerator();
generator.generateReport();