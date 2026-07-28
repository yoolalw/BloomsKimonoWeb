import re
from urllib.parse import urlparse, parse_qs

import allure
import pytest
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions

from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver


class HomePage:
    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)
        self.card = (By.XPATH, '//*[@class="prodSessInn"]')
        self.card_img = (By.XPATH, '//*[@class="prodSessInn"]/a/img')
        self.card_title = (By.XPATH, '//*[@class="prodSessInn"]/p')
        self.card_price = (By.XPATH, '//*[@class="prodSessInn"]/h3')
        self.delete_button = (By.CLASS_NAME, 'removeProd')
        self.edit_button = (By.XPATH, '//*[@class="prodSessInn"]/a[2]/button')

        self.cadastrar_prod = (By.XPATH, '/html/body/a')
        self.cart_btn = (By.XPATH, '/html/body/div[1]/a[2]')

    @allure.step("Verificando comportamento dos elementos no card")
    def verificando_comportamento_dos_elementos_no_card(self):
        return self.wait.until(expected_conditions.visibility_of_element_located(self.card_img)) and \
            self.wait.until(expected_conditions.visibility_of_element_located(self.card_title)) and \
            self.wait.until(expected_conditions.visibility_of_element_located(self.card_price)) and \
            self.wait.until(expected_conditions.visibility_of_element_located(self.delete_button))  and \
            self.wait.until(expected_conditions.visibility_of_element_located(self.edit_button))

    @allure.step("Clicando no botao de deletar produto")
    def click_deletar_produto(self):
        self.wait.until(expected_conditions.visibility_of_element_located(self.delete_button)).click()

    @allure.step("Clicando no botao de editar produto")
    def click_editar_produto(self):
        self.wait.until(expected_conditions.visibility_of_element_located(self.edit_button)).click()

    @allure.step("Clicando no card")
    def click_card(self):
        self.wait.until(expected_conditions.visibility_of_element_located(self.card)).click()

    @allure.step("Verificando redirecionamento para tela de detalhes")
    def redirect_detalhes_page(self):
        card = self.wait.until(expected_conditions.visibility_of_element_located(self.card))
        id = card.get_attribute("id")
        valor_id_final = int(re.search(r"\d+", id).group())
        self.click_card()
        parse_url = urlparse(self.driver.current_url)
        id_url = int(parse_qs(parse_url.query).get('id', [None])[0])
        return valor_id_final == id_url

    @allure.step("Verificando redirecionamento para tela de editar produto")
    def redirect_editar_page(self):
        card = self.wait.until(expected_conditions.visibility_of_element_located(self.card))
        id = card.get_attribute('id')
        id_final = int(re.search(r"\d+", id).group())
        self.click_editar_produto()
        url = urlparse(self.driver.current_url)
        id_url = int(parse_qs(url.query).get('id', [None])[0])

        return id_url == id_final

    @allure.step("Verificando se o produto foi deletado")
    def verificando_se_o_item_foi_removido(self):
        alert = Alert(self.driver)
        self.wait.until(expected_conditions.alert_is_present())
        alert.accept()

    @allure.step("Clicando no botao de cadastrar novos produtos")
    def click_cadastrar_produto(self):
        self.wait.until(expected_conditions.visibility_of_element_located(self.cadastrar_prod)).click()

    @allure.step("Verificando url da pagina de cadastro de produtos")
    def redirect_cadastro_de_produto(self):
        return self.wait.until(expected_conditions.url_to_be('http://127.0.0.1:5500/registerProduct.html'))

    @allure.step("Clicando no botao de ver carrinho")
    def click_ver_carrinho(self):
        self.wait.until(expected_conditions.visibility_of_element_located(self.cart_btn)).click()

    @allure.step("Verificando redirecionamento para pagina de ver carrinho")
    def redirect_ver_carrinho(self):
        return self.wait.until(expected_conditions.url_to_be('http://127.0.0.1:5500/cart.html'))

    def click_redirect_cadastro(self):
        self.wait.until(expected_conditions.visibility_of_element_located(self.cadastrar_prod)).click()