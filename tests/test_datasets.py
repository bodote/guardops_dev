from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest
from selenium.webdriver.chrome.options import Options
from test_login import test_login
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
class DatasetTests(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.add_argument('--headless=new')
        self.driver = webdriver.Chrome(options=options)

    def test_datasets(self):
        driver = self.driver
        test_login(driver)        
        test_dataset_creation(driver)

    def tearDown(self):
        self.driver.quit()


def test_dataset_creation(driver: webdriver.Chrome):
    driver.get("http://localhost:3000/datasetlist")
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'New Dataset')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'New Dataset')]").click()
    driver.find_element(By.NAME, value="dataset_name").send_keys("Testing Dataset")
    driver.find_element(By.NAME, value="dataset_description").send_keys("Description")
    driver.find_element(By.XPATH, value="//*[contains(text(),'Save Dataset')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Testing Dataset')]")))
    dataset_created = driver.find_element(By.XPATH, value="//*[contains(text(),'Testing Dataset')]")
    assert dataset_created, "Dataset was not created"



if __name__ == "__main__":
    unittest.main()
