/// <reference types="cypress" />

describe('Google search test', () => {
  it('performs a Google search for Playwright automation', () => {
    cy.allure().epic('Search');
    cy.allure().feature('Google');
    cy.allure().story('User can search keywords');

    cy.allure().startStep('Open Google homepage');
    cy.visit('https://www.google.com');
    cy.allure().endStep();

    cy.allure().startStep('Type query and submit');
    cy.get('textarea[name="q"]', { timeout: 10000 }).should('be.visible');
    cy.get('textarea[name="q"]').clear().type('Cypress automation');
    cy.allure().endStep();
  });
});