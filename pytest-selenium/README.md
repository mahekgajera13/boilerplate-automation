# Selenium + Pytest Boilerplate


## Setup
1. Navigate to the folder:
   ```bash
   cd pytest-selenium
   ```
2. (Recommended) Create and activate a virtual environment:
   - Windows PowerShell:
     ```bash
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Run tests, then open Allure report
Allure results are generated automatically to `allure-results` (configured in `pytest.ini`).

- Chrome:
  ```bash
  pytest -q
  allure serve allure-results
  ```
- Firefox:
  ```bash
  pytest -q --browser firefox
  allure serve allure-results
  ```
- Edge:
  ```bash
  pytest -q --browser edge
  allure serve allure-results
  ```
