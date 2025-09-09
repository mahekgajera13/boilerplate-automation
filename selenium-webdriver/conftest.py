import os
import shutil
from pathlib import Path
import pytest
from selenium import webdriver


def pytest_addoption(parser):
    parser.addoption(
        "--browser",
        action="store",
        default="chrome",
        help="Browser option: chrome, firefox, edge",
    )


def pytest_sessionstart(session):
    """Clean previous Allure results/reports so only the latest run is shown."""
    results_dir = Path("allure-results")
    report_dir = Path("allure-report")

    if results_dir.exists():
        shutil.rmtree(results_dir, ignore_errors=True)
    results_dir.mkdir(parents=True, exist_ok=True)

    if report_dir.exists():
        shutil.rmtree(report_dir, ignore_errors=True)


@pytest.fixture
def driver(request):
    browser = request.config.getoption("--browser")

    if browser == "chrome":
        driver = webdriver.Chrome()
    elif browser == "firefox":
        driver = webdriver.Firefox()
    elif browser == "edge":
        driver = webdriver.Edge()
    else:
        raise ValueError(f"Unsupported browser: {browser}")

    driver.maximize_window()
    yield driver
    driver.quit()
