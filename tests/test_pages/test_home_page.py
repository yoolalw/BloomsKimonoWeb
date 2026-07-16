import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_home import HomePage

@pytest.mark.usefixtures("driver")
class TestHomePage:
    driver = WebDriver
    wait = WebDriverWait

    def setup_method(self, driver):
        self.driver.get('http://127.0.0.1:5500/home.html')
        self.home_page = HomePage(self.driver)
# //*[@id="prodSessInn-1002"]
    def test_item(self):
        prod = self.driver.find_element(By.XPATH, '//[@class="prodSessInn"]')
        print(prod)

