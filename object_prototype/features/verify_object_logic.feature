Feature: Object to prototype document.writer logic
  Using Ruby to build an object prototype to solidify
  the logic since it's easier to work with and test
  than JavaScript. 

  Scenario: Source Dimensions Captured
    Given a source image that's 800x600
    Then the ratio should be 0.75

