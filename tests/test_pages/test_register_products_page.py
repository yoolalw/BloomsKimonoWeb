import os.path
import time
from pathlib import Path

import pytest
import pyautogui
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait

from tests.pages.page_home import HomePage
from tests.pages.page_login import LoginPage
from tests.pages.page_register_product import RegisterProductPage
from tests.conftest import driver

pyautogui.FAILSAFE = False


@pytest.mark.usefixtures("driver")
class TestRegisterProductPage:
    driver = WebDriver
    wait = WebDriverWait

    def setup_method(self):
        self.driver.get('http://127.0.0.1:5500/registerProduct.html')
        self.rp_page = RegisterProductPage(self.driver)
        self.login = LoginPage(self.driver)
        self.home = HomePage(self.driver)

    def test_displayed_inputs(self):
        assert self.rp_page.displayed_items()

    def test_inserting_items_in_field(self):
        self.login.login_auto()
        time.sleep(3)

        self.driver.get('http://127.0.0.1:5500/registerProduct.html')
        self.rp_page.inserting_fields("prd1", 122.43, 12)
        self.rp_page.inserting_img()
        while "Abrir" not in pyautogui.getActiveWindowTitle():
            pass

        pyautogui.write(r"C:\Users\WSC-Convidado\Downloads\a9be2d5bd3afe8c88d6704c8b550395f.jpg")
        time.sleep(1)
        pyautogui.press("enter")
        time.sleep(1)
        self.rp_page.submit()

        assert self.rp_page.message() == 'Produto cadastrado com sucesso!'

    def test_verifying_if_item_has_been_created(self):
        self.login.login_auto()
        self.home.click_redirect_cadastro()
        self.test_inserting_items_in_field()


    #esta area do sistema nao tem verificação de erro explicita, entao, nao "tem" o que se testar.