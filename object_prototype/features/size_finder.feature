Feature: Size Finder
  
  Uses the window size and styles to determine
  the pixel count to send to Image.

  Target sizes for basic pull

  |  ViewPort  | Width |
  |------------|-------|
  | 1024 x 768 |  800  |
  |  800 x 600 |  400  |
  |  480 x 360 |  200  |


  @wip
  Scenario: Baseline test
    Given I have a SizeFinder
    And I load the base test styles
    When the window size is 1024x768
    Then the request width returned by 'basic' should be 800px. 

  @wip
  Scenario: Mid size window
    Given I have a SizeFinder
    And I load the base test styles
    When the window size is 800x600 
    Then the request width returned by 'basic' should be 400px. 
    
  @wip
  Scenario: Small size window
    Given I have a SizeFinder
    And I load the base test styles
    When the window size is 480x360 
    Then the request width returned by 'basic' should be 200px. 
