import { defineConfig, devices } from '@playwright/test';

const browser = process.env.BROWSER || 'chromium';

function getBrowserConfig() {
  switch (browser.toLowerCase()) {
    case 'msedge':
    case 'edge':
      return {
        name: 'edge',
        use: { 
          ...devices['Desktop Chrome'],
          channel: 'msedge'
        },
      };
    case 'chrome':
      return {
        name: 'chrome',
        use: { 
          ...devices['Desktop Chrome'],
          channel: 'chrome'
        },
      };
    case 'firefox':
      return {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      };
    case 'webkit':
    case 'safari':
      return {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      };
    default:
      return {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      };
  }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [
  ['line'],   
  ['allure-playwright', { outputFolder: 'allure-results' }]
],

  use: {
    baseURL: 'https://www.google.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [getBrowserConfig()],

  outputDir: 'test-results/',
});
