Feature: Object to prototype document.writer logic
  Using Ruby to build an object prototype to solidify
  the logic since it's easier to work with and test
  than JavaScript. 

  Scenario: Most Basic Call
    Given I use configuration 1
    And a window.devicePixelRatio of 1
    And a window.innerWidth of 1024
    And a source image that's 800x600
    Then the width attribute should be 800
    And the height attribute should be 600


