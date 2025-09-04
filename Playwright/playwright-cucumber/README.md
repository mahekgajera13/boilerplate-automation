# Playwright + Cucumber Boilerplate

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
cd Playwright/playwright-cucumber
npm install
# One-time (installs browser binaries)
npx playwright install
```

## Run tests (no Zephyr/Testmo)
- Default run (Chromium, headless):
```bash
npm run run
```
- Headed mode:
```bash
npm run run:headed
```

### Cross-browser runs
- Microsoft Edge (Chromium channel `msedge`):
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

### PowerShell one-liners (alternative)
If you prefer to set environment variables directly:
```powershell
$env:BROWSER="edge"; $env:CHANNEL="msedge"; $env:HEADLESS="false"; npm run run
```

## Tags
Run by tag with cucumber-js options:
```bash
npm run run -- -t @smoke
```



## Allure report
Allure results are stored in `allure-results/`.
```bash
npm run report

```

## Useful
- Feature files in `features/`, step defs in `src/steps/`, hooks/world in `src/support/`.
- Cucumber config in `cucumber.js`. Playwright settings in `playwright.config.ts`.
