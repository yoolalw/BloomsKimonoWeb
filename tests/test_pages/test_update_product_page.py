import time

import pytest
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver
from tests.pages.page_login import LoginPage
from tests.pages.page_update_product import UpdateProductPage
@pytest.mark.usefixtures("driver")
class TestUpdateProductPage:
    driver = WebDriver
    wait = WebDriverWait
    def red(self):
        self.driver.get('http://127.0.0.1:5500/updateProduct.html?id=1')

    def setup_method(self, driver):
        self.driver.get('http://127.0.0.1:5500/updateProduct.html?id=1')
        self.up_page = UpdateProductPage(self.driver)
        self.login = LoginPage(self.driver)

    def test_items_displayed(self):
        assert self.up_page.displayed_items()

    def test_product_id_in_url(self):
        self.login.login_auto()
        time.sleep(4)
        self.driver.get('http://127.0.0.1:5500/updateProduct.html?id=1')
        assert self.up_page.verifying_id_in_url() == 1

    @pytest.mark.parametrize(
        'nome, preco, quant', [
            ('produto atualizado', 100.10, 11),
            ('', 1224.43, 222),
            ('', '', ''),
            ('aa', '123', '213'),
            ('1234', 'sdad3', 'abv')
        ]
    )
    def test_inserting_itens_in_field(self, nome, preco, quant):
        self.login.login_auto()
        self.red()
        self.up_page.inserting_items(nome, preco, quant)
        self.up_page.click_submit_button()
        assert self.up_page.verifying_message() == 'Produto alterado com sucesso!'

    #tambem nao possui mensagens de erro para dar continuidade.