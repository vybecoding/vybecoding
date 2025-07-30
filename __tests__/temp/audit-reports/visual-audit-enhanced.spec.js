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

// Pages to test - comprehensive list based on demo structure
const PAGES_TO_TEST = [
  { path: '/', name: 'home' },
  { path: '/pages/apps.html', name: 'apps' },
  { path: '/pages/guides.html', name: 'guides' },
  { path: '/pages/dashboard.html', name: 'dashboard' },
  { path: '/pages/profile.html', name: 'profile' },
  { path: '/pages/auth/login.html', name: 'login' },
  { path: '/pages/auth/sign-up.html', name: 'signup' },
  // App specific pages
  { path: '/pages/apps/browse.html', name: 'apps-browse' },
  { path: '/pages/apps/submit.html', name: 'apps-submit' },
  // Dashboard specific pages
  { path: '/pages/dashboard/overview.html', name: 'dashboard-overview' },
  { path: '/pages/dashboard/profile.html', name: 'dashboard-profile' },
  { path: '/pages/dashboard/settings.html', name: 'dashboard-settings' },
  { path: '/pages/dashboard/mentorship.html', name: 'dashboard-mentorship' },
  // Guides specific pages
  { path: '/pages/guides/browse.html', name: 'guides-browse' },
  { path: '/pages/guides/submit.html', name: 'guides-submit' },
  // Profile specific pages
  { path: '/pages/profile/view.html', name: 'profile-view' },
  { path: '/pages/profile/booking.html', name: 'profile-booking' }
];

// Map demo paths to Next.js paths
const PATH_MAPPING = {
  '/': '/',
  '/pages/apps.html': '/apps',
  '/pages/guides.html': '/guides',
  '/pages/dashboard.html': '/dashboard',
  '/pages/profile.html': '/profile',
  '/pages/auth/login.html': '/login',
  '/pages/auth/sign-up.html': '/signup',
  '/pages/apps/browse.html': '/apps',
  '/pages/apps/submit.html': '/apps/submit',
  '/pages/dashboard/overview.html': '/dashboard',
  '/pages/dashboard/profile.html': '/dashboard/profile',
  '/pages/dashboard/settings.html': '/dashboard/settings',
  '/pages/dashboard/mentorship.html': '/dashboard/mentorship',
  '/pages/guides/browse.html': '/guides',
  '/pages/guides/submit.html': '/guides/submit',
  '/pages/profile/view.html': '/profile',
  '/pages/profile/booking.html': '/profile/booking'
};

// Visual comparison criteria with demo-specific focus
const VISUAL_CRITERIA = {
  gradients: {
    weight: 25, // Higher weight for gradients as they're prominent in the demo
    checks: ['background-image', 'background', 'linear-gradient', 'radial-gradient'],
    demoPatterns: [
      'linear-gradient(180deg, rgba(16, 24, 48, 0.15) 0%, rgba(16, 24, 48, 0) 50%)',
      'linear-gradient(90deg, #7928CA 0%, #FF4F5A 100%)',
      'radial-gradient'
    ]
  },
  colors: {
    weight: 20,
    checks: ['color', 'background-color', 'border-color', 'fill', 'stroke'],
    demoColors: {
      primary: '#FF4F5A',
      secondary: '#7928CA',
      text: '#101830',
      surface: '#F5F5FA',
      border: 'rgba(16, 24, 48, 0.05)'
    }
  },
  shadows: {
    weight: 20, // Important for card depth
    checks: ['box-shadow', 'text-shadow', 'filter'],
    demoShadows: [
      '0 1px 3px 0 rgba(16, 24, 48, 0.05)',
      '0 10px 40px -12px rgba(16, 24, 48, 0.12)',
      '0 20px 60px -12px rgba(16, 24, 48, 0.15)'
    ]
  },
  spacing: {
    weight: 15,
    checks: ['padding', 'margin', 'gap', 'space'],
    demoSpacing: {
      card: '20px',
      section: '48px',
      container: '1140px'
    }
  },
  typography: {
    weight: 10,
    checks: ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'],
    demoFonts: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      sizes: ['48px', '36px', '24px', '18px', '16px', '14px']
    }
  },
  animations: {
    weight: 10,
    checks: ['transition', 'animation', 'transform'],
    demoTransitions: [
      'all 0.3s ease',
      'transform 0.3s ease',
      'opacity 0.3s ease'
    ]
  }
};

// Create output directory
const OUTPUT_DIR = path.join(__dirname, 'visual-audit-results');

test.beforeAll(async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, 'screenshots'), { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, 'demo-only'), { recursive: true });
});

