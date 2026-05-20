import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

@pytest.fixture(scope="function")
def chrome(request):
    service = Service(ChromeDriverManager().install())
    chrome = webdriver.Chrome(service=service)
    chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/register.html")
    chrome.implicitly_wait(5)
    chrome.maximize_window()

    request.cls = chrome

    yield chrome
    chrome.quit()
