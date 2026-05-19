import pytest
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.ie.service import Service
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture

def chrome():
    service = Service(ChromeDriverManager().install())
    chrome = webdriver.Chrome(service=service)

    chrome.get("http//127.0.0.1:5500/BloomsKimonoWeb/register.html")

    chrome.implicitly_wait(5)

    yield chrome
    chrome.quit()

class TestInHomePage:
    def test_verify_itens_displayed(self, chrome):
        pass
