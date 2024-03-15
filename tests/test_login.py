from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest

class LoginTests(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.add_argument('--headless=new')
        self.driver = webdriver.Chrome(options=options)
        
    
    def test(self):
        test_login(self.driver)
    
        

    def tearDown(self):
        self.driver.quit()

def test_login(driver):
        driver.get("http://localhost:3000/")
        time.sleep(2)
        username = driver.find_element(By.NAME, value="username")
        username.send_keys("coaidev@gmail.com")
        time.sleep(2)
        password = driver.find_element(By.NAME, value="password")
        password.send_keys("Coaidev!")
        time.sleep(2)

        login_button = driver.find_element(By.NAME, value="action")
        login_button.click()

if __name__ == "__main__":
    unittest.main()
