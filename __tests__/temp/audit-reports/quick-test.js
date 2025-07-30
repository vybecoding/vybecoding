import { chromium } from 'playwright';

async function quickTest() {
  console.log('🔍 Quick Visual Audit Test\n');
  
  const urls = {
    nextjs: 'http://localhost:3000',
    demo: 'http://localhost:8080'
  };
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  // Test each server
  for (const [name, url] of Object.entries(urls)) {
    console.log(`Testing ${name} at ${url}...`);
    const page = await context.newPage();
    
    try {
      await page.goto(url, { timeout: 5000 });
      console.log(`✅ ${name} server is accessible`);
      
      // Try to detect some basic info
      const title = await page.title();
      const hasHeader = await page.$('header, nav, [role="navigation"]') !== null;
      const hasMain = await page.$('main, [role="main"]') !== null;
      
      console.log(`   Title: ${title}`);
      console.log(`   Has Header: ${hasHeader}`);
      console.log(`   Has Main: ${hasMain}`);
      
    } catch (error) {
      console.log(`❌ ${name} server is not accessible`);
      console.log(`   Error: ${error.message}`);
    }
    
    await page.close();
  }
  
  await browser.close();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Ensure both servers are running:');
  console.log('   - Terminal 1: npm run dev');
  console.log('   - Terminal 2: npm run demo');
  console.log('2. Run the full audit: ./run-visual-audit.sh');
}

quickTest().catch(console.error);