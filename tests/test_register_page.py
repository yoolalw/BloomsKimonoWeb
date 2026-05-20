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


@pytest.mark.usefixtures("chrome")
class TestInterfaceRegisterPage:
    chrome: WebDriver

    def setup_method(self):
        self.chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/register.html")

    def test_register_elements_displayed(self):
        self.chrome.find_element(By.ID, "nomeUser").is_displayed()
        self.chrome.find_element(By.ID, "emailUser").is_displayed()
        self.chrome.find_element(By.ID, "senhaUser").is_displayed()
        self.chrome.find_element(By.ID, "confSenhaUser").is_displayed()
        self.chrome.find_element(By.ID, "btnRegister").is_displayed()

    def test_inserting_itens_in_elements_and_checking_message(self):
        self.chrome.find_element(By.ID, "nomeUser").send_keys("u serNameForTesting")
        self.chrome.find_element(By.ID, "emailUser").send_keys("passingEmailsForTest@gmail.com")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "btnRegister").click()

        time.sleep(2)

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == 'Registro enviado!'

    def test_clicking_in_login_page(self):
        self.chrome.find_element(By.ID, "loginButton").click()

        WebDriverWait(self.chrome, 20).until(
            EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/login.html")
        )

    def test_inserting_itens_and_redirect(self):
        self.chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        self.chrome.find_element(By.ID, "emailUser").send_keys("emailFForTeeestinNg222222@gmail.com")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "btnRegister").click()

        time.sleep(1)

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == 'Registro enviado!'

        WebDriverWait(self.chrome, 5).until(
            EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/home.html")
        )

    def test_not_insert_same_password(self):
        self.chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")

        self.chrome.find_element(By.ID, "emailUser").send_keys("emeailForTesting@gmail.com")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "confSenhaUser").send_keys("wrongPassForTest")

        self.chrome.find_element(By.ID, "btnRegister").click()

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == "As senhas nao coincidem!"

    def test_field_name_null(self):
        self.chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting@gmail.com")

        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")

        self.chrome.find_element(By.ID, "btnRegister").click()

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == "Campo nome vazio!"

    def test_field_email_null(self):
        self.chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")

        self.chrome.find_element(By.ID, "btnRegister").click()

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == "Campo email vazio!"

    def test_field_password_null(self):
        self.chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        self.chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting@gmail.com")

        self.chrome.find_element(By.ID, "btnRegister").click()

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == "Campos de senha vazio!"

    def test_insert_exists_email(self):
        self.chrome.find_element(By.ID, "nomeUser").send_keys("userNameForTesting")
        self.chrome.find_element(By.ID, "emailUser").send_keys("emailForTesting2@gmail.com")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.ID, "confSenhaUser").send_keys("passForTest")

        self.chrome.find_element(By.ID, "btnRegister").click()

        WebDriverWait(self.chrome, 5).until(
            EC.text_to_be_present_in_element((By.ID, "message"), "Este email ja está sendo utilizado!")
        )
