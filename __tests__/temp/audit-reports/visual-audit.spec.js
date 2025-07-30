import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const NEXTJS_URL = 'http://localhost:3000';
const DEMO_URL = 'http://localhost:8080';
const BREAKPOINTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

// Pages to test - we'll discover these dynamically
const PAGES_TO_TEST = [
  { path: '/', name: 'home' },
  { path: '/apps', name: 'apps' },
  { path: '/guides', name: 'guides' },
  { path: '/dashboard', name: 'dashboard' },
  { path: '/profile', name: 'profile' },
  { path: '/login', name: 'login' },
  { path: '/signup', name: 'signup' }
];

// Visual comparison criteria
const VISUAL_CRITERIA = {
  gradients: {
    weight: 20,
    checks: ['background-image', 'background', 'linear-gradient', 'radial-gradient']
  },
  colors: {
    weight: 20,
    checks: ['color', 'background-color', 'border-color', 'fill', 'stroke']
  },
  shadows: {
    weight: 15,
    checks: ['box-shadow', 'text-shadow', 'filter']
  },
  spacing: {
    weight: 15,
    checks: ['padding', 'margin', 'gap', 'space']
  },
  typography: {
    weight: 15,
    checks: ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing']
  },
  animations: {
    weight: 15,
    checks: ['transition', 'animation', 'transform']
  }
};

// Create output directory
const OUTPUT_DIR = path.join(__dirname, 'visual-audit-results');

test.beforeAll(async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, 'screenshots'), { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, 'diffs'), { recursive: true });
});

test.describe('Visual Audit - Page Discovery', () => {
  test('discover accessible pages', async ({ browser }) => {
    const accessiblePages = {
      nextjs: [],
      demo: []
    };

    // Test Next.js pages
    const nextContext = await browser.newContext();
    const nextPage = await nextContext.newPage();
    
    for (const page of PAGES_TO_TEST) {
      try {
        const response = await nextPage.goto(NEXTJS_URL + page.path, { 
          waitUntil: 'networkidle',
          timeout: 10000 
        });
        if (response && response.ok()) {
          accessiblePages.nextjs.push(page);
          console.log(`✅ Next.js: ${page.path} is accessible`);
        } else {
          console.log(`❌ Next.js: ${page.path} returned ${response?.status()}`);
        }
      } catch (error) {
        console.log(`❌ Next.js: ${page.path} failed - ${error.message}`);
      }
    }
    
    await nextContext.close();

    // Test Demo pages
    const demoContext = await browser.newContext();
    const demoPage = await demoContext.newPage();
    
    for (const page of PAGES_TO_TEST) {
      try {
        const response = await demoPage.goto(DEMO_URL + page.path, { 
          waitUntil: 'networkidle',
          timeout: 10000 
        });
        if (response && response.ok()) {
          accessiblePages.demo.push(page);
          console.log(`✅ Demo: ${page.path} is accessible`);
        } else {
          console.log(`❌ Demo: ${page.path} returned ${response?.status()}`);
        }
      } catch (error) {
        console.log(`❌ Demo: ${page.path} failed - ${error.message}`);
      }
    }
    
    await demoContext.close();

    // Save accessible pages for other tests
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'accessible-pages.json'),
      JSON.stringify(accessiblePages, null, 2)
    );
  });
});

test.describe('Visual Audit - Screenshot Capture', () => {
  test('capture screenshots at all breakpoints', async ({ browser }) => {
    // Load accessible pages
    const accessiblePagesData = await fs.readFile(
      path.join(OUTPUT_DIR, 'accessible-pages.json'),
      'utf-8'
    );
    const accessiblePages = JSON.parse(accessiblePagesData);

    // Find common pages
    const commonPages = accessiblePages.nextjs.filter(nextPage =>
      accessiblePages.demo.some(demoPage => demoPage.path === nextPage.path)
    );

    console.log(`\nTesting ${commonPages.length} common pages across both sites`);

    for (const page of commonPages) {
      for (const breakpoint of BREAKPOINTS) {
        // Capture Next.js screenshot
        const nextContext = await browser.newContext({
          viewport: { width: breakpoint.width, height: breakpoint.height }
        });
        const nextPage = await nextContext.newPage();
        
        await nextPage.goto(NEXTJS_URL + page.path, { waitUntil: 'networkidle' });
        await nextPage.waitForTimeout(1000); // Wait for animations
        
        const nextScreenshotPath = path.join(
          OUTPUT_DIR,
          'screenshots',
          `nextjs-${page.name}-${breakpoint.name}.png`
        );
        await nextPage.screenshot({ 
          path: nextScreenshotPath,
          fullPage: true 
        });
        
        await nextContext.close();

        // Capture Demo screenshot
        const demoContext = await browser.newContext({
          viewport: { width: breakpoint.width, height: breakpoint.height }
        });
        const demoPage = await demoContext.newPage();
        
        await demoPage.goto(DEMO_URL + page.path, { waitUntil: 'networkidle' });
        await demoPage.waitForTimeout(1000); // Wait for animations
        
        const demoScreenshotPath = path.join(
          OUTPUT_DIR,
          'screenshots',
          `demo-${page.name}-${breakpoint.name}.png`
        );
        await demoPage.screenshot({ 
          path: demoScreenshotPath,
          fullPage: true 
        });
        
        await demoContext.close();

        console.log(`📸 Captured ${page.name} at ${breakpoint.name} (${breakpoint.width}px)`);
      }
    }
  });
});

