// cypress/plugins/index.ts
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  allureWriter(on, config);
  return config;
};