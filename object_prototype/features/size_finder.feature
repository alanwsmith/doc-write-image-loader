Feature: Size Finder
  
  Uses the window size and styles to determine
  the pixel count to send to Image. 

  Scenario: Baseline test
    Given I have a SizeFinder
    And I load the base test styles
    When the window size is 1024x768
    Then the request width returned by 'basic' should be 800px. 

