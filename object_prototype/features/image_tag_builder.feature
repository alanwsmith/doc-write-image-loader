Feature: Image Tag Builder Object Prototype

  Using Ruby to build an object prototype to solidify
  the logic since it's easier to work with and test
  than JavaScript. 

  Scenario: Most Basic Call
    Given a source image that's 800x600
    And a window.devicePixelRatio of 1
    And a window.innerWidth of 1024
    And an image type of "main"
    Then the source image width should be 800
    And the source image height should be 600
    And the image call width should be 800
    And the image call height should be 600
    And the width attribute should be 800
    And the height attribute should be 600

  Scenario: Basic test with 2x devicePixelRatio
    Given a source image that's 1600x1200
    And a window.devicePixelRatio of 2
    And a window.innerWidth of 1024
    And an image type of "main"
    Then the source image width should be 1600
    And the source image height should be 1200
    And the image call width should be 1600
    And the image call height should be 1200
    And the width attribute should be 800
    And the height attribute should be 600