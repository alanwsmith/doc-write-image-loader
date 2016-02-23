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
    Given SizeFinder - Viewport: 1024x768 - DPR: 1 - Source: 1600x1200
    Then the request width returned by 'basic' should be 800px

  Scenario: Mid size window
    Given SizeFinder - Viewport: 800x600 - DPR: 1 - Source: 1600x1200
    Then the request width returned by 'basic' should be 400px 
    
  Scenario: Small size window
    Given SizeFinder - Viewport: 480x360 - DPR: 1 - Source: 1600x1200
    Then the request width returned by 'basic' should be 200px 

  Scenario: 1024 percentage test 
    Given SizeFinder - Viewport: 1024x768 - DPR: 1 - Source: 1600x1200
    Then the request width returned by 'by_pct' should be 614px 

  Scenario: 800 percentage test 
    Given SizeFinder - Viewport: 800x600 - DPR: 1 - Source: 1600x1200
    Then the request width returned by 'by_pct' should be 560px 

  Scenario: 480 percentage test 
    Given SizeFinder - Viewport: 480x360 - DPR: 1 - Source: 1600x1200
    Then the request width returned by 'by_pct' should be 384px 

  Scenario: Get width via height at 1024x768
    Given SizeFinder - Viewport: 1024x768 - DPR: 1 - Source: 1600x1200
    Then the request width returned by 'by_height' should be 800px

