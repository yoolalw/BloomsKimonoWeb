import allure
import pytest
from allure_commons.types import Severity
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_register_user import RegisterUserPage


@allure.title("Testes na pagina de cadastro de usuário")
@allure.description(
    "Os testes verificarão se os retornos esperados da interface seja condizente com o fluxo natural de um e-commerce.")
@pytest.mark.usefixtures("driver")
class TestRegisterPage:
    driver = WebDriver
    wait = WebDriverWait

    def setup_method(self, driver):
        self.register_page = RegisterUserPage(self.driver)
        self.driver.get('http://127.0.0.1:5500/register.html')

    def test_verificando_existencia_de_elementos_na_tela(self):
        assert self.register_page.displayed_items_in_screen()

    @pytest.mark.parametrize(
        "user, email, password, conf_password, expected",
        [
            ("a", "a@email.com", "ab123", "ab123", "Registro enviado!"),
            ("b", "b@email.com", "b123", "ba123", "As senhas nao coincidem!"),
            ("c", "c@email.com", "ab123", "ab123", "Este email ja foi registrado!"),
        ]
    )
    def test_inserindo_itens_no_campo_de_inserção(self, user, email, password, conf_password, expected):
        self.register_page.inserting_items_in_fields(user, email, password, conf_password)
        self.register_page.submit_click()
        assert self.register_page.see_message() == expected
