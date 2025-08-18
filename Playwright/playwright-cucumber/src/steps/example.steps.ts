// src/steps/example.steps.ts

import { Given, Then } from "@cucumber/cucumber";
import { page } from "../support/hooks"; // hooks.ts માંથી 'page' ઓબ્જેક્ટને import કરો

Given("I open the Google homepage", async function () {
  await page.goto("https://www.google.com");
});

Then("I search for {string}", async function (searchTerm: string) {
  const searchBox = page.locator("textarea[name='q']");
  await searchBox.fill(searchTerm);
  await searchBox.press("Enter");
});