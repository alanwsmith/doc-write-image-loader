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

  |  ViewPort  | WidthMatch | Source    | Attr/Visual | 1xCall    | 2xCall      |
  |------------|------------|-----------|-------------|-----------|-------------|
  | 1024 x 768 |   900+     | 1600x1200 |  800 x 600  | 800 x 600 | 1600 x 1200 |
  |  800 x 600 |   500-899  | 1600x1200 |  400 x 300  | 400 x 300 |  800 x  600 |
  |  480 x 360 |     0-499  | 1600x1200 |  200 x 150  | 200 x 150 |  400 x  300 |

  Scenario Outline: Integration Tests 
    Given I have an ImageTagBuilder
    And a source image that's <srcW>x<srcH>
    And a viewport that's <iWidth>x<iHeight>
    And a window.devicePixelRatio of <DPR>
    And a type of <type>
    Then the source image width should be <srcW> 
    And the source image height should be <srcH>
    And the image call width should be <callW>
    And the image call height should be <callH>
    And the width attribute should be <atrW>
    And the height attribute should be <atrH>

    Scenarios: Baseline Sanity Check with most basic math
      | iWidth | iHeight | DPR | srcW | srcH | type  | atrW | atrH | callW | callH |
      |  1024  |   768   |  1  |  800 |  600 | basic |  800 |  600 |   800 |   600 |
      |  1024  |   768   |  2  | 1600 | 1200 | basic |  800 |  600 |  1600 |  1200 |

    Scenarios: 1024x768 view port and 1 DPR
     | iWidth | iHeight | DPR | srcW | srcH | type  | atrW | atrH | callW | callH |
     |  1024  |   768   |  1  | 1600 | 1200 | basic |  800 |  600 |   -1  |   -1  |

#    Scenarios: Tests with 800x600 view port and reduced sizesTests 
#     | iWidth | iHeight | DPR | srcW | srcH | type  | atrW | atrH | callW | callH |
#     |   800  |    600  |  1  | 1600 | 1200 | basic |  400 |  300 |   400 |   300 |
#     |   800  |    600  |  2  | 1600 | 1200 | basic |  800 |  600 |  1600 |  1200 |

