# Cypress + Mocha Boilerplate

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
cd Cypress/Cypress-mocha
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
Results go to `allure-results/`.

- Install Allure CLI (if not present):
```bash
npm i -D allure-commandline
```
- Generate and open the report:
```bash
npm allure:generate && npm allure:serve
```

## Notes
- Prefer any `npm run` scripts defined in `package.json`.
