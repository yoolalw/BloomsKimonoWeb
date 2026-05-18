import pytest
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.ie.service import Service
from webdriver_manager.chrome import ChromeDriverManager



#@pytest.fixture
#def chrome():
#    service = Service(ChromeDriverManager().install())
#    chrome = webdriver.Chrome(service=service)
#    chrome.get('http://127.0.0.1:5500/BloomsKimonoWeb/home.html')

    #chrome.implicitly_wait(1)
    #yield chrome
    #chrome.quit()

#@pytest.mark.usefixtures("chrome")
#def test_products_is_displayed(chrome):
#    chrome.find_element(By.CLASS_NAME, "prodSessInn").is_displayed()