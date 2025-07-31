const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '../../visual-snapshots/guide-unlocked-comparison');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const breakpoints = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

const demoUrl = 'http://localhost:8080/pages/guide-detail-unlocked.html';
const nextjsUrl = 'http://localhost:3000/guides/advanced-claude-api-mastery/unlocked';

test.describe('Guide Detail Unlocked - Visual Comparison', () => {
  for (const breakpoint of breakpoints) {
    test(`Visual comparison at ${breakpoint.name} (${breakpoint.width}px)`, async ({ page }) => {
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

      // Screenshot Next.js version
      console.log(`Taking Next.js screenshot at ${breakpoint.name}...`);
      await page.goto(nextjsUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Allow animations to complete
      
      const nextjsScreenshot = path.join(screenshotsDir, `nextjs-${breakpoint.name}-${breakpoint.width}px.png`);
      await page.screenshot({ 
        path: nextjsScreenshot, 
        fullPage: true,
        animations: 'disabled'
      });

      console.log(`Screenshots saved for ${breakpoint.name} breakpoint`);
    });
  }

  test('Component-level analysis - Demo version', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(demoUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const analysis = {
      url: demoUrl,
      breakpoint: 'desktop-1440px',
      components: {}
    };

    // Analyze status box
    try {
      const statusBox = await page.locator('.status-box, .purchased-status, [data-testid="status"], .bg-green-50').first();
      if (await statusBox.isVisible()) {
        const statusBounds = await statusBox.boundingBox();
        analysis.components.statusBox = {
          present: true,
          position: statusBounds,
          text: await statusBox.textContent(),
          classes: await statusBox.getAttribute('class')
        };
      }
    } catch (e) {
      analysis.components.statusBox = { present: false, error: e.message };
    }

    // Analyze action buttons
    try {
      const buttons = await page.locator('button, .button, .btn').all();
      analysis.components.buttons = [];
      for (const button of buttons) {
        if (await button.isVisible()) {
          analysis.components.buttons.push({
            text: await button.textContent(),
            classes: await button.getAttribute('class'),
            bounds: await button.boundingBox()
          });
        }
      }
    } catch (e) {
      analysis.components.buttons = { error: e.message };
    }

    // Analyze curriculum section
    try {
      const curriculum = await page.locator('.curriculum, .modules, [data-testid="curriculum"]').first();
      if (await curriculum.isVisible()) {
        const modules = await curriculum.locator('.module, .curriculum-item, li').all();
        analysis.components.curriculum = {
          present: true,
          moduleCount: modules.length,
          bounds: await curriculum.boundingBox()
        };
      }
    } catch (e) {
      analysis.components.curriculum = { present: false, error: e.message };
    }

    // Analyze stats section
    try {
      const stats = await page.locator('.stats, .guide-stats, [data-testid="stats"]').first();
      if (await stats.isVisible()) {
        analysis.components.stats = {
          present: true,
          bounds: await stats.boundingBox(),
          text: await stats.textContent()
        };
      }
    } catch (e) {
      analysis.components.stats = { present: false, error: e.message };
    }

    // Analyze author section
    try {
      const author = await page.locator('.author, .guide-author, [data-testid="author"]').first();
      if (await author.isVisible()) {
        analysis.components.author = {
          present: true,
          bounds: await author.boundingBox(),
          text: await author.textContent()
        };
      }
    } catch (e) {
      analysis.components.author = { present: false, error: e.message };
    }

    // Save analysis
    fs.writeFileSync(
      path.join(screenshotsDir, 'demo-component-analysis.json'),
      JSON.stringify(analysis, null, 2)
    );
  });

  test('Component-level analysis - Next.js version', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(nextjsUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const analysis = {
      url: nextjsUrl,
      breakpoint: 'desktop-1440px',
      components: {}
    };

    // Analyze status box
    try {
      const statusBox = await page.locator('.status-box, .purchased-status, [data-testid="status"], .bg-green-50').first();
      if (await statusBox.isVisible()) {
        const statusBounds = await statusBox.boundingBox();
        analysis.components.statusBox = {
          present: true,
          position: statusBounds,
          text: await statusBox.textContent(),
          classes: await statusBox.getAttribute('class')
        };
      }
    } catch (e) {
      analysis.components.statusBox = { present: false, error: e.message };
    }

    // Analyze action buttons
    try {
      const buttons = await page.locator('button, .button, .btn').all();
      analysis.components.buttons = [];
      for (const button of buttons) {
        if (await button.isVisible()) {
          analysis.components.buttons.push({
            text: await button.textContent(),
            classes: await button.getAttribute('class'),
            bounds: await button.boundingBox()
          });
        }
      }
    } catch (e) {
      analysis.components.buttons = { error: e.message };
    }

    // Analyze curriculum section
    try {
      const curriculum = await page.locator('.curriculum, .modules, [data-testid="curriculum"]').first();
      if (await curriculum.isVisible()) {
        const modules = await curriculum.locator('.module, .curriculum-item, li').all();
        analysis.components.curriculum = {
          present: true,
          moduleCount: modules.length,
          bounds: await curriculum.boundingBox()
        };
      }
    } catch (e) {
      analysis.components.curriculum = { present: false, error: e.message };
    }

    // Analyze stats section
    try {
      const stats = await page.locator('.stats, .guide-stats, [data-testid="stats"]').first();
      if (await stats.isVisible()) {
        analysis.components.stats = {
          present: true,
          bounds: await stats.boundingBox(),
          text: await stats.textContent()
        };
      }
    } catch (e) {
      analysis.components.stats = { present: false, error: e.message };
    }

    // Analyze author section
    try {
      const author = await page.locator('.author, .guide-author, [data-testid="author"]').first();
      if (await author.isVisible()) {
        analysis.components.author = {
          present: true,
          bounds: await author.boundingBox(),
          text: await author.textContent()
        };
      }
    } catch (e) {
      analysis.components.author = { present: false, error: e.message };
    }

    // Save analysis
    fs.writeFileSync(
      path.join(screenshotsDir, 'nextjs-component-analysis.json'),
      JSON.stringify(analysis, null, 2)
    );
  });
});