test.describe('Visual Audit - Server Check', () => {
  test('check server availability', async ({ browser }) => {
    const servers = {
      nextjs: { url: NEXTJS_URL, available: false },
      demo: { url: DEMO_URL, available: false }
    };

    for (const [name, server] of Object.entries(servers)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      try {
        await page.goto(server.url, { timeout: 5000, waitUntil: 'domcontentloaded' });
        server.available = true;
        console.log(`✅ ${name} server is running at ${server.url}`);
      } catch (error) {
        console.log(`❌ ${name} server is not available at ${server.url}`);
      }
      
      await context.close();
    }

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'server-status.json'),
      JSON.stringify(servers, null, 2)
    );

    if (!servers.demo.available) {
      throw new Error('Demo server must be running for visual audit');
    }
  });
});

test.describe('Visual Audit - Demo Analysis', () => {
  test('capture and analyze demo implementation', async ({ browser }) => {
    const demoAnalysis = {
      pages: {},
      designSystem: {
        colors: new Set(),
        gradients: new Set(),
        shadows: new Set(),
        fonts: new Set()
      }
    };

    for (const page of PAGES_TO_TEST) {
      demoAnalysis.pages[page.name] = { breakpoints: {} };
      
      for (const breakpoint of BREAKPOINTS) {
        const context = await browser.newContext({
          viewport: { width: breakpoint.width, height: breakpoint.height }
        });
        const demoPage = await context.newPage();
        
        try {
          await demoPage.goto(DEMO_URL + page.path, { waitUntil: 'networkidle' });
          await demoPage.waitForTimeout(500);
          
          // Capture screenshot
          const screenshotPath = path.join(
            OUTPUT_DIR,
            'demo-only',
            `demo-${page.name}-${breakpoint.name}.png`
          );
          await demoPage.screenshot({ path: screenshotPath, fullPage: true });
          
          // Extract design tokens
          const designTokens = await demoPage.evaluate(() => {
            const tokens = {
              colors: new Set(),
              gradients: new Set(),
              shadows: new Set(),
              fonts: new Set(),
              elements: {}
            };
            
            // Extract from all elements
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
              const computed = window.getComputedStyle(el);
              
              // Colors
              if (computed.color) tokens.colors.add(computed.color);
              if (computed.backgroundColor && computed.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                tokens.colors.add(computed.backgroundColor);
              }
              
              // Gradients
              if (computed.backgroundImage && computed.backgroundImage.includes('gradient')) {
                tokens.gradients.add(computed.backgroundImage);
              }
              
              // Shadows
              if (computed.boxShadow && computed.boxShadow !== 'none') {
                tokens.shadows.add(computed.boxShadow);
              }
              
              // Fonts
              if (computed.fontFamily) {
                tokens.fonts.add(computed.fontFamily);
              }
            });
            
            // Extract key elements
            const selectors = {
              hero: '.hero, [class*="hero"]',
              card: '.card, [class*="card"]',
              button: 'button, .btn, [class*="btn"]',
              nav: 'nav, header, [role="navigation"]',
              heading: 'h1, h2, h3'
            };
            
            for (const [name, selector] of Object.entries(selectors)) {
              const el = document.querySelector(selector);
              if (el) {
                const computed = window.getComputedStyle(el);
                tokens.elements[name] = {
                  background: computed.background,
                  color: computed.color,
                  boxShadow: computed.boxShadow,
                  padding: computed.padding,
                  borderRadius: computed.borderRadius,
                  fontSize: computed.fontSize,
                  fontWeight: computed.fontWeight
                };
              }
            }
            
            return {
              colors: Array.from(tokens.colors),
              gradients: Array.from(tokens.gradients),
              shadows: Array.from(tokens.shadows),
              fonts: Array.from(tokens.fonts),
              elements: tokens.elements
            };
          });
          
          demoAnalysis.pages[page.name].breakpoints[breakpoint.name] = designTokens;
          
          // Aggregate design system
          designTokens.colors.forEach(c => demoAnalysis.designSystem.colors.add(c));
          designTokens.gradients.forEach(g => demoAnalysis.designSystem.gradients.add(g));
          designTokens.shadows.forEach(s => demoAnalysis.designSystem.shadows.add(s));
          designTokens.fonts.forEach(f => demoAnalysis.designSystem.fonts.add(f));
          
          console.log(`📸 Analyzed demo ${page.name} at ${breakpoint.name}`);
        } catch (error) {
          console.log(`⚠️  Could not analyze demo ${page.name}: ${error.message}`);
        }
        
        await context.close();
      }
    }
    
    // Convert sets to arrays for JSON
    demoAnalysis.designSystem = {
      colors: Array.from(demoAnalysis.designSystem.colors),
      gradients: Array.from(demoAnalysis.designSystem.gradients),
      shadows: Array.from(demoAnalysis.designSystem.shadows),
      fonts: Array.from(demoAnalysis.designSystem.fonts)
    };
    
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'demo-analysis.json'),
      JSON.stringify(demoAnalysis, null, 2)
    );
  });
});

