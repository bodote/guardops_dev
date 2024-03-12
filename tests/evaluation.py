from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import unittest

class ProjectCRUDTest(unittest.TestCase):

    def setUp(self):
        # Set up Selenium WebDriver (using Chrome in this example)
        self.driver = webdriver.Chrome()

    def test_projects(self):
        driver = self.driver
        # Navigate to the application URL
        driver.get("http://localhost:3000/projects")

        # Find the "Create Project" button and click on it
        create_button = driver.find_element_by_xpath("//button[contains(text(),'Create Project')]")
        create_button.click()

        # Fill out the form to create a new project
        project_name_input = driver.find_element_by_xpath("//input[@id='projectName']")
        project_name_input.send_keys("New Project")

        project_description_input = driver.find_element_by_xpath("//textarea[@id='projectDescription']")
        project_description_input.send_keys("Description of the new project")

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

if __name__ == "__main__":
    unittest.main()
