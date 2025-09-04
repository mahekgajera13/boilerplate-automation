from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class GooglePage:
    URL = "https://www.google.com"

    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(self.URL)

    def search(self, text):
        search_box = self.driver.find_element(By.NAME, "q")
        search_box.send_keys(text + Keys.RETURN)

    def get_results_text(self):
        results = self.driver.find_elements(By.CSS_SELECTOR, "div")
        return " ".join([r.text for r in results])
