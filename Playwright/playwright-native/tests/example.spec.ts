import { test, expect } from '@playwright/test';

test.describe('Playwright site', () => {
  test('should have the correct title', async ({ page }) => {
    await page.goto('https://www.google.com');
    const searchBox = page.locator("textarea[name='q']");
    await searchBox.click();
    await searchBox.fill("Playwright");
    await searchBox.press("Enter");
  });
});
