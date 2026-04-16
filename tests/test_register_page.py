from http.client import responses

import pytest
import requests
import selenium
import webdriver_manager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture
def chrome():
    service = Service(ChromeDriverManager().install())
    chrome = webdriver.Chrome(service=service)
    chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/BloomsKimonoWeb/register.html")

    yield chrome

    chrome.quit()


@pytest.mark.usefixtures("chrome")
def test_register_elements_displayed(chrome):

    chrome.find_element(By.ID, "nomeUser").is_displayed()
    chrome.find_element(By.ID, "emailUser").is_displayed()
    chrome.find_element(By.ID, "senhaUser").is_displayed()
    chrome.find_element(By.ID, "confSenhaUser").is_displayed()
    chrome.find_element(By.ID, "btnRegister").is_displayed()

@pytest.mark.usefixtures("chrome")
def test_inserting_itens_in_elements(chrome):
    chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTest")
    chrome.find_element(By.ID, "emailUser").send_keys("emailForTest@gmail.com")
    chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "btnRegister").click()

    urlFromFetch = 'http://localhost:8080/users'
    response = requests.get(urlFromFetch)

    assert response.status_code == 200

@pytest.mark.usefixtures("chrome")
def test_not_insert_same_password(chrome):
    chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTest")
    chrome.find_element(By.ID, "emailUser").send_keys("emailForTest@gmail.com")
    chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "confSenhaUser").send_keys("wrongPassForTest")

    chrome.find_element(By.ID, "btnRegister").click()

    message = chrome.find_element(By.ID, "message").is_displayed()
    assert message.text == "As senhas nao coincidem!"