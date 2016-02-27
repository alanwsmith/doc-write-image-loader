
QUnit.test("Check environmental variables", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // Then
  assert.equal(itb.innerWidth, window.innerWidth, "Load innerWidth");
  assert.equal(itb.innerHeight, window.innerHeight, "Load innerHeight");
  assert.equal(itb.dpr, window.devicePixelRatio, "Load innerHeight");
  
});


QUnit.test("Verify variable override", function(assert) {

  // Given 
  var itb = imageTagBuilder({});
  itb.innerWidth = 4000;
  itb.innerHeight = 5000;
  itb.dpr = 9;

  // Then
  assert.equal(itb.innerWidth, 4000, "Override innerWidth");
  assert.equal(itb.innerHeight, 5000, "Override innerHeight");
  assert.equal(itb.dpr, 9, "Override device pixel ratio");

});

QUnit.test("Target test", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.prep({ image: "horses.jpg", style: "basic", alt: "some horses", sourceWidth: 1600, sourceHeight: 1000}); 

  // TODO: Move requestWidth into style processing 
  itb.requestWidth(800);

  // Then
  assert.equal(itb.imageTag(),'<img alt="some horses" class="basic" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag."); 

});


QUnit.test("Set attribute width via `requestWidth`", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.prep({ sourceWidth: 1600, sourceHeight: 1000});
  itb.requestWidth(800);

  // Then
  assert.equal(itb.attributeWidth(), 800);

});


QUnit.test("Set source dimensions", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.setSourceWidth(1600);
  itb.setSourceHeight(1000);

  // Then
  assert.equal(itb.sourceWidth(), 1600, "Source width");
  assert.equal(itb.sourceHeight(), 1000, "Source height");

});

QUnit.test("Verify attribute height", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.setSourceWidth(1600);
  itb.setSourceHeight(1000);
  itb.requestWidth(800);

  // Then 
  assert.equal(itb.attributeHeight(), 500, "attributeHeight()");

});


QUnit.test("Parse `maxSize` param", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.prep({ sourceWidth: 1600, sourceHeight: 1000});

  // Then 
  assert.equal(itb.sourceWidth(), 1600, "Source width");
  assert.equal(itb.sourceHeight(), 1000, "Source height");

});


QUnit.test("Check call width and height", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When 
  itb.dpr = 2;
  itb.setAttributeWidth(800);
  itb.setSourceWidth(1600);
  itb.setSourceHeight(1200);

  // Then
  assert.equal(itb.callWidth(), 1600);
  assert.equal(itb.callHeight(), 1200);

});


QUnit.test("Make sure image isn't larger than the source", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.dpr = 1;
  itb.prep({ sourceWidth: 400, sourceHeight: 400 });
  itb.requestWidth(800);

  // Then
  assert.equal(itb.attributeWidth(), 400, "Reduced width");
  assert.equal(itb.attributeHeight(), 400, "Reduced height");
  


});

