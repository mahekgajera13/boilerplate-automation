# Playwright + Mocha Boilerplate

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
cd Playwright/playwright-mocha
npm install
# One-time: install browser binaries
npx playwright install
```

## Run tests
- Build + run default (Chromium):
```bash
npm run run
```
- Headed mode:
```bash
npm run run:headed
```

### Cross-browser runs
- Edge (msedge channel):
```bash
npm run run:edge
# headed
npm run run:edge:headed
```
- Chrome (stable channel):
```bash
npm run run:chrome
# headed
npm run run:chrome:headed
```
- Firefox:
```bash
npm run run:firefox
# headed
npm run run:firefox:headed
```
- WebKit (Safari engine):
```bash
npm run run:webkit
# headed
npm run run:webkit:headed
```

## Allure report
If your tests output to `allure-results/`, generate and open the report:
```bash
npm run allure:generate && npm run allure:open
```

## Notes
- Cross-browser is controlled by env vars `BROWSER`, `CHANNEL`, `HEADLESS` read in the test file.
- Specs are compiled to `dist/` by `npm run build`.
