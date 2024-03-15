from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest
from selenium.webdriver.chrome.options import Options
from test_login import test_login

class ProjectTests(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.add_argument('--headless=new')
        self.driver = webdriver.Chrome(options=options)

    def test_projects(self):
        driver = self.driver
        test_login(driver)
        

        test_project_creation(driver)

    def tearDown(self):
        self.driver.quit()


def test_project_creation(driver: webdriver.Chrome):
    driver.get("http://localhost:3000/projects")
    driver.find_element(By.XPATH, value="//*[contains(text(),'New Project')]").click()

    project_name = driver.find_element(By.NAME, value="project_name")
    project_name.send_keys("Name")

    project_desc = driver.find_element(By.NAME, value="project_description")
    project_desc.send_keys("Description")

    driver.find_element(By.XPATH, value="//*[contains(text(),'Save Project')]").click()



if __name__ == "__main__":
    unittest.main()
