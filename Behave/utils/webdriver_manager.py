from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options as EdgeOptions

from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager

import os
import sys


def _is_ci() -> bool:
    return os.environ.get('CI') is not None


def _configure_common_options(options) -> None:
    if _is_ci():
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-gpu")
        options.add_argument("--window-size=1920,1080")
    else:
        options.add_argument("--start-maximized")

    options.add_argument("--disable-extensions")
    options.add_argument("--disable-plugins")
    options.add_argument("--disable-images")


def get_driver():
    browser = (os.environ.get('BROWSER') or os.environ.get('BROWSERS') or 'chrome').split(',')[0].strip().lower()

    if browser in ("chrome", "chromium"):
        options = ChromeOptions()
        _configure_common_options(options)
        # Try Selenium Manager first (Selenium 4.6+). Falls back to webdriver_manager if needed.
        try:
            return webdriver.Chrome(options=options)
        except Exception:
            service = ChromeService(ChromeDriverManager().install())
            return webdriver.Chrome(service=service, options=options)

    if browser in ("firefox", "ff"):
        options = FirefoxOptions()
        if _is_ci():
            options.headless = True

        # Try resolve Firefox binary automatically on Windows if not installed in PATH
        firefox_binary_env = os.environ.get('FIREFOX_BINARY') or os.environ.get('MOZ_FIREFOX_BINARY')
        if firefox_binary_env:
            options.binary_location = firefox_binary_env
        elif sys.platform.startswith('win'):
            possible_paths = [
                r"C:\\Program Files\\Mozilla Firefox\\firefox.exe",
                r"C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe",
                os.path.expandvars(r"%LOCALAPPDATA%\\Mozilla Firefox\\firefox.exe"),
            ]
            for p in possible_paths:
                if p and os.path.exists(p):
                    options.binary_location = p
                    break
        # Try Selenium Manager first
        try:
            return webdriver.Firefox(options=options)
        except Exception:
            service = FirefoxService(GeckoDriverManager().install())
            return webdriver.Firefox(service=service, options=options)

    if browser in ("edge", "msedge"):
        options = EdgeOptions()
        # EdgeOptions uses add_argument via .add_argument as well
        _configure_common_options(options)
        # Try Selenium Manager first
        try:
            return webdriver.Edge(options=options)
        except Exception:
            service = EdgeService(EdgeChromiumDriverManager().install())
            return webdriver.Edge(service=service, options=options)

    # Fallback to Chrome
    options = ChromeOptions()
    _configure_common_options(options)
    try:
        return webdriver.Chrome(options=options)
    except Exception:
        service = ChromeService(ChromeDriverManager().install())
        return webdriver.Chrome(service=service, options=options)
