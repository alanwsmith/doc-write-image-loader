Feature: Image Tag Builder Object Prototype

  This is an integration test suite for the ImageTagBuilder
  Prototype. It focusing on the public inputs and the
  expected corresponding outputs. 

  All tests are run against a specific configuration 
  that's built into the test suites. That's where the
  available "type"'s are defined and setup. The 
  configuration can be examined directly for reference.

  Tartets for a test with 1600x1200 source image and
  diffrent viewport sizes.

  - w:   0-499 - vp:  480 x 640 - 200x150 visual ( 400 x  300 2x URL)
  - w: 500-899 - vp:  800 x 600 - 400x300 visual ( 800 x  600 2x URL)
  - w: 900+    - vp: 1024 x 768 - 800x600 visual (1600 x 1200 2x URL)

  Scenario Outline: Integration Tests 
    Given I have an ImageTagBuilder
    And a source image that's <srcW>x<srcH>
    And a viewport that's <portW>x<portH>
    And a window.devicePixelRatio of <DPR>
    And a type of <type>
    Then the source image width should be <srcW> 
    And the source image height should be <srcH>
    And the image call width should be <callW>
    And the image call height should be <callH>
    And the width attribute should be <atrW>
    And the height attribute should be <atrH>

    Scenarios: Baseline Sanity Check with most basic math
      | srcW | srcH | DPR | portW | portH | type  | atrW | atrH | callW | callH |
      |  800 |  600 |  1  |  1024 |   768 | basic |  800 |  600 |   800 |   600 |
      | 1600 | 1200 |  2  |  1024 |   768 | basic |  800 |  600 |  1600 |  1200 |

#    Scenarios: Tests with 800x600 view port and reduced sizesTests 
#      | srcW | srcH | DPR | portW | portH | type  | atrW | atrH | callW | callH |
#      |  800 |  600 |  1  |   800 |   600 | basic |  400 |  300 |   400 |   300 |
#     | 1600 | 1200 |  2  |   800 |   600 | basic |  800 |  600 |  1600 |  1200 |

  Scenario: Temporary Prep Test for adding one thing at a time 
    Given I have an ImageTagBuilder
    And a source image that's 1600x1200 
    And a viewport that's 800x600
    And a window.devicePixelRatio of 1
    And a type of basic
    Then the source image width should be 1600 
    And the source image height should be 1200
#    And the width attribute should be 800 
#    And the height attribute should be <atrH>
#    And the image call width should be <callW>
#    And the image call height should be <callH>

