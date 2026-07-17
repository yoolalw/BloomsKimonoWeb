import allure
import pytest
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_home import HomePage


@allure.parent_suite("Teste web")
@allure.feature("Testes na tela inicial")
@allure.description(
    "Os testes nessa página irão priorizar a criação de produtos e facil dominio para vendedores de kimonos")
@pytest.mark.usefixtures("driver")
class TestHomePage:
    driver = WebDriver
    wait = WebDriverWait

    def setup_method(self, driver):
        self.driver.get('http://127.0.0.1:5500/home.html')
        self.home_page = HomePage(self.driver)

    @allure.title("Existencia dos elementos no card")
    def test_verificando_existencia_dos_elementos_no_card(self):
        assert self.home_page.verificando_comportamento_dos_elementos_no_card()

    @allure.title("Clicando no botao de deletar")
    def test_deletando_produtos_e_verificando_alerta(self):
        self.home_page.click_deletar_produto()
        self.home_page.verificando_se_o_item_foi_removido()

    @allure.title("Clicando no botao de editar produto")
    def test_clicando_em_editar_produto_e_verificando_redirecionamento(self):
        assert self.home_page.redirect_editar_page()

    @allure.title("Clicando no card")
    def test_clicando_no_card_e_redirecionando_para_pagina_de_detalhes(self):
        assert self.home_page.redirect_detalhes_page()

    @allure.title("Clicando no botao de cadastro de produtos")
    def test_clicando_no_botao_de_cadastro_de_produtos(self):
        self.home_page.click_cadastrar_produto()
        assert self.home_page.redirect_cadastro_de_produto

    @allure.title("Clicando no botao de ver carrinho")
    def test_clicando_no_botao_de_ver_carrinho(self):
        self.home_page.click_ver_carrinho()
        assert self.home_page.redirect_ver_carrinho()
