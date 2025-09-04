# WebdriverIO + Cucumber Boilerplate

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
cd WebdriverIO/WDIO-cucumber
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


## Allure report

```bash

npm allure:generate && npm allure:open
```

## Notes
- Features in `features/`, step defs in the same folder.
- Shared utilities in `utils/` and core in `core/`.