test.describe('Visual Audit - Comparison', () => {
  test('compare implementations if Next.js is available', async ({ browser }) => {
    const serverStatus = JSON.parse(
      await fs.readFile(path.join(OUTPUT_DIR, 'server-status.json'), 'utf-8')
    );
    
    if (!serverStatus.nextjs.available) {
      console.log('⚠️  Next.js server not available - skipping comparison');
      console.log('📋 To run comparison:');
      console.log('   1. Start Next.js: npm run dev');
      console.log('   2. Re-run this test');
      return;
    }
    
    const comparisonResults = {};
    
    for (const page of PAGES_TO_TEST) {
      const nextjsPath = PATH_MAPPING[page.path] || page.path;
      comparisonResults[page.name] = { breakpoints: {} };
      
      for (const breakpoint of BREAKPOINTS) {
        const comparison = { differences: [] };
        
        // Capture Next.js
        const nextContext = await browser.newContext({
          viewport: { width: breakpoint.width, height: breakpoint.height }
        });
        const nextPage = await nextContext.newPage();
        
        try {
          await nextPage.goto(NEXTJS_URL + nextjsPath, { waitUntil: 'networkidle' });
          await nextPage.waitForTimeout(500);
          
          const nextScreenshot = path.join(
            OUTPUT_DIR,
            'screenshots',
            `nextjs-${page.name}-${breakpoint.name}.png`
          );
          await nextPage.screenshot({ path: nextScreenshot, fullPage: true });
          
          // Extract Next.js styles
          const nextStyles = await nextPage.evaluate(() => {
            const extractElement = (selector) => {
              const el = document.querySelector(selector);
              if (!el) return null;
              const computed = window.getComputedStyle(el);
              return {
                background: computed.background,
                backgroundImage: computed.backgroundImage,
                color: computed.color,
                boxShadow: computed.boxShadow,
                padding: computed.padding,
                margin: computed.margin,
                borderRadius: computed.borderRadius,
                fontSize: computed.fontSize,
                fontWeight: computed.fontWeight,
                fontFamily: computed.fontFamily
              };
            };
            
            return {
              body: extractElement('body'),
              hero: extractElement('.hero, [class*="hero"]'),
              card: extractElement('.card, [class*="card"]'),
              button: extractElement('button, .btn, [class*="btn"]'),
              nav: extractElement('nav, header, [role="navigation"]')
            };
          });
          
          // Load demo analysis for comparison
          const demoAnalysis = JSON.parse(
            await fs.readFile(path.join(OUTPUT_DIR, 'demo-analysis.json'), 'utf-8')
          );
          const demoStyles = demoAnalysis.pages[page.name]?.breakpoints[breakpoint.name]?.elements || {};
          
          // Compare styles
          for (const [element, nextStyle] of Object.entries(nextStyles)) {
            const demoStyle = demoStyles[element];
            if (nextStyle && demoStyle) {
              for (const [prop, nextValue] of Object.entries(nextStyle)) {
                if (demoStyle[prop] && nextValue !== demoStyle[prop]) {
                  comparison.differences.push({
                    element,
                    property: prop,
                    nextjs: nextValue,
                    demo: demoStyle[prop]
                  });
                }
              }
            }
          }
          
          comparisonResults[page.name].breakpoints[breakpoint.name] = comparison;
          console.log(`🔍 Compared ${page.name} at ${breakpoint.name}: ${comparison.differences.length} differences`);
          
        } catch (error) {
          console.log(`⚠️  Could not compare ${page.name}: ${error.message}`);
        }
        
        await nextContext.close();
      }
    }
    
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'comparison-results.json'),
      JSON.stringify(comparisonResults, null, 2)
    );
  });
});

