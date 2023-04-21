Feature: Users

  In order to use the system, users must be logged-in.
  For this we have registration and login pages.

  @userLogin
  Scenario: User Login
    Given I am on login page
    When I enter form fields:
      | username | user       |
      | password | 1@345qWert |
    And I click "Sign In" button
    Then I see "user" in user menu.
