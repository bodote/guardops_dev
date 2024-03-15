from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest
from selenium.webdriver.chrome.options import Options
from test_login import test_login

class DatasetTests(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.add_argument('--headless=new')
        self.driver = webdriver.Chrome(options=options)

    def test_datasets(self):
        driver = self.driver
        test_login(driver)
        driver.get("http://localhost:3000/datasetlist")
        
        test_dataset_creation(driver)



    def tearDown(self):
        self.driver.quit()


def test_dataset_creation(driver: webdriver.Chrome):

    driver.find_element(By.XPATH, value="//*[contains(text(),'New Dataset')]").click()

    dataset_name = driver.find_element(By.NAME, value="dataset_name")
    dataset_name.send_keys("Name")

    dataset_desc = driver.find_element(By.NAME, value="dataset_description")
    dataset_desc.send_keys("Description")

    driver.find_element(By.XPATH, value="//*[contains(text(),'Save Dataset')]").click()


if __name__ == "__main__":
    unittest.main()
