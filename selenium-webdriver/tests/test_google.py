import allure
from selenium.webdriver.common.by import By

class TestGoogle:

    @allure.title("Google Search Test Without Steps")
    @allure.description("Open Google and search for Selenium Python without using steps")
    def test_google_search(self, driver):
        driver.get("https://www.google.com")

        search_box = driver.find_element(By.NAME, "q")
        search_box.send_keys("Selenium Python")

        # Attach screenshot
        allure.attach(
            driver.get_screenshot_as_png(),
            name="google_search",
            attachment_type=allure.attachment_type.PNG
        )