QUnit.test("Request width via pixel checks", function(assert) {

  // Given
  var itb = imageTagBuilder({});

  var testSets = [

    // TESTS TO ADD
    // - make sure 'attributeWidth' at 1.3 DPR is in integer. 
    // - make sure 'attributeHeight' at 1.3 DPR is in integer. 
    // - make sure 'callWidth' at 1.3 DPR is in integer. 
    // - make sure 'callHeight' at 1.3 DPR is in integer. 

        // srcW | srcH | innerW | innerH | dpr | reqPxW | attW | attH | callW | callH 

        // Basic 1 DPR tests
          "1600 | 1200 | 1024   | 768    | 1   | 800    | 800  | 600  | 800   | 600   ",
          "1600 | 1200 | 1024   | 768    | 1   | 400    | 400  | 300  | 400   | 300   ",

        // Dowsize image if request is too big.
          "400  | 300  | 1024   | 768    | 1   | 800    | 400  | 300  | 400   | 300   ",
          
        // 1 DPR Make sure height stays an integer
          "1600 | 1200 | 1024   | 768    | 1   | 350    | 350  | 262  | 350   | 262   ",

        // Basic 2 DPR tests
          "1600 | 1200 | 1024   | 768    | 2   | 800    | 800  | 600  | 1600  | 1200  ",

/*
    Scenarios: 2 DPR Basic
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   2 |          800 |   800 |   600 |   1600 |   1200 |
    | 1600x1200 | 1024x768 |   2 |          400 |   400 |   300 |    800 |    600 |

    Scenarios: 2 DPR Downsize
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    |   800x600 | 1024x768 |   2 |          800 |   400 |   300 |    800 |    600 |

    Scenarios: 2 DPR Make sure height stays an integer. 
    | source    | viewport | dpr | request_w_px | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   2 |          350 |   350 |   262 |    700 |    524 |
*/
        ];

  for (var testIndex = 0, lastIndex = testSets.length; testIndex < lastIndex; testIndex = testIndex +1) {

  	var params = testSets[testIndex].split(/ \| /);
    
    // When
    itb.prep({ sourceWidth: params[0], sourceHeight: parseInt(params[1], 10)});
    itb.innerWidth = parseInt(params[2], 10);
    itb.innerHeight = parseInt(params[3], 10);
    itb.dpr = parseInt(params[4], 10);

    itb.requestWidth(params[5]);
    
    assert.equal(itb.attributeWidth(), parseInt(params[6], 10), "attributeWidth");
    assert.equal(itb.attributeHeight(), parseInt(params[7], 10), "attributeHeight");
    assert.equal(itb.callWidth(), parseInt(params[8], 10), "callWidth");
    assert.equal(itb.callHeight(), parseInt(params[9], 10), "callHeight");
  }


});



//////////

/*

    Scenarios: 1 DPR Basic via width %
    | source    | viewport | dpr | request_w_pct | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   1 |            50 |   512 |   384 |    512 |    384 |

    Scenarios: 2 DPR Basic via %
    | source    | viewport | dpr | request_w_pct | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   2 |            50 |   512 |   384 |   1024 |    768 |

    Scenarios: 1 DPR Basic via % ensure integers
    | source    | viewport | dpr | request_w_pct | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   1 |            51 |   522 |   391 |    522 |    391 |
    | 1600x1200 | 1024x768 |   2 |            51 |   522 |   391 |   1044 |    782 |

    Scenarios: Make sure down sizing works 
    | source    | viewport | dpr | request_w_pct | att_w | att_h | call_w | call_h |
    |   400x300 | 1024x768 |   1 |            50 |   400 |   300 |    400 |    300 |
    |   800x600 | 1024x768 |   2 |            50 |   400 |   300 |    800 |    600 |
*/

/*

    Scenarios: 1 DPR via height %
    | source    | viewport | dpr | request_h_pct | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   1 |            50 |   512 |   384 |    512 |    384 |
    | 1000x4000 |  800x800 |   1 |            50 |   100 |   400 |    100 |    400 |

    Scenarios: 1 DPR via height % and downsized   
    | source    | viewport | dpr | request_h_pct | att_w | att_h | call_w | call_h |
    | 100x200   |  800x800 |   1 |            50 |   100 |   200 |    100 |    200 |

    Scenarios: 2 DPR via height %
    | source    | viewport | dpr | request_h_pct | att_w | att_h | call_w | call_h |
    | 1600x1200 | 1024x768 |   2 |            50 |   512 |   384 |   1024 |    768 |
    | 1000x4000 |  800x800 |   2 |            50 |   100 |   400 |    200 |    800 |

    Scenarios: 2 DPR via height % and downsized   
    | source    | viewport | dpr | request_h_pct | att_w | att_h | call_w | call_h |
    | 100x200   |  800x800 |   2 |            50 |    50 |   100 |    100 |    200 |

    Scenarios: 1 DPR via height % that reduces because of viewport width
    | source    | viewport | dpr | request_h_pct | att_w | att_h | call_w | call_h |
    | 1000x1000 | 500x1000 |   1 |           100 |   500 |   500 |    500 |    500 |

    Scenarios: 2 DPR via height % that reduces because of viewport width
    | source    | viewport | dpr | request_h_pct | att_w | att_h | call_w | call_h |
    | 1000x1000 | 500x1000 |   2 |           100 |   500 |   500 |   1000 |   1000 |
 */

