import allure
import pytest
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_login import LoginPage


@allure.parent_suite("Testes Web")
@allure.suite("Testes na pagina de login")
@allure.description(
    "Este teste se consiste em verificar os métodos de autenticação do banco de dados em relação ao cadastro de usuários.")
@pytest.mark.usefixtures("driver")
class TestLoginPage:
    driver = WebDriver
    wait = WebDriverWait

    def setup_method(self):
        self.driver.get('http://127.0.0.1:5500/login.html')
        self.login_page = LoginPage(self.driver)

    @allure.sub_suite("Verificando existencia dos elementos no DOM")
    @allure.title("Verificando existencia dos items na tela de login")
    def test_verificando_itens_na_tela_de_login(self):
        assert self.login_page.verificando_existencia_na_tela()

    @allure.sub_suite("Autenticacao dos dados")
    @allure.title("Inserindo {user} no campo de login")
    @pytest.mark.parametrize(
        "user, password, expected",
        [
            ("userTest@email.com", "123", "Login efetuado com sucesso!"),
            ("userError@email.com", "123", "Nome ou senha inválidos."),
            ("", "123", "Preencha este campo."),
            ("email@email.com", "", "Preencha este campo."),
            ("", "", "Preencha este campo."),
        ]
    )
    def test_inserindo_dados_nos_campos(self, user, password, expected):
        self.login_page.inserindo_dados_nos_campos(user, password)
        self.login_page.submit_click()
        assert self.login_page.ver_msg_retornada() == expected

    @allure.title("Verificando redirecionamento para pagina de login")
    @allure.sub_suite("Verificando redirecionamento de pagina")
    def test_fazendo_login_e_verificando_redirecionamento_de_pagina(self):
        self.login_page.inserindo_dados_nos_campos("userTest@email.com", "123")
        self.login_page.submit_click()
        assert self.wait.until(expected_conditions.url_to_be('http://127.0.0.1:5500/home.html'))