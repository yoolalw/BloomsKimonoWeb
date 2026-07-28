from asyncio import wait_for
from urllib.parse import urlparse, parse_qs

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait
from urllib3.util import parse_url

from tests.conftest import driver


class UpdateProductPage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.input_nome = (By.XPATH, '//*[@id="nomeKimono"]')
        self.input_preco = (By.XPATH, '//*[@id="precoKimono"]')
        self.input_quantidade = (By.XPATH, '//*[@id="quantidadeKimono"]')
        self.submit = (By.XPATH, '//*[@id="submitUpdate"]')
        self.msg = (By.ID, 'message')

    def displayed_items(self):
        return self.wait.until(ec.visibility_of_element_located(self.input_nome)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.input_preco)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.input_quantidade)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.submit)).is_displayed()

    def inserting_items(self, nome, preco, quantidade):
        self.wait.until(ec.visibility_of_element_located(self.input_nome)).send_keys(nome)
        self.wait.until(ec.visibility_of_element_located(self.input_preco)).send_keys(preco)
        self.wait.until(ec.visibility_of_element_located(self.input_quantidade)).send_keys(quantidade)

    def click_submit_button(self):
        self.wait.until(ec.visibility_of_element_located(self.submit)).click()

    def verifying_id_in_url(self):
        url = urlparse(self.driver.current_url)
        id_url = int(parse_qs(url.query).get('id', [None])[0])
        return id_url

    def verifying_message(self):
        return self.wait.until(ec.visibility_of_element_located(self.msg)).text
