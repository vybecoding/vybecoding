const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '../../visual-snapshots/guide-unlocked-analysis');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const breakpoints = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

const demoUrl = 'http://localhost:8080/pages/guide-detail-unlocked.html';

test.describe('Guide Detail Unlocked - Demo Analysis', () => {
  for (const breakpoint of breakpoints) {
    test(`Screenshot demo at ${breakpoint.name} (${breakpoint.width}px)`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

      // Screenshot demo version
      console.log(`Taking demo screenshot at ${breakpoint.name}...`);
      await page.goto(demoUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Allow animations to complete
      
      const demoScreenshot = path.join(screenshotsDir, `demo-${breakpoint.name}-${breakpoint.width}px.png`);
      await page.screenshot({ 
        path: demoScreenshot, 
        fullPage: true,
        animations: 'disabled'
      });

      console.log(`Screenshot saved: ${demoScreenshot}`);
    });
  }

  test('Detailed component analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(demoUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const analysis = {
      url: demoUrl,
      timestamp: new Date().toISOString(),
      viewport: { width: 1440, height: 900 },
      components: {},
      layout: {},
      styles: {}
    };

    // Get page title
    analysis.pageTitle = await page.title();
    
    // Analyze overall layout
    const body = await page.locator('body').first();
    analysis.layout.bodyClasses = await body.getAttribute('class') || '';
    
    // Look for main content container
    const containers = await page.locator('main, .main, .container, .content, #content').all();
    analysis.layout.mainContainers = [];
    for (const container of containers) {
      if (await container.isVisible()) {
        analysis.layout.mainContainers.push({
          tagName: await container.evaluate(el => el.tagName.toLowerCase()),
          classes: await container.getAttribute('class') || '',
          bounds: await container.boundingBox()
        });
      }
    }

    // Analyze status/purchased indicator
    const statusSelectors = [
      '.purchased', '.status', '.purchased-status', '.status-badge',
      '[class*="purchased"]', '[class*="status"]', '[class*="unlock"]',
      '.bg-green-50', '.text-green-700', '.text-green-600'
    ];
    
    for (const selector of statusSelectors) {
      try {
        const elements = await page.locator(selector).all();
        for (const element of elements) {
          if (await element.isVisible()) {
            const text = (await element.textContent() || '').trim();
            if (text.toLowerCase().includes('purchased') || text.toLowerCase().includes('unlocked')) {
              analysis.components.statusBox = {
                present: true,
                selector: selector,
                text: text,
                classes: await element.getAttribute('class'),
                bounds: await element.boundingBox(),
                styles: {
                  backgroundColor: await element.evaluate(el => getComputedStyle(el).backgroundColor),
                  color: await element.evaluate(el => getComputedStyle(el).color),
                  padding: await element.evaluate(el => getComputedStyle(el).padding),
                  borderRadius: await element.evaluate(el => getComputedStyle(el).borderRadius)
                }
              };
              break;
            }
          }
        }
        if (analysis.components.statusBox) break;
      } catch (e) {
        // Continue to next selector
      }
    }

    // Analyze buttons
    const buttons = await page.locator('button, .button, .btn, a[class*="btn"]').all();
    analysis.components.buttons = [];
    for (const button of buttons) {
      if (await button.isVisible()) {
        const text = (await button.textContent() || '').trim();
        if (text) {
          analysis.components.buttons.push({
            text: text,
            classes: await button.getAttribute('class'),
            href: await button.getAttribute('href'),
            bounds: await button.boundingBox(),
            styles: {
              backgroundColor: await button.evaluate(el => getComputedStyle(el).backgroundColor),
              color: await button.evaluate(el => getComputedStyle(el).color),
              border: await button.evaluate(el => getComputedStyle(el).border),
              borderRadius: await button.evaluate(el => getComputedStyle(el).borderRadius),
              padding: await button.evaluate(el => getComputedStyle(el).padding)
            }
          });
        }
      }
    }

    // Analyze curriculum/modules section
    const curriculumSelectors = [
      '.curriculum', '.modules', '.guide-content', '.course-content',
      '[class*="curriculum"]', '[class*="module"]', 'ul li', 'ol li'
    ];
    
    for (const selector of curriculumSelectors) {
      try {
        const container = await page.locator(selector).first();
        if (await container.isVisible()) {
          const text = (await container.textContent() || '').trim();
          if (text.length > 50) { // Likely contains curriculum content
            const items = await container.locator('li, .item, .module-item').all();
            analysis.components.curriculum = {
              present: true,
              selector: selector,
              itemCount: items.length,
              bounds: await container.boundingBox(),
              sampleText: text.substring(0, 200) + '...'
            };
            break;
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Analyze stats section
    const statsSelectors = [
      '.stats', '.guide-stats', '.meta', '.info',
      '[class*="stats"]', '[class*="meta"]'
    ];
    
    for (const selector of statsSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.isVisible()) {
          const text = (await element.textContent() || '').trim();
          if (text.includes('students') || text.includes('hours') || text.includes('lessons')) {
            analysis.components.stats = {
              present: true,
              selector: selector,
              text: text,
              bounds: await element.boundingBox()
            };
            break;
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Analyze author section
    const authorSelectors = [
      '.author', '.instructor', '.guide-author', '.creator',
      '[class*="author"]', '[class*="instructor"]'
    ];
    
    for (const selector of authorSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.isVisible()) {
          analysis.components.author = {
            present: true,
            selector: selector,
            text: await element.textContent(),
            bounds: await element.boundingBox()
          };
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Extract all text content for analysis
    analysis.allText = await page.locator('body').textContent();

    // Save detailed analysis
    fs.writeFileSync(
      path.join(screenshotsDir, 'detailed-analysis.json'),
      JSON.stringify(analysis, null, 2)
    );

    console.log('Detailed analysis saved to detailed-analysis.json');
  });
});