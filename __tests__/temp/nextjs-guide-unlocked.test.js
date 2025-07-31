import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '../../visual-snapshots/nextjs-guide-unlocked');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const breakpoints = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

const nextjsUrl = 'http://localhost:3000/guides/claude-api-fundamentals/unlocked';

test.describe('Guide Detail Unlocked - Next.js Implementation', () => {
  for (const breakpoint of breakpoints) {
    test(`Screenshot Next.js at ${breakpoint.name} (${breakpoint.width}px)`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

      try {
        console.log(`Taking Next.js screenshot at ${breakpoint.name}...`);
        await page.goto(nextjsUrl, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(3000); // Allow content to load
        
        const nextjsScreenshot = path.join(screenshotsDir, `nextjs-${breakpoint.name}-${breakpoint.width}px.png`);
        await page.screenshot({ 
          path: nextjsScreenshot, 
          fullPage: true,
          animations: 'disabled'
        });

        console.log(`Screenshot saved: ${nextjsScreenshot}`);
      } catch (error) {
        console.log(`Failed to screenshot Next.js at ${breakpoint.name}: ${error.message}`);
        
        // Take a screenshot of whatever we got (might be 404 or error page)
        const errorScreenshot = path.join(screenshotsDir, `nextjs-error-${breakpoint.name}-${breakpoint.width}px.png`);
        await page.screenshot({ 
          path: errorScreenshot, 
          fullPage: true,
          animations: 'disabled'
        });
      }
    });
  }

  test('Component analysis - attempt Next.js', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const analysis = {
      url: nextjsUrl,
      timestamp: new Date().toISOString(),
      viewport: { width: 1440, height: 900 },
      loadStatus: 'unknown',
      components: {},
      pageContent: ''
    };

    try {
      await page.goto(nextjsUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(3000);
      
      analysis.loadStatus = 'success';
      analysis.pageTitle = await page.title();
      analysis.pageContent = await page.locator('body').textContent();
      
      // Look for purchased/unlocked status
      const statusElements = await page.locator('[data-testid*="status"], .purchased, .unlocked, .bg-green-50, [class*="CheckCircle"]').all();
      for (const element of statusElements) {
        if (await element.isVisible()) {
          analysis.components.statusBox = {
            present: true,
            text: await element.textContent(),
            bounds: await element.boundingBox()
          };
          break;
        }
      }
      
      // Look for action buttons
      const buttons = await page.locator('button, .btn').all();
      analysis.components.buttons = [];
      for (const button of buttons) {
        if (await button.isVisible()) {
          const text = await button.textContent();
          if (text && text.trim()) {
            analysis.components.buttons.push({
              text: text.trim(),
              bounds: await button.boundingBox()
            });
          }
        }
      }
      
    } catch (error) {
      analysis.loadStatus = 'error';
      analysis.error = error.message;
      
      // Try to get whatever content exists
      try {
        analysis.pageTitle = await page.title();
        analysis.pageContent = await page.locator('body').textContent();
      } catch (e) {
        analysis.pageContent = 'Failed to get page content';
      }
    }

    // Save analysis
    fs.writeFileSync(
      path.join(screenshotsDir, 'nextjs-analysis.json'),
      JSON.stringify(analysis, null, 2)
    );

    console.log('Next.js analysis saved');
  });
});