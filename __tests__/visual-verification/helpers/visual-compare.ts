import { Page, expect, Locator } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs/promises';

export interface VisualCompareOptions {
  threshold?: number; // Pixel difference threshold (0-1)
  maxDiffPixels?: number; // Maximum allowed different pixels
  animations?: 'disabled' | 'allow'; // CSS animations
  mask?: Locator[]; // Elements to mask during comparison
  clip?: { x: number; y: number; width: number; height: number }; // Area to compare
  fullPage?: boolean; // Compare full page or viewport only
  waitForAnimations?: boolean; // Wait for animations to complete
  waitTime?: number; // Additional wait time in ms
}

export class VisualComparer {
  private demoUrl: string;
  private nextUrl: string;
  private reportData: any[] = [];

  constructor(demoBaseUrl: string = 'http://localhost:8080', nextBaseUrl: string = 'http://localhost:3000') {
    this.demoUrl = demoBaseUrl;
    this.nextUrl = nextBaseUrl;
  }

  /**
   * Compare a specific element between demo and Next.js
   */
  async compareElement(
    page: Page,
    demoPath: string,
    nextPath: string,
    selector: string,
    elementName: string,
    options: VisualCompareOptions = {}
  ) {
    const result = {
      elementName,
      selector,
      demoPath,
      nextPath,
      timestamp: new Date().toISOString(),
      viewport: page.viewportSize(),
      passed: false,
      error: null as string | null,
      screenshots: {} as any
    };

    try {
      // Navigate to demo page
      await page.goto(`${this.demoUrl}${demoPath}`, { waitUntil: 'networkidle' });
      if (options.waitTime) await page.waitForTimeout(options.waitTime);
      if (options.waitForAnimations) await this.waitForAnimations(page);
      
      const demoElement = page.locator(selector);
      await demoElement.waitFor({ state: 'visible' });
      
      // Take demo screenshot
      const demoScreenshot = await demoElement.screenshot({
        animations: options.animations || 'disabled',
        mask: options.mask,
        clip: options.clip
      });
      
      // Navigate to Next.js page
      await page.goto(`${this.nextUrl}${nextPath}`, { waitUntil: 'networkidle' });
      if (options.waitTime) await page.waitForTimeout(options.waitTime);
      if (options.waitForAnimations) await this.waitForAnimations(page);
      
      const nextElement = page.locator(selector);
      await nextElement.waitFor({ state: 'visible' });
      
      // Take Next.js screenshot
      const nextScreenshot = await nextElement.screenshot({
        animations: options.animations || 'disabled',
        mask: options.mask,
        clip: options.clip
      });

      // Save screenshots for reporting
      const screenshotDir = path.join('__tests__', 'visual-verification', 'reports', 'screenshots');
      await fs.mkdir(screenshotDir, { recursive: true });
      
      const demoPath = path.join(screenshotDir, `${elementName}-demo.png`);
      const nextPath = path.join(screenshotDir, `${elementName}-next.png`);
      
      await fs.writeFile(demoPath, demoScreenshot);
      await fs.writeFile(nextPath, nextScreenshot);
      
      result.screenshots = {
        demo: demoPath,
        next: nextPath
      };

      // Visual comparison
      await expect(nextScreenshot).toMatchSnapshot(`${elementName}.png`, {
        threshold: options.threshold || 0.2,
        maxDiffPixels: options.maxDiffPixels || 100
      });
      
      result.passed = true;
    } catch (error: any) {
      result.error = error.message;
      result.passed = false;
    }

    this.reportData.push(result);
    return result;
  }

