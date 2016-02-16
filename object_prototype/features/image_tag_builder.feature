Feature: Image Tag Builder Object Prototype

  This is an integration test suite for the ImageTagBuilder
  Prototype. It focusing on the public inputs and the
  expected corresponding outputs. 

  All tests are run against a specific configuration 
  that's built into the test suites. That's where the
  available "type"'s are defined and setup. The 
  configuration can be examined directly for reference.

  Scenario Outline: Integraion Tests 
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

    Scenarios: Validation Details
      | srcW | srcH | DPR | portW | portH | type  | callW | callH | atrW | atrH |
      |  800 |  600 |  1  |  1024 |   768 | basic |   800 |   600 |  800 |  600 |
      | 1600 | 1200 |  2  |  1024 |   768 | basic |  1600 |  1200 |  800 |  600 |

