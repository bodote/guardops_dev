from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest

class LoginTests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        
        username = driver.find_element(By.NAME, value="username")
        username.send_keys("coaidev@gmail.com")
        time.sleep(1)
        password = driver.find_element(By.NAME, value="password")
        password.send_keys("Coaidev!")
        time.sleep(1)

        login_button = driver.find_element(By.NAME, value="action")
        login_button.click()

        

    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
