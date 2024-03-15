from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest
import pyperclip
from selenium.webdriver.chrome.options import Options

class AccountTests(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.add_argument('--headless=new')
        self.driver = webdriver.Chrome(options=options)

    def test_datasets(self):
        driver = self.driver
        driver.get("http://localhost:3000/pageprofile")
        
        test_keys(driver)



    def tearDown(self):
        self.driver.quit()


def test_keys(driver: webdriver.Chrome):

    driver.find_element(By.XPATH, value="//*[contains(text(),'API-Management')]").click()
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create a new secret')]").click()
    driver.find_element(By.XPATH, value="//*[contains(text(),'Copy key to clipboard')]").click()
    clipboard_content = pyperclip.paste()
    assert "coai" in clipboard_content and len(clipboard_content)==50, "copying of new key failed"

if __name__ == "__main__":
    unittest.main()
