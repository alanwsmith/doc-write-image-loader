Feature: Image Tag Builder
  The prototype for a JavaScript object to 
  use in the document.write-image-loader.

  TODO:

  - pixel requests with odd number
  - percentage request with odd number
  - make sure integers are always returned. 

  Scenario Outline: Request Width in Pixels Tests
    Given I have an Image Tag Builder with standard config
    And a source image that's <source>
    And a viewport that's <viewport>
    And a DPR of <dpr>
    When I request a width of <request_w_px>px 
    Then the attribute width should be <att_w>
    And the attribute height should be <att_h>
    And the call width should be <call_w>
    And the call height should be <call_h>

    Scenarios: Baisc size tests
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   1 |          800 |   800 |   600 |    800 |    600 |
    | 1600x1200 | 1024x768 |   1 |          400 |   400 |   300 |    400 |    300 |

    Scenarios: Downsize image if necessary.  
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    |   400x300 | 1024x768 |   1 |          800 |   400 |   300 |    400 |    300 |

  Scenario: 2 DPR basic test 
    Given I have an Image Tag Builder with standard config
    And a source image that's 1600x1200
    And a viewport that's 1024x768
    And a DPR of 2
    When I request a width of 800px 
    Then the attribute width should be 800
    And the attribute height should be 600
    And the call width should be 1600
    And the call height should be 1200

  Scenario: 2 DPR smaller image test. 
    Given I have an Image Tag Builder with standard config
    And a source image that's 1600x1200
    And a viewport that's 1024x768
    And a DPR of 2
    When I request a width of 400px 
    Then the attribute width should be 400
    And the attribute height should be 300
    And the call width should be 800
    And the call height should be 600

  Scenario: 2 DPR downsize image 
    Given I have an Image Tag Builder with standard config
    And a source image that's 800x600
    And a viewport that's 1024x768
    And a DPR of 2
    When I request a width of 800px 
    Then the attribute width should be 400
    And the attribute height should be 300
    And the call width should be 800
    And the call height should be 600

  Scenario: 1 DPR test with width % request 
    Given I have an Image Tag Builder with standard config
    And a source image that's 1600x1200
    And a viewport that's 1024x768
    And a DPR of 1
    When I request a width of 50% 
    Then the attribute width should be 512
    And the attribute height should be 384
    And the call width should be 512
    And the call height should be 384

  Scenario: 2 DPR test with width % request 
    Given I have an Image Tag Builder with standard config
    And a source image that's 1600x1200
    And a viewport that's 1024x768
    And a DPR of 2
    When I request a width of 50% 
    Then the attribute width should be 512
    And the attribute height should be 384
    And the call width should be 1024 
    And the call height should be 768

