import time
from asyncio import wait
from pytest_check import check
import allure
import pytest
from allure_commons.types import Severity, ALLURE_UNIQUE_LABELS
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_register_user import RegisterUserPage


@allure.parent_suite("Testes Web")
@allure.suite("Testes realizados na pagina de registro")
@allure.feature("Cadastro de usuário")
@allure.description(
    "Os testes verificarão se os retornos esperados da interface seja condizente com o fluxo natural de um e-commerce.")
@pytest.mark.usefixtures("driver")
class TestRegisterPage:
    driver = WebDriver
    wait = WebDriverWait

    def setup_method(self, driver):
        self.register_page = RegisterUserPage(self.driver)
        self.driver.get('http://127.0.0.1:5500/register.html')

    @allure.sub_suite("Verificação de elementos no DOM")
    @allure.title("Verificando se os elementos estao na tela")
    def test_verificando_existencia_de_elementos_na_tela(self):
        self.login.login_auto()
        assert self.register_page.displayed_items_in_screen()

    @allure.sub_suite("Registro e cadastro (POST)")
    @allure.title("Adicionando itens nos campos: {user}")
    @pytest.mark.parametrize(
        "user, email, password, conf_password, expected",
        [
            ("a", "a@email.com", "ab123", "ab123", "Registro enviado!"),
            ("b", "b@email.com", "b123", "ba123", "As senhas nao coincidem!"),
            ("c", "c@email.com", "ab123", "ab123", "Este email ja está sendo utilizado!"),
            ("", "d@email.com", "123", "123", "Campo nome vazio!"),
            ("e", "", "123", "123", "Campo email vazio!"),
            ("f", "email@email.com", "", "", "Campos de senha vazio!"),
            ("g", "email", "123", "123", 'Inclua um "@" no endereço de e-mail. "email" está com um "@" faltando.')
        ]
    )
    def test_inserindo_itens_nos_campos_de_input(self, user, email, password, conf_password, expected):
        self.register_page.inserting_items_in_fields(user, email, password, conf_password)
        self.register_page.submit_click()
        assert self.register_page.see_message() == expected

    @allure.title("Verificando redirecionamento para página home")
    @allure.sub_suite("Redirecionamento de página")
    def test_verificando_redirecionamento_de_página(self):
        self.register_page.inserting_items_in_fields("user123", "email@gmail.com", "1234", "1234")
        self.register_page.submit_click()
        assert self.wait.until(expected_conditions.url_to_be("http://127.0.0.1:5500/home.html"))

    @allure.sub_suite("Redirecionamento de pagina")
    @allure.title("Clicando no link de redirecionamento para página de login")
    def test_clicando_no_link_de_redirecionamento(self):
        self.register_page.login_button_click()
        assert self.register_page.see_url_login_page()
