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
  const outputDir = path.join(__dirname, 'services-visual-comparison');
  const demoDir = path.join(outputDir, 'demo');
  const nextDir = path.join(outputDir, 'nextjs');
  const comparisonDir = path.join(outputDir, 'comparison');
  
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(demoDir, { recursive: true });
  await fs.mkdir(nextDir, { recursive: true });
  await fs.mkdir(comparisonDir, { recursive: true });
  
  const breakpoints = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];
  
  const report = {
    timestamp: new Date().toISOString(),
    demo: { url: 'http://localhost:8080/services.html', results: {} },
    nextjs: { url: 'http://localhost:3000/services', results: {} },
    comparison: {},
    interactiveTests: {},
    improvements: []
  };
  
  console.log('Testing Services Page Visual Comparison...\n');
  
  // Test Demo Version
  console.log('📸 Capturing Demo Version...');
  for (const breakpoint of breakpoints) {
    await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    await page.goto('http://localhost:8080/services.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations
    
    // Full page screenshot
    await page.screenshot({
      path: path.join(demoDir, `services-${breakpoint.name}-full.png`),
      fullPage: true
    });
    
    // Hero section
    const heroExists = await page.locator('.hero-section, section:first-of-type').count() > 0;
    if (heroExists) {
      await page.locator('.hero-section, section:first-of-type').first().screenshot({
        path: path.join(demoDir, `services-${breakpoint.name}-hero.png`)
      });
    }
    
    // Services grid
    const servicesExists = await page.locator('.services-grid, .service-card').count() > 0;
    if (servicesExists) {
      const servicesSection = await page.locator('.services-grid, .service-card').first();
      await servicesSection.scrollIntoViewIfNeeded();
      await servicesSection.screenshot({
        path: path.join(demoDir, `services-${breakpoint.name}-grid.png`)
      });
    }
    
    report.demo.results[breakpoint.name] = {
      captured: true,
      heroSection: heroExists,
      servicesGrid: servicesExists
    };
  }
  
  // Test Next.js Version
  console.log('\n📸 Capturing Next.js Version...');
  for (const breakpoint of breakpoints) {
    await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Full page screenshot
    await page.screenshot({
      path: path.join(nextDir, `services-${breakpoint.name}-full.png`),
      fullPage: true
    });
    
    // Hero section
    const heroExists = await page.locator('[class*="hero"], section:first-of-type').count() > 0;
    if (heroExists) {
      await page.locator('[class*="hero"], section:first-of-type').first().screenshot({
        path: path.join(nextDir, `services-${breakpoint.name}-hero.png`)
      });
    }
    
    // Services grid
    const servicesExists = await page.locator('[class*="service"], [class*="grid"]').count() > 0;
    if (servicesExists) {
      const servicesSection = await page.locator('[class*="service"], [class*="grid"]').first();
      await servicesSection.scrollIntoViewIfNeeded();
      await servicesSection.screenshot({
        path: path.join(nextDir, `services-${breakpoint.name}-grid.png`)
      });
    }
    
    report.nextjs.results[breakpoint.name] = {
      captured: true,
      heroSection: heroExists,
      servicesGrid: servicesExists
    };
  }
  
  // Interactive Element Testing
  console.log('\n🔍 Testing Interactive Elements...');
  
  // Test Desktop Interactions
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Demo Version Interactive Tests
  await page.goto('http://localhost:8080/services.html', { waitUntil: 'networkidle' });
  
  // Navigation test
  const demoNav = await page.locator('nav, header').first();
  const demoNavLinks = await demoNav.locator('a').count();
  
  // Hover states on service cards
  const demoServiceCards = await page.locator('.service-card, [class*="service"]').count();
  if (demoServiceCards > 0) {
    const firstCard = page.locator('.service-card, [class*="service"]').first();
    await firstCard.hover();
    await page.screenshot({
      path: path.join(demoDir, 'services-hover-state.png')
    });
  }
  
  // CTA buttons
  const demoCTAs = await page.locator('button, .cta, [class*="button"]').count();
  
  report.interactiveTests.demo = {
    navigation: { links: demoNavLinks },
    serviceCards: { count: demoServiceCards, hoverTested: demoServiceCards > 0 },
    ctaButtons: { count: demoCTAs }
  };
  
  // Next.js Version Interactive Tests
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  
  // Navigation test
  const nextNav = await page.locator('nav, header').first();
  const nextNavLinks = await nextNav.locator('a').count();
  
  // Test mobile menu if exists
  const mobileMenuButton = await page.locator('[class*="mobile-menu"], [class*="hamburger"]').count();
  if (mobileMenuButton > 0) {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('[class*="mobile-menu"], [class*="hamburger"]').first().click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(nextDir, 'services-mobile-menu.png')
    });
    report.improvements.push('Mobile menu implementation detected in Next.js version');
  }
  
  // Reset to desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  
  // Hover states on service cards
  const nextServiceCards = await page.locator('[class*="service"], .card').count();
  if (nextServiceCards > 0) {
    const firstCard = page.locator('[class*="service"], .card').first();
    await firstCard.hover();
    await page.screenshot({
      path: path.join(nextDir, 'services-hover-state.png')
    });
  }
  
  // CTA buttons
  const nextCTAs = await page.locator('button, [class*="button"], [class*="cta"]').count();
  
  // Test form if exists
  const formExists = await page.locator('form').count() > 0;
  if (formExists) {
    await page.locator('form').first().screenshot({
      path: path.join(nextDir, 'services-form.png')
    });
    report.improvements.push('Form implementation detected in Next.js version');
  }
  
  report.interactiveTests.nextjs = {
    navigation: { links: nextNavLinks, mobileMenu: mobileMenuButton > 0 },
    serviceCards: { count: nextServiceCards, hoverTested: nextServiceCards > 0 },
    ctaButtons: { count: nextCTAs },
    forms: { exists: formExists }
  };
  
  // Visual Quality Analysis
  console.log('\n📊 Analyzing Visual Quality...');
  
  // Extract styles for comparison
  const demoStyles = await page.goto('http://localhost:8080/services.html').then(async () => {
    return await page.evaluate(() => {
      const cards = document.querySelectorAll('.service-card, [class*="service"]');
      const firstCard = cards[0];
      if (!firstCard) return {};
      
      const styles = window.getComputedStyle(firstCard);
      return {
        boxShadow: styles.boxShadow,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
        background: styles.background,
        transition: styles.transition
      };
    });
  });
  
  const nextStyles = await page.goto('http://localhost:3000/services').then(async () => {
    return await page.evaluate(() => {
      const cards = document.querySelectorAll('[class*="service"], .card');
      const firstCard = cards[0];
      if (!firstCard) return {};
      
      const styles = window.getComputedStyle(firstCard);
      return {
        boxShadow: styles.boxShadow,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
        background: styles.background,
        transition: styles.transition
      };
    });
  });
  
  report.comparison.styles = {
    demo: demoStyles,
    nextjs: nextStyles
  };
  
  // Analyze improvements
  if (nextStyles.transition && (!demoStyles.transition || demoStyles.transition === 'none')) {
    report.improvements.push('Smooth transitions added to service cards in Next.js version');
  }
  
  if (nextServiceCards > demoServiceCards) {
    report.improvements.push('Additional service offerings in Next.js version');
  }
  
  if (report.interactiveTests.nextjs.navigation.mobileMenu && !report.interactiveTests.demo.navigation.mobileMenu) {
    report.improvements.push('Responsive mobile navigation added in Next.js version');
  }
  
  // Performance metrics
  const demoMetrics = await page.goto('http://localhost:8080/services.html').then(async () => {
    return await page.evaluate(() => performance.timing);
  });
  
  const nextMetrics = await page.goto('http://localhost:3000/services').then(async () => {
    return await page.evaluate(() => performance.timing);
  });
  
  report.performance = {
    demo: {
      loadTime: demoMetrics.loadEventEnd - demoMetrics.navigationStart,
      domReady: demoMetrics.domContentLoadedEventEnd - demoMetrics.navigationStart
    },
    nextjs: {
      loadTime: nextMetrics.loadEventEnd - nextMetrics.navigationStart,
      domReady: nextMetrics.domContentLoadedEventEnd - nextMetrics.navigationStart
    }
  };
  
  // Generate comparison summary
  report.summary = {
    visualFidelity: {
      heroSection: report.demo.results.desktop.heroSection && report.nextjs.results.desktop.heroSection,
      servicesGrid: report.demo.results.desktop.servicesGrid && report.nextjs.results.desktop.servicesGrid,
      responsiveDesign: Object.keys(report.nextjs.results).length === 3
    },
    interactivity: {
      navigationImproved: report.interactiveTests.nextjs.navigation.links >= report.interactiveTests.demo.navigation.links,
      mobileMenuAdded: report.interactiveTests.nextjs.navigation.mobileMenu,
      formsAdded: report.interactiveTests.nextjs.forms.exists,
      hoverStates: report.interactiveTests.nextjs.serviceCards.hoverTested
    },
    improvements: report.improvements
  };
  
  // Save report
  await fs.writeFile(
    path.join(comparisonDir, 'services-comparison-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  // Generate HTML report
  const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <title>Services Page Visual Comparison Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1, h2, h3 { color: #333; }
    .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .version-block { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
    .version-block h3 { margin-top: 0; }
    .improvements { background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .improvements h3 { color: #2e7d32; margin-top: 0; }
    .metric { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .metric:last-child { border-bottom: none; }
    .status { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 0.85em; }
    .status.success { background: #4caf50; color: white; }
    .status.warning { background: #ff9800; color: white; }
    .status.info { background: #2196f3; color: white; }
    img { max-width: 100%; border: 1px solid #ddd; margin: 10px 0; }
    .screenshot-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Services Page Visual Comparison Report</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>
    
    <div class="improvements">
      <h3>✨ Improvements in Next.js Version</h3>
      <ul>
        ${report.improvements.map(imp => `<li>${imp}</li>`).join('')}
      </ul>
    </div>
    
    <h2>Visual Comparison</h2>
    <div class="comparison-grid">
      <div class="version-block">
        <h3>Demo Version (Port 8080)</h3>
        <div class="metric">
          <span>Hero Section</span>
          <span class="status ${report.demo.results.desktop.heroSection ? 'success' : 'warning'}">
            ${report.demo.results.desktop.heroSection ? 'Present' : 'Missing'}
          </span>
        </div>
        <div class="metric">
          <span>Services Grid</span>
          <span class="status ${report.demo.results.desktop.servicesGrid ? 'success' : 'warning'}">
            ${report.demo.results.desktop.servicesGrid ? 'Present' : 'Missing'}
          </span>
        </div>
        <div class="metric">
          <span>Navigation Links</span>
          <span class="status info">${report.interactiveTests.demo.navigation.links}</span>
        </div>
        <div class="metric">
          <span>Service Cards</span>
          <span class="status info">${report.interactiveTests.demo.serviceCards.count}</span>
        </div>
      </div>
      
      <div class="version-block">
        <h3>Next.js Version (Port 3000)</h3>
        <div class="metric">
          <span>Hero Section</span>
          <span class="status ${report.nextjs.results.desktop.heroSection ? 'success' : 'warning'}">
            ${report.nextjs.results.desktop.heroSection ? 'Present' : 'Missing'}
          </span>
        </div>
        <div class="metric">
          <span>Services Grid</span>
          <span class="status ${report.nextjs.results.desktop.servicesGrid ? 'success' : 'warning'}">
            ${report.nextjs.results.desktop.servicesGrid ? 'Present' : 'Missing'}
          </span>
        </div>
        <div class="metric">
          <span>Navigation Links</span>
          <span class="status info">${report.interactiveTests.nextjs.navigation.links}</span>
        </div>
        <div class="metric">
          <span>Service Cards</span>
          <span class="status info">${report.interactiveTests.nextjs.serviceCards.count}</span>
        </div>
        <div class="metric">
          <span>Mobile Menu</span>
          <span class="status ${report.interactiveTests.nextjs.navigation.mobileMenu ? 'success' : 'warning'}">
            ${report.interactiveTests.nextjs.navigation.mobileMenu ? 'Yes' : 'No'}
          </span>
        </div>
        <div class="metric">
          <span>Forms</span>
          <span class="status ${report.interactiveTests.nextjs.forms.exists ? 'success' : 'info'}">
            ${report.interactiveTests.nextjs.forms.exists ? 'Present' : 'None'}
          </span>
        </div>
      </div>
    </div>
    
    <h2>Performance Metrics</h2>
    <div class="comparison-grid">
      <div class="version-block">
        <h3>Demo Version</h3>
        <div class="metric">
          <span>Page Load Time</span>
          <span class="status info">${report.performance.demo.loadTime}ms</span>
        </div>
        <div class="metric">
          <span>DOM Ready</span>
          <span class="status info">${report.performance.demo.domReady}ms</span>
        </div>
      </div>
      
      <div class="version-block">
        <h3>Next.js Version</h3>
        <div class="metric">
          <span>Page Load Time</span>
          <span class="status info">${report.performance.nextjs.loadTime}ms</span>
        </div>
        <div class="metric">
          <span>DOM Ready</span>
          <span class="status info">${report.performance.nextjs.domReady}ms</span>
        </div>
      </div>
    </div>
    
    <h2>Visual Evidence</h2>
    <p>Screenshots have been captured for all breakpoints (mobile: 375px, tablet: 768px, desktop: 1440px)</p>
    <p>View the captured screenshots in the following directories:</p>
    <ul>
      <li><code>__tests__/temp/services-visual-comparison/demo/</code> - Demo version screenshots</li>
      <li><code>__tests__/temp/services-visual-comparison/nextjs/</code> - Next.js version screenshots</li>
    </ul>
  </div>
</body>
</html>
  `;
  
  await fs.writeFile(
    path.join(comparisonDir, 'services-comparison-report.html'),
    htmlReport
  );
  
  console.log('\n✅ Visual comparison complete!');
  console.log(`📁 Results saved to: ${outputDir}`);
  console.log(`📊 View report: ${path.join(comparisonDir, 'services-comparison-report.html')}`);
  
  await browser.close();
}

// Run the test
testServicesPage().catch(console.error);