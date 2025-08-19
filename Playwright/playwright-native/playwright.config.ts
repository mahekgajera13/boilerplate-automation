import { defineConfig, devices } from '@playwright/test';

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
  projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
],

  outputDir: 'test-results/',
});
