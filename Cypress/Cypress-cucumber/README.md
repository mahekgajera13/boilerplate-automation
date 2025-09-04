# Cypress + Cucumber Boilerplate

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
cd Cypress/Cypress-cucumber
npm install
```

## Run tests
- Open Cypress (headed):
```bash
npm cy:open
```
- Headless run:
```bash
npm cy:run
```

## Allure report
Allure results are written to `allure-results/`.

- Install Allure CLI (if not present):
```bash
npm i -D allure-commandline
```
- Generate and open the report:
```bash
npm allure:generate && npm allure:open
```

## Notes
- Prefer `npm run` scripts if defined in `package.json`.
- Adjust `cypress.config.ts` and the Cucumber preprocessor as needed.
