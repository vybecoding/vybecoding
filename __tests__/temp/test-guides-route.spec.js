const { test, expect } = require('@playwright/test');

test.describe('Guides Route Investigation', () => {
  // Test multiple ports to find where the server is running
  const ports = [3000, 3001, 3002];
  
  for (const port of ports) {
    test(`Check if server is running on port ${port}`, async ({ page }) => {
      try {
        const response = await page.goto(`http://localhost:${port}/guides`, {
          waitUntil: 'domcontentloaded',
          timeout: 10000
        });
        
        console.log(`Port ${port} - Status: ${response?.status()}`);
        
        if (response && response.ok()) {
          console.log(`✅ Server is running on port ${port}`);
          
          // Check for any console errors
          page.on('console', msg => {
            if (msg.type() === 'error') {
              console.log(`Console error: ${msg.text()}`);
            }
          });
          
          // Check for network failures
          page.on('requestfailed', request => {
            console.log(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
          });
          
          // Wait for page to fully load
          await page.waitForLoadState('networkidle');
          
          // Check if the page has the expected content
          const pageTitle = await page.textContent('h1');
          console.log(`Page title: ${pageTitle}`);
          
          // Take a screenshot for debugging
          await page.screenshot({ 
            path: `__tests__/temp/guides-page-port-${port}.png`,
            fullPage: true 
          });
        }
      } catch (error) {
        console.log(`Port ${port} - Error: ${error.message}`);
      }
    });
  }
  
  test('Detailed route analysis on correct port', async ({ page }) => {
    // First find the correct port
    let correctPort = null;
    
    for (const port of ports) {
      try {
        const response = await page.goto(`http://localhost:${port}`, { timeout: 5000 });
        if (response && response.ok()) {
          correctPort = port;
          break;
        }
      } catch (e) {
        // Continue to next port
      }
    }
    
    if (!correctPort) {
      throw new Error('No server found on any tested port');
    }
    
    console.log(`Using port ${correctPort} for detailed analysis`);
    
    // Set up console and network monitoring
    const consoleMessages = [];
    const networkRequests = [];
    const failedRequests = [];
    
    page.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location()
      });
    });
    
    page.on('request', request => {
      networkRequests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers()
      });
    });
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure()?.errorText
      });
    });
    
    // Navigate to guides page
    const response = await page.goto(`http://localhost:${correctPort}/guides`, {
      waitUntil: 'networkidle'
    });
    
    // Log all findings
    console.log('\n=== Response Details ===');
    console.log(`Status: ${response?.status()}`);
    console.log(`Status Text: ${response?.statusText()}`);
    
    console.log('\n=== Failed Requests ===');
    failedRequests.forEach(req => {
      console.log(`❌ ${req.url} - ${req.failure}`);
    });
    
    console.log('\n=== Console Messages ===');
    consoleMessages.forEach(msg => {
      if (msg.type === 'error') {
        console.log(`🔴 ERROR: ${msg.text}`);
      }
    });
    
    // Check for specific issues
    const has404s = failedRequests.some(req => req.url.includes('/guides'));
    if (has404s) {
      console.log('\n⚠️  Found 404 errors on /guides route');
      
      // Check if it's a client-side routing issue
      const pageContent = await page.content();
      console.log('\n=== Page Content Sample ===');
      console.log(pageContent.substring(0, 500));
    }
    
    // Save detailed report
    const report = {
      port: correctPort,
      responseStatus: response?.status(),
      failedRequests,
      consoleErrors: consoleMessages.filter(m => m.type === 'error'),
      timestamp: new Date().toISOString()
    };
    
    await page.evaluate((reportData) => {
      console.log('Detailed Report:', JSON.stringify(reportData, null, 2));
    }, report);
  });
});