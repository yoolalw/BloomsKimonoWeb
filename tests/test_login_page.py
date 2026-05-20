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
class TestLoginPage:
    chrome: WebDriver

    def setup_method(self):
        self.chrome.get("http://127.0.0.1:5500/BloomsKimonoWeb/login.html")

    def test_displayed_itens_in_page(self):
        self.chrome.find_element(By.ID, "emailUser").is_displayed()
        self.chrome.find_element(By.ID, "senhaUser").is_displayed()
        self.chrome.find_element(By.CLASS_NAME, "btn-submit").is_displayed()

    def test_verify_login_auth(self):
        self.chrome.find_element(By.ID, "emailUser").send_keys("passingEmailsForTest@gmail.com")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.CLASS_NAME, "btn-submit").click()

        time.sleep(1)

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == "Login efetuado com sucesso!"

    def test_verify_login_error_message(self):
        self.chrome.find_element(By.ID, "emailUser").send_keys("wrongEmail@gmail.com")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("wrongPassword")
        self.chrome.find_element(By.CLASS_NAME, "btn-submit").click()
        time.sleep(3)

        message = self.chrome.find_element(By.ID, "message")
        assert message.text == "Nome ou senha inválidos."

    def test_verify_login_auth_and_redirect(self):
        self.chrome.find_element(By.ID, "emailUser").send_keys("passingEmailsForTest@gmail.com")
        self.chrome.find_element(By.ID, "senhaUser").send_keys("passForTest")
        self.chrome.find_element(By.CLASS_NAME, "btn-submit").click()

        time.sleep(3)


        WebDriverWait(self.chrome, 10).until(EC.url_to_be("http://127.0.0.1:5500/BloomsKimonoWeb/home.html"))
