# WebdriverIO + Mocha Boilerplate

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
cd WebdriverIO/WDIO-mocha
npm install
```

## Run tests
Prefer npm scripts if present:
```bash
npm test
```

### Run per-browser or multiple browsers

Preset commands (Windows-friendly):
```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

```

## Allure report
If Allure is configured, results will be in `allure-results/`.
```bash
npm run allure:generate && npm run allure:open
```

## Notes
- Specs under `test/`.
