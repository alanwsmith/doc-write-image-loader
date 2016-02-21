Feature: Image Processing
  
  Test the image object to make sure it 
  responds properly. 

  Scenario: Baseline test
    Given I have an image
    When the source is 1600x1200
    Then the source_width should be 1600
    And  the source_height should be 1200

  Scenario: Basic Width Request
    Given I have an image
    When the source is 800x600 
    And a DPR of 1
    And I request an image with width 800
    Then the call width should be 800
    And the call height should be 600
    And the attribute width should be 800
    And the attribute height should be 600

    
