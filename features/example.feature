Feature: Playwright with Cucumber.js Setup and Teardown

  Scenario: Verify Playwright website title
    Given I open the Playwright homepage
    Then the page title should contain "Playwright"
