import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function captureHomePage() {
  console.log('Starting home page capture...');
  
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true
  });
  
  const context = await browser.newContext({
    recordVideo: {
      dir: '__tests__/temp/videos',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  
  // Capture console logs
  const logs = [];
  page.on('console', msg => {
    const entry = `[${msg.type()}] ${msg.text()}`;
    console.log(entry);
    logs.push(entry);
  });

  try {
    console.log('Navigating to home page...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    
    // Take screenshots
    await page.screenshot({
      path: '__tests__/temp/home-full.png',
      fullPage: true
    });
    
    await page.screenshot({
      path: '__tests__/temp/home-viewport.png'
    });
    
    // Get page info
    const title = await page.title();
    const headings = await page.locator('h1, h2, h3').allTextContents();
    const navCount = await page.locator('nav').count();
    
    console.log('\n=== HOME PAGE ANALYSIS ===');
    console.log('Title:', title);
    console.log('Navigation elements:', navCount);
    console.log('Headings:', headings);
    console.log('Screenshots saved to __tests__/temp/');
    
    // Save analysis
    const analysis = {
      title,
      headings,
      navCount,
      logs,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('__tests__/temp/home-analysis.json', JSON.stringify(analysis, null, 2));
    
    // Keep browser open for 10 seconds to view
    console.log('\nBrowser will stay open for 10 seconds...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: '__tests__/temp/home-error.png' });
  } finally {
    await browser.close();
  }
}

captureHomePage().catch(console.error);