QUnit.test("1x DPR Basic call stright to load_params", function(assert) {

	var imageLoader = new ImageLoader(); 

  // Given 
  imageLoader.load_params(
    {
      raw_height: 1067,
      raw_width: 1600,
      percent_of_viewport: 50,
//      window_inner_height: 680,
      viewport_width: 1024
    }
  );

  // Then
  assert.equal(imageLoader._raw_height, 1067, "Raw image height") 

  assert.equal(imageLoader.url_to_call(), "http://res.cloudinary.com/demo/image/upload/w_512,h_341/horses.jpg", "Final URL");

  assert.equal(imageLoader.render_height(), 341, "Render height");

  assert.equal(imageLoader.render_width(), 512, "Render width");

  assert.equal(imageLoader.url_request_height(), 341, "Request height");

  assert.equal(imageLoader.url_request_width(), 512, "Request width");

});



