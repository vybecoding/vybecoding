import { Page, Browser, BrowserContext } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

export interface VisualComparisonOptions {
  threshold?: number; // 0-1, default 0.1 (10% difference allowed)
  includeAA?: boolean; // Include anti-aliasing differences
  outputDiff?: boolean; // Generate diff image
}

export interface ComparisonResult {
  percentDifference: number;
  pixelsDifferent: number;
  totalPixels: number;
  diffImagePath?: string;
}

export class VisualTestingHelper {
  private browser: Browser;
  private demoUrl: string;
  private nextjsUrl: string;

  constructor(browser: Browser, demoUrl = 'http://localhost:8080', nextjsUrl = 'http://localhost:3000') {
    this.browser = browser;
    this.demoUrl = demoUrl;
    this.nextjsUrl = nextjsUrl;
  }

  /**
   * Create side-by-side browser contexts for visual comparison
   */
  async createComparisonContexts(viewport = { width: 1440, height: 900 }) {
    const demoContext = await this.browser.newContext({ viewport });
    const nextContext = await this.browser.newContext({ viewport });
    
    return {
      demo: {
        context: demoContext,
        page: await demoContext.newPage()
      },
      nextjs: {
        context: nextContext,
        page: await nextContext.newPage()
      }
    };
  }

  /**
   * Navigate to corresponding pages in both demo and Next.js
   */
  async navigateToPages(
    demoPage: Page, 
    nextPage: Page, 
    demoPath: string, 
    nextPath: string
  ) {
    await Promise.all([
      demoPage.goto(this.demoUrl + demoPath, { waitUntil: 'networkidle' }),
      nextPage.goto(this.nextjsUrl + nextPath, { waitUntil: 'domcontentloaded' })
    ]);

    // Wait for any animations to complete
    await demoPage.waitForTimeout(500);
    await nextPage.waitForTimeout(500);
  }

