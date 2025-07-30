import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectNextJsHome() {
  console.log('🚀 Opening Next.js home page with Playwright...\n');
  
  const browser = await chromium.launch({
    headless: false, // Show the browser
    devtools: true,  // Open DevTools
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: path.join(__dirname, 'videos'),
      size: { width: 1440, height: 900 }
    }
  });
  
  const page = await context.newPage();
  
  console.log('📸 Navigating to http://localhost:3000...');
  
  try {
    // Navigate to the home page
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    console.log('✅ Page loaded successfully!\n');
    
    // Get page title
    const title = await page.title();
    console.log(`📄 Page Title: ${title}`);
    
    // Check for key elements
    const elements = {
      'Navigation': 'nav',
      'Hero Section': '.hero, [class*="hero"]',
      'Main Content': 'main',
      'Footer': 'footer',
      'Gradient Text': '[class*="gradient"]',
      'Cards': '.card, [class*="card"]'
    };
    
    console.log('\n🔍 Checking for key elements:');
    for (const [name, selector] of Object.entries(elements)) {
      const exists = await page.locator(selector).first().isVisible().catch(() => false);
      console.log(`  ${exists ? '✅' : '❌'} ${name}`);
    }
    
    // Take screenshots at different viewports
    const viewports = [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 812 }
    ];
    
    console.log('\n📸 Taking screenshots at different viewports:');
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500); // Wait for any responsive changes
      
      const screenshotPath = path.join(__dirname, `nextjs-home-${viewport.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      console.log(`  ✅ ${viewport.name}: ${viewport.width}x${viewport.height}`);
    }
    
    // Extract key styles
    console.log('\n🎨 Extracting key styles:');
    const styles = await page.evaluate(() => {
      const getComputedStyles = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        
        const computed = window.getComputedStyle(element);
        return {
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage,
          color: computed.color,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          boxShadow: computed.boxShadow
        };
      };
      
      return {
        body: getComputedStyles('body'),
        nav: getComputedStyles('nav'),
        main: getComputedStyles('main'),
        firstButton: getComputedStyles('button, .btn, [class*="button"]'),
        firstCard: getComputedStyles('.card, [class*="card"]')
      };
    });
    
    console.log(JSON.stringify(styles, null, 2));
    
    // Check for animations
    console.log('\n🎭 Checking for animations:');
    const animations = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const animatedElements = [];
      
      elements.forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.animation !== 'none' || computed.transition !== 'none') {
          animatedElements.push({
            tag: el.tagName.toLowerCase(),
            className: el.className,
            animation: computed.animation,
            transition: computed.transition
          });
        }
      });
      
      return animatedElements.slice(0, 10); // First 10 animated elements
    });
    
    if (animations.length > 0) {
      console.log(`  Found ${animations.length} animated elements`);
      animations.forEach(el => {
        console.log(`  - ${el.tag}${el.className ? '.' + el.className : ''}`);
      });
    }
    
    console.log('\n⏸️  Browser window will remain open for inspection.');
    console.log('🔍 Use DevTools to inspect elements and styles.');
    console.log('❌ Close the browser window when done.\n');
    
    // Keep browser open for manual inspection
    await page.waitForTimeout(300000); // 5 minutes
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await context.close();
    await browser.close();
  }
}

// Run the inspection
inspectNextJsHome().catch(console.error);