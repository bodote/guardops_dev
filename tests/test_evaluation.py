from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
from test_login import test_login
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
class EvaluationTests(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.add_argument('--headless=new')
        self.driver = webdriver.Chrome(options=options)
        
    def test_projects(self):
        driver = self.driver
        test_login(driver)
        driver.get("http://localhost:3000/evaluation")

        test_evaluation(driver)

    def tearDown(self):
        self.driver.quit()

def test_evaluation(driver: webdriver.Chrome):
    driver.find_element(By.XPATH, value="//*[contains(text(),'Select an option')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Prompt project 1')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'Prompt project 1')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Create & Plan Workflow')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create & Plan Workflow')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'New Evaluation Workflow')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'New Evaluation Workflow')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.NAME,"evaluation_name")))
    driver.find_element(By.NAME, value="evaluation_name").send_keys("Unit Test")
    driver.find_element(By.NAME, value="evaluation_description").send_keys("Unit Test")
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create WF')]").click()
    time.sleep(8)
    driver.find_elements(By.TAG_NAME, value="button")[-1].click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Evaluation Exporter')]")))
    ActionChains(driver).drag_and_drop(driver.find_element(By.XPATH, value="//*[contains(text(),'Evaluation Exporter')]"),driver.find_element(By.XPATH, value="//*[contains(text(),'MLSUM Dataset')]")).perform()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.TAG_NAME,"input")))
    driver.find_element(By.TAG_NAME, value="input").send_keys("unittest")
    time.sleep(0.2)
    driver.find_elements(By.TAG_NAME, value="button")[-2].click()
    driver.get("http://localhost:3000/evaluation")
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Select an option')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'Select an option')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Prompt project 1')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'Prompt project 1')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'Create & Plan Workflow')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'Create & Plan Workflow')]").click()
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator=(By.XPATH,"//*[contains(text(),'unittest')]")))
    driver.find_element(By.XPATH, value="//*[contains(text(),'unittest')]").click()
    time.sleep(1)
    assert driver.find_element(By.ID,value="TextField").get_attribute(name="value") == "unittest", "flow field values not stored"    

if __name__ == "__main__":
    unittest.main()
