const https = require('https');
const http = require('http');
const WebSocket = require('ws');

// Function to make HTTP request
function httpRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

// Function to send Chrome DevTools command
function sendChromeCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Date.now();
    const command = { id, method, params };
    
    const timeout = setTimeout(() => {
      reject(new Error('Command timeout'));
    }, 10000);
    
    const handler = (data) => {
      const response = JSON.parse(data);
      if (response.id === id) {
        clearTimeout(timeout);
        ws.removeListener('message', handler);
        if (response.error) {
          reject(new Error(response.error.message));
        } else {
          resolve(response.result);
        }
      }
    };
    
    ws.on('message', handler);
    ws.send(JSON.stringify(command));
  });
}

async function fixGuidesWithDirectChrome() {
  console.log('🔗 Connecting to Chrome DevTools on port 9224...');
  
  try {
    // Get list of open tabs
    const tabs = await httpRequest('http://localhost:9224/json');
    console.log(`📱 Found ${tabs.length} open tabs`);
    
    // Find the guides tab
    let guidesTab = tabs.find(tab => 
      tab.url.includes('#guides') || 
      tab.url.includes('/guides') || 
      tab.title.includes('Guides')
    );
    
    if (!guidesTab) {
      console.log('❌ No guides tab found');
      return false;
    }
    
    console.log(`✅ Found guides tab: ${guidesTab.url}`);
    console.log(`📋 Tab title: ${guidesTab.title}`);
    
    // Connect to the tab via WebSocket
    const ws = new WebSocket(guidesTab.webSocketDebuggerUrl);
    
    await new Promise((resolve, reject) => {
      ws.on('open', resolve);
      ws.on('error', reject);
      setTimeout(() => reject(new Error('WebSocket connection timeout')), 5000);
    });
    
    console.log('🔌 Connected to Chrome tab via WebSocket');
    
    // Enable Runtime domain
    await sendChromeCommand(ws, 'Runtime.enable');
    console.log('✅ Runtime enabled');
    
    // Execute JavaScript to apply showcase styling
    const jsCode = `
      (function() {
        console.log('🎨 Applying showcase styling via Chrome DevTools...');
        
        // Remove any existing showcase styles
        const existingStyle = document.querySelector('#showcase-fix-direct');
        if (existingStyle) existingStyle.remove();
        
        // Add showcase CSS
        const style = document.createElement('style');
        style.id = 'showcase-fix-direct';
        style.innerHTML = \`
          /* DIRECT CHROME DEVTOOLS FIX */
          .minimal-card {
            background: rgba(26, 26, 26, 0.8) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(51, 51, 51, 0.4) !important;
            border-radius: 8px !important;
            padding: 1.25rem !important;
            transition: all 0.3s ease-in-out !important;
            position: relative !important;
            z-index: 10 !important;
            cursor: pointer !important;
            display: flex !important;
            flex-direction: column !important;
            height: 100% !important;
            overflow: visible !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            min-height: 320px !important;
          }
          
          .minimal-card:hover {
            background: rgba(42, 42, 42, 0.8) !important;
            border-color: rgba(64, 64, 64, 0.5) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
          }
          
          .minimal-card.card-verified {
            border: 1px solid rgba(34, 197, 94, 0.3) !important;
          }
          
          .minimal-card.card-verified:hover {
            border-color: rgba(34, 197, 94, 0.4) !important;
          }
          
          .grid.grid-cols-1.md\\\\:grid-cols-2.lg\\\\:grid-cols-3.gap-6 {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 1.5rem !important;
            align-items: stretch !important;
          }
          
          .grid > .minimal-card {
            min-height: 320px !important;
            display: flex !important;
            flex-direction: column !important;
          }
        \`;
        document.head.appendChild(style);
        
        // Force apply styles to each card
        const cards = document.querySelectorAll('.minimal-card');
        console.log(\`Found \${cards.length} cards to style\`);
        
        cards.forEach((card, index) => {
          // Force recompute styles
          card.style.cssText = '';
          card.offsetHeight; // Trigger reflow
          
          // Apply inline styles as backup
          Object.assign(card.style, {
            background: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(10px)',
            webkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(51, 51, 51, 0.4)',
            borderRadius: '8px',
            padding: '1.25rem',
            position: 'relative',
            zIndex: '10',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '320px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease-in-out'
          });
          
          console.log(\`✅ Styled card \${index + 1}\`);
        });
        
        // Fix grid layout
        const grid = document.querySelector('.grid.grid-cols-1.md\\\\:grid-cols-2.lg\\\\:grid-cols-3.gap-6');
        if (grid) {
          Object.assign(grid.style, {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch'
          });
          console.log('✅ Fixed grid layout');
        }
        
        console.log('🎉 Showcase styling applied successfully!');
        return { success: true, cardCount: cards.length };
      })();
    `;
    
    console.log('📝 Executing showcase styling JavaScript...');
    const result = await sendChromeCommand(ws, 'Runtime.evaluate', {
      expression: jsCode,
      returnByValue: true
    });
    
    if (result.exceptionDetails) {
      console.error('❌ JavaScript error:', result.exceptionDetails);
      return false;
    }
    
    const jsResult = result.result.value;
    console.log(`✅ JavaScript result:`, jsResult);
    
    // Close WebSocket
    ws.close();
    
    console.log('🎉 Guides page styling has been updated via Chrome DevTools!');
    console.log('🔄 The page should now match the showcase design');
    
    return jsResult && jsResult.success;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

// Run the fix
fixGuidesWithDirectChrome().then(success => {
  if (success) {
    console.log('🏆 SUCCESS: Guides page now matches showcase design!');
  } else {
    console.log('💥 FAILED: Could not apply showcase styling');
  }
  process.exit(0);
}).catch(err => {
  console.error('💥 Script error:', err);
  process.exit(1);
});