from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains

class EvaluationTests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_projects(self):
        driver = self.driver
        driver.get("http://localhost:3000/evaluation")

        test_evaluation(driver)

    def tearDown(self):
        self.driver.quit()

def test_evaluation(driver: webdriver.Chrome):
    driver.find_element(By.XPATH, value="//*[contains(text(),'Select an option')]").click()
    time.sleep(0.2)
    driver.find_element(By.XPATH, value="//*[contains(text(),'Prompt project 1')]").click()
    time.sleep(0.2)
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create & Plan Workflow')]").click()
    time.sleep(0.2)
    driver.find_element(By.XPATH, value="//*[contains(text(),'New Evaluation Workflow')]").click()
    time.sleep(0.2)
    driver.find_element(By.NAME, value="evaluation_name").send_keys("Unit Test")
    time.sleep(0.2)
    driver.find_element(By.NAME, value="evaluation_description").send_keys("Unit Test")
    time.sleep(0.2)
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create WF')]").click()
    time.sleep(8)
    driver.find_elements(By.TAG_NAME, value="button")[-1].click()
    time.sleep(0.2)
    ActionChains(driver).drag_and_drop(driver.find_element(By.XPATH, value="//*[contains(text(),'Evaluation Exporter')]"),driver.find_element(By.XPATH, value="//*[contains(text(),'MLSUM Dataset')]")).perform()
    time.sleep(0.2)
    driver.find_elements(By.TAG_NAME, value="button")[-2].click()

if __name__ == "__main__":
    unittest.main()
