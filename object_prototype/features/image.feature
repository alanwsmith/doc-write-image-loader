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

  Scenario: Request with 2x DPR 
    Given I have an image
    When the source is 1600x1200 
    And a DPR of 2
    And I request an image with width 800
    Then the call width should be 1600
    And the call height should be 1200
    And the attribute width should be 800
    And the attribute height should be 600

  Scenario: 1x request w/ call smaller than source
    Given I have an image
    When the source is 1600x1200 
    And a DPR of 1
    And I request an image with width 800
    Then the call width should be 800
    And the call height should be 600
    And the attribute width should be 800
    And the attribute height should be 600

  Scenario: 2x DPR w/ call smaller than source 
    Given I have an image
    When the source is 1600x1200 
    And a DPR of 2
    And I request an image with width 400
    Then the call width should be 800
    And the call height should be 600
    And the attribute width should be 400
    And the attribute height should be 300

  Scenario: 1x reqeust via height 
    Given I have an image
    When the source is 800x600 
    And a DPR of 1
    And I request an image with heigth 600
    Then the call width should be 800
    And the call height should be 600
    And the attribute width should be 800
    And the attribute height should be 600


