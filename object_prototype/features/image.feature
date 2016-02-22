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

    Scenarios: Calling via width
    | src_w | src_h | dpr | req_w | call_w | call_h | att_w | att_h |
    |   800 |   600 |   1 |   800 |    800 |    600 |   800 |   600 |
    |  1600 |  1200 |   1 |   800 |    800 |    600 |   800 |   600 |
    |  1600 |  1200 |   2 |   800 |   1600 |   1200 |   800 |   600 |
    |  1600 |  1200 |   2 |   400 |    800 |    600 |   400 |   300 |
    |  1600 |  1200 |   1 |   801 |    801 |    600 |   801 |   600 |
    |  1604 |  1202 |   1 |   801 |    801 |    600 |   801 |   600 |
    |  1604 |  1204 |   1 |   801 |    801 |    601 |   801 |   601 |
    |  1604 |  1202 |   2 |   801 |   1602 |   1200 |   801 |   600 |
    |  1604 |  1204 |   2 |   801 |   1602 |   1202 |   801 |   601 |

    Scenarios: Calling via width and reduce size
    | src_w | src_h | dpr | req_w | call_w | call_h | att_w | att_h |
    |   800 |   600 |   1 |  1600 |    800 |    600 |   800 |   600 |
    |   800 |   600 |   2 |   800 |    800 |    600 |   400 |   300 |

  Scenario Outline: Request via width
    Given I have an image
    When the source is <src_w>x<src_h>
    And a DPR of <dpr>
    And I request an image with height <req_h>
    Then the call width should be <call_w> 
    And the call height should be <call_h> 
    And the attribute width should be <att_w>
    And the attribute height should be <att_h>

    Scenarios: Request via height
    | src_w | src_h | dpr | req_h | call_w | call_h | att_w | att_h |
    |   800 |   600 |   1 |   600 |    800 |    600 |   800 |   600 |
    |  1600 |  1200 |   2 |   600 |   1600 |   1200 |   800 |   600 |
    |  1600 |  1200 |   1 |   601 |    801 |    600 |   801 |   600 |
    |  1600 |  1200 |   1 |   602 |    802 |    601 |   802 |   601 |

# TODO: Add 2x tests for odd size height calls.

  @wip
  Scenario: Work in progress test
    Given I have an image
    When the source is 800x600 
    And a DPR of 1
    And I request an image with width 1600
    Then the attribute width should be 800
    And the attribute height should be 600
    And the call width should be 800
    And the call height should be 600 

