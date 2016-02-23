Feature: Size Finder
  
  Uses the window size and styles to determine
  the pixel count to send to Image.

  Target sizes for basic pull

  |  ViewPort  | Width |
  |------------|-------|
  | 1024 x 768 |  800  |
  |  800 x 600 |  400  |
  |  480 x 360 |  200  |

  Scenario: Baseline test
    Given A SizeFinder with a 1024x768 viewport and a 1 DPR
    Then the request width returned by 'basic' should be 800px

  Scenario: Mid size window
    Given A SizeFinder with a 800x600 viewport and a 1 DPR
    Then the request width returned by 'basic' should be 400px 
    
  Scenario: Small size window
    Given A SizeFinder with a 480x360 viewport and a 1 DPR
    Then the request width returned by 'basic' should be 200px 

  Scenario: 1024 percentage test 
    Given A SizeFinder with a 1024x768 viewport and a 1 DPR
    Then the request width returned by 'by_pct' should be 614px 

  Scenario: 800 percentage test 
    Given A SizeFinder with a 800x600 viewport and a 1 DPR
    Then the request width returned by 'by_pct' should be 560px 

