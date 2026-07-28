import allure
import pytest
from selenium.webdriver.common.by import By, ByType
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver


class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)

        self.input_email = (By.XPATH, '//*[@id="emailUser"]')
        self.input_password = (By.XPATH, '//*[@id="senhaUser"]')

        self.submit_button = (By.XPATH, '//*[@id="loginForm"]/input')

        self.message = (By.XPATH, '//*[@id="message"]')

    @allure.step("Verificando items no DOM")
    def verificando_existencia_na_tela(self):
        return self.wait.until(ec.visibility_of_element_located(self.input_email)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.input_password)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.submit_button)).is_displayed()

    @allure.step("Inserindo dados no campo")
    def inserindo_dados_nos_campos(self, text1, text2):
        self.wait.until(ec.visibility_of_element_located(self.input_email)).send_keys(text1)
        self.wait.until(ec.visibility_of_element_located(self.input_password)).send_keys(text2)

    @allure.step("Clicando no botao de enviar")
    def submit_click(self):
        self.wait.until(ec.visibility_of_element_located(self.submit_button)).click()

    @allure.step("Verificando mensagem de retorno")
    def ver_msg_retornada(self):
        email = self.wait.until(ec.visibility_of_element_located(self.input_email)).get_attribute("validationMessage")
        senha = self.wait.until(ec.visibility_of_element_located(self.input_password)).get_attribute("validationMessage")

        if email or senha:
            return email or senha
        return self.wait.until(ec.visibility_of_element_located(self.message)).text

    def login_auto(self):
        self.driver.get('http://127.0.0.1:5500/login.html')
        self.wait.until(ec.visibility_of_element_located(self.input_email)).send_keys("fulano@email.com")
        self.wait.until(ec.visibility_of_element_located(self.input_password)).send_keys("123")
        self.wait.until(ec.visibility_of_element_located(self.submit_button)).click()
        self.submit_click()
        self.wait.until(ec.visibility_of_element_located(self.message))

