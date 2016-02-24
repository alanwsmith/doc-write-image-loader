Feature: Image Tag Builder
  The prototype for a JavaScript object to 
  use in the document.write-image-loader.

  Scenario: Basic test 
    Given I have an Image Tag Builder with standard config
    And a source image that's 1600x1200
    And a viewport that's 1024x768
    And a DPR of 1
    When I set the width to 800px 
    Then the attribute width should be 800
    And the attribute height should be 600
    And the call width should be 800
    And the call height should be 600

  Scenario: 1 DPR smaller image test. 
    Given I have an Image Tag Builder with standard config
    And a source image that's 1600x1200
    And a viewport that's 1024x768
    And a DPR of 1
    When I set the width to 400px 
    Then the attribute width should be 400
    And the attribute height should be 300
    And the call width should be 400
    And the call height should be 300

  Scenario: 2 DPR basic test 
    Given I have an Image Tag Builder with standard config
    And a source image that's 1600x1200
    And a viewport that's 1024x768
    And a DPR of 2
    When I set the width to 800px 
    Then the attribute width should be 800
    And the attribute height should be 600
    And the call width should be 1600
    And the call height should be 1200


