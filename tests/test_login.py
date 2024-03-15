from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
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
        WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.NAME,"username")))
        username = driver.find_element(By.NAME, value="username")
        username.send_keys("coaidev@gmail.com")
        password = driver.find_element(By.NAME, value="password")
        password.send_keys("Coaidev!")
        login_button = driver.find_element(By.NAME, value="action")
        login_button.click()

if __name__ == "__main__":
    unittest.main()