test.describe('Visual Audit - Style Analysis', () => {
  test('analyze visual implementation details', async ({ browser }) => {
    const accessiblePagesData = await fs.readFile(
      path.join(OUTPUT_DIR, 'accessible-pages.json'),
      'utf-8'
    );
    const accessiblePages = JSON.parse(accessiblePagesData);
    
    const commonPages = accessiblePages.nextjs.filter(nextPage =>
      accessiblePages.demo.some(demoPage => demoPage.path === nextPage.path)
    );

    const styleComparison = {};

    for (const page of commonPages) {
      styleComparison[page.name] = {
        breakpoints: {}
      };

      for (const breakpoint of BREAKPOINTS) {
        const comparison = {
          nextjs: {},
          demo: {},
          differences: []
        };

        // Analyze Next.js styles
        const nextContext = await browser.newContext({
          viewport: { width: breakpoint.width, height: breakpoint.height }
        });
        const nextPage = await nextContext.newPage();
        await nextPage.goto(NEXTJS_URL + page.path, { waitUntil: 'networkidle' });

        // Extract computed styles for key elements
        comparison.nextjs = await nextPage.evaluate(() => {
          const extractStyles = (selector) => {
            const element = document.querySelector(selector);
            if (!element) return null;
            
            const computed = window.getComputedStyle(element);
            return {
              // Gradients
              backgroundImage: computed.backgroundImage,
              background: computed.background,
              
              // Colors
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              borderColor: computed.borderColor,
              
              // Shadows
              boxShadow: computed.boxShadow,
              textShadow: computed.textShadow,
              
              // Spacing
              padding: computed.padding,
              margin: computed.margin,
              gap: computed.gap,
              
              // Typography
              fontFamily: computed.fontFamily,
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              lineHeight: computed.lineHeight,
              letterSpacing: computed.letterSpacing,
              
              // Animations
              transition: computed.transition,
              animation: computed.animation,
              transform: computed.transform
            };
          };

          return {
            body: extractStyles('body'),
            header: extractStyles('header, nav, [role="navigation"]'),
            main: extractStyles('main, [role="main"]'),
            buttons: extractStyles('button, .btn, [role="button"]'),
            headings: {
              h1: extractStyles('h1'),
              h2: extractStyles('h2'),
              h3: extractStyles('h3')
            },
            cards: extractStyles('.card, [class*="card"]'),
            forms: extractStyles('form, input, textarea')
          };
        });

        await nextContext.close();

        // Analyze Demo styles
        const demoContext = await browser.newContext({
          viewport: { width: breakpoint.width, height: breakpoint.height }
        });
        const demoPage = await demoContext.newPage();
        await demoPage.goto(DEMO_URL + page.path, { waitUntil: 'networkidle' });

        comparison.demo = await demoPage.evaluate(() => {
          const extractStyles = (selector) => {
            const element = document.querySelector(selector);
            if (!element) return null;
            
            const computed = window.getComputedStyle(element);
            return {
              // Gradients
              backgroundImage: computed.backgroundImage,
              background: computed.background,
              
              // Colors
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              borderColor: computed.borderColor,
              
              // Shadows
              boxShadow: computed.boxShadow,
              textShadow: computed.textShadow,
              
              // Spacing
              padding: computed.padding,
              margin: computed.margin,
              gap: computed.gap,
              
              // Typography
              fontFamily: computed.fontFamily,
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              lineHeight: computed.lineHeight,
              letterSpacing: computed.letterSpacing,
              
              // Animations
              transition: computed.transition,
              animation: computed.animation,
              transform: computed.transform
            };
          };

          return {
            body: extractStyles('body'),
            header: extractStyles('header, nav, [role="navigation"]'),
            main: extractStyles('main, [role="main"]'),
            buttons: extractStyles('button, .btn, [role="button"]'),
            headings: {
              h1: extractStyles('h1'),
              h2: extractStyles('h2'),
              h3: extractStyles('h3')
            },
            cards: extractStyles('.card, [class*="card"]'),
            forms: extractStyles('form, input, textarea')
          };
        });

        await demoContext.close();

        // Compare styles
        const compareElements = (nextEl, demoEl, elementName) => {
          if (!nextEl || !demoEl) return;
          
          const diffs = [];
          for (const [prop, nextValue] of Object.entries(nextEl)) {
            if (nextValue !== demoEl[prop] && demoEl[prop]) {
              diffs.push({
                element: elementName,
                property: prop,
                nextjs: nextValue,
                demo: demoEl[prop]
              });
            }
          }
          return diffs;
        };

        // Compare all elements
        for (const [key, nextValue] of Object.entries(comparison.nextjs)) {
          if (key === 'headings') {
            for (const [heading, styles] of Object.entries(nextValue)) {
              const diffs = compareElements(
                styles, 
                comparison.demo.headings?.[heading], 
                `headings.${heading}`
              );
              if (diffs?.length) comparison.differences.push(...diffs);
            }
          } else {
            const diffs = compareElements(nextValue, comparison.demo[key], key);
            if (diffs?.length) comparison.differences.push(...diffs);
          }
        }

        styleComparison[page.name].breakpoints[breakpoint.name] = comparison;
      }
    }

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'style-comparison.json'),
      JSON.stringify(styleComparison, null, 2)
    );
  });
});

