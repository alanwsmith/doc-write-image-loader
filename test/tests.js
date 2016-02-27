
QUnit.test("Check environmental variables.", function(assert) {

  var itb = imageTagBuilder({});

  assert.equal(itb.innerWidth, window.innerWidth, "Load innerWidth");
  assert.equal(itb.innerHeight, window.innerHeight, "Load innerHeight");
});
