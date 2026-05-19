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
    chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/register.html")
    chrome.implicitly_wait(5)
    chrome.maximize_window()

    yield chrome
    chrome.quit()


class TestInterfaceRegisterPage:
    def test_register_elements_displayed(self, chrome):
        chrome.find_element(By.ID, "nomeUser").is_displayed()
        chrome.find_element(By.ID, "emailUser").is_displayed()
        chrome.find_element(By.ID, "senhaUser").is_displayed()
        chrome.find_element(By.ID, "confSenhaUser").is_displayed()
        chrome.find_element(By.ID, "btnRegister").is_displayed()

    def test_inserting_itens_in_elements_and_checking_message(self, chrome):
        chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting@gmail.com")
        chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "btnRegister").click()

        time.sleep(1)

        message = chrome.find_element(By.ID, "message")
        assert message.text == 'Registro enviado!'

    def test_clicking_in_login_page(self, chrome):
        chrome.find_element(By.ID, "loginButton").click()
        WebDriverWait(chrome, 20).until(
            EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/login.html")
        )

    def test_inserting_itens_and_redirect(self, chrome):
        chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting2@gmail.com")
        chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "btnRegister").click()

        time.sleep(1)

        message = chrome.find_element(By.ID, "message")
        assert message.text == 'Registro enviado!'

        WebDriverWait(chrome, 5).until(
            EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/home.html")
        )

    def test_not_insert_same_password(self, chrome):
        chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting@gmail.com")
        chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "confSenhaUser").send_keys("wrongPassForTest")

        chrome.find_element(By.ID, "btnRegister").click()

        message = chrome.find_element(By.ID, "message")
        assert message.text == "As senhas nao coincidem!"

    def test_field_name_null(self, chrome):
        chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting@gmail.com")
        chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")

        chrome.find_element(By.ID, "btnRegister").click()

        message = chrome.find_element(By.ID, "message")
        assert message.text == "Campo nome vazio!"

    def test_field_email_null(self, chrome):
        chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")

        chrome.find_element(By.ID, "btnRegister").click()

        message = chrome.find_element(By.ID, "message")
        assert message.text == "Campo email vazio!"

    def test_field_password_null(self, chrome):
        chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting@gmail.com")

        chrome.find_element(By.ID, "btnRegister").click()

        message = chrome.find_element(By.ID, "message")
        assert message.text == "Campos de senha vazio!"

    def test_insert_exists_email(self, chrome):
        chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting2@gmail.com")
        chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")

        chrome.find_element(By.ID, "btnRegister").click()

        WebDriverWait(chrome, 5).until(
            EC.text_to_be_present_in_element((By.ID, "message"), "Este email ja está sendo utilizado!")
        )
