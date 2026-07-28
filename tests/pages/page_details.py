import pytest
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait

from tests.conftest import driver


class DetailsPage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.ver_cart = (By.XPATH, '/html/body/div[1]/a[2]')
        self.img = (By.XPATH, '//*[@id="itensSessInn"]/div/img')
        self.name = (By.XPATH, '//*[@id="itensSessInn"]/h1')
        self.price = (By.XPATH, '//*[@id="itensSessInn"]/h2')
        self.add_cart = (By.XPATH, '//*[@id="cartBtn"]')

    def verifying_if_items_are_displayed(self):
        return self.wait.until(ec.visibility_of_element_located(self.ver_cart)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.img)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.name)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.price)).is_displayed() and \
            self.wait.until(ec.visibility_of_element_located(self.add_cart)).is_displayed()

    def click_ver_cart(self):
        self.wait.until(ec.visibility_of_element_located(self.ver_cart)).click()

    def click_add_cart(self):
        self.wait.until(ec.visibility_of_element_located(self.add_cart)).click()

    def alert(self):
        alert = self.wait.until(ec.alert_is_present())
        return alert.text

    def redirect_page_to_ver_cart(self):
        return self.wait.until(ec.url_to_be('http://127.0.0.1:5500/cart.html'))
