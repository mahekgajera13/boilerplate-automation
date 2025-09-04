# Python Selenium + Behave Boilerplate

## Prerequisites
- Python 3.10+
- pip

## Setup
```bash
cd Python
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run tests
```bash
behave -f pretty
```
Run tagged tests:
```bash
behave -t @smoke
```

### Using npm scripts (Windows-friendly)
From the `Python` folder after setting up the venv:
```bash
npm run behave
npm run behave:chrome
npm run behave:firefox
npm run behave:edge
```

### Cross-browser runs

Set `BROWSER` or `BROWSERS` env var (first value is used):
- Chrome (default):
```powershell
$env:BROWSER = "chrome"; behave -f pretty
```
- Firefox:
```powershell
$env:BROWSER = "firefox"; behave -f pretty
```
- Edge:
```powershell
$env:BROWSER = "edge"; behave -f pretty
```

Windows CMD examples:
```cmd
set BROWSER=chrome&& behave -f pretty
set BROWSER=firefox&& behave -f pretty
set BROWSER=edge&& behave -f pretty
```

Note: You can also set `BROWSERS=chrome,firefox` and the first one (chrome) will be used.

## Allure report
Assuming Allure Behave formatter writes to `reports/`:
```bash
npm allure:generate
npm allure:open
```

## Notes
- Step files in `features/steps/`, page objects in `pages/`.
