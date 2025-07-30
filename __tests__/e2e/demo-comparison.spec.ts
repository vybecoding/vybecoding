import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Configuration for page mappings
const PAGE_MAPPINGS: Record<string, { demo: string; nextjs: string; name: string }> = {
  home: { demo: '/pages/home.html', nextjs: '/', name: 'Home Page' },
  apps: { demo: '/pages/apps.html', nextjs: '/apps', name: 'Apps Listing' },
  guides: { demo: '/pages/guides.html', nextjs: '/guides', name: 'Guides Listing' },
  dashboard: { demo: '/pages/dashboard.html', nextjs: '/dashboard', name: 'Dashboard' },
  profile: { demo: '/pages/profile.html', nextjs: '/profile', name: 'Profile' },
  'sign-in': { demo: '/pages/auth/sign-in.html', nextjs: '/sign-in', name: 'Sign In' },
  'sign-up': { demo: '/pages/auth/sign-up.html', nextjs: '/sign-up', name: 'Sign Up' },
};

// Get pages to test from environment or default to all
const PAGES_TO_TEST = process.env.STORY_PAGES?.split(',') || Object.keys(PAGE_MAPPINGS);
const DEMO_URL = process.env.DEMO_URL || 'http://localhost:8080';
const NEXTJS_URL = process.env.NEXTJS_URL || 'http://localhost:3000';

