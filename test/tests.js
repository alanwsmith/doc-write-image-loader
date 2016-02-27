
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

  // Then
  assert.equal(itb.imageTag(),'<img alt="some horses" class="basic" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag."); 

});


QUnit.test("Set attribute width via `requestWidth`", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
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



  
