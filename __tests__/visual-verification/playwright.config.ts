import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: false, // Sequential to avoid conflicts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker for visual consistency
  reporter: [
    ['html', { outputFolder: './reports/html' }],
    ['json', { outputFile: './reports/results.json' }],
    ['list']
  ],
  
  use: {
    // Base URLs for comparison
    baseURL: 'http://localhost:3000', // Next.js app
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    
    // Visual comparison settings
    ignoreHTTPSErrors: true,
    
    // Viewport sizes for testing
    viewport: { width: 1440, height: 900 },
  },

  // Test different viewport sizes
  projects: [
    {
      name: 'desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'tablet',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'mobile',
      use: { 
        ...devices['iPhone 13'],
        viewport: { width: 375, height: 812 },
      },
    },
  ],

  // Start both servers
  webServer: [
    {
      command: 'npm run dev',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: 'cd demo && python3 -m http.server 8080',
      port: 8080,
      reuseExistingServer: !process.env.CI,
      timeout: 30 * 1000,
    }
  ],
});