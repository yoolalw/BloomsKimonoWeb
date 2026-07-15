from operator import and_

import allure
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver

class RegisterUserPage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)

        self.input_user_name = (By.XPATH, '//*[@id="nomeUser"]')
        self.input_email = (By.XPATH, '//*[@id="emailUser"]')
        self.input_password = (By.XPATH, '//*[@id="senhaUser"]')
        self.confirm_password = (By.XPATH, '//*[@id="confSenhaUser"]')

        self.submit_button = (By.XPATH, '//*[@id="btnRegister"]')

        self.login_redirect_button = (By.XPATH, '//*[@id="loginButton"]')

        self.message = (By.XPATH, '//*[@id="message"]')


    def displayed_items_in_screen(self):
        return self.wait.until(ec.visibility_of_element_located(self.input_user_name)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.input_email)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.input_password)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.confirm_password)).is_displayed()

    @allure.step("aaa")
    def inserting_items_in_fields(self, text1, text2, text3, text4):
        self.wait.until(ec.visibility_of_element_located(self.input_user_name)).send_keys(text1)
        self.wait.until(ec.visibility_of_element_located(self.input_email)).send_keys(text2)
        self.wait.until(ec.visibility_of_element_located(self.input_password)).send_keys(text3)
        self.wait.until(ec.visibility_of_element_located(self.confirm_password)).send_keys(text4)

    def submit_click(self):
        self.wait.until(ec.visibility_of_element_located(self.submit_button)).click()

    def see_message(self):
        return self.wait.until(ec.visibility_of_element_located(self.message)).text

    def login_button_click(self):
        self.wait.until(ec.visibility_of_element_located(self.login_redirect_button)).click()