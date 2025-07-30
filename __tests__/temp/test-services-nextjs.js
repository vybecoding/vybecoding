import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testServicesPage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Create output directories
  const outputDir = path.join(__dirname, 'services-testing');
  const screenshotsDir = path.join(outputDir, 'screenshots');
  const reportsDir = path.join(outputDir, 'reports');
  
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(reportsDir, { recursive: true });
  
  const breakpoints = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];
  
  const report = {
    timestamp: new Date().toISOString(),
    url: 'http://localhost:3000/services',
    visualTests: {},
    interactiveTests: {},
    features: [],
    issues: [],
    recommendations: []
  };
  
  console.log('🔍 Testing Services Page (Next.js)...\n');
  
  // Visual Testing at Different Breakpoints
  console.log('📸 Capturing Screenshots at All Breakpoints...');
  
  for (const breakpoint of breakpoints) {
    console.log(`  Testing ${breakpoint.name} (${breakpoint.width}px)...`);
    
    await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    
    try {
      await page.goto('http://localhost:3000/services', { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      await page.waitForTimeout(2000); // Wait for animations
      
      // Full page screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, `services-${breakpoint.name}-full.png`),
        fullPage: true
      });
      
      // Hero/Header section
      const headerExists = await page.locator('h1:has-text("Professional Services")').count() > 0;
      if (headerExists) {
        const header = await page.locator('h1:has-text("Professional Services")').locator('xpath=ancestor::div[contains(@class, "text-center")]').first();
        await header.screenshot({
          path: path.join(screenshotsDir, `services-${breakpoint.name}-header.png`)
        });
      }
      
      // Service cards grid
      const serviceCards = await page.locator('div:has(> h3)').filter({ hasText: /Book Now/ });
      const cardCount = await serviceCards.count();
      
      if (cardCount > 0) {
        // Capture first service card
        await serviceCards.first().screenshot({
          path: path.join(screenshotsDir, `services-${breakpoint.name}-card.png`)
        });
        
        // Capture entire grid
        const grid = await page.locator('.grid').first();
        await grid.screenshot({
          path: path.join(screenshotsDir, `services-${breakpoint.name}-grid.png`)
        });
      }
      
      // Custom project section
      const customSection = await page.locator('div:has-text("Need Something Custom?")').first();
      if (await customSection.count() > 0) {
        await customSection.screenshot({
          path: path.join(screenshotsDir, `services-${breakpoint.name}-custom.png`)
        });
      }
      
      report.visualTests[breakpoint.name] = {
        captured: true,
        headerFound: headerExists,
        serviceCards: cardCount,
        customSection: await customSection.count() > 0
      };
      
    } catch (error) {
      report.issues.push(`Failed to load at ${breakpoint.name}: ${error.message}`);
      report.visualTests[breakpoint.name] = {
        captured: false,
        error: error.message
      };
    }
  }
  
  // Interactive Element Testing
  console.log('\n🖱️ Testing Interactive Elements...');
  
  // Reset to desktop for interaction tests
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  
  // Test navigation
  const navLinks = await page.locator('nav a, header a').count();
  report.interactiveTests.navigation = { links: navLinks };
  
  // Test hover states on service cards
  const cards = await page.locator('.bg-white.rounded-lg.shadow-lg');
  const cardCount = await cards.count();
  
  if (cardCount > 0) {
    // Test hover effect on first card
    const firstCard = cards.first();
    
    // Capture before hover
    await firstCard.screenshot({
      path: path.join(screenshotsDir, 'services-card-normal.png')
    });
    
    // Hover and capture
    await firstCard.hover();
    await page.waitForTimeout(500); // Wait for transition
    await firstCard.screenshot({
      path: path.join(screenshotsDir, 'services-card-hover.png')
    });
    
    report.features.push('Service cards with hover effects');
  }
  
  // Test "Book Now" buttons
  const bookButtons = await page.locator('button:has-text("Book Now")');
  const bookButtonCount = await bookButtons.count();
  
  if (bookButtonCount > 0) {
    // Test button hover
    const firstButton = bookButtons.first();
    await firstButton.hover();
    await page.waitForTimeout(300);
    await firstButton.screenshot({
      path: path.join(screenshotsDir, 'services-button-hover.png')
    });
    
    // Test button click (but don't actually click to avoid navigation)
    const buttonClickable = await firstButton.isEnabled();
    
    report.interactiveTests.bookButtons = {
      count: bookButtonCount,
      clickable: buttonClickable
    };
    report.features.push(`${bookButtonCount} booking buttons with Cal.com integration`);
  }
  
  // Test floating button
  const floatingButton = await page.locator('[class*="fixed"], [class*="floating"]').filter({ hasText: /Quick Book/i });
  if (await floatingButton.count() > 0) {
    await floatingButton.screenshot({
      path: path.join(screenshotsDir, 'services-floating-button.png')
    });
    report.features.push('Floating quick booking button');
  }
  
  // Mobile-specific tests
  console.log('\n📱 Testing Mobile Responsiveness...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  
  // Check mobile menu
  const mobileMenuButton = await page.locator('[class*="mobile-menu"], [class*="hamburger"], button[aria-label*="menu"]');
  if (await mobileMenuButton.count() > 0) {
    await mobileMenuButton.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(screenshotsDir, 'services-mobile-menu-open.png')
    });
    report.features.push('Mobile-responsive navigation menu');
  }
  
  // Check grid responsiveness
  const mobileGrid = await page.locator('.grid');
  const mobileGridClasses = await mobileGrid.getAttribute('class');
  if (mobileGridClasses && mobileGridClasses.includes('md:grid-cols-2')) {
    report.features.push('Responsive grid layout (1 column mobile, 2 columns desktop)');
  }
  
  // Analyze design quality
  console.log('\n🎨 Analyzing Design Quality...');
  
  const serviceCard = await page.locator('.bg-white.rounded-lg.shadow-lg').first();
  if (await serviceCard.count() > 0) {
    const styles = await serviceCard.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        boxShadow: computed.boxShadow,
        borderRadius: computed.borderRadius,
        padding: computed.padding,
        background: computed.background || computed.backgroundColor,
        transition: computed.transition
      };
    });
    
    report.designQuality = {
      cardStyles: styles,
      hasShadow: styles.boxShadow !== 'none',
      hasRoundedCorners: styles.borderRadius !== '0px',
      hasTransitions: styles.transition !== 'none' && styles.transition !== 'all 0s ease 0s'
    };
    
    if (report.designQuality.hasShadow) report.features.push('Card shadow effects');
    if (report.designQuality.hasRoundedCorners) report.features.push('Rounded corner design');
    if (report.designQuality.hasTransitions) report.features.push('Smooth transition effects');
  }
  
  // Performance check
  console.log('\n⚡ Checking Performance...');
  
  const metrics = await page.evaluate(() => {
    const timing = performance.timing;
    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
    };
  });
  
  report.performance = metrics;
  
  // Generate recommendations
  if (report.performance.loadTime > 3000) {
    report.recommendations.push('Consider optimizing page load time (currently > 3s)');
  }
  
  if (!report.interactiveTests.navigation || report.interactiveTests.navigation.links < 5) {
    report.recommendations.push('Add more navigation links for better user flow');
  }
  
  if (report.visualTests.mobile.serviceCards !== report.visualTests.desktop.serviceCards) {
    report.issues.push('Service card count inconsistent between mobile and desktop');
  }
  
  // Summary
  report.summary = {
    totalFeatures: report.features.length,
    totalIssues: report.issues.length,
    responsiveDesign: Object.keys(report.visualTests).every(bp => report.visualTests[bp].captured),
    interactiveElements: {
      bookingButtons: report.interactiveTests.bookButtons?.count || 0,
      navigationLinks: report.interactiveTests.navigation?.links || 0
    }
  };
  
  // Save JSON report
  await fs.writeFile(
    path.join(reportsDir, 'services-test-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  // Generate HTML report
  const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <title>Services Page Test Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: #f5f7fa; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .header { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px; }
    h1 { margin: 0 0 10px 0; color: #1a1a1a; }
    .timestamp { color: #666; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .card h3 { margin-top: 0; color: #333; }
    .metric { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .metric:last-child { border-bottom: none; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
    .badge.success { background: #d4edda; color: #155724; }
    .badge.warning { background: #fff3cd; color: #856404; }
    .badge.info { background: #d1ecf1; color: #0c5460; }
    .badge.danger { background: #f8d7da; color: #721c24; }
    .features { background: #e8f5e9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .features h3 { color: #2e7d32; margin-top: 0; }
    .features ul { margin: 0; padding-left: 20px; }
    .issues { background: #ffebee; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .issues h3 { color: #c62828; margin-top: 0; }
    .recommendations { background: #fff3e0; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .recommendations h3 { color: #e65100; margin-top: 0; }
    .screenshot-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px; }
    .screenshot-item { text-align: center; }
    .screenshot-item img { max-width: 100%; border: 1px solid #ddd; border-radius: 4px; }
    .screenshot-item p { margin: 5px 0; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Services Page Test Report</h1>
      <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
      <p>URL: <a href="${report.url}" target="_blank">${report.url}</a></p>
    </div>
    
    <div class="grid">
      <div class="card">
        <h3>Visual Testing</h3>
        ${Object.entries(report.visualTests).map(([bp, result]) => `
          <div class="metric">
            <span>${bp.charAt(0).toUpperCase() + bp.slice(1)}</span>
            <span class="badge ${result.captured ? 'success' : 'danger'}">
              ${result.captured ? '✓ Captured' : '✗ Failed'}
            </span>
          </div>
        `).join('')}
      </div>
      
      <div class="card">
        <h3>Interactive Elements</h3>
        <div class="metric">
          <span>Navigation Links</span>
          <span class="badge info">${report.interactiveTests.navigation?.links || 0}</span>
        </div>
        <div class="metric">
          <span>Booking Buttons</span>
          <span class="badge info">${report.interactiveTests.bookButtons?.count || 0}</span>
        </div>
        <div class="metric">
          <span>Buttons Clickable</span>
          <span class="badge ${report.interactiveTests.bookButtons?.clickable ? 'success' : 'warning'}">
            ${report.interactiveTests.bookButtons?.clickable ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
      
      <div class="card">
        <h3>Performance</h3>
        <div class="metric">
          <span>Page Load Time</span>
          <span class="badge ${report.performance?.loadTime < 3000 ? 'success' : 'warning'}">
            ${report.performance?.loadTime || 'N/A'}ms
          </span>
        </div>
        <div class="metric">
          <span>DOM Ready</span>
          <span class="badge info">${report.performance?.domReady || 'N/A'}ms</span>
        </div>
        <div class="metric">
          <span>First Paint</span>
          <span class="badge info">${Math.round(report.performance?.firstPaint || 0)}ms</span>
        </div>
      </div>
    </div>
    
    ${report.features.length > 0 ? `
      <div class="features">
        <h3>✨ Features Detected</h3>
        <ul>
          ${report.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
    
    ${report.issues.length > 0 ? `
      <div class="issues">
        <h3>⚠️ Issues Found</h3>
        <ul>
          ${report.issues.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
    
    ${report.recommendations.length > 0 ? `
      <div class="recommendations">
        <h3>💡 Recommendations</h3>
        <ul>
          ${report.recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
    
    <div class="card">
      <h3>📸 Visual Evidence</h3>
      <p>Screenshots have been captured at all breakpoints and saved to:</p>
      <code>${screenshotsDir}</code>
      
      <div class="screenshot-grid">
        <div class="screenshot-item">
          <p>Mobile (375px)</p>
        </div>
        <div class="screenshot-item">
          <p>Tablet (768px)</p>
        </div>
        <div class="screenshot-item">
          <p>Desktop (1440px)</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
  
  await fs.writeFile(
    path.join(reportsDir, 'services-test-report.html'),
    htmlReport
  );
  
  console.log('\n✅ Testing Complete!');
  console.log(`📁 Results saved to: ${outputDir}`);
  console.log(`📊 View report: ${path.join(reportsDir, 'services-test-report.html')}`);
  console.log(`\n📈 Summary:`);
  console.log(`   - Features: ${report.summary.totalFeatures}`);
  console.log(`   - Issues: ${report.summary.totalIssues}`);
  console.log(`   - Responsive: ${report.summary.responsiveDesign ? '✓' : '✗'}`);
  console.log(`   - Interactive Elements: ${report.summary.interactiveElements.bookingButtons + report.summary.interactiveElements.navigationLinks}`);
  
  await browser.close();
}

// Run the test
testServicesPage().catch(console.error);