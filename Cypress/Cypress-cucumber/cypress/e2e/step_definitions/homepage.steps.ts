import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the example homepage", () => {
  cy.visit("https://example.cypress.io");
});

Then("I should see the welcome message", () => {
  cy.get("h1").should("contain", "Kitchen Sink");
});
