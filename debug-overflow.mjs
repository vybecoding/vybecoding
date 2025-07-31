import { chromium } from 'playwright';

async function debugOverflow() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:3000/guides', { waitUntil: 'networkidle' });
    await page.waitForSelector('h1');
    
    // Find all elements that might be causing horizontal overflow
    const overflowElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const problematic = [];
      
      for (let el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          const styles = window.getComputedStyle(el);
          problematic.push({
            tag: el.tagName,
            className: el.className,
            id: el.id,
            width: rect.width,
            right: rect.right,
            left: rect.left,
            position: styles.position,
            overflow: styles.overflow,
            overflowX: styles.overflowX,
            whiteSpace: styles.whiteSpace,
            textContent: el.textContent?.substring(0, 50) + '...'
          });
        }
      }
      
      return problematic.sort((a, b) => b.right - a.right).slice(0, 10);
    });
    
    console.log('🔍 Elements causing horizontal overflow:');
    overflowElements.forEach((el, i) => {
      console.log(`  ${i + 1}. <${el.tag}> class="${el.className}" id="${el.id}"`);
      console.log(`     Width: ${el.width}px, Right: ${el.right}px, Left: ${el.left}px`);
      console.log(`     Position: ${el.position}, Overflow: ${el.overflow}/${el.overflowX}`);
      console.log(`     WhiteSpace: ${el.whiteSpace}`);
      console.log(`     Text: ${el.textContent}`);
      console.log('');
    });
    
    // Check the body and html elements specifically
    const documentInfo = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const htmlStyles = window.getComputedStyle(html);
      const bodyStyles = window.getComputedStyle(body);
      
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        html: {
          scrollWidth: html.scrollWidth,
          clientWidth: html.clientWidth,
          offsetWidth: html.offsetWidth,
          overflow: htmlStyles.overflow,
          overflowX: htmlStyles.overflowX
        },
        body: {
          scrollWidth: body.scrollWidth,
          clientWidth: body.clientWidth,
          offsetWidth: body.offsetWidth,
          overflow: bodyStyles.overflow,
          overflowX: bodyStyles.overflowX
        }
      };
    });
    
    console.log('📊 Document dimensions:');
    console.log(`  Viewport: ${documentInfo.viewport.width}x${documentInfo.viewport.height}`);
    console.log(`  HTML: scroll=${documentInfo.html.scrollWidth}, client=${documentInfo.html.clientWidth}, offset=${documentInfo.html.offsetWidth}`);
    console.log(`  HTML: overflow=${documentInfo.html.overflow}, overflowX=${documentInfo.html.overflowX}`);
    console.log(`  BODY: scroll=${documentInfo.body.scrollWidth}, client=${documentInfo.body.clientWidth}, offset=${documentInfo.body.offsetWidth}`);
    console.log(`  BODY: overflow=${documentInfo.body.overflow}, overflowX=${documentInfo.body.overflowX}`);
    
    await page.screenshot({ path: '/tmp/overflow-debug.png', fullPage: true });
    console.log('\n📸 Screenshot saved to /tmp/overflow-debug.png');
    
    // Keep browser open for manual inspection
    console.log('\n⏳ Browser open for manual inspection (30s)...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await browser.close();
  }
}

debugOverflow();