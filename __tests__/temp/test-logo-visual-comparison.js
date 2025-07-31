const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function compareLogos() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  try {
    // Load demo page
    const demoPage = await context.newPage();
    await demoPage.goto('http://localhost:8080/index.html');
    await demoPage.waitForTimeout(2000);

    // Capture demo logo
    const demoLogo = await demoPage.locator('.relative.w-8.h-8[role="img"]').first();
    await demoLogo.screenshot({ path: 'demo-logo.png' });

    // Get demo logo styles
    const demoStyles = await demoPage.evaluate(() => {
      const logo = document.querySelector('.relative.w-8.h-8[role="img"]');
      const gradient = logo.querySelector('.logo-spin');
      const inner = logo.querySelector('.absolute.inset-0\\.5');
      
      return {
        logoSize: window.getComputedStyle(logo).width,
        gradientAnimation: window.getComputedStyle(gradient).animation,
        gradientBackground: gradient.style.background,
        gradientPosition: {
          top: gradient.style.top,
          left: gradient.style.left,
          right: gradient.style.right,
          bottom: gradient.style.bottom
        },
        innerBackground: inner.style.background,
        innerInset: window.getComputedStyle(inner).inset
      };
    });

    // Load Next.js page
    const nextPage = await context.newPage();
    await nextPage.goto('http://localhost:3000');
    await nextPage.waitForTimeout(2000);

    // Capture Next.js logo
    const nextLogo = await nextPage.locator('[role="img"][aria-label="vybecoding animated logo"]').first();
    await nextLogo.screenshot({ path: 'nextjs-logo.png' });

    // Get Next.js logo styles
    const nextStyles = await nextPage.evaluate(() => {
      const logo = document.querySelector('[role="img"][aria-label="vybecoding animated logo"]');
      const gradient = logo.querySelector('[class*="gradient"]');
      const inner = logo.querySelector('[class*="inner"]');
      
      return {
        logoSize: window.getComputedStyle(logo).width,
        gradientAnimation: window.getComputedStyle(gradient).animation,
        gradientBackground: window.getComputedStyle(gradient).background,
        gradientPosition: {
          top: window.getComputedStyle(gradient).top,
          left: window.getComputedStyle(gradient).left,
          right: window.getComputedStyle(gradient).right,
          bottom: window.getComputedStyle(gradient).bottom
        },
        innerBackground: window.getComputedStyle(inner).background,
        innerInset: window.getComputedStyle(inner).inset
      };
    });

    console.log('\n=== Logo Visual Comparison ===\n');
    
    console.log('Demo Logo Styles:');
    console.log(JSON.stringify(demoStyles, null, 2));
    
    console.log('\nNext.js Logo Styles:');
    console.log(JSON.stringify(nextStyles, null, 2));

    // Compare key differences
    console.log('\n=== Key Differences ===\n');
    
    if (demoStyles.logoSize !== nextStyles.logoSize) {
      console.log(`❌ Logo Size: Demo=${demoStyles.logoSize}, Next.js=${nextStyles.logoSize}`);
    } else {
      console.log(`✅ Logo Size: ${demoStyles.logoSize}`);
    }

    console.log('\nGradient Animation:');
    console.log(`Demo: ${demoStyles.gradientAnimation}`);
    console.log(`Next.js: ${nextStyles.gradientAnimation}`);

    console.log('\nGradient Position:');
    console.log(`Demo: top=${demoStyles.gradientPosition.top}, left=${demoStyles.gradientPosition.left}`);
    console.log(`Next.js: top=${nextStyles.gradientPosition.top}, left=${nextStyles.gradientPosition.left}`);

    console.log('\nInner Background:');
    console.log(`Demo: ${demoStyles.innerBackground}`);
    console.log(`Next.js: ${nextStyles.innerBackground}`);

    console.log('\n📸 Screenshots saved: demo-logo.png, nextjs-logo.png');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

compareLogos().catch(console.error);