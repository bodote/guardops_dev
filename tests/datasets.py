from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest

class ProjectCRUDTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_datasets(self):
        driver = self.driver
        driver.get("http://localhost:3000/datasetlist")
        
        test_dataset_creation(driver)



    def tearDown(self):
        self.driver.quit()


def test_dataset_creation(driver: webdriver.Chrome):

    new_dataset = driver.find_element(By.XPATH, value="//*[contains(text(),'New Dataset')]")
    #import_dataset = driver.find_element(By.XPATH, value="//*[contains(text(),'Import Dataset')]")

    new_dataset.click()
    dataset_name = driver.find_element(By.NAME, value="dataset_name")
    dataset_name.send_keys("Name")

    dataset_desc = driver.find_element(By.NAME, value="dataset_description")
    dataset_desc.send_keys("Description")

    save_button = driver.find_element(By.XPATH, value="//*[contains(text(),'Save Dataset')]")
    save_button.click()


if __name__ == "__main__":
    unittest.main()
