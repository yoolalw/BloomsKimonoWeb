import time
import requests
from conftest import chrome
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urlparse, parse_qs


class TestHomePage:
    chrome: WebDriver

    def setup_method(self):
        self.chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/home.html")

    def test_verify_itens_displayed_in_home_page(self):
        self.chrome.find_element(By.CLASS_NAME, "prodSessInn").is_displayed()
        self.chrome.find_element(By.CLASS_NAME, "removeProd").is_displayed()
        self.chrome.find_element(By.CLASS_NAME, "updatePagProd").is_displayed()
        self.chrome.find_element(By.CLASS_NAME, "cartBtn").is_displayed()

    def test_click_in_prodsess(self):
        self.chrome.find_element(By.CLASS_NAME, "prodSessInn").click()

        url = self.chrome.current_url
        parsedUrl = urlparse(url)
        queryParams = parse_qs(parsedUrl.query)
        idExtr = queryParams.get('id', [None])[0]

        time.sleep(3)

        print(f'idExtr: {idExtr}')

        self.chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/home.html")