  /**
   * Compare full page between demo and Next.js
   */
  async comparePage(
    page: Page,
    demoPath: string,
    nextPath: string,
    pageName: string,
    options: VisualCompareOptions = {}
  ) {
    const result = {
      pageName,
      demoPath,
      nextPath,
      timestamp: new Date().toISOString(),
      viewport: page.viewportSize(),
      passed: false,
      error: null as string | null,
      screenshots: {} as any,
      metrics: {} as any
    };

    try {
      // Navigate to demo page
      await page.goto(`${this.demoUrl}${demoPath}`, { waitUntil: 'networkidle' });
      if (options.waitTime) await page.waitForTimeout(options.waitTime);
      if (options.waitForAnimations) await this.waitForAnimations(page);
      
      // Capture demo metrics
      const demoMetrics = await this.capturePageMetrics(page);
      
      // Take demo screenshot
      const demoScreenshot = await page.screenshot({
        fullPage: options.fullPage !== false,
        animations: options.animations || 'disabled',
        mask: options.mask,
        clip: options.clip
      });
      
      // Navigate to Next.js page
      await page.goto(`${this.nextUrl}${nextPath}`, { waitUntil: 'networkidle' });
      if (options.waitTime) await page.waitForTimeout(options.waitTime);
      if (options.waitForAnimations) await this.waitForAnimations(page);
      
      // Capture Next.js metrics
      const nextMetrics = await this.capturePageMetrics(page);
      
      // Take Next.js screenshot
      const nextScreenshot = await page.screenshot({
        fullPage: options.fullPage !== false,
        animations: options.animations || 'disabled',
        mask: options.mask,
        clip: options.clip
      });

      // Save screenshots
      const screenshotDir = path.join('__tests__', 'visual-verification', 'reports', 'screenshots');
      await fs.mkdir(screenshotDir, { recursive: true });
      
      const demoScreenshotPath = path.join(screenshotDir, `${pageName}-demo-full.png`);
      const nextScreenshotPath = path.join(screenshotDir, `${pageName}-next-full.png`);
      
      await fs.writeFile(demoScreenshotPath, demoScreenshot);
      await fs.writeFile(nextScreenshotPath, nextScreenshot);
      
      result.screenshots = {
        demo: demoScreenshotPath,
        next: nextScreenshotPath
      };
      
      result.metrics = {
        demo: demoMetrics,
        next: nextMetrics
      };

      // Visual comparison
      await expect(nextScreenshot).toMatchSnapshot(`${pageName}-full.png`, {
        threshold: options.threshold || 0.2,
        maxDiffPixels: options.maxDiffPixels || 500
      });
      
      result.passed = true;
    } catch (error: any) {
      result.error = error.message;
      result.passed = false;
    }

    this.reportData.push(result);
    return result;
  }

  /**
   * Compare CSS styles between elements
   */
  async compareStyles(
    page: Page,
    demoPath: string,
    nextPath: string,
    selector: string,
    stylesToCheck: string[]
  ) {
    const result = {
      selector,
      demoPath,
      nextPath,
      styles: {} as any,
      matches: true,
      differences: [] as any[]
    };

    // Get demo styles
    await page.goto(`${this.demoUrl}${demoPath}`, { waitUntil: 'networkidle' });
    const demoElement = page.locator(selector);
    await demoElement.waitFor({ state: 'visible' });
    
    const demoStyles = await demoElement.evaluate((el, props) => {
      const computed = window.getComputedStyle(el);
      const styles: any = {};
      props.forEach(prop => {
        styles[prop] = computed.getPropertyValue(prop);
      });
      return styles;
    }, stylesToCheck);

    // Get Next.js styles
    await page.goto(`${this.nextUrl}${nextPath}`, { waitUntil: 'networkidle' });
    const nextElement = page.locator(selector);
    await nextElement.waitFor({ state: 'visible' });
    
    const nextStyles = await nextElement.evaluate((el, props) => {
      const computed = window.getComputedStyle(el);
      const styles: any = {};
      props.forEach(prop => {
        styles[prop] = computed.getPropertyValue(prop);
      });
      return styles;
    }, stylesToCheck);

    // Compare styles
    result.styles = { demo: demoStyles, next: nextStyles };
    
    stylesToCheck.forEach(style => {
      if (demoStyles[style] !== nextStyles[style]) {
        result.matches = false;
        result.differences.push({
          property: style,
          demo: demoStyles[style],
          next: nextStyles[style]
        });
      }
    });

    return result;
  }

  /**
   * Compare responsive behavior
   */
  async compareResponsive(
    page: Page,
    demoPath: string,
    nextPath: string,
    pageName: string,
    breakpoints: { name: string; width: number; height: number }[]
  ) {
    const results = [];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      
      const result = await this.comparePage(
        page,
        demoPath,
        nextPath,
        `${pageName}-${breakpoint.name}`,
        { fullPage: true }
      );
      
      results.push({
        breakpoint: breakpoint.name,
        viewport: { width: breakpoint.width, height: breakpoint.height },
        ...result
      });
    }

