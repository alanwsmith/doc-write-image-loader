Feature: Image Processing
  
  Test the image object to make sure it 
  responds properly. 

  Scenario Outline: Request via width
    Given I initizlie an image with source <src_w>x<src_h> and DPR <dpr> 
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