  /**
   * Extract key visual styles from a page
   */
  async extractVisualStyles(page: Page) {
    return await page.evaluate(() => {
      const getComputedStyles = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        
        const styles = window.getComputedStyle(element);
        return {
          // Colors
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor,
          // Gradients
          backgroundImage: styles.backgroundImage,
          // Typography
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          letterSpacing: styles.letterSpacing,
          // Shadows
          boxShadow: styles.boxShadow,
          textShadow: styles.textShadow,
          // Effects
          backdropFilter: styles.backdropFilter || 'none',
          filter: styles.filter,
          opacity: styles.opacity,
          transform: styles.transform,
          // Spacing
          padding: styles.padding,
          margin: styles.margin,
          gap: styles.gap,
        };
      };

      // Extract all unique gradients
      const gradients = new Set<string>();
      const shadows = new Set<string>();
      const colors = new Set<string>();
      
      document.querySelectorAll('*').forEach(el => {
        const computed = window.getComputedStyle(el);
        
        // Collect gradients
        if (computed.backgroundImage && computed.backgroundImage !== 'none') {
          if (computed.backgroundImage.includes('gradient')) {
            gradients.add(computed.backgroundImage);
          }
        }
        
        // Collect shadows
        if (computed.boxShadow && computed.boxShadow !== 'none') {
          shadows.add(computed.boxShadow);
        }
        
        // Collect colors
        if (computed.backgroundColor && computed.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors.add(computed.backgroundColor);
        }
      });

      return {
        elements: {
          body: getComputedStyles('body'),
          nav: getComputedStyles('nav, header'),
          hero: getComputedStyles('.hero, [class*="hero"], main > div:first-child'),
          heading: getComputedStyles('h1'),
          buttons: getComputedStyles('button, .btn, [class*="button"]'),
          cards: getComputedStyles('.card, [class*="card"]'),
          inputs: getComputedStyles('input, textarea'),
        },
        collections: {
          gradients: Array.from(gradients),
          shadows: Array.from(shadows),
          colors: Array.from(colors),
        },
        metrics: {
          totalGradients: gradients.size,
          totalShadows: shadows.size,
          totalColors: colors.size,
        }
      };
    });
  }

  /**
   * Compare two screenshots pixel by pixel
   */
  async compareScreenshots(
    screenshot1Path: string, 
    screenshot2Path: string,
    options: VisualComparisonOptions = {}
  ): Promise<ComparisonResult> {
    const { 
      threshold = 0.1, 
      includeAA = false, 
      outputDiff = true 
    } = options;

    const img1 = PNG.sync.read(fs.readFileSync(screenshot1Path));
    const img2 = PNG.sync.read(fs.readFileSync(screenshot2Path));

    const { width, height } = img1;
    const diff = outputDiff ? new PNG({ width, height }) : null;

    const pixelsDifferent = pixelmatch(
      img1.data,
      img2.data,
      diff?.data || null,
      width,
      height,
      { threshold, includeAA }
    );

    const totalPixels = width * height;
    const percentDifference = (pixelsDifferent / totalPixels) * 100;

    let diffImagePath: string | undefined;
    if (outputDiff && diff) {
      diffImagePath = screenshot1Path.replace('.png', '-diff.png');
      fs.writeFileSync(diffImagePath, PNG.sync.write(diff));
    }

    return {
      percentDifference,
      pixelsDifferent,
      totalPixels,
      diffImagePath
    };
  }

  /**
   * Generate a visual comparison report
   */
  generateComparisonReport(
    pageName: string,
    demoStyles: any,
    nextStyles: any,
    comparisonResults: Record<string, ComparisonResult>,
    outputPath: string
  ) {
    let report = `# Visual Comparison Report: ${pageName}\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;
    
    // Screenshot comparison results
    report += `## Screenshot Comparison\n\n`;
    for (const [viewport, result] of Object.entries(comparisonResults)) {
      report += `### ${viewport}\n`;
      report += `- Difference: ${result.percentDifference.toFixed(2)}%\n`;
      report += `- Pixels Different: ${result.pixelsDifferent.toLocaleString()} / ${result.totalPixels.toLocaleString()}\n`;
      if (result.diffImagePath) {
        report += `- [View Diff Image](${path.basename(result.diffImagePath)})\n`;
      }
      report += '\n';
    }
    
    // Style comparison
    report += `## Style Analysis\n\n`;
    
    // Gradients
    report += `### Gradients\n`;
    report += `- Demo: ${demoStyles.metrics.totalGradients} unique gradients\n`;
    report += `- Next.js: ${nextStyles.metrics.totalGradients} unique gradients\n`;
    
    if (demoStyles.metrics.totalGradients > 0 && nextStyles.metrics.totalGradients === 0) {
      report += `\n⚠️ **Warning**: Demo has gradients but Next.js has none!\n`;
    }
    report += '\n';
    
    // Shadows
    report += `### Shadows\n`;
    report += `- Demo: ${demoStyles.metrics.totalShadows} unique shadows\n`;
    report += `- Next.js: ${nextStyles.metrics.totalShadows} unique shadows\n\n`;
    
    // Element-by-element comparison
    report += `### Element Comparison\n\n`;
    
    for (const [element, demoStyle] of Object.entries(demoStyles.elements)) {
      const nextStyle = nextStyles.elements[element as keyof typeof nextStyles.elements];
      if (!demoStyle || !nextStyle) continue;
      
      report += `#### ${element.charAt(0).toUpperCase() + element.slice(1)}\n`;
      
      // Check for key differences
      const issues: string[] = [];
      
      if (demoStyle.backgroundImage !== nextStyle.backgroundImage) {
        issues.push('Background/gradient mismatch');
      }
      if (demoStyle.fontFamily !== nextStyle.fontFamily) {
        issues.push('Font family mismatch');
      }
      if (demoStyle.boxShadow !== nextStyle.boxShadow) {
        issues.push('Shadow mismatch');
      }
      if (demoStyle.backdropFilter !== nextStyle.backdropFilter) {
        issues.push('Glassmorphism mismatch');
      }
      
      if (issues.length > 0) {
        report += `⚠️ Issues: ${issues.join(', ')}\n`;
      } else {
        report += `✅ Styles match\n`;
      }
      report += '\n';
    }
    
    fs.writeFileSync(outputPath, report);
  }

  /**
   * Capture element-specific screenshots
   */
  async captureElementScreenshot(
    page: Page, 
    selector: string, 
    outputPath: string
  ): Promise<boolean> {
    try {
      const element = await page.$(selector);
      if (!element) return false;
      
      await element.screenshot({ path: outputPath });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Test responsive behavior
   */
  async testResponsiveLayouts(
    demoPage: Page,
    nextPage: Page,
    breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ]
  ) {
    const results: Record<string, any> = {};
    
    for (const breakpoint of breakpoints) {
      await demoPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await nextPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      
      // Wait for responsive changes
      await demoPage.waitForTimeout(300);
      await nextPage.waitForTimeout(300);
      
      // Extract layout information
      const demoLayout = await demoPage.evaluate(() => {
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');
        
        return {
          navDisplay: nav ? window.getComputedStyle(nav).display : null,
          mainGrid: main ? window.getComputedStyle(main).display : null,
          columnCount: document.querySelectorAll('.grid > *').length,
        };
      });
      
      const nextLayout = await nextPage.evaluate(() => {
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');
        
        return {
          navDisplay: nav ? window.getComputedStyle(nav).display : null,
          mainGrid: main ? window.getComputedStyle(main).display : null,
          columnCount: document.querySelectorAll('.grid > *').length,
        };
      });
      
      results[breakpoint.name] = {
        demo: demoLayout,
        nextjs: nextLayout,
        matches: JSON.stringify(demoLayout) === JSON.stringify(nextLayout)
      };
    }
    
    return results;
  }
}

// Export convenience functions
export async function createVisualTest(browser: Browser, demoUrl?: string, nextjsUrl?: string) {
  return new VisualTestingHelper(browser, demoUrl, nextjsUrl);
}

export { pixelmatch, PNG };