test.describe('Demo vs Next.js Visual Comparison', () => {
  test.describe.configure({ mode: 'parallel' });

  // Helper function to extract visual styles
  async function extractVisualStyles(page: Page) {
    return await page.evaluate(() => {
      const getElementStyles = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        
        const computed = window.getComputedStyle(element);
        return {
          // Colors
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          // Gradients
          backgroundImage: computed.backgroundImage,
          // Typography
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          // Shadows
          boxShadow: computed.boxShadow,
          textShadow: computed.textShadow,
          // Layout
          padding: computed.padding,
          margin: computed.margin,
          // Effects
          backdropFilter: computed.backdropFilter || 'none',
          filter: computed.filter,
          opacity: computed.opacity,
        };
      };

      // Extract gradients from all elements
      const gradients: string[] = [];
      document.querySelectorAll('*').forEach(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none' && bg.includes('gradient')) {
          gradients.push(bg);
        }
      });

      return {
        body: getElementStyles('body'),
        nav: getElementStyles('nav'),
        main: getElementStyles('main'),
        hero: getElementStyles('.hero, [class*="hero"], h1'),
        buttons: getElementStyles('button, .btn, [class*="button"]'),
        cards: getElementStyles('.card, [class*="card"]'),
        gradients: [...new Set(gradients)],
      };
    });
  }

  // Test each page
  for (const pageKey of PAGES_TO_TEST) {
    const pageConfig = PAGE_MAPPINGS[pageKey];
    if (!pageConfig) continue;

    test.describe(`${pageConfig.name} Comparison`, () => {
      test('visual comparison at desktop (1440px)', async ({ browser }) => {
        // Create contexts for demo and Next.js
        const demoContext = await browser.newContext({
          viewport: { width: 1440, height: 900 }
        });
        const nextContext = await browser.newContext({
          viewport: { width: 1440, height: 900 }
        });

        const demoPage = await demoContext.newPage();
        const nextPage = await nextContext.newPage();

        // Navigate to both pages
        await demoPage.goto(DEMO_URL + pageConfig.demo, { waitUntil: 'networkidle' });
        await nextPage.goto(NEXTJS_URL + pageConfig.nextjs, { waitUntil: 'domcontentloaded' });

        // Take screenshots
        const screenshotDir = `visual-snapshots/comparison/${pageKey}`;
        fs.mkdirSync(screenshotDir, { recursive: true });

        await demoPage.screenshot({
          path: path.join(screenshotDir, 'demo-desktop.png'),
          fullPage: true
        });

        await nextPage.screenshot({
          path: path.join(screenshotDir, 'nextjs-desktop.png'),
          fullPage: true
        });

        // Extract and compare styles
        const demoStyles = await extractVisualStyles(demoPage);
        const nextStyles = await extractVisualStyles(nextPage);

        // Save style comparison
        fs.writeFileSync(
          path.join(screenshotDir, 'style-comparison.json'),
          JSON.stringify({ demo: demoStyles, nextjs: nextStyles }, null, 2)
        );

        // Visual checks
        if (demoStyles.gradients.length > 0) {
          expect(nextStyles.gradients.length).toBeGreaterThan(0);
        }

        await demoContext.close();
        await nextContext.close();
      });

      test('visual comparison at mobile (375px)', async ({ browser }) => {
        const demoContext = await browser.newContext({
          viewport: { width: 375, height: 812 }
        });
        const nextContext = await browser.newContext({
          viewport: { width: 375, height: 812 }
        });

        const demoPage = await demoContext.newPage();
        const nextPage = await nextContext.newPage();

        await demoPage.goto(DEMO_URL + pageConfig.demo, { waitUntil: 'networkidle' });
        await nextPage.goto(NEXTJS_URL + pageConfig.nextjs, { waitUntil: 'domcontentloaded' });

        const screenshotDir = `visual-snapshots/comparison/${pageKey}`;
        
        await demoPage.screenshot({
          path: path.join(screenshotDir, 'demo-mobile.png'),
          fullPage: true
        });

        await nextPage.screenshot({
          path: path.join(screenshotDir, 'nextjs-mobile.png'),
          fullPage: true
        });

        await demoContext.close();
        await nextContext.close();
      });

      test('generate visual diff report', async ({ page }) => {
        const screenshotDir = `visual-snapshots/comparison/${pageKey}`;
        const reportPath = path.join(screenshotDir, 'visual-report.md');
        
        // Read style comparison if it exists
        let styleComparison: any = {};
        const styleFile = path.join(screenshotDir, 'style-comparison.json');
        if (fs.existsSync(styleFile)) {
          styleComparison = JSON.parse(fs.readFileSync(styleFile, 'utf-8'));
        }

        // Generate markdown report
        let report = `# Visual Comparison Report: ${pageConfig.name}\n\n`;
        report += `Demo: ${pageConfig.demo}\n`;
        report += `Next.js: ${pageConfig.nextjs}\n\n`;
        
        report += `## Screenshots\n`;
        report += `- Desktop: demo-desktop.png vs nextjs-desktop.png\n`;
        report += `- Mobile: demo-mobile.png vs nextjs-mobile.png\n\n`;
        
        report += `## Style Analysis\n\n`;
        
        // Compare gradients
        if (styleComparison.demo?.gradients && styleComparison.nextjs?.gradients) {
          report += `### Gradients\n`;
          report += `- Demo: ${styleComparison.demo.gradients.length} gradients found\n`;
          report += `- Next.js: ${styleComparison.nextjs.gradients.length} gradients found\n\n`;
        }
        
        // Compare key elements
        const elements = ['body', 'nav', 'hero', 'buttons', 'cards'];
        for (const elem of elements) {
          if (styleComparison.demo?.[elem] && styleComparison.nextjs?.[elem]) {
            report += `### ${elem.charAt(0).toUpperCase() + elem.slice(1)} Styles\n`;
            
            const demoStyle = styleComparison.demo[elem];
            const nextStyle = styleComparison.nextjs[elem];
            
            // Check for differences
            if (demoStyle.backgroundImage !== nextStyle.backgroundImage) {
              report += `- ⚠️ Background gradient mismatch\n`;
            }
            if (demoStyle.fontFamily !== nextStyle.fontFamily) {
              report += `- ⚠️ Font family mismatch\n`;
            }
            if (demoStyle.boxShadow !== nextStyle.boxShadow) {
              report += `- ⚠️ Shadow effects mismatch\n`;
            }
            report += '\n';
          }
        }
        
        fs.writeFileSync(reportPath, report);
      });
    });
  }

  test('generate overall comparison summary', async ({ page }) => {
    const summaryPath = 'visual-snapshots/comparison/summary.md';
    let summary = '# Visual Comparison Summary\n\n';
    summary += `Generated: ${new Date().toISOString()}\n\n`;
    summary += '## Pages Tested\n\n';
    
    for (const pageKey of PAGES_TO_TEST) {
      const pageConfig = PAGE_MAPPINGS[pageKey];
      if (!pageConfig) continue;
      
      summary += `- [${pageConfig.name}](${pageKey}/visual-report.md)\n`;
    }
    
    summary += '\n## How to Review\n\n';
    summary += '1. Open each visual-report.md for detailed analysis\n';
    summary += '2. Compare screenshot pairs side-by-side\n';
    summary += '3. Review style-comparison.json for exact CSS values\n';
    summary += '4. Focus on gradients, shadows, and typography differences\n';
    
    fs.mkdirSync('visual-snapshots/comparison', { recursive: true });
    fs.writeFileSync(summaryPath, summary);
  });
});