import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';

export type TestWorld = World & {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
};

class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: any) {
    super(options);
  }
}

setWorldConstructor(CustomWorld as any);