test.describe('Visual Audit - Fidelity Report', () => {
  test('generate comprehensive visual fidelity report', async () => {
    const styleComparisonData = await fs.readFile(
      path.join(OUTPUT_DIR, 'style-comparison.json'),
      'utf-8'
    );
    const styleComparison = JSON.parse(styleComparisonData);

    const report = {
      summary: {
        overallFidelity: 0,
        pageScores: {},
        criticalIssues: [],
        categoryBreakdown: {}
      },
      details: {}
    };

    // Initialize category scores
    for (const category of Object.keys(VISUAL_CRITERIA)) {
      report.summary.categoryBreakdown[category] = {
        score: 0,
        issues: 0,
        weight: VISUAL_CRITERIA[category].weight
      };
    }

    // Analyze each page
    for (const [pageName, pageData] of Object.entries(styleComparison)) {
      report.details[pageName] = {
        breakpoints: {},
        overallScore: 0,
        issues: []
      };

      let pageScore = 0;
      let breakpointCount = 0;

      for (const [breakpoint, data] of Object.entries(pageData.breakpoints)) {
        const differences = data.differences || [];
        let breakpointScore = 100;

        // Categorize differences
        const categorizedDiffs = {
          gradients: [],
          colors: [],
          shadows: [],
          spacing: [],
          typography: [],
          animations: []
        };

        for (const diff of differences) {
          for (const [category, config] of Object.entries(VISUAL_CRITERIA)) {
            if (config.checks.some(check => diff.property.toLowerCase().includes(check))) {
              categorizedDiffs[category].push(diff);
              report.summary.categoryBreakdown[category].issues++;
              break;
            }
          }
        }

        // Calculate score based on weighted categories
        for (const [category, diffs] of Object.entries(categorizedDiffs)) {
          if (diffs.length > 0) {
            const weight = VISUAL_CRITERIA[category].weight;
            const penalty = Math.min(diffs.length * 5, weight); // Max penalty is the weight
            breakpointScore -= penalty;
          }
        }

        breakpointScore = Math.max(0, breakpointScore);

        report.details[pageName].breakpoints[breakpoint] = {
          score: breakpointScore,
          differences: categorizedDiffs,
          totalDifferences: differences.length
        };

        pageScore += breakpointScore;
        breakpointCount++;

        // Identify critical issues
        if (breakpointScore < 70) {
          report.summary.criticalIssues.push({
            page: pageName,
            breakpoint: breakpoint,
            score: breakpointScore,
            mainIssues: Object.entries(categorizedDiffs)
              .filter(([_, diffs]) => diffs.length > 0)
              .map(([category, diffs]) => ({
                category,
                count: diffs.length,
                examples: diffs.slice(0, 2)
              }))
          });
        }
      }

      report.details[pageName].overallScore = pageScore / breakpointCount;
      report.summary.pageScores[pageName] = report.details[pageName].overallScore;
    }

    // Calculate overall fidelity
    const pageScores = Object.values(report.summary.pageScores);
    report.summary.overallFidelity = pageScores.length > 0
      ? pageScores.reduce((a, b) => a + b, 0) / pageScores.length
      : 0;

    // Calculate category scores
    const totalPages = Object.keys(styleComparison).length;
    const totalBreakpoints = BREAKPOINTS.length;
    const maxIssuesPerCategory = totalPages * totalBreakpoints * 5; // Arbitrary max

    for (const [category, data] of Object.entries(report.summary.categoryBreakdown)) {
      data.score = Math.max(0, 100 - (data.issues / maxIssuesPerCategory * 100));
    }

    // Generate markdown report
    let markdown = `# Visual Fidelity Report

Generated: ${new Date().toISOString()}

## Executive Summary

**Overall Visual Fidelity: ${report.summary.overallFidelity.toFixed(1)}%**

### Page Scores
${Object.entries(report.summary.pageScores)
  .map(([page, score]) => `- **${page}**: ${score.toFixed(1)}%`)
  .join('\n')}

### Category Breakdown
${Object.entries(report.summary.categoryBreakdown)
  .map(([category, data]) => 
    `- **${category.charAt(0).toUpperCase() + category.slice(1)}**: ${data.score.toFixed(1)}% (${data.issues} issues, weight: ${data.weight}%)`
  )
  .join('\n')}

## Critical Issues (Pages scoring below 70%)

${report.summary.criticalIssues.length === 0 
  ? 'No critical issues found! 🎉' 
  : report.summary.criticalIssues.map(issue => `
### ${issue.page} - ${issue.breakpoint} (${issue.score.toFixed(1)}%)
${issue.mainIssues.map(cat => `
**${cat.category}** (${cat.count} differences):
${cat.examples.map(ex => `
- \`${ex.property}\` on \`${ex.element}\`
  - Next.js: \`${ex.nextjs}\`
  - Demo: \`${ex.demo}\`
`).join('')}
`).join('')}
`).join('\n')}

## Detailed Analysis by Page

`;

    // Add detailed analysis for each page
    for (const [pageName, pageData] of Object.entries(report.details)) {
      markdown += `
### ${pageName} (Overall: ${pageData.overallScore.toFixed(1)}%)

`;
      for (const [breakpoint, bpData] of Object.entries(pageData.breakpoints)) {
        markdown += `#### ${breakpoint} - ${bpData.score.toFixed(1)}%
`;
        
        if (bpData.totalDifferences === 0) {
          markdown += `Perfect match! No visual differences detected.\n\n`;
        } else {
          for (const [category, diffs] of Object.entries(bpData.differences)) {
            if (diffs.length > 0) {
              markdown += `
**${category.charAt(0).toUpperCase() + category.slice(1)}** (${diffs.length} differences):
${diffs.slice(0, 3).map(d => `- \`${d.element}\` → \`${d.property}\``).join('\n')}
${diffs.length > 3 ? `- ... and ${diffs.length - 3} more\n` : ''}
`;
            }
          }
        }
      }
    }

    // Add recommendations
    markdown += `
## Recommendations

Based on the analysis, here are the top priorities:

`;

    // Sort categories by worst performance
    const worstCategories = Object.entries(report.summary.categoryBreakdown)
      .sort((a, b) => a[1].score - b[1].score)
      .slice(0, 3);

    for (const [category, data] of worstCategories) {
      markdown += `
### ${category.charAt(0).toUpperCase() + category.slice(1)} (${data.score.toFixed(1)}%)
`;
      
      switch(category) {
        case 'gradients':
          markdown += `- Review gradient implementations across all pages
- Ensure CSS gradient syntax matches demo exactly
- Check for vendor prefixes and fallbacks\n`;
          break;
        case 'colors':
          markdown += `- Audit color palette consistency
- Verify color values match design system
- Check for proper CSS variable usage\n`;
          break;
        case 'shadows':
          markdown += `- Review shadow values for consistency
- Ensure blur radius and spread match demo
- Check shadow color opacity values\n`;
          break;
        case 'spacing':
          markdown += `- Audit padding and margin values
- Ensure consistent spacing scale usage
- Review responsive spacing adjustments\n`;
          break;
        case 'typography':
          markdown += `- Verify font loading and fallbacks
- Check font weights and sizes
- Review line height and letter spacing\n`;
          break;
        case 'animations':
          markdown += `- Review transition timing and easing
- Check animation durations
- Ensure hover states match demo\n`;
          break;
      }
    }

    markdown += `
## Next Steps

1. Address critical issues on pages scoring below 70%
2. Focus on ${worstCategories[0][0]} improvements for biggest impact
3. Use browser DevTools to compare computed styles side-by-side
4. Run this audit again after fixes to track improvement

## Screenshots

Screenshots have been saved to: \`${path.join(OUTPUT_DIR, 'screenshots')}\`

Compare them visually using your preferred image diff tool.
`;

    // Save reports
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'visual-fidelity-report.md'),
      markdown
    );

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'visual-fidelity-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n📊 Visual Fidelity Report Generated!');
    console.log(`Overall Fidelity: ${report.summary.overallFidelity.toFixed(1)}%`);
    console.log(`Critical Issues: ${report.summary.criticalIssues.length}`);
    console.log(`\nReports saved to: ${OUTPUT_DIR}`);
  });
});