from logging import addLevelName
from operator import and_
from wsgiref.util import request_uri

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec

from tests.conftest import driver


class RegisterProductPage:
    def __init__(self, driver):
        self.driver = WebDriver
        self.wait = WebDriverWait(driver, 10)

        self.input_nome = (By.XPATH, '//*[@id="nomeKimono"]')
        self.input_preco = (By.XPATH, '//*[@id="precoKimono"]')
        self.input_quant = (By.XPATH, '//*[@id="quantidadeKimono"]')
        self.imagem = (By.XPATH, '//*[@id="registerProductForm"]/div[4]/label[2]')

        self.submit_btn = (By.XPATH, '//*[@id="registerProductForm"]/input')

        self.msg = (By.XPATH, '//*[@id="message"]')

    def displayed_items(self):
        return self.wait.until(ec.visibility_of_element_located(self.input_nome)) and \
            self.wait.until(ec.visibility_of_element_located(self.input_preco)) and \
            self.wait.until(ec.visibility_of_element_located(self.input_quant)) and \
            self.wait.until(ec.visibility_of_element_located(self.submit_btn))

    def inserting_fields(self, nome, preco, quant):
        self.wait.until(ec.visibility_of_element_located(self.input_nome)).send_keys(nome)
        self.wait.until(ec.visibility_of_element_located(self.input_preco)).send_keys(preco)
        self.wait.until(ec.visibility_of_element_located(self.input_quant)).send_keys(quant)

    def inserting_img(self):
        self.wait.until(ec.element_to_be_clickable(self.imagem)).click()

    def message(self):
        return self.wait.until(ec.visibility_of_element_located(self.msg)).text

    def submit(self):
        self.wait.until(ec.visibility_of_element_located(self.submit_btn)).click()

