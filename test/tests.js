
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
        // srcW | srcH | innerW | innerH | dpr | reqPxW | attW | attH | callW | callH 
          "1600 | 1200 | 1024   | 768    | 1   | 800    | 800  | 600  | 800   | 600   ",
          "1600 | 1200 | 1024   | 768    | 2   | 800    | 800  | 600  | 1600  | 1200  ",
          "1600 | 1200 | 1024   | 768    | 1   | 400    | 400  | 300  | 400   | 300   ",
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
