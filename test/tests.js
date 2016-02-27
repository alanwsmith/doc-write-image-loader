
QUnit.test("Check environmental variables", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // Then
  assert.equal(itb.innerWidth, window.innerWidth, "Load innerWidth");
  assert.equal(itb.innerHeight, window.innerHeight, "Load innerHeight");
  assert.equal(itb.dpr, window.devicePixelRatio, "Load innerHeight");
  
});


QUnit.test("Override environmental vars for testing", function(assert) {

  // Given 
  var itb = imageTagBuilder({});
  itb.innerWidth = 4000;
  itb.innerHeight = 5000;
  itb.dpr = 9;

  // Then
  assert.equal(itb.innerWidth, 4000, "Override innerWidth");
  assert.equal(itb.innerHeight, 5000, "Override innerHeight");
  assert.equal(itb.dpr, 9, "Override device pixel ratioa");

});

QUnit.test("Target test", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.requestWidth(800);

  // Then
  assert.equal(itb.imageTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag."); 

});


QUnit.test("Set Attribute Width", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.requestWidth(800);

  //Then
  assert.equal(itb.attributeWidth(), 800);

});


