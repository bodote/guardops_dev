from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest
from selenium.webdriver.chrome.options import Options
from test_login import test_login
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'New Project')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'New Project')]").click()
    driver.find_element(By.NAME, value="project_name").send_keys("Testing Project")
    driver.find_element(By.NAME, value="project_description").send_keys("Description")
    driver.find_element(By.XPATH, value="//*[contains(text(),'Save Project')]").click()
    project_created = driver.find_element(By.XPATH, value="//*[contains(text(),'Testing Project')]")
    assert project_created, "Project was not created"

if __name__ == "__main__":
    unittest.main()
