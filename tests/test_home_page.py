import time

from conftest import chrome
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestHomePage:
    chrome: WebDriver

    def setup_method(self):
        self.chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/home.html")

    def test_verify_itens_displayed_in_home_page(self):
        self.chrome.find_element(By.CLASS_NAME, "prodSessInn").is_displayed()
        self.chrome.find_element(By.CLASS_NAME, "removeProd").is_displayed()
        self.chrome.find_element(By.CLASS_NAME, "updatePagProd").is_displayed()
        self.chrome.find_element(By.CLASS_NAME, "cartBtn").is_displayed()

    def test_click_in_prodSess(self):
        self.chrome.find_element(By.ID, "prodSessInn-${dataDb.id}").click()

        time.sleep(3)

        WebDriverWait(self.chrome, 10).until(EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/detailsProduct.html?id=id"))
