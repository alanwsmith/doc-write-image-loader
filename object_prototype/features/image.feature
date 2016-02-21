Feature: Image Processing
  
  Test the image object to make sure it 
  responds properly. 

  Scenario: Baseline test
    Given I have an image
    When the source is 1600x1200
    Then the source_width should be 1600
    And  the source_height should be 1200


