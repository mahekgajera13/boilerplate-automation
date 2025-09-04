import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { chromium, firefox, webkit, Browser, BrowserContext, Page, BrowserType, LaunchOptions } from "playwright";

let browser: Browser;
let context: BrowserContext;
export let page: Page;

function resolveBrowserType(): { type: BrowserType<Browser>; launchOptions: LaunchOptions; label: string } {
  const requested = (process.env.BROWSER || 'chromium').toLowerCase();
  const channelEnv = process.env.CHANNEL; // e.g. 'msedge' or 'chrome'
  const headless = process.env.HEADLESS !== 'false';

  let type: BrowserType<Browser> = chromium;
  let channel: string | undefined = undefined;

  switch (requested) {
    case 'chromium':
    case 'chrome':
      type = chromium;
      channel = channelEnv; // allow CHANNEL=chrome
      break;
    case 'firefox':
      type = firefox;
      break;
    case 'webkit':
    case 'safari':
      type = webkit;
      break;
    case 'edge':
    case 'msedge':
      type = chromium;
      channel = channelEnv || 'msedge';
      break;
    default:
      type = chromium;
      channel = channelEnv;
      break;
  }

  const launchOptions: LaunchOptions = channel ? { headless, channel } : { headless };
  const label = `${requested}${channel ? `(${channel})` : ''}, headless=${headless}`;
  return { type, launchOptions, label };
}

BeforeAll(async function () {
  const { type, launchOptions, label } = resolveBrowserType();
  console.log(`[PW] Launching browser: ${label}`);
  browser = await type.launch(launchOptions);
});

AfterAll(async function () {
  await browser.close();
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  await context.close();
});