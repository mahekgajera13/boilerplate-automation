import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "playwright";

let browser: Browser;
let context: BrowserContext;
export let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
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