import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testServicesPage() {
  console.log('🔍 Testing Services Page...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    timeout: 60000 
  });
  
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Create output directory
    const outputDir = path.join(__dirname, 'services-screenshots');
    await fs.mkdir(outputDir, { recursive: true });
    
    const report = {
      timestamp: new Date().toISOString(),
      results: [],
      summary: {}
    };
    
    // Try to test the Next.js version first
    console.log('Testing Next.js Services Page...');
    
    try {
      // Try with shorter timeout
      await page.goto('http://localhost:3000/services', { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });
      
      console.log('✅ Page loaded successfully');
      
      // Take screenshot immediately
      await page.screenshot({
        path: path.join(outputDir, 'services-nextjs-initial.png'),
        fullPage: true
      });
      
      // Check for basic elements
      const title = await page.title();
      const h1Text = await page.locator('h1').first().textContent().catch(() => 'No H1 found');
      const bodyText = await page.locator('body').textContent();
      
      report.results.push({
        version: 'Next.js',
        url: 'http://localhost:3000/services',
        loaded: true,
        title: title,
        h1: h1Text,
        hasContent: bodyText.length > 100,
        timestamp: new Date().toISOString()
      });
      
      // Try to find service-related elements
      const serviceElements = await page.locator('[class*="service"], [id*="service"]').count();
      const buttons = await page.locator('button').count();
      const links = await page.locator('a').count();
      
      report.results[0].elements = {
        serviceRelated: serviceElements,
        buttons: buttons,
        links: links
      };
      
      console.log(`Found ${serviceElements} service-related elements`);
      console.log(`Found ${buttons} buttons`);
      console.log(`Found ${links} links`);
      
      // Test responsiveness
      const breakpoints = [
        { name: 'mobile', width: 375 },
        { name: 'tablet', width: 768 },
        { name: 'desktop', width: 1440 }
      ];
      
      for (const bp of breakpoints) {
        await page.setViewportSize({ width: bp.width, height: 800 });
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: path.join(outputDir, `services-nextjs-${bp.name}.png`),
          fullPage: true
        });
        console.log(`📸 Captured ${bp.name} screenshot`);
      }
      
    } catch (error) {
      console.error('❌ Failed to load Next.js services page:', error.message);
      report.results.push({
        version: 'Next.js',
        url: 'http://localhost:3000/services',
        loaded: false,
        error: error.message
      });
    }
    
    // Test if there's a demo version
    console.log('\nChecking for demo version...');
    
    // Try common service page URLs
    const demoUrls = [
      'http://localhost:8080/services.html',
      'http://localhost:8080/pages/services.html',
      'http://localhost:8080/service.html',
      'http://localhost:8080/'
    ];
    
    for (const url of demoUrls) {
      try {
        const response = await page.goto(url, { 
          waitUntil: 'domcontentloaded',
          timeout: 5000 
        });
        
        if (response && response.ok()) {
          console.log(`✅ Found page at ${url}`);
          await page.screenshot({
            path: path.join(outputDir, `demo-${url.split('/').pop() || 'index'}.png`),
            fullPage: true
          });
          
          report.results.push({
            version: 'Demo',
            url: url,
            loaded: true,
            status: response.status()
          });
          break;
        }
      } catch (e) {
        // Silent fail, try next URL
      }
    }
    
    // Generate summary
    report.summary = {
      totalTests: report.results.length,
      successful: report.results.filter(r => r.loaded).length,
      failed: report.results.filter(r => !r.loaded).length,
      hasNextJs: report.results.some(r => r.version === 'Next.js' && r.loaded),
      hasDemo: report.results.some(r => r.version === 'Demo' && r.loaded)
    };
    
    // Save report
    await fs.writeFile(
      path.join(outputDir, 'test-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    // Generate simple HTML report
    const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <title>Services Page Test Results</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .success { color: green; }
    .error { color: red; }
    .result { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
    img { max-width: 100%; margin: 10px 0; border: 1px solid #ddd; }
  </style>
</head>
<body>
  <h1>Services Page Test Results</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>
  
  <h2>Summary</h2>
  <ul>
    <li>Total Tests: ${report.summary.totalTests}</li>
    <li class="${report.summary.successful > 0 ? 'success' : 'error'}">
      Successful: ${report.summary.successful}
    </li>
    <li class="${report.summary.failed > 0 ? 'error' : ''}">
      Failed: ${report.summary.failed}
    </li>
  </ul>
  
  <h2>Test Results</h2>
  ${report.results.map(r => `
    <div class="result">
      <h3>${r.version} - ${r.url}</h3>
      <p class="${r.loaded ? 'success' : 'error'}">
        Status: ${r.loaded ? 'Loaded Successfully' : 'Failed to Load'}
      </p>
      ${r.error ? `<p class="error">Error: ${r.error}</p>` : ''}
      ${r.title ? `<p>Title: ${r.title}</p>` : ''}
      ${r.h1 ? `<p>H1: ${r.h1}</p>` : ''}
      ${r.elements ? `
        <p>Elements Found:</p>
        <ul>
          <li>Service-related: ${r.elements.serviceRelated}</li>
          <li>Buttons: ${r.elements.buttons}</li>
          <li>Links: ${r.elements.links}</li>
        </ul>
      ` : ''}
    </div>
  `).join('')}
  
  <h2>Screenshots</h2>
  <p>View captured screenshots in: <code>${outputDir}</code></p>
</body>
</html>
    `;
    
    await fs.writeFile(
      path.join(outputDir, 'test-report.html'),
      htmlReport
    );
    
    console.log('\n✅ Testing complete!');
    console.log(`📁 Results saved to: ${outputDir}`);
    console.log(`📊 View report: ${path.join(outputDir, 'test-report.html')}`);
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testServicesPage().catch(console.error);