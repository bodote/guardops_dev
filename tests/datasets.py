from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import unittest

class ProjectCRUDTest(unittest.TestCase):

    def setUp(self):
        # Set up Selenium WebDriver (using Chrome in this example)
        self.driver = webdriver.Chrome()

    def test_datasets(self):
        driver = self.driver
        driver.get("http://localhost:3000/datasetlist")
        
       
        test_dataset_creation(driver)
        # Click on the "Create" button
        create_button = driver.find_element_by_xpath("//button[contains(text(),'Create')]")
        create_button.click()

        # Wait for the project to be created
        time.sleep(2)  # You may replace this with a better wait mechanism

        # Find the "Edit" button for the newly created project and click on it
        edit_button = driver.find_element_by_xpath("//button[contains(text(),'Edit')]")
        edit_button.click()

        # Update project details
        updated_project_name_input = driver.find_element_by_xpath("//input[@id='projectName']")
        updated_project_name_input.clear()
        updated_project_name_input.send_keys("Updated Project")

        updated_project_description_input = driver.find_element_by_xpath("//textarea[@id='projectDescription']")
        updated_project_description_input.clear()
        updated_project_description_input.send_keys("Updated description of the project")

        # Click on the "Save" button
        save_button = driver.find_element_by_xpath("//button[contains(text(),'Save')]")
        save_button.click()

        # Wait for the project to be updated
        time.sleep(2)  # You may replace this with a better wait mechanism

        # Find the "Delete" button for the project and click on it
        delete_button = driver.find_element_by_xpath("//button[contains(text(),'Delete')]")
        delete_button.click()

        # Confirm deletion
        confirm_delete_button = driver.find_element_by_xpath("//button[contains(text(),'Confirm Delete')]")
        confirm_delete_button.click()

        # Wait for the project to be deleted
        time.sleep(2)  # You may replace this with a better wait mechanism

        # Assert that the project is deleted (you might check for the absence of the project in the UI)




    def tearDown(self):
        # Close the browser after the test
        self.driver.quit()


def test_dataset_creation(driver):

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
