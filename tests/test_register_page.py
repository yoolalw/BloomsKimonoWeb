import time

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
@pytest.fixture
def chrome():
    service = Service(ChromeDriverManager().install())
    chrome = webdriver.Chrome(service=service)
    chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/BloomsKimonoWeb/register.html")
    chrome.implicitly_wait(5)
    chrome.maximize_window()

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
def test_inserting_itens_in_elements_and_checking_message(chrome):
    chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTest")
    chrome.find_element(By.ID, "emailUser").send_keys("emailForTest@gmail.com")
    chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "btnRegister").click()

    time.sleep(1)

    message = chrome.find_element(By.ID, "message")
    assert message.text == 'Registro enviado!'

@pytest.mark.usefixtures("chrome")
def test_clicking_in_login_page(chrome):
    chrome.find_element(By.ID, "loginButton").click()
    WebDriverWait(chrome, 20).until(
        EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/BloomsKimonoWeb/login.html")
    )


@pytest.mark.usefixtures("chrome")
def test_inserting_itens_and_redirect(chrome):
    chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTest")
    chrome.find_element(By.ID, "emailUser").send_keys("emailForTest@gmail.com")
    chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "btnRegister").click()

    time.sleep(1)

    message = chrome.find_element(By.ID, "message")
    assert message.text == 'Registro enviado!'

    WebDriverWait(chrome, 5).until(
        EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/BloomsKimonoWeb/home.html")
    )

@pytest.mark.usefixtures("chrome")
def test_not_insert_same_password(chrome):
    chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTest")
    chrome.find_element(By.ID, "emailUser").send_keys("emailForTest@gmail.com")
    chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
    chrome.find_element(By.ID, "confSenhaUser").send_keys("wrongPassForTest")

    chrome.find_element(By.ID, "btnRegister").click()

    message = chrome.find_element(By.ID, "message")
    assert message.text == "As senhas nao coincidem!"