test.describe('Visual Audit - Report Generation', () => {
  test('generate comprehensive visual report', async () => {
    const serverStatus = JSON.parse(
      await fs.readFile(path.join(OUTPUT_DIR, 'server-status.json'), 'utf-8')
    );
    const demoAnalysis = JSON.parse(
      await fs.readFile(path.join(OUTPUT_DIR, 'demo-analysis.json'), 'utf-8')
    );
    
    let markdown = `# Visual Audit Report

Generated: ${new Date().toISOString()}

## Server Status

- **Demo Server**: ${serverStatus.demo.available ? '✅ Running' : '❌ Not Available'}
- **Next.js Server**: ${serverStatus.nextjs.available ? '✅ Running' : '❌ Not Available'}

`;

    if (!serverStatus.nextjs.available) {
      markdown += `
## ⚠️  Next.js Comparison Not Available

The Next.js server is not running. This report contains only the demo analysis.

To enable full comparison:
1. Start Next.js server: \`npm run dev\`
2. Re-run the visual audit

`;
    }

    markdown += `## Demo Design System Analysis

### Colors Found
${demoAnalysis.designSystem.colors
  .filter(c => c && !c.includes('rgba(0, 0, 0, 0)'))
  .slice(0, 10)
  .map(c => `- \`${c}\``)
  .join('\n')}

### Gradients Used
${demoAnalysis.designSystem.gradients
  .slice(0, 5)
  .map(g => `- \`${g.substring(0, 80)}...\``)
  .join('\n')}

### Shadows Applied
${demoAnalysis.designSystem.shadows
  .slice(0, 5)
  .map(s => `- \`${s}\``)
  .join('\n')}

### Typography
${demoAnalysis.designSystem.fonts
  .slice(0, 3)
  .map(f => `- \`${f}\``)
  .join('\n')}

`;

    if (serverStatus.nextjs.available && await fs.access(path.join(OUTPUT_DIR, 'comparison-results.json')).then(() => true).catch(() => false)) {
      const comparison = JSON.parse(
        await fs.readFile(path.join(OUTPUT_DIR, 'comparison-results.json'), 'utf-8')
      );
      
      markdown += `## Visual Fidelity Comparison

`;
      
      let totalDifferences = 0;
      const pageSummary = [];
      
      for (const [page, data] of Object.entries(comparison)) {
        let pageDiffs = 0;
        for (const [breakpoint, bpData] of Object.entries(data.breakpoints)) {
          pageDiffs += bpData.differences?.length || 0;
        }
        totalDifferences += pageDiffs;
        pageSummary.push({ page, differences: pageDiffs });
      }
      
      markdown += `### Summary
- **Total Pages Analyzed**: ${Object.keys(comparison).length}
- **Total Visual Differences**: ${totalDifferences}
- **Average per Page**: ${(totalDifferences / Object.keys(comparison).length).toFixed(1)}

### Pages by Difference Count
${pageSummary
  .sort((a, b) => b.differences - a.differences)
  .map(p => `- **${p.page}**: ${p.differences} differences`)
  .join('\n')}

### Critical Issues
`;
      
      // Find most common issues
      const issueTypes = {};
      for (const [page, data] of Object.entries(comparison)) {
        for (const [breakpoint, bpData] of Object.entries(data.breakpoints)) {
          for (const diff of (bpData.differences || [])) {
            const key = `${diff.property}`;
            issueTypes[key] = (issueTypes[key] || 0) + 1;
          }
        }
      }
      
      const topIssues = Object.entries(issueTypes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      markdown += `
Most common property differences:
${topIssues.map(([prop, count]) => `- **${prop}**: ${count} occurrences`).join('\n')}
`;
    }

    markdown += `
## Implementation Guidelines

Based on the demo analysis, ensure your Next.js implementation includes:

### 1. Gradient Implementation
Key gradients to implement:
\`\`\`css
/* Hero/Header gradient */
background-image: linear-gradient(180deg, rgba(16, 24, 48, 0.15) 0%, rgba(16, 24, 48, 0) 50%);

/* Button/CTA gradient */
background: linear-gradient(90deg, #7928CA 0%, #FF4F5A 100%);
\`\`\`

### 2. Shadow System
\`\`\`css
/* Card shadows */
--shadow-sm: 0 1px 3px 0 rgba(16, 24, 48, 0.05);
--shadow-md: 0 10px 40px -12px rgba(16, 24, 48, 0.12);
--shadow-lg: 0 20px 60px -12px rgba(16, 24, 48, 0.15);
\`\`\`

### 3. Color Palette
\`\`\`css
--color-primary: #FF4F5A;
--color-secondary: #7928CA;
--color-text: #101830;
--color-surface: #F5F5FA;
--color-border: rgba(16, 24, 48, 0.05);
\`\`\`

### 4. Responsive Breakpoints
- Mobile: 375px
- Tablet: 768px  
- Desktop: 1440px

## Screenshots

Demo screenshots saved to: \`${path.join(OUTPUT_DIR, 'demo-only')}\`
${serverStatus.nextjs.available ? `Comparison screenshots saved to: \`${path.join(OUTPUT_DIR, 'screenshots')}\`` : ''}

## Next Steps

1. ${!serverStatus.nextjs.available ? 'Start Next.js server and re-run for full comparison' : 'Review visual differences in detail'}
2. Implement missing design tokens in your Tailwind/CSS configuration
3. Use browser DevTools to inspect specific elements
4. Run visual regression tests after implementing fixes
`;

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'visual-audit-report.md'),
      markdown
    );
    
    console.log('\n📊 Visual Audit Report Generated!');
    console.log(`Report saved to: ${path.join(OUTPUT_DIR, 'visual-audit-report.md')}`);
  });
});