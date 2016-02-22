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
    |  1600 |  1200 |   1 |   800 |    800 |    600 |   800 |   600 |
    |  1600 |  1200 |   2 |   800 |   1600 |   1200 |   800 |   600 |
    |  1600 |  1200 |   2 |   400 |    800 |    600 |   400 |   300 |
    |  1600 |  1200 |   1 |   801 |    801 |    600 |   801 |   600 |
    |  1604 |  1204 |   1 |   801 |    801 |    601 |   801 |   601 |
    |  1604 |  1204 |   2 |   801 |   1602 |   1202 |   801 |   601 |

  Scenario Outline: Request via width
    Given I have an image
    When the source is <src_w>x<src_h>
    And a DPR of <dpr>
    And I request an image with height <req_h>
    Then the call width should be <call_w> 
    And the call height should be <call_h> 
    And the attribute width should be <att_w>
    And the attribute height should be <att_h>

    Scenarios:
    | src_w | src_h | dpr | req_h | call_w | call_h | att_w | att_h |
    |   800 |   600 |   1 |   600 |    800 |    600 |   800 |   600 |
    |  1600 |  1200 |   2 |   600 |   1600 |   1200 |   800 |   600 |

  @wip
  Scenario: Work in progress test
    Given I have an image
    When the source is 1604x1204 
    And a DPR of 2
    And I request an image with width 801
    Then the attribute width should be 801
    And the attribute height should be 601
    And the call width should be 1602 
    And the call height should be 1202


