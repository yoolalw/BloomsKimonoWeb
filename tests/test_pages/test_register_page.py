import allure
import pytest
from allure_commons.types import Severity
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_register_user import RegisterUserPage


@pytest.mark.usefixtures("driver")
@allure.title("Tests in register user page")
class TestRegisterPage:
    driver = WebDriver
    wait = WebDriverWait


    def setup_method(self, driver):
        self.driver.get("http://127.0.0.1:5500/register.html")
        self.register_page = RegisterUserPage(self.driver)

    @allure.title("Veriying if elements in DOM has been created")
    @allure.description("This test has been created to see if every elements are in screen")
    @allure.severity(Severity.NORMAL)
    @allure.step("S1")
    def test_if_elements_has_been_displayeds_in_screen(self):
        assert self.register_page.displayed_items_in_screen()

    @pytest.mark.parametrize(
        "user, email, password, con_password, expected",
        [
            ("user1", "email1@email", "password", "password", "Registro enviado!"),
            ("user2", "email2@email", "password", "passwordwrong", "As senhas nao coincidem!"),
            ("user3", "emailexistente@gmail.com", "password", "password", "Este email ja está sendo utilizado!")
        ]

    )
    @allure.title("Triying to insert every items in register page! ")
    @allure.severity(Severity.CRITICAL)
    @allure.step("S2")
    def test_inserting_items_in_fields(self, user, email, password, con_password, expected):
        self.register_page.inserting_items_in_fields(text1=user, text2=email, text3=password, text4=con_password)
        self.register_page.submit_click()
        assert self.register_page.see_message() == expected