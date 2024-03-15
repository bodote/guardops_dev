from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest
import pyperclip

class PlaygroundTests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_datasets(self):
        driver = self.driver
        driver.get("http://localhost:3000/playground")
        
        test_templates(driver)



    def tearDown(self):
        self.driver.quit()


def test_templates(driver: webdriver.Chrome):

    driver.find_element(By.XPATH, value="//*[contains(text(),'Prompt Templates')]").click()
    driver.find_element(By.XPATH, value="//*[contains(text(),'Add own Template')]").click()
    driver.find_element(By.NAME, value="template_name").send_keys("Template Name")
    driver.find_element(By.NAME, value="template_description").send_keys("Template Description")
    driver.find_element(By.NAME, value="template_link").send_keys("Template Link")
    driver.find_element(By.NAME, value="template").send_keys("Template Content Full Text")
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create Template')]").click()


if __name__ == "__main__":
    unittest.main()
