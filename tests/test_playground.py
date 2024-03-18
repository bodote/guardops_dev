from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest
import pyperclip
from selenium.webdriver.chrome.options import Options
from test_login import test_login
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
class PlaygroundTests(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.add_argument('--headless=new')
        self.driver = webdriver.Chrome(options=options)

    def test_datasets(self):
        driver = self.driver
        test_login(driver)
        test_templates(driver)

    def tearDown(self):
        self.driver.quit()


def test_templates(driver: webdriver.Chrome):
    driver.get("http://localhost:3000/playground")
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Prompt Templates')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'Prompt Templates')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Add own Template')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'Add own Template')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.NAME,"template_name")))
    driver.find_element(By.NAME, value="template_name").send_keys("Template Testing Name")
    driver.find_element(By.NAME, value="template_description").send_keys("Template Description")
    driver.find_element(By.NAME, value="template_link").send_keys("Template Link")
    driver.find_element(By.NAME, value="template").send_keys("Template Content Full Text")
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create Template')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Template Testing Name')]")))
    template_created = driver.find_element(By.XPATH, value="//*[contains(text(),'Template Testing Name')]")
    assert template_created, "Prompt Template was not created"

if __name__ == "__main__":
    unittest.main()
