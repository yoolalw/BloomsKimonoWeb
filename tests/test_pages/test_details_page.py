from ftplib import all_errors

import pytest
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_details import DetailsPage
from tests.pages.page_login import LoginPage


@pytest.mark.usefixtures("driver")
class TestDetailsPage:
    driver = WebDriver
    wait = WebDriverWait
    def setup_method(self):
        self.driver.get('http://127.0.0.1:5500/detailsProduct.html?id=1')
        self.dt_page = DetailsPage(self.driver)
        self.login = LoginPage(self.driver)

    def test_displayed_items(self):
        self.login.login_auto()
        assert self.dt_page.verifying_if_items_are_displayed()

    def test_click_add_to_card(self):
        self.login.login_auto()
        self.driver.get('http://127.0.0.1:5500/detailsProduct.html?id=1')
        self.dt_page.click_add_cart()
        assert self.dt_page.alert() == 'Item adicionado com sucesso!'

    def test_redirect_to_ver_cart(self):
        self.login.login_auto()
        self.driver.get('http://127.0.0.1:5500/detailsProduct.html?id=1')
        self.dt_page.click_ver_cart()
        assert self.dt_page.redirect_page_to_ver_cart()

    def test_negative_trying_to_access_without_login(self):
        self.dt_page.verifying_if_items_are_displayed()

        assert pytest.fail()