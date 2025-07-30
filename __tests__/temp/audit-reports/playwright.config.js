import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'visual-audit.spec.js',
  timeout: 120000, // 2 minutes per test
  fullyParallel: false, // Run sequentially for consistent results
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: './visual-audit-results/html-report' }]
  ],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000',
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...{
          // Use Chrome for most accurate rendering
          channel: 'chrome',
          // Ensure consistent rendering
          deviceScaleFactor: 1,
          hasTouch: false,
          isMobile: false,
          javascriptEnabled: true,
          locale: 'en-US',
          timezoneId: 'UTC',
          // Disable animations for consistent screenshots
          launchOptions: {
            args: [
              '--disable-blink-features=AutomationControlled',
              '--force-device-scale-factor=1'
            ]
          }
        }
      }
    }
  ]
});