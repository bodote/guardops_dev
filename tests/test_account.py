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
import clipboard
class AccountTests(unittest.TestCase):

    def setUp(self):
        #options = Options()
        #options.add_argument('--headless=new')
        self.driver = webdriver.Chrome()

    def test_datasets(self):
        driver = self.driver
        test_login(driver)
        test_keys(driver)



    def tearDown(self):
        self.driver.quit()


def test_keys(driver: webdriver.Chrome):
    driver.get("http://localhost:3000/pageprofile")
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'API-Management')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'API-Management')]").click()
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create a new secret')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Copy key to clipboard')]")))
    time.sleep(0.2)
    driver.find_element(By.XPATH, value="//*[contains(text(),'Copy key to clipboard')]").click()
    time.sleep(0.2)
    clipboard_content = clipboard.paste()
    assert "coai" in clipboard_content and len(clipboard_content)==50, "copying of new key failed"

if __name__ == "__main__":
    unittest.main()
