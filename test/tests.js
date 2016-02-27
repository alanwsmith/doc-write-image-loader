
QUnit.test("Check environmental variables", function(assert) {

  var itb = imageTagBuilder({});

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
