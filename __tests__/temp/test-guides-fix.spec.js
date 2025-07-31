const { test, expect } = require('@playwright/test');

test.describe('Fix Guides Route 404 Errors', () => {
  test('Intercept and fix 404 requests', async ({ page, context }) => {
    // Track all failed requests
    const failedRequests = [];
    const interceptedRequests = [];
    
    // Set up request interception
    await context.route('**/*', async (route, request) => {
      const url = request.url();
      
      // If it's trying to access localhost:3000/guides, redirect to correct port
      if (url.includes('localhost:3000/guides')) {
        const newUrl = url.replace('localhost:3000', 'localhost:3001');
        console.log(`Redirecting: ${url} -> ${newUrl}`);
        interceptedRequests.push({ original: url, redirected: newUrl });
        
        // Make the request to the correct port
        try {
          const response = await page.request.get(newUrl);
          const body = await response.body();
          await route.fulfill({
            status: response.status(),
            headers: response.headers(),
            body: body
          });
        } catch (error) {
          console.error(`Failed to redirect request: ${error.message}`);
          await route.continue();
        }
      } else {
        await route.continue();
      }
    });
    
    // Track failed requests
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure()?.errorText
      });
    });
    
    // Navigate to the guides page
    await page.goto('http://localhost:3001/guides', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // Wait a bit to catch any delayed requests
    await page.waitForTimeout(5000);
    
    console.log('\n=== Intercepted Requests ===');
    interceptedRequests.forEach(req => {
      console.log(`✓ Redirected: ${req.original} -> ${req.redirected}`);
    });
    
    console.log('\n=== Failed Requests After Fix ===');
    if (failedRequests.length === 0) {
      console.log('✅ No failed requests!');
    } else {
      failedRequests.forEach(req => {
        console.log(`❌ ${req.url} - ${req.failure}`);
      });
    }
    
    // Check if the page loaded correctly
    const pageTitle = await page.textContent('h1');
    console.log(`\nPage title: ${pageTitle}`);
    
    // Take a screenshot
    await page.screenshot({ 
      path: '__tests__/temp/guides-page-fixed.png',
      fullPage: true 
    });
    
    // Verify the page has the expected content
    await expect(page.locator('h1')).toContainText('Guides');
  });

  test('Identify source of polling requests', async ({ page }) => {
    console.log('\n=== Identifying Polling Source ===');
    
    const pollingScripts = [];
    
    // Intercept all JavaScript execution
    await page.addInitScript(() => {
      // Override setTimeout to track polling
      const originalSetTimeout = window.setTimeout;
      window.setTimeout = function(callback, delay, ...args) {
        const stack = new Error().stack;
        if (callback.toString().includes('check') || 
            callback.toString().includes('guides') ||
            callback.toString().includes('3000')) {
          console.log(`[POLLING DETECTED] setTimeout with delay ${delay}ms`);
          console.log(`Function: ${callback.toString().substring(0, 200)}...`);
          console.log(`Stack: ${stack}`);
        }
        return originalSetTimeout.call(this, callback, delay, ...args);
      };
      
      // Override fetch to track requests
      const originalFetch = window.fetch;
      window.fetch = function(url, ...args) {
        if (url.toString().includes('guides') || url.toString().includes('3000')) {
          console.log(`[FETCH DETECTED] ${url}`);
          console.log(`Stack: ${new Error().stack}`);
        }
        return originalFetch.call(this, url, ...args);
      };
    });
    
    // Listen to console messages
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[POLLING DETECTED]') || text.includes('[FETCH DETECTED]')) {
        pollingScripts.push(text);
        console.log(text);
      }
    });
    
    // Navigate to the page
    await page.goto('http://localhost:3001/guides', {
      waitUntil: 'domcontentloaded'
    });
    
    // Wait to catch polling
    await page.waitForTimeout(10000);
    
    console.log(`\nFound ${pollingScripts.length} polling attempts`);
  });
});