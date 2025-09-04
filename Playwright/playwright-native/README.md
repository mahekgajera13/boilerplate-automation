# Playwright (Native) Boilerplate

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
cd Playwright/playwright-native
npm install
# One-time: install browser binaries
npx playwright install
```

## Run tests
- Default (Chromium):
```bash
npm run run
```
- Headed mode:
```bash
npm run run:headed
```

### Cross-browser runs
- Edge (Microsoft Edge):
```bash
npm run run:edge
# headed
npm run run:edge:headed
```
- Chrome (Google Chrome):
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
Generate and open the report:
```bash
npm run allure:generate && npm run allure:open
```

## Notes
- Cross-browser selection uses `BROWSER` environment variable in `playwright.config.ts`.
- Each browser runs separately, not all together.
