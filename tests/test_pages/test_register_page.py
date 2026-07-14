import pytest
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_register_user import RegisterUserPage


@pytest.mark.usefixtures("driver")
class TestRegisterPage:
    driver = WebDriver
    wait = WebDriverWait

    def setup_method(self, driver):
        self.driver.get("http://127.0.0.1:5500/register.html")
        self.register_page = RegisterUserPage(self.driver)

    def test_if_elements_has_been_displayeds_in_screen(self):
        assert self.register_page.displayed_items_in_screen()

    @pytest.mark.parametrize(
        "user, email, password, con_password",
        [
            ("user1", "email1@email", "password", "password"),
            ("user2", "email2@email", "password", "passwordwrong"),
            ("user3", "email3@email", "password", "password")
        ]

    )
    def test_inserting_items_in_fields(self, user, email, password, con_password):
        self.register_page.inserting_items_in_fields("user",
                                                     "emailbaaatawwww@email.com",
                                                     "password",
                                                     "password")
        self.register_page.submit_click()
        assert self.register_page.see_message() == 'Registro enviado!'
