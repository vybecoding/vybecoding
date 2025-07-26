#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const sessionDir = process.argv[2];
const errorToDebug = process.argv[3];

if (!sessionDir || !errorToDebug) {
  console.error('Usage: node playwright-debug.js <session-dir> <error-message>');
  process.exit(1);
}

// Ensure Playwright is installed
try {
  require.resolve('playwright');
} catch (e) {
  console.log('Playwright not found. Install with: npm install -D playwright');
  console.log('Creating debug request file instead...');
  
  const requestFile = path.join(sessionDir, 'playwright-install-needed.md');
  fs.writeFileSync(requestFile, `# Playwright Installation Required

To enable visual debugging, install Playwright:

\`\`\`bash
npm install -D playwright
npx playwright install chromium
\`\`\`

Then run this debug session again.

**Error to debug**: ${errorToDebug}
**Session directory**: ${sessionDir}
`);
  process.exit(0);
}

async function debugWithPlaywright() {
  console.log('Starting Playwright visual debugging...');
  
  // Detect the app URL (customize based on your project)
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  
  // Launch browser with debugging enabled
  const browser = await chromium.launch({
    headless: false, // Show browser for debugging
    devtools: true   // Open devtools automatically
  });

  const context = await browser.newContext({
    // Record everything for comprehensive debugging
    recordVideo: {
      dir: path.join(sessionDir, 'videos'),
      size: { width: 1280, height: 720 }
    }
  });

  // Start tracing for complete debug info
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  const page = await context.newPage();
  
  // Capture console logs
  const consoleLogs = [];
  page.on('console', msg => {
    const logEntry = {
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    };
    consoleLogs.push(logEntry);
    console.log(`[${logEntry.type}] ${logEntry.text}`);
  });

  // Capture network activity
  const networkLogs = [];
  page.on('request', request => {
    networkLogs.push({
      type: 'request',
      url: request.url(),
      method: request.method(),
      timestamp: new Date().toISOString()
    });
  });

  page.on('response', response => {
    networkLogs.push({
      type: 'response',
      url: response.url(),
      status: response.status(),
      timestamp: new Date().toISOString()
    });
  });

  // Capture page errors
  page.on('pageerror', error => {
    consoleLogs.push({
      type: 'error',
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  });

  try {
    console.log(`Navigating to ${appUrl}...`);
    await page.goto(appUrl, { waitUntil: 'networkidle' });
    
    // Take initial screenshot
    await page.screenshot({
      path: path.join(sessionDir, 'initial-state.png'),
      fullPage: true
    });

    // Wait for user to reproduce the error
    console.log('\n===========================================');
    console.log('MANUAL DEBUGGING MODE');
    console.log('===========================================');
    console.log(`Error to debug: ${errorToDebug}`);
    console.log('\nPlease reproduce the error in the browser.');
    console.log('The browser will stay open for debugging.');
    console.log('Press Ctrl+C when done to save the trace.\n');

    // Keep browser open for manual debugging
    await new Promise(resolve => {
      process.on('SIGINT', resolve);
      process.on('SIGTERM', resolve);
    });

  } catch (error) {
    console.error('Error during debugging:', error);
    await page.screenshot({
      path: path.join(sessionDir, 'error-state.png'),
      fullPage: true
    });
  } finally {
    // Stop tracing and save
    await context.tracing.stop({
      path: path.join(sessionDir, 'trace.zip')
    });

    // Save logs
    fs.writeFileSync(
      path.join(sessionDir, 'console-logs.json'),
      JSON.stringify(consoleLogs, null, 2)
    );

    fs.writeFileSync(
      path.join(sessionDir, 'network-logs.json'),
      JSON.stringify(networkLogs, null, 2)
    );

    // Create summary
    const summary = {
      error: errorToDebug,
      timestamp: new Date().toISOString(),
      url: appUrl,
      consoleErrors: consoleLogs.filter(log => log.type === 'error').length,
      totalRequests: networkLogs.filter(log => log.type === 'request').length,
      failedRequests: networkLogs.filter(log => 
        log.type === 'response' && log.status >= 400
      ).length
    };

    fs.writeFileSync(
      path.join(sessionDir, 'debug-summary.json'),
      JSON.stringify(summary, null, 2)
    );

    // Create human-readable report
    const report = `# Playwright Debug Report

**Error**: ${errorToDebug}
**Time**: ${summary.timestamp}
**URL**: ${summary.url}

## Summary
- Console Errors: ${summary.consoleErrors}
- Total Network Requests: ${summary.totalRequests}
- Failed Requests: ${summary.failedRequests}

## View Full Trace
\`\`\`bash
npx playwright show-trace ${path.join(sessionDir, 'trace.zip')}
\`\`\`

## Key Files
- Full trace: trace.zip
- Console logs: console-logs.json
- Network logs: network-logs.json
- Screenshots: *.png
- Video: videos/*.webm
`;

    fs.writeFileSync(
      path.join(sessionDir, 'report.md'),
      report
    );

    console.log('\n===========================================');
    console.log('Debug session saved to:', sessionDir);
    console.log('View trace with:', `npx playwright show-trace ${path.join(sessionDir, 'trace.zip')}`);
    
    await browser.close();
  }
}

// Run the debugging session
debugWithPlaywright().catch(console.error);