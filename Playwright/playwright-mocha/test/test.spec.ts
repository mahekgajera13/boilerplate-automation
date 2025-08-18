import { describe, it, before, after } from 'mocha';
import { chromium, type Browser, type Page } from 'playwright';
import { expect } from 'chai';

describe('Example Test Suite', () => {
  let browser: Browser;
  let page: Page;

  before(async () => {
    browser = await chromium.launch({ 
      headless: false,
      slowMo: 2000
    });
    page = await browser.newPage();
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('Google homepage test', async () => {
    await page.goto('https://www.google.com');
    
    const title = await page.title();
    expect(title).to.include('Google');
  });

  it('Google search test', async () => {
    await page.goto('https://www.google.com');
    await page.waitForSelector('//textarea[@name="q"]', { timeout: 10000 });
    await page.fill('//textarea[@name="q"]', '');
    await page.type('//textarea[@name="q"]', 'Playwright automation');
    await page.press('//textarea[@name="q"]', 'Enter');
    await page.waitForLoadState('networkidle');
  });
});
