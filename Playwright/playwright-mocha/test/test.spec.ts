import { describe, it, before, after } from 'mocha';
import { chromium, firefox, webkit, type Browser, type Page, type BrowserType, type LaunchOptions } from 'playwright';
import { expect } from 'chai';

function resolveBrowser(): { type: BrowserType<Browser>; options: LaunchOptions; label: string } {
  const requested = (process.env.BROWSER || 'chromium').toLowerCase();
  const channelEnv = process.env.CHANNEL; // e.g. 'chrome' or 'msedge'
  const headless = process.env.HEADLESS !== 'false';

  let type: BrowserType<Browser> = chromium;
  let channel: string | undefined = undefined;

  switch (requested) {
    case 'chromium':
    case 'chrome':
      type = chromium;
      channel = channelEnv;
      break;
    case 'edge':
    case 'msedge':
      type = chromium;
      channel = channelEnv || 'msedge';
      break;
    case 'firefox':
      type = firefox;
      break;
    case 'webkit':
    case 'safari':
      type = webkit;
      break;
    default:
      type = chromium;
      channel = channelEnv;
  }

  const options: LaunchOptions = channel ? { headless, channel } : { headless };
  const label = `${requested}${channel ? `(${channel})` : ''}, headless=${headless}`;
  return { type, options, label };
}

describe('Example Test Suite', () => {
  let browser: Browser;
  let page: Page;

  before(async () => {
    const { type, options, label } = resolveBrowser();
    console.log(`[PW][Mocha] Launching browser: ${label}`);
    browser = await type.launch({ ...options });
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
