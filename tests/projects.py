from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest

class ProjectCRUDTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_projects(self):
        driver = self.driver
        driver.get("http://localhost:3000/projects")

        test_project_creation(driver)

    def tearDown(self):
        self.driver.quit()


def test_project_creation(driver: webdriver.Chrome):

    new_dataset = driver.find_element(By.XPATH, value="//*[contains(text(),'New Project')]")
    #import_dataset = driver.find_element(By.XPATH, value="//*[contains(text(),'Import Dataset')]")

    new_dataset.click()
    project_name = driver.find_element(By.NAME, value="project_name")
    project_name.send_keys("Name")

    project_desc = driver.find_element(By.NAME, value="project_description")
    project_desc.send_keys("Description")

    save_button = driver.find_element(By.XPATH, value="//*[contains(text(),'Save Project')]")
    save_button.click()


if __name__ == "__main__":
    unittest.main()
