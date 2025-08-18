import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/steps',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['junit', { outputFile: 'testmo-report.xml' }],
    ['playwright-zephyr/lib/src/reporter', { 
        projectKey: 'YOUR_PROJECT_KEY',
        authorizationToken: process.env.ZEPHYR_AUTH_TOKEN,
        testCycle: {
            name: `Playwright Test Run - ${new Date().toISOString()}`,
        },
    }],
  ],
  
  use: {
    baseURL: 'https://www.google.com',
    trace: 'on-first-retry',
    headless: process.env.HEADLESS !== 'false',
    
  },
  
  timeout: 30000,
  
  expect: {
    timeout: 5000,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});