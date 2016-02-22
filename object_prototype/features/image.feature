Feature: Image Processing
  
  Test the image object to make sure it 
  responds properly. 

  Scenario: Baseline test
    Given I have an image
    When the source is 1600x1200
    Then the source_width should be 1600
    And  the source_height should be 1200

  Scenario Outline: Request via width
    Given I have an image
    When the source is <src_w>x<src_h>
    And a DPR of <dpr>
    And I request an image with width <req_w>
    Then the call width should be <call_w> 
    And the call height should be <call_h> 
    And the attribute width should be <att_w>
    And the attribute height should be <att_h>

    Scenarios:
    | src_w | src_h | dpr | req_w | call_w | call_h | att_w | att_h |
    |   800 |   600 |   1 |   800 |    800 |    600 |   800 |   600 |


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
    And I request an image with height 600
    Then the call width should be 800
    And the call height should be 600
    And the attribute width should be 800
    And the attribute height should be 600

  Scenario: 2x request via height 
    Given I have an image
    When the source is 1600x1200 
    And a DPR of 2
    And I request an image with height 600
    Then the call width should be 1600
    And the call height should be 1200
    And the attribute width should be 800
    And the attribute height should be 600

