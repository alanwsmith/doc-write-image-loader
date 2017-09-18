QUnit.test("Make sure there is a version number", function(assert) {

  // SET VERSION NUMBER:
    var version_number = "0.5.0";

  // Given
	var imageLoader = new ImageLoader_0_5_x(); 

  // When
  imageLoader.load_params(
    {
      dpr: 2,
      image_name: "horses.jpg",
      percent_of_viewport_width: 50, quality: 80,
      raw_height: 1067, raw_width: 1600,
      viewport_height: 680, viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // This is hard coded both here and in the actual funciton. 
  // I'm sure there are better ways to do that that can be 
  // looked up. 
  assert.equal(imageLoader.version_number(), version_number, "Make sure the version number is right."); 

});


QUnit.test("2x DPR Basic call stright to load_params", function(assert) {

  // Given
	var imageLoader = new ImageLoader_0_5_x(); 

  // When
  imageLoader.load_params(
    {
    	dpr: 2,
    	image_name: "horses.jpg",
      percent_of_viewport_width: 50,
      quality: 80,
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then - Verify instance variables.
  assert.equal(imageLoader._dpr, 2, "Device pixel resolution"); 
  assert.equal(imageLoader._image_name, "horses.jpg", "Image name"); 
  assert.equal(imageLoader._raw_height, 1067, "Raw image height"); 
  assert.equal(imageLoader._raw_width, 1600, "Raw image width");
  assert.equal(imageLoader._percent_of_viewport_width, 50, "Percent of viewport width"); 
  assert.equal(imageLoader._quality, 80, "Quality level");
  assert.equal(imageLoader._viewport_height, 680, "Viewport height");
  assert.equal(imageLoader._viewport_width, 1024, "Viewport width");
  assert.equal(imageLoader._url_template, "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]", "URL Template");

  // And - Verify functions
  assert.equal(imageLoader.url_to_call(), "http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg", "Final URL");
  assert.equal(imageLoader.render_height(), 341, "Render height");
  assert.equal(imageLoader.render_width(), 512, "Render width");
  assert.equal(imageLoader.url_request_height(), 682, "Request height");
  assert.equal(imageLoader.url_request_width(), 1024, "Request width");
  assert.equal(imageLoader.img_tag(), '<img src="http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg" width="512" height="341">', "Image tag");

});

QUnit.test("2x DPR stright to load_params with max width enforced", function(assert) {

  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
      dpr: 2,
      image_name: "horses.jpg",
      percent_of_viewport_width: 50,
      quality: 80,
      raw_height: 1067,
      raw_width: 1600,
      max_render_width: 200,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then:
  assert.equal(imageLoader._max_render_width, 200, "Max render width");
  assert.equal(imageLoader.render_width(), 200, "Verify render_width == max_render_width");
  assert.equal(imageLoader.render_height(), 133, "Verify render_width == max_render_width");
  assert.equal(imageLoader.url_request_width(), 400, "Request width");
  assert.equal(imageLoader.url_request_height(), 266, "Request height");

});


QUnit.test("Verify defaults", function(assert) {

  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
      image_name: "horses.jpg",
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then:
  assert.equal(imageLoader._max_render_width, 1600, "Default Max Render Width == Raw Width"); 
  assert.equal(imageLoader._dpr, 1, "Device pixel ratio default");
  assert.equal(imageLoader._percent_of_viewport_width, 100, "Percent of viewport width default");
  assert.equal(imageLoader._quality, 80, "Quality default");

});



QUnit.test("Ensure values are integers", function(assert) {
  
  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
    	dpr: 2,
      image_name: "horses.jpg",
      percent_of_viewport_width: 25,
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1021,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then:
  assert.equal(imageLoader.render_height(), 170, "Render height");
  assert.equal(imageLoader.render_width(), 255, "Render width is 255 and not 255.25");
  assert.equal(imageLoader.url_request_height(), 340, "Request height");
  assert.equal(imageLoader.url_request_width(), 510, "Request width is 510 and not 510.5");

});


QUnit.test("Restrict height", function(assert) {

  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
    	dpr: 1,
      image_name: "horses.jpg",
      percent_of_viewport_height: 90,
      raw_height: 2000,
      raw_width: 2200,
      viewport_height: 1000,
      viewport_width: 1800,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );
  
  assert.equal(imageLoader.render_height(), 900, "Render height");
  

});


