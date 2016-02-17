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

  - width:   0-499 = 200x150 visual ( 400 x  300 2x URL)
  - width: 500-899 = 400x300 visual ( 800 x  600 2x URL)
  - width: 900+    = 800x600 visual (1600 x 1200 2x URL)

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

    Scenarios: Baseline Sanity Check
      | srcW | srcH | DPR | portW | portH | type  | callW | callH | atrW | atrH |
      |  800 |  600 |  1  |  1024 |   768 | basic |   800 |   600 |  800 |  600 |
      | 1600 | 1200 |  2  |  1024 |   768 | basic |  1600 |  1200 |  800 |  600 |

