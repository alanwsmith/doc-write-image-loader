QUnit.test("Sanity check", function(assert) {
  assert.equal(1, 1, "Make sure tests work");
});

QUnit.test("1x DPR Basic call", function(assert) {

	var imageLoader = new ImageLoader(); 

	// Given

  // When
  imageLoader.load_params(
    {
      max_height: 1067,
      max_width: 1600,
      width_percentage: 50,
      window_inner_height: 680,
      window_inner_width: 1024
    }
  );

  // Then
  assert.equal(
    imageLoader.url_to_call(), 
    "http://res.cloudinary.com/demo/image/upload/w_512,h_341/horses.jpg"
  );

  assert.equal(
    imageLoader.tag_height(), 
    341 
  );

  assert.equal(
    imageLoader.tag_width(), 
    512
  );

});