    return results;
  }

  /**
   * Generate comparison report
   */
  async generateReport() {
    const reportPath = path.join('__tests__', 'visual-verification', 'reports', 'comparison-report.json');
    const htmlReportPath = path.join('__tests__', 'visual-verification', 'reports', 'index.html');
    
    // Save JSON report
    await fs.writeFile(reportPath, JSON.stringify(this.reportData, null, 2));
    
    // Generate HTML report
    const htmlContent = this.generateHTMLReport();
    await fs.writeFile(htmlReportPath, htmlContent);
    
    return {
      jsonPath: reportPath,
      htmlPath: htmlReportPath,
      summary: this.generateSummary()
    };
  }

  private generateSummary() {
    const total = this.reportData.length;
    const passed = this.reportData.filter(r => r.passed).length;
    const failed = total - passed;
    
    return {
      total,
      passed,
      failed,
      passRate: total > 0 ? (passed / total * 100).toFixed(2) + '%' : '0%'
    };
  }

  private generateHTMLReport(): string {
    const summary = this.generateSummary();
    
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Visual Comparison Report</title>
  <style>
    body { font-family: -apple-system, sans-serif; margin: 20px; background: #f5f5f5; }
    .header { background: #1a1a1a; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .summary { display: flex; gap: 20px; margin-bottom: 30px; }
    .stat { background: white; padding: 20px; border-radius: 8px; flex: 1; }
    .stat h3 { margin: 0 0 10px 0; color: #666; font-size: 14px; }
    .stat .value { font-size: 32px; font-weight: bold; }
    .passed { color: #22c55e; }
    .failed { color: #ef4444; }
    .test { background: white; padding: 20px; margin-bottom: 10px; border-radius: 8px; }
    .test.failed { border-left: 4px solid #ef4444; }
    .test.passed { border-left: 4px solid #22c55e; }
    .screenshots { display: flex; gap: 20px; margin-top: 15px; }
    .screenshot { flex: 1; }
    .screenshot img { width: 100%; border: 1px solid #ddd; border-radius: 4px; }
    .error { background: #fee; padding: 10px; border-radius: 4px; margin-top: 10px; color: #c00; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Visual Comparison Report</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>
  </div>
  
  <div class="summary">
    <div class="stat">
      <h3>Total Tests</h3>
      <div class="value">${summary.total}</div>
    </div>
    <div class="stat">
      <h3>Passed</h3>
      <div class="value passed">${summary.passed}</div>
    </div>
    <div class="stat">
      <h3>Failed</h3>
      <div class="value failed">${summary.failed}</div>
    </div>
    <div class="stat">
      <h3>Pass Rate</h3>
      <div class="value">${summary.passRate}</div>
    </div>
  </div>
  
  <div class="tests">
    ${this.reportData.map(test => `
      <div class="test ${test.passed ? 'passed' : 'failed'}">
        <h3>${test.elementName || test.pageName}</h3>
        <p><strong>Status:</strong> ${test.passed ? '✅ Passed' : '❌ Failed'}</p>
        <p><strong>Demo Path:</strong> ${test.demoPath}</p>
        <p><strong>Next Path:</strong> ${test.nextPath}</p>
        ${test.error ? `<div class="error">${test.error}</div>` : ''}
        ${test.screenshots ? `
          <div class="screenshots">
            <div class="screenshot">
              <h4>Demo</h4>
              <img src="${test.screenshots.demo}" alt="Demo screenshot">
            </div>
            <div class="screenshot">
              <h4>Next.js</h4>
              <img src="${test.screenshots.next}" alt="Next.js screenshot">
            </div>
          </div>
        ` : ''}
      </div>
    `).join('')}
  </div>
</body>
</html>
    `;
  }

  private async waitForAnimations(page: Page) {
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.querySelectorAll('*')).map(element => {
          const animations = element.getAnimations();
          return Promise.all(animations.map(animation => animation.finished));
        })
      );
    });
  }

  private async capturePageMetrics(page: Page) {
    return await page.evaluate(() => {
      return {
        documentHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
        elementsCount: document.querySelectorAll('*').length,
        imagesCount: document.querySelectorAll('img').length,
        formsCount: document.querySelectorAll('form').length
      };
    });
  }
}