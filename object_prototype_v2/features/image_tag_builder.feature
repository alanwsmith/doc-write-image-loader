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

    Scenarios: 1 DPR Basic
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   1 |          800 |   800 |   600 |    800 |    600 |
    | 1600x1200 | 1024x768 |   1 |          400 |   400 |   300 |    400 |    300 |

    Scenarios: 1 DPR Downsize
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    |   400x300 | 1024x768 |   1 |          800 |   400 |   300 |    400 |    300 |

    Scenarios: 2 DPR Basic
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   2 |          800 |   800 |   600 |   1600 |   1200 |
    | 1600x1200 | 1024x768 |   2 |          400 |   400 |   300 |    800 |    600 |

    Scenarios: 2 DPR Downsize
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    |   800x600 | 1024x768 |   2 |          800 |   400 |   300 |    800 |    600 |

  Scenario Outline: Request Width in Pixels Tests
    Given I have an Image Tag Builder with standard config
    And a source image that's <source>
    And a viewport that's <viewport>
    And a DPR of <dpr>
    When I request a width of <request_w_px>% 
    Then the attribute width should be <att_w>
    And the attribute height should be <att_h>
    And the call width should be <call_w>
    And the call height should be <call_h>

    Scenarios: 1 DPR Basic via %
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   1 |           50 |   512 |   384 |    512 |    384 |

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

