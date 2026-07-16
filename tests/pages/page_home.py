import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions

from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver

class HomePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)

        self.card = (By.CLASS_NAME, 'prodSessInn/id')








